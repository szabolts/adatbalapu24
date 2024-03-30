import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Upload() {
  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-row items-center justify-center ">
      <Card className="max-w-4xl  ">
        <CardHeader>
          <CardTitle className="flex flex-row justify-center ">Upload your image</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
