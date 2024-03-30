"use client"
import { Button } from "@nextui-org/react";
import { Input } from "@/components/ui/input2";
import { Label } from "@/components/ui/label2";
import { createUser } from "@/lib/actions"; 

export default function SignupForm() {
  return (
    <div className="grid gap-6">
      <form action={createUser}>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label className="" htmlFor="email">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Kis Ferenc"
                type="text"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label className="" htmlFor="email">
                Password
              </Label>
              <Input id="password" name="password" required type="password" />
            </div>
            <div className="grid gap-2">
              <Label className="" htmlFor="email">
                Confirm Password
              </Label>
              <Input id="password2" name="password2" type="password" required />
            </div>
          </div>
          <Button type="submit">Sign Up with Email</Button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button type="button">GitHub</Button> */}
    </div>
  );
}
