"use client";

import Image from "next/image";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { TopLiked } from "@/lib/types";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

 function RenderCustomAxisTick({ x, y, payload }: any)  {
    console.log("-----payload", payload);
    return (
      <g transform={`translate(${x - 40},${y})`}>
        
        <image href={payload.value} width={80} height={80}  />
     
      </g>
    );
  };



export function TopLikes({ data }: { data: TopLiked[] }) {
  return (
    <Card className=" rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
      <CardHeader className="flex flex-col items-center">
        <CardTitle>Top Liked Pictures</CardTitle>
      </CardHeader>
      <div className="h-[460px]">
        <ResponsiveContainer width="100%" height={400} className="p-1 ">
          <BarChart
            data={data}
            {...{
              overflow: "visible",
            }}>
            <XAxis
              dataKey="FAJL_ELERESI_UTVONAL"
              interval={0}
              tick={<RenderCustomAxisTick />}
              stroke="#FFFFFF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#FFFFFF"
              fontSize={14}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              label={{ value: 'Likes', angle: -90, position: 'insideLeft' }}
            />
            <Bar
              dataKey="LIKEOK_SZAMA"
              fill="#2596be"
              barSize={80}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
