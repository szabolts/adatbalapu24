import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import Image from "next/image";
import Link from "next/link";
import { Kep } from "@/lib/types";
import { fetchKepek } from "@/lib/data";

export async function Feed() {
  const kepek: any = await fetchKepek();
  // console.log(kepek);
  const shuffle = ([...arr]) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  };

  const shuffleKepek = shuffle(kepek);
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {kepek.map((kep: Kep, i: number) => (
        <BentoGridItem
          key={i}
          // title={item.title}
          // description={item.description}
          header={
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl ">
              <Link href={`/${kep.KEPID}`}>
                
                  <Image
                    alt={kep.CIM}
                    width={500}
                    height={500}
                    src={kep.FAJL_ELERESI_UTVONAL}
                    className="rounded-lg"
                    style={{
                      objectFit: "cover", // cover, contain, none
                    }}
                  />
                
              </Link>
            </div>
          }
          // icon={item.icon}
          // className={i === 3 || i === 6 || i === 10 || i === 13 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}