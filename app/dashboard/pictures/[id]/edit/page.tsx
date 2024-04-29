import { fetchKepekById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "./back-button";
import { UpdatePictureForm } from "./update-picture-form";
import { fetchCategories } from "@/lib/data";

export default async function EditPicturePage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const kep = await fetchKepekById(id);
  const kategoriak = await fetchCategories();
  return (
    <div className=" w-full max-w-md">
      <BackButton />
      <div className=" space-y-8">
        <UpdatePictureForm kep={kep} kategoriak={kategoriak} id={id} />
        
      </div>
    </div>

  );
}
