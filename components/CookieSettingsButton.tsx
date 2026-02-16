"use client";

export default function CookieSettingsButton() {
    const handleClick = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('cookie-consent');
            window.location.reload();
        }
    };

    return (
        <button
            onClick={handleClick}
            className="px-6 py-3 bg-gradient-to-r from-[#044D8E] to-[#0F61AC] text-white rounded-lg font-medium hover:shadow-lg transition-all"
        >
            Cookie-instellingen wijzigen
        </button>
    );
}
