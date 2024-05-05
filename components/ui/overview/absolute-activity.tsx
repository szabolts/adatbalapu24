"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
  Tooltip,
  Legend,
} from "recharts";
import { TopUsersByReact } from "@/lib/types";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";





export function AbsoluteActivity({ data }: { data: any }) {
  return (
    <Card className=" rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
      <CardHeader className="flex flex-col items-center">
        <CardTitle>Top Users by Absolute Activity</CardTitle>
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
              label={{ value: 'Activity', angle: -90, position: 'insideLeft' }}
            />
            <Legend />
            <Bar
              dataKey="KEPLIKESZAM"
              fill="#9817A4"
              barSize={80}
              radius={[4, 4, 0, 0]}
              stackId="a"
              name="Picture likes"
            />
            <Bar
              dataKey="KOMMENTLIKESZAM"
              fill="#2596be"
              barSize={80}
              radius={[4, 4, 0, 0]}
              stackId="a"
              name="Liked comments"
            />
            <Bar
              dataKey="KOMMENTSZAM"
              fill="#25BE76"
              barSize={80}
              radius={[4, 4, 0, 0]}
              stackId="a"
              name="Comments"
            />
            <Bar
              dataKey="FELTOLTOTTKEPSZAM"
              fill="#BE9025"
              barSize={80}
              radius={[4, 4, 0, 0]}
              stackId="a"
              name="Number of uploaded pictures"

            >
                <LabelList dataKey="AKTIVITAS" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      
    </Card>
  );
}
