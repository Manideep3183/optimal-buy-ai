import { Product } from "@/components/ProductCard";
import { MLPrediction } from "@/components/MLRecommendation";
import { PriceTrendData } from "@/components/PriceTrendChart";
import { SentimentData } from "@/components/SentimentAnalysis";

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

export const generateSentimentData = (query: string): SentimentData => {
  const sentiments: SentimentData['overallSentiment'][] = ['positive', 'negative', 'neutral'];
  const overallSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
  
  // Generate realistic sentiment percentages
  let positivePercentage, negativePercentage, neutralPercentage;
  
  if (overallSentiment === 'positive') {
    positivePercentage = Math.floor(Math.random() * 20) + 60; // 60-80%
    negativePercentage = Math.floor(Math.random() * 15) + 5; // 5-20%
    neutralPercentage = 100 - positivePercentage - negativePercentage;
  } else if (overallSentiment === 'negative') {
    negativePercentage = Math.floor(Math.random() * 20) + 50; // 50-70%
    positivePercentage = Math.floor(Math.random() * 15) + 10; // 10-25%
    neutralPercentage = 100 - positivePercentage - negativePercentage;
  } else {
    neutralPercentage = Math.floor(Math.random() * 20) + 40; // 40-60%
    positivePercentage = Math.floor(Math.random() * 25) + 20; // 20-45%
    negativePercentage = 100 - positivePercentage - neutralPercentage;
  }

  const positiveAttributes = [
    "Excellent build quality", "Great value for money", "Fast delivery", 
    "User-friendly interface", "Reliable performance", "Good customer service",
    "Durable construction", "Sleek design", "Easy setup", "Good battery life"
  ];
  
  const negativeAttributes = [
    "Delivery delays", "Poor packaging", "Limited features", 
    "Expensive compared to alternatives", "Customer service issues", "Quality concerns",
    "Complex setup", "Short battery life", "Design flaws", "Software bugs"
  ];

  const platforms = ['Amazon', 'Flipkart', 'Croma'];
  const reviewComments = {
    positive: [
      `Great ${query}! Exactly what I was looking for. Highly recommended.`,
      `Excellent quality and fast shipping. Very satisfied with my purchase.`,
      `Amazing product! Worth every penny. Will definitely buy again.`,
      `Perfect ${query} for the price. Great build quality and performance.`
    ],
    negative: [
      `Disappointed with the ${query}. Not worth the price.`,
      `Poor quality and slow delivery. Expected much better.`,
      `Had issues with the product within a week. Poor customer service.`,
      `Overpriced for what you get. Looking for alternatives.`
    ],
    neutral: [
      `Decent ${query}. Does the job but nothing extraordinary.`,
      `Average product. Some good features, some not so great.`,
      `It's okay. Gets the work done but could be better.`,
      `Fair quality for the price. Not the best, not the worst.`
    ]
  };

  const generateRecentReviews = () => {
    const reviews = [];
    for (let i = 0; i < 4; i++) {
      const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      const rating = sentiment === 'positive' ? Math.floor(Math.random() * 2) + 4 :
                    sentiment === 'negative' ? Math.floor(Math.random() * 2) + 1 :
                    Math.floor(Math.random() * 2) + 3;
      
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      reviews.push({
        id: `review-${i}`,
        rating,
        comment: reviewComments[sentiment][Math.floor(Math.random() * reviewComments[sentiment].length)],
        sentiment,
        platform,
        date: date.toLocaleDateString()
      });
    }
    return reviews;
  };

  return {
    overallSentiment,
    positivePercentage,
    negativePercentage,
    neutralPercentage,
    totalReviews: Math.floor(Math.random() * 5000) + 1000,
    commonPositives: positiveAttributes.sort(() => 0.5 - Math.random()).slice(0, 4),
    commonNegatives: negativeAttributes.sort(() => 0.5 - Math.random()).slice(0, 3),
    recentReviews: generateRecentReviews()
  };
};