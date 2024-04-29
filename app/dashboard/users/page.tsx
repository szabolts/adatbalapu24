import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table/data-table";
import { fetchUsers } from "@/lib/data";

export default async function DashboardUsersPage() {
  const data = await fetchUsers();
  // console.log(data)
  return (
    <div className=" mx-auto ">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
