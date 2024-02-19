"use client"

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions";

export default function SignupForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="grid gap-6">
      <form action={dispatch}>
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
              />
            </div>
            <div className="grid gap-2">
              <Label className="" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                required
                type="password"
              />
            </div>
            <div className="flex items-end space-x-1">
              {errorMessage && (
                <>
                  {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </div>
          <LoginButton />
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button type="button">GitHub</Button>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" color="primary" fullWidth aria-disabled={pending}>
      Log in
    </Button>
  );
}