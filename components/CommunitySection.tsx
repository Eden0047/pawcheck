"use client";

import { useEffect, useRef, useState } from "react";
import { Comment } from "@/lib/petData";

const PET_OPTIONS = ["🐶 Dog", "🐱 Cat", "🐰 Rabbit", "🐦 Bird", "🐠 Fish", "🐹 Hamster"];
const ROTATE_MS = 5000;

export default function CommunitySection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [commentPet, setCommentPet] = useState(PET_OPTIONS[0]);
  const [commentMsg, setCommentMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState({ average: 0, count: 0 });
  const [myRating, setMyRating] = useState(0);
  const hovering = useRef(false);

  useEffect(() => {
    fetch("/api/comments")
      .then((r) => r.json())
      .then((d) => setComments(d.comments || []))
      .catch(() => {});

    fetch("/api/rating")
      .then((r) => r.json())
      .then((d) => setRating({ average: d.average, count: d.count }))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (comments.length < 2) return;
    const interval = setInterval(() => {
      if (!hovering.current) {
        setActiveIndex((i) => (i + 1) % comments.length);
      }
    }, ROTATE_MS);
    return () => clearInterval(interval);
  }, [comments.length]);

  const goTo = (index: number) => {
    if (comments.length === 0) return;
    setActiveIndex((index + comments.length) % comments.length);
  };

  const submitComment = async () => {
    const t = commentText.trim();
    if (!t) {
      setCommentMsg("Please write something first 🐾");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: t, pet: commentPet }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCommentMsg(data.error || "Something went wrong.");
        return;
      }
      setComments((prev) => [data.comment, ...prev]);
      setActiveIndex(0);
      setCommentText("");
      setCommentMsg("Thanks for sharing! 🎉");
    } catch {
      setCommentMsg("Couldn't save your comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const submitRating = async (stars: number) => {
    setMyRating(stars);
    try {
      const res = await fetch("/api/rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stars }),
      });
      const data = await res.json();
      if (res.ok) setRating({ average: data.average, count: data.count });
    } catch {
      // local star fill still reflects the click even if the save failed
    }
  };

  return (
    <section className="max-w-[900px] mx-auto px-6 py-14">
      <h2 className="font-nunito font-black text-3xl sm:text-4xl text-center mb-9">
        What other pet parents are saying 💬
      </h2>

      {comments.length > 0 ? (
        <div
          onMouseEnter={() => (hovering.current = true)}
          onMouseLeave={() => (hovering.current = false)}
          className="mb-5"
        >
          <div className="flex items-center justify-center gap-3 max-w-lg mx-auto">
            {comments.length > 1 && (
              <button
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Previous comment"
                className="flex-none w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-coral font-bold hover:bg-[#FFE3DC]"
              >
                ‹
              </button>
            )}

            <div className="flex-1 min-w-0 overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {comments.map((c) => (
                  <div key={c.id} className="w-full flex-none bg-white rounded-xl p-5 shadow-md">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-2xl">{c.avatar}</span>
                      <div>
                        <div className="font-nunito font-extrabold text-sm">{c.user}</div>
                        <span className="text-[11px] font-bold bg-[#E9FBF8] text-[#0F8B80] px-2 py-0.5 rounded-full">
                          {c.pet}
                        </span>
                      </div>
                    </div>
                    <p className="mb-2.5 leading-relaxed text-sm">{c.text}</p>
                    <div className="font-bold text-muted text-sm">👍 {c.likes}</div>
                  </div>
                ))}
              </div>
            </div>

            {comments.length > 1 && (
              <button
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next comment"
                className="flex-none w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-coral font-bold hover:bg-[#FFE3DC]"
              >
                ›
              </button>
            )}
          </div>

          {comments.length > 1 && (
            <div className="flex gap-1.5 justify-center mt-4">
              {comments.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => goTo(i)}
                  aria-label={`Show comment ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === activeIndex ? "bg-coral" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-muted mb-5">Loading comments…</p>
      )}

      <div className="bg-white rounded-3xl p-7 shadow-md mb-10">
        <h3 className="font-nunito font-black text-lg mb-4">Leave a comment</h3>
        <textarea
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
            setCommentMsg("");
          }}
          placeholder="Share your experience..."
          className="w-full min-h-[80px] border-[1.5px] border-gray-200 rounded-2xl p-3.5 text-sm resize-vertical mb-3.5"
        />
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={commentPet}
            onChange={(e) => setCommentPet(e.target.value)}
            className="border-[1.5px] border-gray-200 rounded-2xl px-4 py-3 text-sm bg-white"
          >
            {PET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <button
            onClick={submitComment}
            disabled={submitting}
            className="font-nunito font-black text-base text-white bg-coral rounded-full px-7 py-3 disabled:opacity-50"
          >
            {submitting ? "Sharing…" : "Share 🐾"}
          </button>
          <span className="text-[#1F8A5B] font-bold">{commentMsg}</span>
        </div>
      </div>

      <div className="bg-softyellow rounded-3xl p-7 text-center">
        <h3 className="font-nunito font-black text-xl mb-4">How helpful was PawCheck?</h3>
        <div className="flex gap-2 justify-center mb-3.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => submitRating(n)}
              className="text-4xl leading-none cursor-pointer"
              style={{ color: n <= myRating ? "#FF8C00" : "rgba(0,0,0,.18)" }}
            >
              ★
            </span>
          ))}
        </div>
        <div className="font-nunito font-extrabold text-base">
          {rating.count > 0
            ? `★ ${rating.average.toFixed(1)} / 5 from ${rating.count.toLocaleString()} pet parents`
            : "Be the first to rate PawCheck"}
        </div>
      </div>
    </section>
  );
}
