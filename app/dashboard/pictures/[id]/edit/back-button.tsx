"use client";
import { FaChevronLeft } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="h-7 w-7 mb-2"
      onClick={() => router.push("/dashboard/pictures")}>
      <FaChevronLeft className="h-4 w-4" />
      <span className="sr-only">Back</span>
    </Button>
  );
}
