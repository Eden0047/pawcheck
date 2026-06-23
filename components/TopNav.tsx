"use client";

const NAV_ITEMS = [
  { label: "How it works", id: "how" },
  { label: "Check symptoms", id: "choose-pet" },
  { label: "Helpline", id: "helpline" },
  { label: "FAQ", id: "faq" },
];

export default function TopNav() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 64, behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-[#F2E4DA]">
      <div className="max-w-[1080px] mx-auto px-6 py-3.5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="font-nunito font-black text-xl">PawCheck 🐾</div>
          <span
            title="Currently available in the UK only"
            className="text-base leading-none"
            aria-label="UK only"
          >
            🇬🇧
          </span>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="font-nunito font-extrabold text-sm rounded-[20px] px-3.5 py-2 hover:bg-[#FFE3DC] transition-colors"
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
