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
import { Vortex } from "@/components/ui/bg/vortex";

export default function Upload() {
  return (
    <div className="min-h-[calc(100vh-65px)]  flex flex-row items-center justify-center ">
      <Vortex
        baseSpeed={0.5}
        rangeSpeed={0.1}
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
      <Card className="max-w-4xl bg-black rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
        <CardHeader>
          <CardTitle className="flex flex-row justify-center ">Upload your image</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          <UploadForm />
        </CardContent>
      </Card>  
    </Vortex>
    </div>
  );
}
