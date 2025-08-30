"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Funnel, Search, X } from "lucide-react";
import CountryFilter from "./CountryFilter";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const SearchAndFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );

  const updateSearchParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  // Handle search input change with debounce 
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    const timeoutId = setTimeout(() => {
      updateSearchParams("search", value);
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handleClearAll = () => {
    setSearchInput("");
    router.push("/dashboard");
  };

  return (
    <div className="container mt-10">
      <Card className="p-5">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <Funnel />
            <h1 className="text-lg font-semibold">Search & Filter</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Filter and search through the influencer directory
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-center gap-3 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or username"
              className="pl-8"
              value={searchInput}
              onChange={handleSearchChange}
            />
          </div>

          <Select
            value={searchParams.get("platform") || ""}
            onValueChange={(value) => updateSearchParams("platform", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INSTAGRAM">Instagram</SelectItem>
              <SelectItem value="YOUTUBE">YouTube</SelectItem>
              <SelectItem value="X">X (formerly Twitter)</SelectItem>
              <SelectItem value="TIKTOK">TikTok</SelectItem>
            </SelectContent>
          </Select>

          <CountryFilter
            onSelect={(code) => updateSearchParams("country", code)}
            value={searchParams.get("country") || ""}
          />

          <Select
            value={searchParams.get("category") || ""}
            onValueChange={(value) => updateSearchParams("category", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="beauty">Beauty</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Min followers"
            type="number"
            value={searchParams.get("minFollowers") || ""}
            onChange={(e) => updateSearchParams("minFollowers", e.target.value)}
          />

          <Select
            value={searchParams.get("sortBy") || ""}
            onValueChange={(value) => updateSearchParams("sortBy", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="followers-desc">
                Followers (High to Low)
              </SelectItem>
              <SelectItem value="followers-asc">
                Followers (Low to High)
              </SelectItem>
              <SelectItem value="engagement-desc">
                Engagement (High to Low)
              </SelectItem>
              <SelectItem value="engagement-asc">
                Engagement (Low to High)
              </SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="w-full" onClick={handleClearAll}>
            <X className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SearchAndFilter;
