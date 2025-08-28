import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Calendar, Target } from "lucide-react";

export interface MLPrediction {
  recommendation: "buy_now" | "wait" | "neutral";
  confidence: number; // 0-100
  predictedPriceDrop?: number; // Percentage
  bestBuyDate?: string; // ISO date
  reasoning: string;
  historicalTrend: "increasing" | "decreasing" | "stable";
}

interface MLRecommendationProps {
  prediction: MLPrediction;
  productName: string;
}

export const MLRecommendation = ({ prediction, productName }: MLRecommendationProps) => {
  const getRecommendationColor = () => {
    switch (prediction.recommendation) {
      case "buy_now":
        return "success";
      case "wait":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getRecommendationText = () => {
    switch (prediction.recommendation) {
      case "buy_now":
        return "Buy Now";
      case "wait":
        return "Wait for Better Price";
      default:
        return "Neutral";
    }
  };

  const getRecommendationIcon = () => {
    switch (prediction.recommendation) {
      case "buy_now":
        return <Target className="h-5 w-5" />;
      case "wait":
        return <Calendar className="h-5 w-5" />;
      default:
        return <TrendingUp className="h-5 w-5" />;
    }
  };

  return (
    <Card className="bg-gradient-to-r from-background to-accent/30 border-2">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {getRecommendationIcon()}
          ML Price Prediction
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge 
              variant={getRecommendationColor() as any}
              className="px-3 py-1 text-sm font-semibold"
            >
              {getRecommendationText()}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {prediction.confidence}% confidence
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-sm">
            {prediction.historicalTrend === "increasing" ? (
              <TrendingUp className="h-4 w-4 text-destructive" />
            ) : prediction.historicalTrend === "decreasing" ? (
              <TrendingDown className="h-4 w-4 text-success" />
            ) : null}
            <span className="capitalize text-muted-foreground">
              {prediction.historicalTrend} trend
            </span>
          </div>
        </div>

        {prediction.predictedPriceDrop && (
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-sm font-medium text-foreground">
              Expected price drop: {prediction.predictedPriceDrop}%
            </div>
            {prediction.bestBuyDate && (
              <div className="text-sm text-muted-foreground mt-1">
                Best time to buy: {new Date(prediction.bestBuyDate).toLocaleDateString()}
              </div>
            )}
          </div>
        )}

        <div className="text-sm text-muted-foreground leading-relaxed">
          {prediction.reasoning}
        </div>
      </CardContent>
    </Card>
  );
};