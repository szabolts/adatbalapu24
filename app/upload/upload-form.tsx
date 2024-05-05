"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@nextui-org/react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectSection, SelectItem, Chip } from "@nextui-org/react";

import { upload } from "@/lib/actions";
import { KategoriaEsElsoKep } from "@/lib/types";
import React from "react";

export function UploadForm({
  kategoriak,
}: {
  kategoriak: KategoriaEsElsoKep[];
}) {
  return (
    <form action={upload}>
      <div className="grid gap-4">
        <div>
          <Label htmlFor="file">Choose a file</Label>
          <Input type="file" name="image" required />
        </div>
        <div>
          <Label htmlFor="file">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="80s Trance Poster Synth Dragon"
            required
          />
        </div>
        <div>
          <Label htmlFor="kategoria">Category</Label>
          {/* <Select name="kategoria">
          <SelectTrigger className="w-[180px]" >
            <SelectValue placeholder="Select a category"/>
          </SelectTrigger>
          <SelectContent >
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
        </div>
        {/* <MultipleSelectorControlled data={kategoriak} />   */}

        <div>
          <Label htmlFor="file">Prompt</Label>
          <Textarea
            name="prompt"
            required
            placeholder="synth dragon in the style of minimalist 80s trance poster illustration, neon, bold, color-blocked compositions, geometric, faded"
          />
        </div>
        <Button color="secondary" type="submit">
          Upload
        </Button>
      </div>
    </form>
  );
}
