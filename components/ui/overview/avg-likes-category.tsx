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
import { AvgLikesByCategories } from "@/lib/types";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function AvgLikesCategory({ data }: { data: AvgLikesByCategories[] }) {
    const tickFormatter = (value: string, index: number) => {
        const limit = 12; // put your maximum character
        if (value.length < limit) return value;
        return `${value.substring(0, limit)}...`;
     };

  return (
    <Card className=" rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
      <CardHeader className="flex flex-col items-center">
        <CardTitle>Average Likes by Category</CardTitle>
      </CardHeader>
      <div className="h-[470px]">
        <ResponsiveContainer width="100%" height={400} className="p-1 ">
          <BarChart
            data={data}
            {...{
              overflow: "visible",
            }}>
            <XAxis
              dataKey="KATEGORIA_NEV"
              interval={0}
              angle={90}
              textAnchor="start"
              stroke="#FFFFFF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={tickFormatter}
            />
            <YAxis
              stroke="#FFFFFF"
              fontSize={14}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              label={{
                value: "Average likes",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Bar
              dataKey="ATLAGOS_LIKEOK_SZAMA"
              fill="#c85b6f"
              barSize={80}
              radius={[4, 4, 0, 0]}
            >
                <LabelList dataKey="ATLAGOS_LIKEOK_SZAMA" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
