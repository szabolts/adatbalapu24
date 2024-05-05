"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { TopUsersByReact } from "@/lib/types";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";





export function TopUsersReact({ data }: { data: TopUsersByReact[] }) {
  return (
    <Card className=" rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
      <CardHeader className="flex flex-col items-center">
        <CardTitle>Top Users by Reaction to Pictures</CardTitle>
      </CardHeader>
      
        <ResponsiveContainer width="100%" height={400} className="p-1 ">
          <BarChart data={data}>
            <XAxis
              dataKey="FELHASZNALONEV"
              interval={0}
              
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
              label={{ value: 'Reactions', angle: -90, position: 'insideLeft' }}
            />
            <Legend />
            <Bar
              dataKey="LIKEOK_SZAMA"
              fill="#9817A4"
              barSize={80}
              radius={[4, 4, 0, 0]}
              stackId="a"
              name="Likes"
            />
            <Bar
              dataKey="KOMMENTEK_SZAMA"
              fill="#2596be"
              barSize={80}
              radius={[4, 4, 0, 0]}
              stackId="a"
              name="Comments"
            />
          </BarChart>
        </ResponsiveContainer>
      
    </Card>
  );
}
