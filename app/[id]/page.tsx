import Image from "next/image";
import { fetchKepekById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaRegHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Like } from "./like";
import { getLikesByID, fetchCommentsByID } from "@/lib/data";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type Like = {
  KEPID: number;
  LIKEOK_SZAMA: number;
};

export default async function PicturePage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  console.log("id: ", id);
  const kep = await fetchKepekById(id);
  console.log(kep);
  if (!kep) {
    notFound();
  }
  const likes: any = await getLikesByID(kep[0].KEPID);
  const comments: any = await fetchCommentsByID(kep[0].KEPID);

  return (
    <div className="flex items-center w-full  min-h-screen">
      <div className="flex gap-4">
        <div className="w-2/3">
          <Image
            alt={kep[0].CIM}
            width={900}
            height={750}
            src={kep[0].FAJL_ELERESI_UTVONAL}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col w-1/3 gap-2 border rounded-lg p-2">
          <div className="flex flex-row items-center gap-2 m-2 ">
            <Avatar>
              <AvatarImage alt={kep[0].FELHASZNALONEV} />
              <AvatarFallback>
                {kep[0].FELHASZNALONEV.split(" ")
                  .map((chunk) => chunk[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <p className="text-xl font-bold">{kep[0].FELHASZNALONEV}</p>
            <p className="text-sm text-muted-foreground ml-auto mr-2">
              {kep[0].FELTOLTES_DATUM.toDateString()}
            </p>
          </div>
          <div className="m-2">
            <p className="text-xl font-bold">{kep[0].CIM}</p>
            <p className="text-sm text-muted-foreground">{kep[0].PROMPT}</p>
          </div>
          <div className="flex m-2 gap-1 items-center">
            <Like id={kep[0].KEPID} />
            <p className="text-sm text-muted-foreground">
              {likes.length > 0 ? likes[0].LIKEOK_SZAMA : 0}
            </p>
          </div>
          <div className="flex flex-col m-2 gap-2 mb-auto">
            {comments.length > 0 ? (
              comments.map((comment: any) => (
                <div key={comment.KOMMENTID} className="flex gap-2">
                  <Avatar>
                    <AvatarImage alt={comment.FELHASZNALONEV} />
                    <AvatarFallback>
                      {comment.FELHASZNALONEV.split(" ")
                        .map((chunk: any) => chunk[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <div className="flex flex-col border rounded-lg w-full p-2  gap-1">
                      <span className="font-semibold text-sm">
                        {comment.FELHASZNALONEV}
                      </span>
                      <span className="text-sm">{comment.TARTALOM}</span>
                    </div>
                    <span className="text-xs ml-2 text-muted-foreground">
                      {new Date(comment.DATUM).toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No comments yet</p>
            )}
          </div>
          <div className="flex flex-col m-2 gap-2">
            <Label htmlFor="comment">Write your comment</Label>
            <Textarea
              className="h-20"
              placeholder="Write your comment..."
              id="comment"
            />
            <Button className="mr-auto" color="secondary">
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
