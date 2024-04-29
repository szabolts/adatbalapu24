
import { DataTable } from "./cat-data-table"
import {  getKategoriak } from "@/lib/data"
import { columns } from "./columns"

   
export default async function DashboardCategoriesPage() {
    const data = await getKategoriak();
    // console.log(data)
    return (
      <div className=" mx-auto ">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }

