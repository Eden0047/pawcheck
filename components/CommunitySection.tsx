"use client";

import { useState } from "react";
import { Comment, INITIAL_COMMENTS } from "@/lib/petData";

const PET_OPTIONS = ["🐶 Dog", "🐱 Cat", "🐰 Rabbit", "🐦 Bird", "🐠 Fish", "🐹 Hamster"];

export default function CommunitySection() {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [commentText, setCommentText] = useState("");
  const [commentPet, setCommentPet] = useState(PET_OPTIONS[0]);
  const [commentMsg, setCommentMsg] = useState("");
  const [rating, setRating] = useState(0);

  const submitComment = () => {
    const t = commentText.trim();
    if (!t) {
      setCommentMsg("Please write something first 🐾");
      return;
    }
    const avatar = commentPet.split(" ")[0];
    setComments((prev) => [{ avatar, user: "@you", pet: commentPet, likes: 0, text: t }, ...prev]);
    setCommentText("");
    setCommentMsg("Thanks for sharing! 🎉");
  };

  return (
    <section className="max-w-[900px] mx-auto px-6 py-14">
      <h2 className="font-nunito font-black text-3xl sm:text-4xl text-center mb-9">
        What other pet parents are saying 💬
      </h2>

      <div className="grid gap-4 mb-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
        {comments.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-3xl">{c.avatar}</span>
              <div>
                <div className="font-nunito font-extrabold text-sm">{c.user}</div>
                <span className="text-xs font-bold bg-[#E9FBF8] text-[#0F8B80] px-2.5 py-0.5 rounded-full">
                  {c.pet}
                </span>
              </div>
            </div>
            <p className="mb-3 leading-relaxed text-sm">{c.text}</p>
            <div className="font-bold text-muted text-sm">👍 {c.likes}</div>
          </div>
        ))}
      </div>

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
            className="font-nunito font-black text-base text-white bg-coral rounded-full px-7 py-3"
          >
            Share 🐾
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
              onClick={() => setRating(n)}
              className="text-4xl leading-none cursor-pointer"
              style={{ color: n <= rating ? "#FF8C00" : "rgba(0,0,0,.18)" }}
            >
              ★
            </span>
          ))}
        </div>
        <div className="font-nunito font-extrabold text-base">★ 4.8 / 5 from 1,243 pet parents</div>
      </div>
    </section>
  );
}
