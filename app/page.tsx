import Image from "next/image";

import { Feed } from "@/components/ui/feed";

export default async function Home() {
 
  return (
    <div className="pt-8">
    <Feed/>
    </div>
  );
}
