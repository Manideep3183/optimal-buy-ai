export interface Product {
  id: string;
  name: string;
  image: string;
  platform: 'amazon' | 'flipkart' | 'croma';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  discount?: number;
  deliveryTime: string;
  inStock: boolean;
  url: string;
  recommendationScore?: number;
  recommendationText?: string;
}

export interface ScrapedProduct {
  productName: string;
  price: number;
  rating: number;
  reviewCount: number;
  productUrl: string;
  imageUrl: string;
  retailer: 'amazon' | 'flipkart';
  originalPrice?: number;
  discount?: number;
  deliveryTime?: string;
  inStock?: boolean;
}
