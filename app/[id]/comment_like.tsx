"use client";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { dislikeComment, like, likeComment } from "./actions"; 
import { useOptimistic } from "react";

export function LikeComment({
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
          await dislikeComment(id);
        } else {
          setOptimisticLikes("LIKE");
          await likeComment(id);
        }
        await onLiked();
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
