"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User } from "@/lib/types";
import {  updateProfile } from "@/lib/actions";
import { auth } from "@/auth";


interface ProfileFormProps {
  data: User[];
}
export default function ProfileForm({ data }: ProfileFormProps) {


  return (
    <form action={updateProfile}>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>First Name</Label>
          <Input type="text" name="firstname" defaultValue={data[0].KERESZTNEV} required/>
        </div>
        <div className="space-y-2" >
          <Label>Last Name</Label>
          <Input type="text" name="lastname"  defaultValue={data[0].VEZETEKNEV} required/>
        </div>
        </div>
        <div className="space-y-2">
          <Label>Username</Label>
          <Input type="text" name="username" defaultValue={data[0].FELHASZNALONEV} required/>
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="text" name="email"  defaultValue={data[0].EMAIL} required/>
        </div>
        <div className="space-y-2">
          <Label>Type your password</Label>
          <Input type="password" name="password" placeholder="TODO: password check" required/>
        </div>
        <Button className="mr-auto" color="secondary" type="submit">Update profile</Button>
      </div>
    </form>
  );
}
