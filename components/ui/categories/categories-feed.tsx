import { cn } from "@/lib/utils";
import React from "react";
import { CategoryBentoGrid, CategoryBentoGridItem } from "./categories-bento";
import Image from "next/image";
import Link from "next/link";
import { Kategoria, KategoriaEsElsoKep } from "@/lib/types";
import { fetchCategories } from "@/lib/data";

export async function CategoriesFeed() {
  const kategoriak: any = await fetchCategories();
  // console.log(kategoriak);

  return (
    <CategoryBentoGrid className="max-w-4xl mx-auto">
      {kategoriak.map((kategoria: KategoriaEsElsoKep, i: number) => (
        <CategoryBentoGridItem
          key={i}
          title={kategoria.KATEGORIANEV}
          // description={item.description}
          header={
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl object ">
              <Link href={`/categories/${kategoria.KATEGORIAID}`}>
                <Image
                  alt={kategoria.KATEGORIANEV}
                  width={500}
                  height={500}
                  src={kategoria.ELSOKEPELERESIUT}
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
    </CategoryBentoGrid>
  );
}
