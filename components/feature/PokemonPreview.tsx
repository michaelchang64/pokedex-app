import Image from "next/image";

import { Card, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type PokemonPreviewProps = {
  readonly name: string;
  readonly stillImagePath: string;
  readonly animImagePath: string;
};

export function PokemonPreview({ name, stillImagePath, animImagePath }: PokemonPreviewProps) {
  return (
    <Card className="rounded-lg pt-0 gap-0 w-1/3">
      <AspectRatio
        ratio={1 / 1}
        className="w-full [image-rendering:pixelated] bg-muted"
      >
        <Image
          src={stillImagePath}
          alt={`Image of ${name}`}
          fill
          unoptimized={true}
          className="object-contain p-10 group-hover/card:opacity-0"
        />

        <Image
          src={animImagePath}
          alt={`Image of ${name}`}
          fill
          unoptimized={true}
          className="object-contain p-10 opacity-0 motion-safe:group-hover/card:opacity-100"
        />
      </AspectRatio>
      <CardFooter className="flex-col gap-2 border-none">
        <span className="font-pixel text-[22px]">{ name }</span>
      </CardFooter>
    </Card>
  )
}
