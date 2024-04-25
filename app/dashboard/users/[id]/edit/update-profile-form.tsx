"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProfileById } from "../../actions";
import { useFormState } from "react-dom";
import { User } from "@/lib/types";

export function UpdateProfileForm({ user, id }: { user: User[]; id: string }) {
    const updateUserWithId = updateProfileById.bind(null, id)

  return (
    <form action={updateUserWithId}>
      <div className="flex flex-col ">
        <span className="text-xl font-bold tracking-tight">
          Update{" "}
          <span className="text-2xl text-secondary">
            {user[0].FELHASZNALONEV}
          </span>{" "}
          profile details
        </span>
        <Separator className="my-4" />
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstname"
              defaultValue={user[0].KERESZTNEV}
              required
              aria-describedby="firstname-error"
            />
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastname"
              defaultValue={user[0].VEZETEKNEV}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            defaultValue={user[0].FELHASZNALONEV}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="text"
            name="email"
            defaultValue={user[0].EMAIL}
            required
          />
        </div>
        <Select name="role" defaultValue={user[0].ROLE}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
        <Button className="mr-auto" color="secondary" type="submit">
          Update profile
        </Button>
      </div>
    </form>
  );
}
