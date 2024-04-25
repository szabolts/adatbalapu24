"use client";
import { FaRegHeart } from "react-icons/fa";
import { like } from "./actions";

export function Like({ id }: { id: number }) {
  return <FaRegHeart size={20} onClick={() => like(id)} />;
}
