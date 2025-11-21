import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
}

export function ProductCard({ image, title, price }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <h3 className="font-semibold text-lg">{title}</h3>
      </CardContent>
      <CardFooter>
        <p className="text-xl font-bold">{price}</p>
      </CardFooter>
    </Card>
  );
}

