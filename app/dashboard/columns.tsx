"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Stat1 } from "@/lib/types";



export const columns: ColumnDef<Stat1>[] = [
  {
    accessorKey: "FELHASZNALONEV",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "FELTOLTOTTKEPEKSZAMA",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Uploaded pictures" />
    ),
  },
  
];
