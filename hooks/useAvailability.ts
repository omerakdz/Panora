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
  const [loadingMonth, setLoadingMonth] = useState(false);
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

  // dateStr -> SlotData[]. Ontbrekende key = nog niet opgehaald (dus disabled tot bekend).
  const [slotsByDate, setSlotsByDateState] = useState<
    Record<string, SlotData[]>
  >({});
  const slotsByDateRef = useRef<Record<string, SlotData[]>>({});
  const fetchedMonthsRef = useRef<Set<string>>(new Set());

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
          fetchedMonthsRef.current = new Set();

          if (result.code === "ADDRESS_CONFIRMATION_REQUIRED") {
            setNeedsAddressConfirmation(true);
            setSuggestedAddress(result.adres_suggestie?.display_name || "");
          } else if (result.code === "ADDRESS_NOT_VERIFIED") {
            setError(
              result.boodschap ||
                "Adres niet gevonden. Controleer je gegevens.",
            );
          } else if (
            result.code === "RANDGEBIED" ||
            result.code === "BUITEN_WERKGEBIED"
          ) {
            setError(result.boodschap || "");
          } else if (result.code?.startsWith("INVALID_")) {
            setError(
              result.boodschap || "Ongeldige invoer. Controleer je gegevens.",
            );
          } else if (!result.slots || result.slots.length === 0) {
            setError(
              result.boodschap || "Geen online boekbare momenten gevonden.",
            );
          }
        } else {
          setError("Kon beschikbaarheid niet ophalen. Probeer het opnieuw.");
        }
      } catch (err) {
        console.error("Error fetching availability:", err);
        setError("Onze agenda laadt even niet — probeer opnieuw.");
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

  const fetchSingleDateSlots = useCallback(
    async (date: Date): Promise<SlotData[]> => {
      const dateStr = getDateStr(date);
      try {
        const timestamp = new Date().getTime();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(
          `/api/availability?date=${dateStr}&t=${timestamp}`,
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          console.error("Failed to fetch availability for", dateStr);
          return [];
        }

        const result = await response.json();

        const googleSlots: SlotData[] = (result.slots || []).map(
          (timeStr: string) => {
            const [hours, minutes] = timeStr.split(":");
            const startDate = new Date(date);
            startDate.setHours(parseInt(hours), parseInt(minutes), 0);
            const endDate = new Date(startDate);
            endDate.setMinutes(endDate.getMinutes() + 60);

            return {
              start: startDate.toISOString(),
              end: endDate.toISOString(),
              datum: dateStr,
              titel: timeStr,
              tijd: timeStr,
              badge: "",
              uitleg: "",
              recommended: false,
            };
          },
        );

        return googleSlots;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          console.error("⏱️ Timeout bij ophalen beschikbaarheid voor", dateStr);
        } else {
          console.error(
            "❌ Fout bij ophalen beschikbaarheid voor",
            dateStr,
            err,
          );
        }
        return [];
      }
    },
    [],
  );

  const fetchMonthAvailability = useCallback(
    async (monthDate: Date) => {
      const monthKey = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}`;
      if (fetchedMonthsRef.current.has(monthKey)) return;
      fetchedMonthsRef.current.add(monthKey);
      setLoadingMonth(true);

      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();
      const lastDay = new Date(year, month + 1, 0).getDate();

      const datesToFetch: Date[] = [];
      for (let day = 1; day <= lastDay; day++) {
        const d = new Date(year, month, day);
        if (!isDateAvailable(d)) continue;
        const ds = getDateStr(d);
        if (slotsByDateRef.current[ds] !== undefined) continue;
        datesToFetch.push(d);
      }

      if (datesToFetch.length === 0) return;

      const results = await Promise.allSettled(
        datesToFetch.map(async (d) => ({
          dateStr: getDateStr(d),
          slots: await fetchSingleDateSlots(d),
        })),
      );

      setSlotsByDate((prev) => {
        const next = { ...prev };
        results.forEach((res) => {
          if (res.status === "fulfilled") {
            next[res.value.dateStr] = res.value.slots;
          }
        });
        return next;
      });
      setLoadingMonth(false);
    },
    [fetchSingleDateSlots],
  );

  // Zodra we adresdata hebben (nieuw of ververst) of de gebruiker navigeert naar
  // een andere kalendermaand: haal de volledige maand vooraf op.
  useEffect(() => {
    if (!availabilityData) return;
    fetchMonthAvailability(currentMonth);
  }, [availabilityData, currentMonth, fetchMonthAvailability]);

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
    const knownSlots = slotsByDateRef.current[dateStr];

    const applySlots = (slots: SlotData[]) => {
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
      setLoadingTimeSlots(false);
    };

    if (knownSlots !== undefined) {
      applySlots(knownSlots);
    } else {
      // Veiligheidsnet: zou niet mogen voorkomen omdat onbekende dagen disabled zijn.
      setLoadingTimeSlots(true);
      fetchSingleDateSlots(date).then((slots) => {
        setSlotsByDate((prev) => ({ ...prev, [dateStr]: slots }));
        applySlots(slots);
      });
    }
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
      const eventData = {
        event: "appointment_select",
        funnel_name: "calculator",
        appointment_time: slot.tijd,
        appointment_day_of_week: selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
        }),
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
    setShowAddressForm(false);
    setAddressSubmitted(true);
    fetchAvailability(false);
  };

  // Custom modifiers for calendar styling — rechtstreeks gekoppeld aan slotsByDate
  const modifiers = {
    recommended: (date: Date) => recommendedDates.has(getDateStr(date)),
    available: (date: Date) => {
      if (!isDateAvailable(date)) return false;
      const ds = getDateStr(date);
      if (recommendedDates.has(ds)) return false;
      const slots = slotsByDate[ds];
      return !!slots && slots.length > 0;
    },
    fullyBooked: (date: Date) => {
      if (!isDateAvailable(date)) return false;
      const ds = getDateStr(date);
      if (recommendedDates.has(ds)) return false;
      const slots = slotsByDate[ds];
      return !!slots && slots.length === 0;
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
    // Onbekende dagen (nog niet opgehaald) mogen niet als grijs/disabled tonen.
    // Pas disabled wanneer we zeker weten dat er 0 slots zijn.
    if (slots === undefined) return false;
    return slots.length === 0;
  };

  return {
    // states
    loading,
    loadingTimeSlots,
    loadingMonth,
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
