import { useState } from "react";
import { ProductSearch } from "@/components/ProductSearch";
import { ProductCard, Product } from "@/components/ProductCard";
import { MLRecommendation } from "@/components/MLRecommendation";
import { PriceTrendChart } from "@/components/PriceTrendChart";
import { useToast } from "@/hooks/use-toast";
import { generateMockProducts, generateMLPrediction, generatePriceTrendData } from "@/data/mockData";
import { Loader2, ShoppingCart, TrendingUp, Zap } from "lucide-react";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mlPrediction, setMLPrediction] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockProducts = generateMockProducts(query);
      const prediction = generateMLPrediction(query);
      const trendData = generatePriceTrendData(query);
      
      setProducts(mockProducts);
      setMLPrediction(prediction);
      setPriceData(trendData);
      setIsLoading(false);
      
      toast({
        title: "Search Complete",
        description: `Found ${mockProducts.length} products from 3 platforms`,
      });
    }, 1500);
  };

  const findBestDeal = () => {
    if (products.length === 0) return null;
    return products.reduce((best, current) => 
      current.price < best.price ? current : best
    );
  };

  const bestDeal = findBestDeal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">PriceCompare Pro</h1>
                <p className="text-sm text-muted-foreground">Smart shopping with ML predictions</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                <span>Real-time prices</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>ML predictions</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 mb-8">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Compare Prices Across Platforms
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find the best deals with AI-powered price predictions from Amazon, Flipkart, and Croma
          </p>
          
          <ProductSearch onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Fetching prices from multiple platforms...</p>
            </div>
          </div>
        )}

        {products.length > 0 && !isLoading && (
          <div className="space-y-8">
            {/* ML Recommendation */}
            {mlPrediction && (
              <section>
                <h3 className="text-2xl font-semibold mb-4">AI Recommendation</h3>
                <MLRecommendation prediction={mlPrediction} productName={searchQuery} />
              </section>
            )}

            {/* Price Comparison */}
            <section>
              <h3 className="text-2xl font-semibold mb-4">
                Price Comparison
                <span className="text-lg font-normal text-muted-foreground ml-2">
                  ({products.length} results found)
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isBestDeal={bestDeal?.id === product.id}
                    priceChange={Math.random() > 0.5 ? 
                      Math.floor(Math.random() * 10) + 1 : 
                      -(Math.floor(Math.random() * 8) + 1)
                    }
                  />
                ))}
              </div>
            </section>

            {/* Price Trend Chart */}
            {priceData && (
              <section>
                <h3 className="text-2xl font-semibold mb-4">Historical Price Analysis</h3>
                <PriceTrendChart data={priceData} productName={searchQuery} />
              </section>
            )}
          </div>
        )}

        {products.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Start Your Search</h3>
              <p className="text-muted-foreground">
                Enter a product name to compare prices across multiple platforms and get ML-powered buying recommendations.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 PriceCompare Pro. Built with React, TypeScript & Machine Learning.</p>
            <p className="mt-2">Ready for Flask backend integration with MongoDB and real-time scraping.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
