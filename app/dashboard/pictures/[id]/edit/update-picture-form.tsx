"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { updatePictureById } from "../../actions";
import { useFormState } from "react-dom";
import { Kep, KategoriaEsElsoKep, KepKategoriak } from "@/lib/types";
import { Select, SelectSection, SelectItem, Chip } from "@nextui-org/react";

export function UpdatePictureForm({
  kep,
  kategoriak,
  id,
  kepKategoriak,
}: {
  kep: Kep[];
  kategoriak: KategoriaEsElsoKep[];
  id: string;
  kepKategoriak: KepKategoriak[];
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
        {/* <Select name="kategoria" defaultValue={kep[0].KATEGORIA_NEV}>
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
        </Select> */}
        <Select
            aria-label="Select a category"
            selectionMode="multiple"
            isMultiline={true}
            size="md"
            name="kategoria"
            items={kategoriak.filter(
              (kategoria) =>
                kategoria.KATEGORIAID === null ||
                kategoria.KATEGORIAID === kategoria.KATEGORIAID
            )}
            defaultSelectedKeys={
              kepKategoriak
                .filter((k) => k.KATEGORIAID === k.KATEGORIAID)
                .map((k) => k.KATEGORIAID.toString()) 
            }
            placeholder="Select categories..."
            classNames={{
              base: "max-w-sm",
              trigger: "min-h-unit-12 py-2",
            }}
            renderValue={(kategoriak) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {kategoriak.map((kategoria) => (
                    <Chip color="primary" size="sm" key={kategoria.key}>
                      {kategoria.data?.KATEGORIANEV}
                    </Chip>
                  ))}
                </div>
              );
            }}>
            {(kategoriak) => (
              <SelectItem
                key={kategoriak.KATEGORIAID.toString()}
                value={kategoriak.KATEGORIAID.toString()}>
                {kategoriak.KATEGORIANEV}
              </SelectItem>
            )}
          </Select>
        <Button className="mr-auto" color="secondary" type="submit">
          Update profile
        </Button>
      </div>
    </form>
  );
}
