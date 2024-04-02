import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadForm } from "./upload-form";
import { WavyBackground } from "@/components/ui/bg/wavy-background"; 
import { BackgroundBeams } from "@/components/ui/bg/background-beams";

export default function Upload() {
  return (
    <div className="min-h-[calc(100vh-65px)]  flex flex-row items-center justify-center ">
      <WavyBackground>
      <Card className="max-w-4xl bg-black rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 ">
        <CardHeader>
          <CardTitle className="flex flex-row justify-center ">Upload your image</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          <UploadForm />
        </CardContent>
      </Card>  
    </WavyBackground>
    </div>
  );
}
