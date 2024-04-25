import { fetchUserById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "@/lib/types";
import { BackButton } from "./back-button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { UpdateProfileForm } from "./update-profile-form";


export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const user = await fetchUserById(id);
  
  // console.log("User: ", user);
  if (!user) {
    notFound();
  }

  return (
    <div className=" w-full max-w-md">
      <BackButton />
      <div className=" space-y-8">
        <UpdateProfileForm user={user} id={id} />
        <form action="">
          <div className="flex flex-col ">
            <span className="text-xl font-bold tracking-tight">
              Profile settings
            </span>
            <Separator className="my-4" />
          </div>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>New password</Label>
              <Input type="password" name="new-password" required />
            </div>
            <div className="space-y-2">
              <Label>New password</Label>
              <Input type="password" name="confirm-new-password" required />
            </div>
            <Button className="mr-auto" color="secondary" type="submit">
              Update password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
