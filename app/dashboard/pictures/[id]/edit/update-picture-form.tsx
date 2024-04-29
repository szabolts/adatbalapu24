"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updatePictureById } from "../../actions";
import { useFormState } from "react-dom";
import { Kep, KategoriaEsElsoKep } from "@/lib/types";

export function UpdatePictureForm({
  kep,
  kategoriak,
  id,
}: {
  kep: Kep[];
  kategoriak: KategoriaEsElsoKep[];
  id: string;
}) {
  const updatePictureWithId = updatePictureById.bind(null, id);
  console.log("Kepkategoria: ", kep[0]);
  return (
    <form action={updatePictureWithId}>
      <div className="flex flex-col ">
        <span className="text-xl font-bold tracking-tight">
          Update <span className="text-2xl text-secondary">{kep[0].CIM}</span>{" "}
          details
        </span>
        <Separator className="my-4" />
      </div>
      <div className="grid gap-4">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              defaultValue={kep[0].CIM}
              required
              aria-describedby="firstname-error"
            />
          </div>
          <div className="space-y-2">
            <Label>Path</Label>
            <Input
              type="text"
              name="path"
              defaultValue={kep[0].FAJL_ELERESI_UTVONAL}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>prompt</Label>
          <Textarea name="prompt" defaultValue={kep[0].PROMPT} required />
        </div>
        <Select name="kategoria" defaultValue={kep[0].KATEGORIA_NEV}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {kategoriak.map((kategoria, index) => (
              <SelectItem key={index} value={kategoria.KATEGORIANEV}>
                {kategoria.KATEGORIANEV}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="mr-auto" color="secondary" type="submit">
          Update profile
        </Button>
      </div>
    </form>
  );
}
