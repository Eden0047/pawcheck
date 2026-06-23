"use client";

import { useState } from "react";
import { EMERGENCY_CONTACTS, VET_LISTINGS } from "@/lib/petData";

interface VetResult {
  name: string;
  address: string;
  distanceMiles: number;
  rating: number | null;
  userRatingsTotal: number | null;
  phone: string | null;
  openNow: boolean | null;
}

export default function EmergencySection() {
  const [postcode, setPostcode] = useState("");
  const [searchedPostcode, setSearchedPostcode] = useState("");
  const [results, setResults] = useState<VetResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const embedKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

  const handleSearch = async () => {
    const trimmed = postcode.trim();
    if (!trimmed) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/vets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postcode: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setResults(null);
      } else {
        setResults(data.results);
        setSearchedPostcode(trimmed);
      }
    } catch {
      setError("Couldn't reach the vet finder. Please try again.");
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="helpline" className="bg-softgreen px-6 py-12 scroll-mt-[72px]">
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

        <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
          <h3 className="font-nunito font-extrabold text-lg mb-3">📍 Find vets near you</h3>
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Enter your postcode, e.g. RG14 1AB"
              className="flex-1 min-w-[200px] border-[1.5px] border-gray-200 rounded-2xl px-4 py-3 text-sm"
            />
            <button
              onClick={handleSearch}
              disabled={loading || !postcode.trim()}
              className="font-nunito font-extrabold text-sm text-white bg-coral rounded-full px-6 py-3 disabled:opacity-50"
            >
              {loading ? "Searching…" : "Search"}
            </button>
          </div>
          {error && <p className="text-[#C0392B] text-sm mt-3 font-semibold">{error}</p>}
        </div>

        <div className="relative h-60 rounded-3xl overflow-hidden shadow-lg mb-8 bg-gradient-to-br from-teal to-softgreen">
          {embedKey ? (
            <iframe
              title="Vets near you map"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/search?key=${embedKey}&q=${encodeURIComponent(
                searchedPostcode ? `vets near ${searchedPostcode}, UK` : "vets near me, UK"
              )}`}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white font-nunito font-black text-lg px-6 py-3 rounded-full shadow-lg">
                📍 Vets near you
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {(results ?? VET_LISTINGS.map((v) => ({
            name: v.name,
            address: "",
            distanceMiles: parseFloat(v.distance),
            rating: null,
            userRatingsTotal: null,
            phone: v.phone,
            openNow: v.open,
          }))).map((v, i) => (
            <div key={`${v.name}-${i}`} className="flex-none w-60 bg-white rounded-2xl p-5 shadow-md">
              <div className="font-nunito font-extrabold text-base mb-1">{v.name}</div>
              <div className="text-muted text-sm mb-2">{v.distanceMiles} miles</div>
              <div className="text-[#FFB400] text-base mb-2">
                {v.rating != null ? `★ ${v.rating.toFixed(1)} (${v.userRatingsTotal ?? 0})` : "Rating unavailable"}
              </div>
              <div className="font-nunito font-bold text-sm text-coral mb-2.5">{v.phone || "No phone listed"}</div>
              {v.openNow != null && (
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: v.openNow ? "#E9FBF1" : "#FDECEC",
                    color: v.openNow ? "#1F8A5B" : "#C0392B",
                  }}
                >
                  {v.openNow ? "Open Now 🟢" : "Closed 🔴"}
                </span>
              )}
            </div>
          ))}
        </div>
        {!results && (
          <p className="text-center text-muted text-sm mt-4">
            Showing example vets. Enter your postcode above to find real vets near you.
          </p>
        )}
      </div>
    </section>
  );
}
