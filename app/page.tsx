import Image from "next/image";

import { Feed } from "@/components/ui/feed";
import { Toaster } from "react-hot-toast";

export default async function Home() {
 
  return (
    <div className="py-8">
    <Feed/>
    <Toaster/>

    </div>
  );
}
