import Image from "next/image";
import { FeedByCat } from "@/components/ui/categories/feed-by-cat";
import { fetchKategoria } from "@/lib/data";
import { Kategoria } from "@/lib/types";

export default async function CategoryPage({
  params,
}: {
  params: { id: string };

  
}) {
    const kategoria = await fetchKategoria(parseInt(params.id));
    const id = params.id;
    return (
        <div className="py-4 space-y-6">
            <div className="flex flex-col items-center kap-2">
            <span className="text-2xl font-bold">{kategoria[0].NEV}</span>
            <span className="text-muted-foreground max-w-xl text-center">{kategoria[0].LEIRAS}</span>
            </div>
            <FeedByCat id={parseInt(id)} />
        </div>
    );
}
