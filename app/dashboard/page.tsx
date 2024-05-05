import { DataTable } from "./stat-data-table";
import { fetchStats1 } from "./actions";
import { columns } from "./columns";
import { TopLikes } from "@/components/ui/overview/top-likes";
import { TopUsersUpload } from "@/components/ui/overview/top-users-upload";
import { TopUsersReact } from "@/components/ui/overview/top-users-react";
import { AvgLikesCategory } from "@/components/ui/overview/avg-likes-category";
import { AbsoluteActivity } from "@/components/ui/overview/absolute-activity";
import { DataCard } from "@/components/ui/overview/data-card";
import { BestTwoWeeks } from "@/components/ui/overview/best-two-weeks";
import { getBestUserFrom2Weeks, getTopLikedPictures, getTopUsersUpload, getTopUsersByReaction, getAvgLikesByCategories, getAvgPicByCategory, getAbsoluteActivity, getBasicStats } from "@/lib/data";

export default async function DashboardPage() {
  const data = await fetchStats1();
  const toplikes = await getTopLikedPictures();
  const topusers = await getTopUsersUpload();
  const topUsersByReact = await getTopUsersByReaction();
  const avgLikesByCategories = await getAvgLikesByCategories();
  const avgPicByCategory: any = await getAvgPicByCategory();
  const absAct = await getAbsoluteActivity();
  const basicStats: any = await getBasicStats();
  const bestUser:any = await getBestUserFrom2Weeks();
  console.log("basicStats", basicStats);
  // console.log("absAct", absAct);
  // console.log("avgPicByCategory", avgPicByCategory);
  // console.log("avgLikesByCategories", avgLikesByCategories);
  // console.log("topUsersByReact", topUsersByReact);
  // console.log("topusers", topusers);
  //console.log("asdasdasdasdas", toplikes);
  return (
    <div className=" mx-auto space-y-6">
      <div className="flex flex-row gap-4">
        <DataCard title="Avg. pic by category" data={(avgPicByCategory[0].ATLAGOS_KEPEK_SZAMA).toFixed(2)} />
        <DataCard title="Nr. of pictures" data={basicStats[0].KEPSZAM} />
        <DataCard title="Nr. of categories" data={basicStats[0].KATEGORIASZAM} />
        <BestTwoWeeks title="Top user of last 2 weeks" data={bestUser[0].FELHASZNALONEV} />
      </div>
      <TopLikes data={toplikes} />
      <TopUsersUpload data={topusers} />
      <TopUsersReact data={topUsersByReact} />
      <AvgLikesCategory data={avgLikesByCategories} />
      <AbsoluteActivity data={absAct} />
      
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
}
