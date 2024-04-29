import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteCategoryById } from "@/app/dashboard/categories/actions";

export function CreateCategory() {
  return (
    <Link
      href="/dashboard/categories/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      <span className="hidden md:block">Create Category</span>{" "}
      {/* <PlusIcon className="h-5 md:ml-4" /> */}
    </Link>
  );
}

export function EditCategory({ id }: { id: number }) {
  return (
    <Link href={`/dashboard/categories/${id}/edit`} className="">
      {" "}
      Edit category
      {/* <PencilIcon className="" /> */}
    </Link>
  );
}

export function DeleteCategory({ id }: { id: number }) {
  const deletee = deleteCategoryById.bind(null, id.toString());

  return (
    <form action={deletee}>
      <span className="">
        <button type="submit" >Delete</button>
      </span>
    </form>
  );
}
