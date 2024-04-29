import { DataTable } from "./stat-data-table";
import { fetchStats1 } from "./actions";
import { columns } from "./columns";

export default async function DashboardPage() {
  const data = await fetchStats1();
//   console.log("asdasdasdasdas", data);
  return (
    <div className=" mx-auto ">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
