
import Link from "next/link";
// import { deleteInvoice } from '@/app/lib/actions';
import { deleteProfileById } from "@/app/dashboard/users/actions";

export function CreateUser() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      <span className="hidden md:block">Create Invoice</span>{" "}
      {/* <PlusIcon className="h-5 md:ml-4" /> */}
    </Link>
  );
}

export function EditUser({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/users/${id}/edit`} className="">
      {" "}
      Edit user
      {/* <PencilIcon className="" /> */}
    </Link>
  );
}

export function DeleteUser({ id }: { id: string }) {
  const deletee = deleteProfileById.bind(null, id);

  return (
    <form action={deletee}>
      <span className="">
        
        <button type="submit" >Delete</button>
      </span>
    </form>
  );
}
