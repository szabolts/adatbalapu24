import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function BestTwoWeeks({ title, data }: { title: string; data: any }) {
  return (
    <Card className="rounded-xl w-1/4">
      <CardHeader className="flex flex-col items-center ">
        <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-center text-xl font-bold">{data}</CardContent>
    </Card>
  );
}