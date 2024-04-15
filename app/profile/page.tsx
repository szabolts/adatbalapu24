import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProfileForm from "./profile-form";
import { fetchCurrentUser } from '@/lib/data';
import { User } from "@/lib/types";

export default  async function  SettingsProfilePage() {
    const data: User[] | undefined = await fetchCurrentUser();
    console.log(data);

  return (
    <div className="min-h-[calc(100vh-65px)]  flex flex-row items-center justify-center ">
    
      <Card className="max-w-4xl bg-black rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 ">
        <CardHeader>
          <CardTitle className="flex flex-row justify-center ">Profile settings</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm data = {data}/>
        </CardContent>
      </Card>  

    </div>
  )
}