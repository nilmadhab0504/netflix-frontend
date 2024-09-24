import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import MovieCard from "@/components/Moviecart";
import { fetchFavorites, removeFavorite } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Movie {
  imdbid: string;
  title: string;
  image: string;
  rating: string;
  year: number;
}

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadFavorites = async () => {
      if (session) {
        try {
          setIsLoading(true);
          const response = await fetchFavorites();
          setFavorites(response.data);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (status === "authenticated") {
      loadFavorites();
    } else if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [session, status, router]);

  const handleRemoveFavorite = async (movieId: string) => {
    try {
      await removeFavorite(movieId);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((movie) => movie.imdbid !== movieId)
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Favorite Movies</h1>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.imdbid}
                id={movie.imdbid}
                title={movie.title}
                imageUrl={movie.image}
                rating={movie.rating}
                year={movie.year}
                isFavorite={true}
                onToggleFavorite={handleRemoveFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl mb-4">You haven't added any favorites yet.</p>
            <Button onClick={() => router.push("/")}>Explore Movies</Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
