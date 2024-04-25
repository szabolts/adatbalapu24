import { fetchUserByEmail } from "@/lib/data";
import { User } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function PasswordChanePage() {
  const data: User[] | undefined = await fetchUserByEmail();
  // console.log(data);

  return (
    <div className="flex flex-row">
      <div className=" w-full max-w-md ">
        <div className="flex flex-col ">
          <span className="text-xl font-bold tracking-tight">
            Change password
          </span>
          <p className="text-sm text-muted-foreground">
            Update your password here.
          </p>
          <Separator className="my-6" />
        </div>
        <div className="space-y-4">
          <form >
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Old password</Label>
                <Input
                  type="password"
                  name="old-password"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>New password</Label>
                <Input
                  type="password"
                  name="new-password"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Confirm new password</Label>
                <Input
                  type="password"
                  name="confirm-new-password"
                  required
                />
              </div>
              <Button className="mr-auto" color="secondary" type="submit">
                Update password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
