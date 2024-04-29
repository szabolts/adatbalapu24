"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { EditPicture, DeletePicture } from "@/components/ui/pictures/buttons";
import { Kep } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export const columns: ColumnDef<Kep>[] = [
  {
    accessorKey: "KEPID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    id: "pictures",
    cell: ({ row }) => {
      const pic = row.original;

      return (
        <Image
          src={pic.FAJL_ELERESI_UTVONAL}
          alt={pic.CIM}
          width="700"
          height="700"
        />
      );
    },
  },
  {
    accessorKey: "CIM",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "FELTOLTES_DATUM",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Upload date" />
    ),
    cell: ({ row }) => {
      const picture = row.original;
      return (
        <span className="">
          {new Date(picture.FELTOLTES_DATUM).toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      );
    },
  },
  // {
  //   accessorKey: "FAJL_ELERESI_UTVONAL",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Path" />
  //   ),
  // },
  {
    accessorKey: "KATEGORIA_NEV",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    accessorKey: "PROMPT",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prompt" />
    ),
    cell: ({ row }) => {
      const picture = row.original;
      return <ScrollArea className="h-24">{picture.PROMPT}</ScrollArea>;
    },
  },
  {
    accessorKey: "FELHASZNALONEV",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    // cell: ({ row }) => {
    //   const user = row.original;
    //   return (
    //     <Badge
    //       variant={
    //         user.ROLE === "admin"
    //           ? "default"
    //           : user.ROLE === "user"
    //           ? "outline"
    //           : "destructive"
    //       }
    //     >
    //       {user.ROLE}
    //     </Badge>
    //   );
    // },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const picture = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.EMAIL)}>
              Copy e-mail
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <EditPicture id={picture.KEPID} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="text-red-500">
                <DeletePicture id={picture.KEPID} />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
