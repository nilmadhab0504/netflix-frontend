import React from "react";
import { Heart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface MovieCardProps {
  id: string;
  title: string;
  imageUrl: string;
  rating: string;
  year: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function MovieCard({
  id,
  title,
  imageUrl,
  rating,
  year,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) {
  return (
    <Card className="group relative overflow-hidden">
      <AspectRatio ratio={2 / 3}>
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </AspectRatio>
      <CardContent className="absolute inset-0 p-4 flex flex-col justify-end">
        <h3 className="text-white text-lg font-semibold line-clamp-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {title}
        </h3>
        <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-white text-sm">{rating}</span>
          </div>
          <span className="text-white text-sm">{year}</span>
        </div>
      </CardContent>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
        onClick={() => onToggleFavorite(id)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className="w-6 h-6"
          fill={isFavorite ? "currentColor" : "none"}
        />
      </Button>
    </Card>
  );
}
