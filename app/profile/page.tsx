import ProfileForm from "./profile-form";
import { fetchUserByEmail } from '@/lib/data';
import { User } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"; 

export default  async function  SettingsProfilePage() {
    const data: User[] | undefined = await fetchUserByEmail();
    // console.log(data);

  return (
    <div className="flex flex-row">
      <div className=" w-full max-w-md ">
        <div className="flex flex-col ">
          <span className="text-xl font-bold tracking-tight">Profile settings</span>
          <p className="text-sm text-muted-foreground">Update your personal information here.</p>
          <Separator className="my-6"/>
        </div>
        <div className="space-y-4">
          <ProfileForm data = {data}/>
        </div>
      </div>  
    </div>
  )
}