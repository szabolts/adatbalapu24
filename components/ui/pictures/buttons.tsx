
import Link from "next/link";
// import { deleteInvoice } from '@/app/lib/actions';
import { deletePictureById } from "@/app/dashboard/pictures/actions";

export function CreatePicture() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      <span className="hidden md:block">Upload picture</span>{" "}
      {/* <PlusIcon className="h-5 md:ml-4" /> */}
    </Link>
  );
}

export function EditPicture({ id }: { id: number }) {
  return (
    <Link href={`/dashboard/pictures/${id}/edit`} className="">
      {" "}
      Edit picture
      {/* <PencilIcon className="" /> */}
    </Link>
  );
}

export function DeletePicture({ id }: { id: number}) {
  const deletee = deletePictureById.bind(null, id);

  return (
    <form action={deletee}>
      <span className="">
        
        <button type="submit" >Delete</button>
      </span>
    </form>
  );
}
