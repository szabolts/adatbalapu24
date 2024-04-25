"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EditUser, DeleteUser } from "@/components/ui/users/buttons";
import { User } from "@/lib/types";
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
import { Badge } from "@/components/ui/badge"


export const columns: ColumnDef<User>[] = [
  
  {
    accessorKey: "FELHASZNALOID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    
  },
  {
    accessorKey: "EMAIL",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "FELHASZNALONEV",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "VEZETEKNEV",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last name" />
    ),
  },
  {
    accessorKey: "KERESZTNEV",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First name" />
    ),
  },
  {
    accessorKey: "ROLE",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Badge
          variant={
            user.ROLE === "admin"
              ? "default"
              : user.ROLE === "user"
              ? "outline"
              : "destructive"
          }
        >
          {user.ROLE}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.EMAIL)}>
              Copy e-mail
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><EditUser id={user.FELHASZNALOID} /></DropdownMenuItem>
            <DropdownMenuItem>
              <div className="text-red-500"><DeleteUser id={user.FELHASZNALOID}/></div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

