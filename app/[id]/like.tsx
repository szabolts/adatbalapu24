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
  // const [likes, setLikes] = useState<number>(0);
  // const [isLiked, setIsLiked] = useState<boolean | undefined>(undefined);
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

  // useEffect(() => {
  //   async function fetchLikes() {
  //     const { likes: fetchedLikes, isLiked: fetchedIsLiked } = await getLikes(id);
  //     setLikes(fetchedLikes);
  //     setIsLiked(fetchedIsLiked);
  //   }
  //   fetchLikes();
  // }, [id]);

  // const handleLike = async () => {
  //   if (isLiked !== undefined) {
  //     if (isLiked) {
  //       await dislike(id);
  //       setLikes(prevLikes => prevLikes - 1);
  //       setIsLiked(false);
  //     } else {
  //       await like(id);
  //       setLikes(prevLikes => prevLikes + 1);
  //       setIsLiked(true);
  //     }
  //   // Az állapotok frissítése a like vagy dislike művelet után
  //     await updateLikesState();
  //   }
  // };

  // const updateLikesState = async () => {
  //   const { likes: updatedLikes, isLiked: updatedIsLiked } = await getLikes(id);
  //   setLikes(updatedLikes);
  //   setIsLiked(updatedIsLiked);
  // };

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
