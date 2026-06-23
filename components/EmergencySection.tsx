import { EMERGENCY_CONTACTS, VET_LISTINGS } from "@/lib/petData";

export default function EmergencySection() {
  return (
    <section className="bg-softgreen px-6 py-12">
      <div className="max-w-[980px] mx-auto">
        <h2 className="font-nunito font-black text-[#1B5E45] text-3xl sm:text-4xl text-center mb-8">
          Need urgent help? 🚨
        </h2>

        <div className="grid gap-4 mb-9" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {EMERGENCY_CONTACTS.map((e) => (
            <div key={e.name} className="bg-white border-2 border-coral rounded-2xl p-5 text-center shadow-md">
              <div className="font-nunito font-extrabold text-base mb-2">📞 {e.name}</div>
              <div className="font-nunito font-black text-xl text-coral">{e.phone}</div>
            </div>
          ))}
        </div>

        <div className="relative h-60 rounded-3xl overflow-hidden shadow-lg mb-8 bg-gradient-to-br from-teal to-softgreen">
          <div className="absolute rounded-full bg-coral" style={{ top: "30%", left: "22%", width: 14, height: 14, boxShadow: "0 0 0 6px rgba(255,107,107,.25)" }} />
          <div className="absolute rounded-full bg-white" style={{ top: "62%", left: "38%", width: 12, height: 12 }} />
          <div className="absolute rounded-full bg-white" style={{ top: "45%", left: "72%", width: 12, height: 12 }} />
          <div className="absolute rounded-full bg-white" style={{ top: "24%", left: "60%", width: 10, height: 10 }} />
          <div className="absolute rounded-full bg-white" style={{ top: "74%", left: "78%", width: 10, height: 10 }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white font-nunito font-black text-lg px-6 py-3 rounded-full shadow-lg">
              📍 Vets near you
            </span>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {VET_LISTINGS.map((v) => (
            <div key={v.name} className="flex-none w-60 bg-white rounded-2xl p-5 shadow-md">
              <div className="font-nunito font-extrabold text-base mb-1">{v.name}</div>
              <div className="text-muted text-sm mb-2">{v.distance}</div>
              <div className="text-[#FFB400] text-base mb-2">{v.stars}</div>
              <div className="font-nunito font-bold text-sm text-coral mb-2.5">{v.phone}</div>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{
                  background: v.open ? "#E9FBF1" : "#FDECEC",
                  color: v.open ? "#1F8A5B" : "#C0392B",
                }}
              >
                {v.open ? "Open Now 🟢" : "Closed 🔴"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
