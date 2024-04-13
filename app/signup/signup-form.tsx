import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@/components/ui/input2";
import { Label } from "@/components/ui/label2";
import toast, { Toaster } from "react-hot-toast";
import { createUser } from "@/lib/actions";
import { redirect } from "next/dist/server/api-utils";
import { Router, useRouter } from "next/router";




const SignupForm = () => {
  const router = useRouter();

  const handleRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await createUser(formData);
    if (result?.error) {
  if(result?.error){
    toast.error("Sikertelen regisztracio")
  }else{
    toast.success("Sikeres Regisztracio")
  }
}

}

  return (
    <div className="grid gap-4">
<form onSubmit={(event) => handleRegistration(event)}>
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
            <Label className="" htmlFor="name">
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
            <Label className="" htmlFor="password">
              Password
            </Label>
            <Input id="password" name="password" required type="password" />
          </div>
          <div className="grid gap-2">
            <Label className="" htmlFor="password2">
              Confirm Password
            </Label>
            <Input id="password2" name="password2" type="password" required />
          </div>
          <Button type="submit">Sign Up with Email</Button>
    
          </form>
    </div>
  );
};

export default SignupForm;
