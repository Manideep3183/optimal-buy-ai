import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export interface PriceTrendData {
  date: string;
  amazon?: number;
  flipkart?: number;
  croma?: number;
}

interface PriceTrendChartProps {
  data: PriceTrendData[];
  productName: string;
}

export const PriceTrendChart = ({ data, productName }: PriceTrendChartProps) => {
  const formatPrice = (value: number) => `₹${value.toLocaleString()}`;
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Price Trend Analysis
          <span className="text-sm font-normal text-muted-foreground">
            Last 30 days
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={formatPrice}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value: number) => [formatPrice(value), '']}
                labelFormatter={(label) => `Date: ${formatDate(label)}`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="amazon" 
                stroke="#FF9900" 
                strokeWidth={2}
                dot={{ fill: '#FF9900', strokeWidth: 2, r: 4 }}
                name="Amazon"
              />
              <Line 
                type="monotone" 
                dataKey="flipkart" 
                stroke="#047BD8" 
                strokeWidth={2}
                dot={{ fill: '#047BD8', strokeWidth: 2, r: 4 }}
                name="Flipkart"
              />
              <Line 
                type="monotone" 
                dataKey="croma" 
                stroke="#E42529" 
                strokeWidth={2}
                dot={{ fill: '#E42529', strokeWidth: 2, r: 4 }}
                name="Croma"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};