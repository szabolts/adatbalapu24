"use client";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { dislikeComment, likeComment } from "./actions"; // Figyeld, hogy az akciók mások lehetnek
import { useOptimistic } from "react";

export function LikeComment({
  id,
}: {
  id: number;
}) {
  const [optimisticState, setOptimisticLikes] = useOptimistic(
    { likes: 0, isLiked: false }, // Kezdeti állapot a lájkokhoz
    (state, action: "LIKE" | "DISLIKE") => {
      if (action === "LIKE") {
        return { likes: state.likes + 1, isLiked: true };
      } else {
        return { likes: state.likes - 1, isLiked: false };
      }
    }
  );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault(); // Ne küldje el az űrlapot
        if (optimisticState.isLiked) {
          setOptimisticLikes("DISLIKE");
          await dislikeComment(id);
        } else {
          setOptimisticLikes("LIKE");
          await likeComment(id);
        }
        // Ide írd be a további teendőket, ha szükséges
      }}>
      <button type="submit" className="flex gap-1 items-center">
        {optimisticState.isLiked ? (
          <FaHeart size={15} color="red" />
        ) : (
          <FaRegHeart size={15} color="white" />
        )}
        <span>{optimisticState.likes}</span>
      </button>
    </form>
  );
}
