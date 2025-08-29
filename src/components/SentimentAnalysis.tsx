import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageCircle, ThumbsUp, ThumbsDown, Star, TrendingUp } from "lucide-react";

export interface SentimentData {
  overallSentiment: 'positive' | 'negative' | 'neutral';
  positivePercentage: number;
  negativePercentage: number;
  neutralPercentage: number;
  totalReviews: number;
  commonPositives: string[];
  commonNegatives: string[];
  recentReviews: {
    id: string;
    rating: number;
    comment: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    platform: string;
    date: string;
  }[];
}

interface SentimentAnalysisProps {
  data: SentimentData;
  productName: string;
}

export const SentimentAnalysis = ({ data, productName }: SentimentAnalysisProps) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-amber-600 bg-amber-50 border-amber-200';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <ThumbsUp className="h-4 w-4" />;
      case 'negative': return <ThumbsDown className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="glass-card border-border/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-display">Sentiment Analysis</CardTitle>
            <CardDescription>
              Based on {data.totalReviews.toLocaleString()} customer reviews for {productName}
            </CardDescription>
          </div>
          <div className={`px-4 py-2 rounded-full border ${getSentimentColor(data.overallSentiment)}`}>
            <div className="flex items-center gap-2">
              {getSentimentIcon(data.overallSentiment)}
              <span className="font-medium capitalize">{data.overallSentiment}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Sentiment Breakdown */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Sentiment Distribution</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-600">Positive</span>
                <span className="text-sm font-bold">{data.positivePercentage}%</span>
              </div>
              <Progress value={data.positivePercentage} className="h-2 bg-emerald-100" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-amber-600">Neutral</span>
                <span className="text-sm font-bold">{data.neutralPercentage}%</span>
              </div>
              <Progress value={data.neutralPercentage} className="h-2 bg-amber-100" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-600">Negative</span>
                <span className="text-sm font-bold">{data.negativePercentage}%</span>
              </div>
              <Progress value={data.negativePercentage} className="h-2 bg-red-100" />
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-emerald-600" />
              What Customers Love
            </h4>
            <div className="space-y-2">
              {data.commonPositives.map((positive, index) => (
                <Badge key={index} variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  {positive}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <ThumbsDown className="h-5 w-5 text-red-600" />
              Common Concerns
            </h4>
            <div className="space-y-2">
              {data.commonNegatives.map((negative, index) => (
                <Badge key={index} variant="secondary" className="bg-red-50 text-red-700 border-red-200">
                  {negative}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Recent Reviews
          </h4>
          <div className="space-y-4">
            {data.recentReviews.map((review) => (
              <div key={review.id} className="p-4 rounded-lg bg-card/50 border border-border/30">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {review.platform}
                    </Badge>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${getSentimentColor(review.sentiment)}`}>
                    {getSentimentIcon(review.sentiment)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};