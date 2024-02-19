import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Button as Button2 } from "@nextui-org/react";
import { auth } from "@/auth";
import LogInOutButton from "./login-out-button";

export default async function Header() {
  const session = await auth();
  console.log("session in header", session);
  return (
    <div className="border-b sticky top-0 z-40 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="flex h-16 items-center px-4 container mx-auto ">
        <Link href="/" passHref>
          <div className="flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6">
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <p className="text-xl font-bold duration:300 ">AdatbAlapu</p>
          </div>
        </Link>
        <div className="mx-4 flex items-center ">
        <Button2 href="/upload" variant="shadow" color="secondary" as={Link} className="font-bold">
          Upload
        </Button2>
        </div>
        <LogInOutButton session={session} />
        {/* <div className="ml-auto flex items-center space-x-4">
          <Button2 href="/login" color="default" as={Link}>
            Login
          </Button2>

          <Button2 href="/signup" color="primary" as={Link}>
            Sign up
          </Button2>
        </div> */}
      </div>
    </div>
  );
}
