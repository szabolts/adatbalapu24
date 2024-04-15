"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { fetchUsers } from "@/lib/data";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { User } from "@/lib/types";
import { authenticate, updateProfile } from "@/lib/actions";
import { auth } from "@/auth";

interface ProfileFormProps {
  data: User[];
}
export default function ProfileForm({ data }: ProfileFormProps) {


  return (
    <form action={updateProfile}>
      <div className="grid gap-4">
        <div>
          <Label>First Name</Label>
          <Input type="text" name="firstname" defaultValue={data[0].KERESZTNEV} required/>
        </div>
        <div>
          <Label>Last Name</Label>
          <Input type="text" name="lastname"  defaultValue={data[0].VEZETEKNEV} required/>
        </div>
        <div>
          <Label>Username</Label>
          <Input type="text" name="username" defaultValue={data[0].FELHASZNALONEV} required/>
        </div>
        <div>
          <Label>Email</Label>
          <Input type="text" name="email"  defaultValue={data[0].EMAIL} required/>
        </div>
        <div>
          <Label>Type your password</Label>
          <Input type="password" name="password" placeholder="" required/>
        </div>
        <Button color="secondary" type="submit">Update profile</Button>
      </div>
    </form>
  );
}
