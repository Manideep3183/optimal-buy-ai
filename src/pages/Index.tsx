import { useState } from "react";
import { ProductSearch } from "@/components/ProductSearch";
import { ProductCard, Product } from "@/components/ProductCard";
import { MLRecommendation } from "@/components/MLRecommendation";
import { PriceTrendChart } from "@/components/PriceTrendChart";
import { SentimentAnalysis } from "@/components/SentimentAnalysis";
import { useToast } from "@/hooks/use-toast";
import { generateMockProducts, generateMLPrediction, generatePriceTrendData, generateSentimentData } from "@/data/mockData";
import { Loader2, ShoppingCart, TrendingUp, Zap, MessageCircle } from "lucide-react";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mlPrediction, setMLPrediction] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [sentimentData, setSentimentData] = useState(null);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockProducts = generateMockProducts(query);
      const prediction = generateMLPrediction(query);
      const trendData = generatePriceTrendData(query);
      const sentiment = generateSentimentData(query);
      
      setProducts(mockProducts);
      setMLPrediction(prediction);
      setPriceData(trendData);
      setSentimentData(sentiment);
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
      <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-primary-light/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Header */}
      <header className="glass-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-primary to-primary-light flex items-center justify-center shadow-lg animate-glow">
                <ShoppingCart className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold gradient-text">PriceCompare Pro</h1>
                <p className="text-sm text-muted-foreground">Smart shopping with AI predictions</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-background/50 backdrop-blur-sm">
                <Zap className="h-4 w-4 text-primary" />
                <span>Real-time prices</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-background/50 backdrop-blur-sm">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>AI predictions</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <section className="text-center py-16 mb-12">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-scale-in">
              <Zap className="h-4 w-4" />
              <span>Powered by Machine Learning</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 gradient-text leading-tight">
              Smart Price
              <br />
              Comparison
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover the best deals with AI-powered predictions across 
              <span className="font-semibold text-foreground"> Amazon, Flipkart, and Croma</span>
            </p>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <ProductSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </section>

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center animate-scale-in">
              <div className="relative mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-primary-light mx-auto animate-pulse" />
                <Loader2 className="h-8 w-8 animate-spin absolute top-4 left-1/2 transform -translate-x-1/2 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Analyzing Prices</h3>
              <p className="text-muted-foreground">Scanning Amazon, Flipkart, and Croma for the best deals...</p>
              <div className="flex justify-center space-x-1 mt-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        {products.length > 0 && !isLoading && (
          <div className="space-y-12 animate-fade-in">
            {/* ML Recommendation */}
            {mlPrediction && (
              <section className="animate-slide-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-primary-light flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-3xl font-display font-bold">AI Recommendation</h3>
                </div>
                <MLRecommendation prediction={mlPrediction} productName={searchQuery} />
              </section>
            )}

            {/* Price Comparison */}
            <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-primary-light flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-3xl font-display font-bold">Price Comparison</h3>
                </div>
                <div className="px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm">
                  <span className="text-sm font-medium text-muted-foreground">
                    {products.length} results found
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard
                      product={product}
                      isBestDeal={bestDeal?.id === product.id}
                      priceChange={Math.random() > 0.5 ? 
                        Math.floor(Math.random() * 10) + 1 : 
                        -(Math.floor(Math.random() * 8) + 1)
                      }
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Price Trend Chart */}
            {priceData && (
              <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-primary-light flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-3xl font-display font-bold">Historical Price Analysis</h3>
                </div>
                <PriceTrendChart data={priceData} productName={searchQuery} />
              </section>
            )}

            {/* Sentiment Analysis */}
            {sentimentData && (
              <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-primary-light flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-3xl font-display font-bold">Customer Sentiment</h3>
                </div>
                <SentimentAnalysis data={sentimentData} productName={searchQuery} />
              </section>
            )}
          </div>
        )}

        {products.length === 0 && !isLoading && (
          <div className="text-center py-20 animate-fade-in">
            <div className="max-w-lg mx-auto">
              <div className="relative mb-8">
                <div className="h-24 w-24 rounded-full bg-gradient-to-r from-primary/20 to-primary-light/20 mx-auto flex items-center justify-center mb-4">
                  <ShoppingCart className="h-12 w-12 text-primary animate-float" />
                </div>
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-primary rounded-full animate-pulse" />
                <div className="absolute -bottom-2 -left-2 h-4 w-4 bg-primary-light rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Ready to Find Great Deals?</h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Enter any product name to compare prices across <strong>Amazon</strong>, <strong>Flipkart</strong>, and <strong>Croma</strong> 
                with AI-powered buying recommendations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="font-medium">Real-time Prices</p>
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="font-medium">AI Predictions</p>
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <ShoppingCart className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="font-medium">Best Deals</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary-light/5 to-primary/5" />
        <div className="glass-card border-t relative">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-primary-light flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-display font-bold gradient-text">PriceCompare Pro</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Built with React, TypeScript & Machine Learning. Ready for Flask backend integration with MongoDB and real-time scraping.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <span>© 2024 PriceCompare Pro</span>
                <span>•</span>
                <span>AI-Powered Shopping</span>
                <span>•</span>
                <span>Multi-Platform Comparison</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
