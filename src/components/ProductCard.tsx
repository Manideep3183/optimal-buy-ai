import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ExternalLink, Star, TrendingDown, TrendingUp } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  image: string;
  platform: "amazon" | "flipkart" | "croma";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  discount?: number;
  deliveryTime: string;
  inStock: boolean;
  url: string;
}

interface ProductCardProps {
  product: Product;
  isBestDeal?: boolean;
  priceChange?: number; // Percentage change from last week
}

const platformColors = {
  amazon: "bg-orange-500",
  flipkart: "bg-blue-500",
  croma: "bg-red-500",
};

const platformNames = {
  amazon: "Amazon",
  flipkart: "Flipkart", 
  croma: "Croma",
};

export const ProductCard = ({ product, isBestDeal = false, priceChange }: ProductCardProps) => {
  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-comparison ${
      isBestDeal ? 'ring-2 ring-success shadow-recommendation' : ''
    }`}>
      {isBestDeal && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="secondary" className="bg-success text-success-foreground font-semibold">
            Best Deal
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${platformColors[product.platform]}`} />
              <span className="text-sm font-medium text-muted-foreground">
                {platformNames[product.platform]}
              </span>
            </div>
            <h3 className="font-semibold text-sm leading-tight line-clamp-2">
              {product.name}
            </h3>
          </div>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-16 h-16 object-cover rounded-md bg-muted"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
          {product.discount && (
            <Badge variant="destructive" className="text-xs">
              {product.discount}% OFF
            </Badge>
          )}
        </div>

        {priceChange && (
          <div className="flex items-center gap-1 text-sm">
            {priceChange > 0 ? (
              <TrendingUp className="h-4 w-4 text-destructive" />
            ) : (
              <TrendingDown className="h-4 w-4 text-success" />
            )}
            <span className={priceChange > 0 ? "text-destructive" : "text-success"}>
              {Math.abs(priceChange)}% from last week
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviewCount})</span>
          </div>
          <span className={`font-medium ${product.inStock ? 'text-success' : 'text-destructive'}`}>
            {product.inStock ? `Delivery: ${product.deliveryTime}` : 'Out of Stock'}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full" 
          disabled={!product.inStock}
          asChild
        >
          <a href={product.url} target="_blank" rel="noopener noreferrer">
            View on {platformNames[product.platform]}
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};