import {  columns} from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { fetchUsers } from "@/lib/data"

   
  export default async function UsersPage() {
    const data = await fetchUsers()
    console.log(data)
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }