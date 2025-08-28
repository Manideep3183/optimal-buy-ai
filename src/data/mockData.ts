import { Product } from "@/components/ProductCard";
import { MLPrediction } from "@/components/MLRecommendation";
import { PriceTrendData } from "@/components/PriceTrendChart";

export const generateMockProducts = (query: string): Product[] => {
  const baseProducts = [
    {
      name: `${query} - Premium Model`,
      image: "/placeholder.svg",
      rating: 4.5,
      reviewCount: 1234,
      deliveryTime: "2-3 days",
      inStock: true,
    },
    {
      name: `${query} - Standard Edition`,
      image: "/placeholder.svg", 
      rating: 4.2,
      reviewCount: 856,
      deliveryTime: "3-5 days",
      inStock: true,
    },
    {
      name: `${query} - Pro Version`,
      image: "/placeholder.svg",
      rating: 4.7,
      reviewCount: 2341,
      deliveryTime: "1-2 days",
      inStock: true,
    }
  ];

  const platforms: Array<Product['platform']> = ['amazon', 'flipkart', 'croma'];
  const products: Product[] = [];

  baseProducts.forEach((base, index) => {
    platforms.forEach((platform, platformIndex) => {
      const basePrice = 25000 + (index * 5000);
      const platformMultiplier = platform === 'amazon' ? 0.95 : 
                                platform === 'flipkart' ? 0.98 : 1.02;
      const price = Math.round(basePrice * platformMultiplier);
      const originalPrice = Math.round(price * 1.15);
      const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

      products.push({
        id: `${index}-${platformIndex}`,
        ...base,
        platform,
        price,
        originalPrice,
        discount,
        url: `https://${platform}.com/product/${encodeURIComponent(base.name)}`,
      });
    });
  });

  return products.sort((a, b) => a.price - b.price);
};

export const generateMLPrediction = (query: string): MLPrediction => {
  const recommendations: MLPrediction['recommendation'][] = ['buy_now', 'wait', 'neutral'];
  const trends: MLPrediction['historicalTrend'][] = ['increasing', 'decreasing', 'stable'];
  
  const recommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
  const trend = trends[Math.floor(Math.random() * trends.length)];
  
  return {
    recommendation,
    confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
    predictedPriceDrop: recommendation === 'wait' ? Math.floor(Math.random() * 15) + 5 : undefined,
    bestBuyDate: recommendation === 'wait' ? 
      new Date(Date.now() + (Math.floor(Math.random() * 14) + 7) * 24 * 60 * 60 * 1000).toISOString() : 
      undefined,
    reasoning: recommendation === 'buy_now' ? 
      `Based on historical data, ${query} prices are at their lowest point in the last 6 months. Current promotions and seasonal trends suggest this is an optimal time to purchase.` :
      recommendation === 'wait' ?
      `Analysis shows ${query} prices typically drop during upcoming sales events. Historical patterns indicate a potential price reduction in the next 1-2 weeks.` :
      `${query} prices have been relatively stable. No significant price changes are predicted in the near future.`,
    historicalTrend: trend,
  };
};

export const generatePriceTrendData = (query: string): PriceTrendData[] => {
  const data: PriceTrendData[] = [];
  const basePrice = 25000;
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const variation = () => Math.random() * 0.1 - 0.05; // ±5% variation
    
    data.push({
      date: date.toISOString().split('T')[0],
      amazon: Math.round(basePrice * 0.95 * (1 + variation())),
      flipkart: Math.round(basePrice * 0.98 * (1 + variation())),
      croma: Math.round(basePrice * 1.02 * (1 + variation())),
    });
  }
  
  return data;
};