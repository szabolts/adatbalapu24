"use client";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { dislike, getLikes, like } from "./actions";
import { useOptimistic } from "react";

export function Like({
  id,
  likes,
  isLiked,
  onLiked,
}: {
  id: number;
  likes: number;
  isLiked: boolean;
  onLiked: () => Promise<void>;
}) {
  const [optimisticState, setOptimisticLikes] = useOptimistic(
    { likes, isLiked },
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
      action={async () => {
        if (optimisticState.isLiked) {
          setOptimisticLikes("DISLIKE");
          await dislike(id);
        } else {
          setOptimisticLikes("LIKE");
          await like(id);
        }
        await onLiked();
      }}>
      <button type="submit" className="flex gap-1 items-center">
        {optimisticState.isLiked ? (
          <FaHeart size={20} color="red" />
        ) : (
          <FaRegHeart size={20} color="white" />
        )}
        <span>{optimisticState.likes}</span>
      </button>
    </form>
  );
}
