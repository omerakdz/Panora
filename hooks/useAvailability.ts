import { useState, useEffect, useCallback, useRef } from "react";
import { CalculatorData } from "@/types";
import { SlotData, AvailabilityResponse } from "@/types";
import { isDateAvailable } from "@/lib/calendar";
import { getDateStr } from "@/lib/constants";

export function useAvailability(
  data: CalculatorData,
  updateData: (d: Partial<CalculatorData>) => void,
) {
  const [loading, setLoading] = useState(false);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);
  const [availabilityData, setAvailabilityData] =
    useState<AvailabilityResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableSlots, setAvailableSlots] = useState<SlotData[]>([]);
  const [isRecommendedDay, setIsRecommendedDay] = useState(false);
  const [error, setError] = useState<string>("");
  const [needsAddressConfirmation, setNeedsAddressConfirmation] =
    useState(false);
  const [suggestedAddress, setSuggestedAddress] = useState<string>("");
  const [showAddressForm, setShowAddressForm] = useState(true);
  const [addressSubmitted, setAddressSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [recommendedDates, setRecommendedDates] = useState<Set<string>>(
    new Set(),
  );
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // dateStr -> SlotData[]. Als een datum niet in deze map voorkomt, is die niet beschikbaar.
  const [slotsByDate, setSlotsByDateState] = useState<
    Record<string, SlotData[]>
  >({});
  const slotsByDateRef = useRef<Record<string, SlotData[]>>({});

  const setSlotsByDate = (
    updater:
      | Record<string, SlotData[]>
      | ((prev: Record<string, SlotData[]>) => Record<string, SlotData[]>),
  ) => {
    setSlotsByDateState((prev) => {
      const next =
        typeof updater === "function"
          ? (
              updater as (
                p: Record<string, SlotData[]>,
              ) => Record<string, SlotData[]>
            )(prev)
          : updater;
      slotsByDateRef.current = next;
      return next;
    });
  };

  const handleEditAddress = () => {
    setShowAddressForm(true);
    setAddressSubmitted(false);
    setNeedsAddressConfirmation(false);
    setError("");
    setFieldErrors({});
  };

  const calculateDuration = (): number => {
    const totalWindows = data.totalWindows;
    const hasInterior = data.interiorExteriorWindows > 0;

    if (!hasInterior && totalWindows <= 10) return 45;
    if (!hasInterior && totalWindows <= 30) return 60;
    if (!hasInterior && totalWindows > 30) return 90;
    if (hasInterior && totalWindows <= 10) return 60;
    if (hasInterior && totalWindows <= 20) return 90;
    if (hasInterior && totalWindows > 20) return 120;

    return 60;
  };

  const fetchAvailability = useCallback(
    async (addressConfirmed: boolean = false) => {
      setLoading(true);
      setError("");

      try {
        const addressParts = data.customerAddress.trim().split(/\s+/);
        const huisnummer = addressParts[addressParts.length - 1];
        const straat = addressParts.slice(0, -1).join(" ");

        const requestBody = {
          straat,
          huisnummer,
          postcode: data.customerPostalCode,
          stad: data.customerCity,
          duur_min: calculateDuration(),
          kanaal: "website",
          slot_limit: 6,
          horizon_days: 30,
          spread_days: 31,
          spread_total: 90,
          ...(addressConfirmed && { adres_bevestigd: true }),
        };

        console.log("🔍 Fetching availability with:", requestBody);

        const response = await fetch(
          "https://n8n.panora.be/webhook/planning/v2/beschikbaarheid",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          },
        );

        if (response.ok) {
          const result: AvailabilityResponse = await response.json();
          console.log("📅 API Response:", result);

          setAvailabilityData(result);

          const allSlots = [
            ...(result.slots || []),
            ...(result.meer_slots || []),
            ...(result.fallback || []),
          ];

          const recDates = new Set<string>();
          const initialSlotsByDate: Record<string, SlotData[]> = {};

          allSlots.forEach((slot) => {
            const dateStr = slot.datum || getDateStr(new Date(slot.start));
            if (!initialSlotsByDate[dateStr]) initialSlotsByDate[dateStr] = [];
            initialSlotsByDate[dateStr].push(slot);

            if (
              slot.recommended ||
              slot.badge === "Aanbevolen" ||
              slot.badge === "Past goed in de route"
            ) {
              recDates.add(dateStr);
            }
          });

          setRecommendedDates(recDates);
          setSlotsByDate(initialSlotsByDate);

          if (result.code === "ADDRESS_CONFIRMATION_REQUIRED") {
            setNeedsAddressConfirmation(true);
            setSuggestedAddress(result.adres_suggestie?.display_name || "");
          } else if (result.code === "ADDRESS_NOT_VERIFIED") {
            setError(
              result.boodschap ||
                "Adres niet gevonden. Controleer je gegevens.",
            );

            // Track address_check_failed event
            if (typeof window !== "undefined") {
              window.dataLayer = window.dataLayer || [];
              const eventData = {
                event: "address_check_failed",
                funnel_name: "calculator",
                postal_code: data.customerPostalCode,
                municipality: data.customerCity,
                reason: "not_found",
              };
              window.dataLayer.push(eventData);
              if (process.env.NODE_ENV === "development") {
                console.log("📊 GTM Event pushed:", eventData);
              }
            }
          } else if (
            result.code === "RANDGEBIED" ||
            result.code === "BUITEN_WERKGEBIED"
          ) {
            setError(result.boodschap || "");

            // Track address_check_failed event
            if (typeof window !== "undefined") {
              window.dataLayer = window.dataLayer || [];
              const eventData = {
                event: "address_check_failed",
                funnel_name: "calculator",
                postal_code: data.customerPostalCode,
                municipality: data.customerCity,
                reason: "outside_area",
              };
              window.dataLayer.push(eventData);
              if (process.env.NODE_ENV === "development") {
                console.log("📊 GTM Event pushed:", eventData);
              }
            }
          } else if (result.code?.startsWith("INVALID_")) {
            setError(
              result.boodschap || "Ongeldige invoer. Controleer je gegevens.",
            );
          } else if (!result.slots || result.slots.length === 0) {
            setError(
              result.boodschap || "Geen online boekbare momenten gevonden.",
            );

            // Track no_slots_available event
            if (typeof window !== "undefined") {
              window.dataLayer = window.dataLayer || [];
              const eventData = {
                event: "no_slots_available",
                funnel_name: "calculator",
                postal_code: data.customerPostalCode,
              };
              window.dataLayer.push(eventData);
              if (process.env.NODE_ENV === "development") {
                console.log("📊 GTM Event pushed:", eventData);
              }
            }
          } else {
            // Success case: slots are available
            // Track availability_shown event
            if (typeof window !== "undefined") {
              window.dataLayer = window.dataLayer || [];

              // Calculate days until first slot
              const firstSlotDate =
                allSlots.length > 0 ? new Date(allSlots[0].start) : null;
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const daysUntilFirst = firstSlotDate
                ? Math.ceil(
                    (firstSlotDate.getTime() - today.getTime()) /
                      (1000 * 60 * 60 * 24),
                  )
                : 0;

              const eventData = {
                event: "availability_shown",
                funnel_name: "calculator",
                slots_count: allSlots.length,
                days_until_first: daysUntilFirst,
              };
              window.dataLayer.push(eventData);
              if (process.env.NODE_ENV === "development") {
                console.log("📊 GTM Event pushed:", eventData);
              }
            }
          }
        } else {
          setError("Kon beschikbaarheid niet ophalen. Probeer het opnieuw.");

          // Track address_check_failed event for API error
          if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            const eventData = {
              event: "address_check_failed",
              funnel_name: "calculator",
              postal_code: data.customerPostalCode,
              municipality: data.customerCity,
              reason: "api_error",
            };
            window.dataLayer.push(eventData);
            if (process.env.NODE_ENV === "development") {
              console.log("📊 GTM Event pushed:", eventData);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching availability:", err);
        setError("Onze agenda laadt even niet — probeer opnieuw.");

        // Track address_check_failed event for network/API error
        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];
          const eventData = {
            event: "address_check_failed",
            funnel_name: "calculator",
            postal_code: data.customerPostalCode,
            municipality: data.customerCity,
            reason: "api_error",
          };
          window.dataLayer.push(eventData);
          if (process.env.NODE_ENV === "development") {
            console.log("📊 GTM Event pushed:", eventData);
          }
        }
      } finally {
        setLoading(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      data.customerAddress,
      data.customerPostalCode,
      data.customerCity,
      data.totalWindows,
      data.interiorExteriorWindows,
    ],
  );

  // Check if address is already filled (bv. gebruiker komt terug op deze stap)
  useEffect(() => {
    if (
      data.customerAddress &&
      data.customerPostalCode &&
      data.customerCity &&
      !addressSubmitted
    ) {
      setShowAddressForm(false);
      fetchAvailability(false);
      setAddressSubmitted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // NOTE: fetchSingleDateSlots en fetchMonthAvailability zijn verwijderd.
  // De planningsmotor API geeft nu met spread_days en spread_total parameters
  // alle beschikbare momenten voor de hele maand in één call terug.

  const handleDateSelect = (date: Date | undefined) => {
    console.log("📅 Date selected:", date);
    setSelectedDate(date);
    updateData({ selectedDate: date || null, selectedTime: "" });

    if (!date) {
      setAvailableSlots([]);
      setIsRecommendedDay(false);
      return;
    }

    const dateStr = getDateStr(date);
    const slots = slotsByDateRef.current[dateStr] || [];

    setAvailableSlots(slots);
    const hasRecommended =
      recommendedDates.has(dateStr) ||
      slots.some(
        (s) =>
          s.recommended ||
          s.badge === "Aanbevolen" ||
          s.badge === "Past goed in de route",
      );
    setIsRecommendedDay(hasRecommended);
  };

  const handleTimeSelect = (slot: SlotData) => {
    console.log("⏰ Time selected:", slot.tijd);

    updateData({
      selectedTime: slot.tijd,
      selectedSlotStart: slot.start,
      selectedSlotEnd: slot.end,
      selectedSlotTitel: slot.titel,
      selectedSlotBadge: slot.badge,
      klantPinLatitude: availabilityData?.klant_pin?.latitude,
      klantPinLongitude: availabilityData?.klant_pin?.longitude,
      klantPinPrecisie: availabilityData?.klant_pin?.precisie,
    });

    if (typeof window !== "undefined" && selectedDate) {
      window.dataLayer = window.dataLayer || [];

      // Calculate days_ahead (days between today and selected date)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(selectedDate);
      selected.setHours(0, 0, 0, 0);
      const daysAhead = Math.ceil(
        (selected.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );

      const eventData = {
        event: "appointment_select",
        funnel_name: "calculator",
        appointment_time: slot.tijd,
        appointment_day_of_week: selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
        }),
        days_ahead: daysAhead,
      };
      window.dataLayer.push(eventData);
      if (process.env.NODE_ENV === "development") {
        console.log("📊 GTM Event pushed:", eventData);
      }
    }
  };

  const handleRefresh = () => {
    if (addressSubmitted) {
      console.log("🔄 Manual refresh requested");
      fetchedMonthsRef.current = new Set();
      fetchAvailability(false);
    }
  };

  const handleAddressConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      setNeedsAddressConfirmation(false);
      fetchAvailability(true);
    } else {
      setNeedsAddressConfirmation(false);
      setShowAddressForm(true);
      setAvailabilityData(null);
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    if (!data.customerAddress.trim()) {
      errors.customerAddress = "Vul je straat en huisnummer in";
    }
    if (!data.customerPostalCode.trim()) {
      errors.customerPostalCode = "Vul je postcode in";
    }
    if (!data.customerCity.trim()) {
      errors.customerCity = "Vul je gemeente in";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    // Track address_check event
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      const eventData = {
        event: "address_check",
        funnel_name: "calculator",
        postal_code: data.customerPostalCode,
        municipality: data.customerCity,
      };
      window.dataLayer.push(eventData);
      if (process.env.NODE_ENV === "development") {
        console.log("📊 GTM Event pushed:", eventData);
      }
    }

    setShowAddressForm(false);
    setAddressSubmitted(true);
    fetchAvailability(false);
  };

  // Custom modifiers for calendar styling
  const modifiers = {
    recommended: (date: Date) => recommendedDates.has(getDateStr(date)),
    available: (date: Date) => {
      if (!isDateAvailable(date)) return false;
      const ds = getDateStr(date);
      if (recommendedDates.has(ds)) return false;
      const slots = slotsByDate[ds];
      // Alleen beschikbaar als de datum in het antwoord zit en slots heeft
      return Array.isArray(slots) && slots.length > 0;
    },
    fullyBooked: (date: Date) => {
      if (!isDateAvailable(date)) return false;
      const ds = getDateStr(date);
      if (recommendedDates.has(ds)) return false;
      const slots = slotsByDate[ds];
      // Volgeboekt als de datum WEL in het antwoord zit maar met 0 slots
      return Array.isArray(slots) && slots.length === 0;
    },
  };

  const modifiersClassNames = {
    recommended:
      "rounded-xl bg-emerald-400 text-white font-bold border-2 border-emerald-500 hover:bg-emerald-500 shadow-md",
    available:
      "rounded-xl bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200",
    fullyBooked:
      "rounded-xl bg-slate-100 text-slate-400 border border-slate-300 opacity-60",
  };

  const isDateDisabled = (date: Date) => {
    if (!isDateAvailable(date)) return true;
    const ds = getDateStr(date);
    const slots = slotsByDate[ds];
    // Een datum is alleen klikbaar als die in het antwoord zit met slots
    // Datums die niet in slotsByDate voorkomen zijn niet beschikbaar volgens de planningsmotor
    if (!slots) return true;
    return slots.length === 0;
  };

  return {
    // states
    loading,
    loadingTimeSlots,
    availabilityData,
    selectedDate,
    availableSlots,
    isRecommendedDay,
    error,
    needsAddressConfirmation,
    suggestedAddress,
    showAddressForm,
    addressSubmitted,
    fieldErrors,
    setFieldErrors,
    slotsByDate,
    currentMonth,

    // setters/handlers
    setCurrentMonth,
    handleDateSelect,
    handleTimeSelect,
    handleAddressSubmit,
    handleAddressConfirmation,
    handleRefresh,
    handleEditAddress,
    fetchAvailability,

    // afgeleide data voor de kalender
    modifiers,
    modifiersClassNames,
    isDateDisabled,
  };
}
