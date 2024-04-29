import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { logOut } from "@/lib/actions";
import { fetchUserByEmail } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

export async function NavUserComponent({
  session,
}: {
  session?: Session | null;
}) {
  console.log("----session", session?.user?.email);
  const user = await fetchUserByEmail();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage alt={user[0].FELHASZNALONEV} />
          <AvatarFallback  >{user[0].FELHASZNALONEV[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>{user[0].FELHASZNALONEV}</span>
            <span className="text-sm font-normal text-muted-foreground">
              {user[0].EMAIL}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/profile">
              <FaRegUser className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/dashboard">
              <MdOutlineSpaceDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form action={logOut}>
            <Button variant="ghost" type="submit" className="p-0 m-0 h-auto">
              <LogOut className="mr-2 h-4 w-4" />
              <span className="">Log out</span>
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LogoutButton() {
  return (
    <form action={logOut}>
      <Button type="submit" color="danger">
        Sign out
      </Button>
    </form>
  );
}
