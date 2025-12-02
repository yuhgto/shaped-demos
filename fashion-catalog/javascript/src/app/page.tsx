"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ShoppingCartSidebar } from "@/components/ShoppingCartSidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";

export default function Home() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  // Sample product data - replace with your actual data
  const products = [
    {
      article_id: 108775015,
      product_code: 108775,
      prod_name: "Strap top",
      product_type_no: 253,
      product_type_name: "Vest top",
      product_group_name: "Garment Upper body",
      graphical_appearance_no: 1010016,
      graphical_appearance_name: "Solid",
      colour_group_code: 9,
      colour_group_name: "Black",
      perceived_colour_value_id: 4,
      perceived_colour_value_name: "Dark",
      perceived_colour_master_id: 5,
      perceived_colour_master_name: "Black",
      department_no: 1676,
      department_name: "Jersey Basic",
      index_code: "A",
      index_name: "Ladieswear",
      index_group_no: 1,
      index_group_name: "Ladieswear",
      section_no: 16,
      section_name: "Womens Everyday Basics",
      garment_group_no: 1002,
      garment_group_name: "Jersey Basic",
      detail_desc: "Jersey top with narrow shoulder straps.",
    },
    {
      article_id: 108775044,
      product_code: 108775,
      prod_name: "Strap top",
      product_type_no: 253,
      product_type_name: "Vest top",
      product_group_name: "Garment Upper body",
      graphical_appearance_no: 1010016,
      graphical_appearance_name: "Solid",
      colour_group_code: 10,
      colour_group_name: "White",
      perceived_colour_value_id: 3,
      perceived_colour_value_name: "Light",
      perceived_colour_master_id: 9,
      perceived_colour_master_name: "White",
      department_no: 1676,
      department_name: "Jersey Basic",
      index_code: "A",
      index_name: "Ladieswear",
      index_group_no: 1,
      index_group_name: "Ladieswear",
      section_no: 16,
      section_name: "Womens Everyday Basics",
      garment_group_no: 1002,
      garment_group_name: "Jersey Basic",
      detail_desc: "Jersey top with narrow shoulder straps.",
    },
    {
      article_id: 108775051,
      product_code: 108775,
      prod_name: "Strap top (1)",
      product_type_no: 253,
      product_type_name: "Vest top",
      product_group_name: "Garment Upper body",
      graphical_appearance_no: 1010017,
      graphical_appearance_name: "Stripe",
      colour_group_code: 11,
      colour_group_name: "Off White",
      perceived_colour_value_id: 1,
      perceived_colour_value_name: "Dusty Light",
      perceived_colour_master_id: 9,
      perceived_colour_master_name: "White",
      department_no: 1676,
      department_name: "Jersey Basic",
      index_code: "A",
      index_name: "Ladieswear",
      index_group_no: 1,
      index_group_name: "Ladieswear",
      section_no: 16,
      section_name: "Womens Everyday Basics",
      garment_group_no: 1002,
      garment_group_name: "Jersey Basic",
      detail_desc: "Jersey top with narrow shoulder straps.",
    },
    {
      article_id: 110065001,
      product_code: 110065,
      prod_name: "OP T-shirt (Idro)",
      product_type_no: 306,
      product_type_name: "Bra",
      product_group_name: "Underwear",
      graphical_appearance_no: 1010016,
      graphical_appearance_name: "Solid",
      colour_group_code: 9,
      colour_group_name: "Black",
      perceived_colour_value_id: 4,
      perceived_colour_value_name: "Dark",
      perceived_colour_master_id: 5,
      perceived_colour_master_name: "Black",
      department_no: 1339,
      department_name: "Clean Lingerie",
      index_code: "B",
      index_name: "Lingeries/Tights",
      index_group_no: 1,
      index_group_name: "Ladieswear",
      section_no: 61,
      section_name: "Womens Lingerie",
      garment_group_no: 1017,
      garment_group_name: "Under-, Nightwear",
      detail_desc:
        "Microfibre T-shirt bra with underwired, moulded, lightly padded cups that shape the bust and provide good support. Narrow adjustable shoulder straps and a narrow hook-and-eye fastening at the back. Without visible seams for greater comfort.",
    },
    {
      article_id: 110065002,
      product_code: 110065,
      prod_name: "OP T-shirt (Idro)",
      product_type_no: 306,
      product_type_name: "Bra",
      product_group_name: "Underwear",
      graphical_appearance_no: 1010016,
      graphical_appearance_name: "Solid",
      colour_group_code: 10,
      colour_group_name: "White",
      perceived_colour_value_id: 3,
      perceived_colour_value_name: "Light",
      perceived_colour_master_id: 9,
      perceived_colour_master_name: "White",
      department_no: 1339,
      department_name: "Clean Lingerie",
      index_code: "B",
      index_name: "Lingeries/Tights",
      index_group_no: 1,
      index_group_name: "Ladieswear",
      section_no: 61,
      section_name: "Womens Lingerie",
      garment_group_no: 1017,
      garment_group_name: "Under-, Nightwear",
      detail_desc:
        "Microfibre T-shirt bra with underwired, moulded, lightly padded cups that shape the bust and provide good support. Narrow adjustable shoulder straps and a narrow hook-and-eye fastening at the back. Without visible seams for greater comfort.",
    },
    {
      article_id: 110065011,
      product_code: 110065,
      prod_name: "OP T-shirt (Idro)",
      product_type_no: 306,
      product_type_name: "Bra",
      product_group_name: "Underwear",
      graphical_appearance_no: 1010016,
      graphical_appearance_name: "Solid",
      colour_group_code: 12,
      colour_group_name: "Light Beige",
      perceived_colour_value_id: 1,
      perceived_colour_value_name: "Dusty Light",
      perceived_colour_master_id: 11,
      perceived_colour_master_name: "Beige",
      department_no: 1339,
      department_name: "Clean Lingerie",
      index_code: "B",
      index_name: "Lingeries/Tights",
      index_group_no: 1,
      index_group_name: "Ladieswear",
      section_no: 61,
      section_name: "Womens Lingerie",
      garment_group_no: 1017,
      garment_group_name: "Under-, Nightwear",
      detail_desc:
        "Microfibre T-shirt bra with underwired, moulded, lightly padded cups that shape the bust and provide good support. Narrow adjustable shoulder straps and a narrow hook-and-eye fastening at the back. Without visible seams for greater comfort.",
    },
    {
      article_id: 111565001,
      product_code: 111565,
      prod_name: "20 den 1p Stockings",
      product_type_no: 304,
      product_type_name: "Underwear Tights",
      product_group_name: "Socks & Tights",
      graphical_appearance_no: 1010016,
      graphical_appearance_name: "Solid",
      colour_group_code: 9,
      colour_group_name: "Black",
      perceived_colour_value_id: 4,
      perceived_colour_value_name: "Dark",
      perceived_colour_master_id: 5,
      perceived_colour_master_name: "Black",
      department_no: 3608,
      department_name: "Tights basic",
      index_code: "B",
      index_name: "Lingeries/Tights",
      index_group_no: 1,
      index_group_name: "Ladieswear",
      section_no: 62,
      section_name: "Womens Nightwear, Socks & Tigh",
      garment_group_no: 1021,
      garment_group_name: "Socks and Tights",
      detail_desc:
        "Semi shiny nylon stockings with a wide, reinforced trim at the top. Use with a suspender belt. 20 denier.",
    },
    {
      article_id: 111565003,
      product_code: 111565,
      prod_name: "20 den 1p Stockings",
      product_type_no: 302,
      product_type_name: "Socks",
      product_group_name: "Socks & Tights",
      graphical_appearance_no: 1010016,
      graphical_appearance_name: "Solid",
      colour_group_code: 13,
      colour_group_name: "Beige",
      perceived_colour_value_id: 2,
      perceived_colour_value_name: "Medium Dusty",
      perceived_colour_master_id: 11,
      perceived_colour_master_name: "Beige",
      department_no: 3608,
      department_name: "Tights basic",
      index_code: "B",
      index_name: "Lingeries/Tights",
      index_group_no: 1,
      index_group_name: "Ladieswear",
      section_no: 62,
      section_name: "Womens Nightwear, Socks & Tigh",
      garment_group_no: 1021,
      garment_group_name: "Socks and Tights",
      detail_desc:
        "Semi shiny nylon stockings with a wide, reinforced trim at the top. Use with a suspender belt. 20 denier.",
    },
    {
      article_id: 111586001,
      product_code: 111586,
      prod_name: "Shape Up 30 den 1p Tights",
      product_type_no: 273,
      product_type_name: "Leggings/Tights",
      product_group_name: "Garment Lower body",
      graphical_appearance_no: 1010016,
      graphical_appearance_name: "Solid",
      colour_group_code: 9,
      colour_group_name: "Black",
      perceived_colour_value_id: 4,
      perceived_colour_value_name: "Dark",
      perceived_colour_master_id: 5,
      perceived_colour_master_name: "Black",
      department_no: 3608,
      department_name: "Tights basic",
      index_code: "B",
      index_name: "Lingeries/Tights",
      index_group_no: 1,
      index_group_name: "Ladieswear",
      section_no: 62,
      section_name: "Womens Nightwear, Socks & Tigh",
      garment_group_no: 1021,
      garment_group_name: "Socks and Tights",
      detail_desc:
        "Tights with built-in support to lift the bottom. Black in 30 denier and light amber in 15 denier.",
    },
    {
      article_id: 111593001,
      product_code: 111593,
      prod_name: "Support 40 den 1p Tights",
      product_type_no: 304,
      product_type_name: "Underwear Tights",
      product_group_name: "Socks & Tights",
      graphical_appearance_no: 1010016,
      graphical_appearance_name: "Solid",
      colour_group_code: 9,
      colour_group_name: "Black",
      perceived_colour_value_id: 4,
      perceived_colour_value_name: "Dark",
      perceived_colour_master_id: 5,
      perceived_colour_master_name: "Black",
      department_no: 3608,
      department_name: "Tights basic",
      index_code: "B",
      index_name: "Lingeries/Tights",
      index_group_no: 1,
      index_group_name: "Ladieswear",
      section_no: 62,
      section_name: "Womens Nightwear, Socks & Tigh",
      garment_group_no: 1021,
      garment_group_name: "Socks and Tights",
      detail_desc:
        "Semi shiny tights that shape the tummy, thighs and calves while also encouraging blood circulation in the legs. Elasticated waist.",
    },
  ];

  function getProductImageUrl(item_id: number) {
    const IMAGE_BUCKET_BASE_URL =
      "https://h-and-m-images.s3.us-east-2.amazonaws.com";
    const PREFIX = item_id.toString().substring(0, 2);
    console.log(PREFIX, item_id);
    return `${IMAGE_BUCKET_BASE_URL}/0${PREFIX}/0${item_id.toString()}.jpg`;
  }

  const handleAddToCart = (product: any) => {
    setCartItems((prev) => [...prev, product]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const suggestedItems = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 pr-96">
        {/* Top Section */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">
              BUY YOUR CLOTHES HERE
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover our curated collection of premium fashion items. Browse
              through our selection of clothing, accessories, and footwear. <br/><strong>Click an item to add it to your cart.</strong>
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Learn more"
              >
                <InfoIcon className="h-4 w-4" />
                <span>Learn More</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Fashion catalog powered by Shaped</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h3 className="mb-2 font-semibold">About the demo</h3>
                  <p className="text-muted-foreground text-sm">
                    This is an example site powered by the Shaped relevance
                    store. Items are populated from the publicly-available H&M
                    Products dataset.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Why it works</h3>
                  <p className="text-muted-foreground text-sm">
                    A Shaped engine looks at the current logged-in user, their transaction history, and then chooses a set of items to suggest to them. 

                    The engine combines transaction history with semantic information about each item, and which customers bought it - to learn about its popularity.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Retrieval stage</h3>
                  <p className="text-muted-foreground text-sm">
                    Each component on the page is fetching items from a Shaped
                    engine using a specific retrieval query. The catalog
                    frontpage gets popular items using a popular items retriever
                    The shopping cart shows similar items to the ones in your
                    cart, using similarity search
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Build your own</h3>
                  <p className="text-muted-foreground text-sm">
                    Use our quickstart to start building a retrieval engine today.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              image={getProductImageUrl(product.article_id)}
              title={product.prod_name}
              price={"10"}
              onClick={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </main>
      <ShoppingCartSidebar
        cartItems={cartItems}
        suggestedItems={suggestedItems}
        getProductImageUrl={getProductImageUrl}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
}
