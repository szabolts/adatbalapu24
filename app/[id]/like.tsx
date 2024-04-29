"use client";
import { FaRegHeart } from "react-icons/fa";
import { dislike, getLikes, like } from "./actions";
import { useEffect, useState } from "react";


export function Like({ id, likeCount }: { id: number; likeCount: number }) {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    async function fetchLikes() {
      const { likes: fetchedLikes, isLiked: fetchedIsLiked } = await getLikes(id);
      setLikes(fetchedLikes);
      setIsLiked(fetchedIsLiked);
    }
    fetchLikes();
  }, [id]);

  const handleLike = async () => {
    if (isLiked !== undefined) {
      if (isLiked) {
        await dislike(id);
        setLikes(prevLikes => prevLikes - 1);
        setIsLiked(false);
      } else {
        await like(id);
        setLikes(prevLikes => prevLikes + 1);
        setIsLiked(true);
      }
    // Az állapotok frissítése a like vagy dislike művelet után
      await updateLikesState();
    }
  };

  const updateLikesState = async () => {
    const { likes: updatedLikes, isLiked: updatedIsLiked } = await getLikes(id);
    setLikes(updatedLikes);
    setIsLiked(updatedIsLiked);
  };

  return (
    <div onClick={handleLike}>
      <FaRegHeart size={20} color={isLiked ? "red" : "black"} />
      <span>{likes}</span>
    </div>
  );
}