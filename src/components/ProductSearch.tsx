import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductSearchProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const ProductSearch = ({ onSearch, isLoading = false }: ProductSearchProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for products (e.g., iPhone 14, Samsung TV, MacBook)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base shadow-md border-2 focus:border-primary/30"
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          variant="hero" 
          size="lg" 
          disabled={isLoading || !query.trim()}
          className="h-12 px-8"
        >
          {isLoading ? "Searching..." : "Compare Prices"}
        </Button>
      </form>
    </div>
  );
};