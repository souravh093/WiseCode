"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  active: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  active = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange = () => {},
}: PaginationProps) {
  const pages: React.ReactNode[] = [];

  // Dynamic pagination logic
  const getVisiblePages = () => {
    const delta = 2; // Show 2 pages before and after current
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, active - delta);
      i <= Math.min(totalPages - 1, active + delta);
      i++
    ) {
      range.push(i);
    }

    if (active - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (active + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = totalPages <= 1 ? [1] : getVisiblePages();

  visiblePages.forEach((page, index) => {
    if (page === "...") {
      pages.push(
        <Button
          key={`ellipsis-${index}`}
          size="sm"
          className="h-8 w-8 rounded-none bg-white text-gray-700 border cursor-default"
          variant="ghost"
          disabled
        >
          ...
        </Button>
      );
    } else {
      pages.push(
        <Button
          key={page}
          size="sm"
          className={cn(
            "h-8 w-8 rounded-none cursor-pointer",
            active === page
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "bg-white text-gray-700 hover:bg-gray-50 border"
          )}
          onClick={() => onPageChange(page as number)}
          variant={active === page ? "default" : "ghost"}
        >
          {page}
        </Button>
      );
    }
  });

  return (
    <div className="flex items-center justify-between mt-4 container mb-10">
      {/* Left side text - Dynamic */}
      <p className="text-sm text-gray-600">
        Showing {totalItems} entries (Page {active} of {totalPages})
      </p>

      {/* Right side pagination */}
      <nav className="flex items-center">
        <ul className="flex items-center gap-1 bg-white border border-gray-200 rounded-md shadow-sm">
          <li>
            <Button
              size="sm"
              className={cn(
                "h-8 w-8 rounded-none flex items-center justify-center transition-all duration-200 cursor-pointer",
                active === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
              )}
              onClick={() => onPageChange(active - 1)}
              disabled={active === 1}
              variant="ghost"
            >
              {"<"}
            </Button>
          </li>
          {pages.map((page, idx) => (
            <li key={idx}>{page}</li>
          ))}
          <li>
            <Button
              size="sm"
              className={cn(
                "h-8 w-8 rounded-none flex items-center justify-center transition-all duration-200 cursor-pointer",
                active === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
              )}
              onClick={() => onPageChange(active + 1)}
              disabled={active === totalPages || totalPages <= 1}
              variant="ghost"
            >
              {">"}
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
