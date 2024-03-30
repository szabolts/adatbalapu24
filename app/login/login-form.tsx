"use client";

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { Input } from "@/components/ui/input2";
import { Label } from "@/components/ui/label2";
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
              <Input id="password" name="password" required type="password" />
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
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent  h-[1px] w-full absolute inset-1.5">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-lg h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit">
        Sign up
        <BottomGradient />
      </button>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className=" bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-lg h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
      type="submit">
      Login
      <BottomGradient />
    </button>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
