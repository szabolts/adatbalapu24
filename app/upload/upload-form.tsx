import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@nextui-org/react";
import { Textarea } from "@/components/ui/textarea"; 
import { upload } from "@/lib/actions";

export function UploadForm() {
  return (
    <form action={upload}>
      <div className="grid gap-4">
        <div>
          <Label htmlFor="file">Choose a file</Label>
          <Input type="file" name="image" required/>
        </div>
        <div>
          <Label htmlFor="file">Title</Label>
          <Input type="text" name="title" placeholder="80s Trance Poster Synth Dragon" required/>
        </div>
        <div>
          <Label htmlFor="file">Prompt</Label>
          <Textarea name="prompt" required placeholder="synth dragon in the style of minimalist 80s trance poster illustration, neon, bold, color-blocked compositions, geometric, faded"/>
        </div>
        <Button color="secondary" type="submit">Upload</Button>
      </div>
    </form>
  );
}
