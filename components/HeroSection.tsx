export default function HeroSection() {
  return (
    <section className="max-w-[1080px] mx-auto px-6 pt-14 pb-10 text-center">
      <span className="inline-block bg-white border-[1.5px] border-softgreen text-[#1F8A5B] font-nunito font-extrabold text-xs px-4 py-1.5 rounded-full mb-5">
        🇬🇧 Currently available in the UK only
      </span>
      <h1 className="font-nunito font-black text-nearblack text-5xl sm:text-6xl leading-tight tracking-tight mb-3">
        PawCheck <span className="text-5xl">🐾</span>
      </h1>
      <p className="text-muted text-lg sm:text-xl font-medium max-w-xl mx-auto">
        Friendly pet health guidance for UK pet parents, gathered from trusted online sources — a helpful first step,
        never a substitute for your vet.
      </p>
    </section>
  );
}
