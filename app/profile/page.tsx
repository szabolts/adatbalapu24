import ProfileForm from "./profile-form";
import { fetchUsers } from '@/lib/data';
import { User } from "@/lib/types";

export default  async function  SettingsProfilePage() {
    const data: User[] | undefined = await fetchUsers();
    console.log(data);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium"></h3>
        <p className="text-sm text-muted-foreground">
        </p>
      </div>
      <ProfileForm data={data} />
    </div>
  )
}