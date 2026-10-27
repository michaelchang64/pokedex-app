import { AspectRatio } from "../ui/aspect-ratio";
import { Card } from "../ui/card";

export function TestFlex() {
  return (
    <Card className="flex-col items-vertical w-1/2 h-1/3">
      <AspectRatio
        ratio={1 / 1}
        className="h-1/3 bg-shimmer-color-amber-300"
      >
      </AspectRatio>

      <AspectRatio
        ratio={1 / 1}
        className="h-1/3 bg-shimmer-color-emerald-700-300"
      >
      </AspectRatio>

      <AspectRatio
        ratio={1 / 1}
        className="h-1/3 bg-shimmer-color-indigo-50-300"
      >
      </AspectRatio>
    </Card>
  )
}
