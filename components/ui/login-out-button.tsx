
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { Session } from "next-auth";
import { NavUserComponent }  from "@/components/ui/nav-user-component";

export default function LogInOutButton ({ session }: { session?: Session | null }) {
    console.log("----session", session?.user?.email);
    return session ? (
        <div className="ml-auto flex items-center gap-4">
        <NavUserComponent/>
        </div>
    ): (
        <div className="ml-auto flex items-center space-x-4">
          <Button href="/login" color="default" as={Link}>
            Login
          </Button>

          <Button href="/signup" color="primary" as={Link}>
            Sign up
          </Button>
        </div>
    );
}
