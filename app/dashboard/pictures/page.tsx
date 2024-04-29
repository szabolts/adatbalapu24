import { columns } from "./columns"
import { DataTable } from "./pic-data-table"
import { fetchKepek } from "@/lib/data"

export default async function DashboardUsersPage() {
    const data = await fetchKepek();
    return (
      <div className=" mx-auto ">
        <DataTable columns={columns} data={data} />
      </div>
    )
}