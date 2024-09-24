import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import MovieCard from "@/components/Moviecart";
import { fetchMovies, addFavorite } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";

interface Movie {
  imdbid: string;
  title: string;
  image: string;
  rating: string;
  year: number;
}

interface MoviesResponse {
  movies: Movie[];
  total: number;
  page: number;
  limit: number;
}

export default function Home() {
  const { data: session, status } = useSession();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        const moviesResponse = await fetchMovies(page);
        setMovies((prevMovies) => [
          ...prevMovies,
          ...moviesResponse.data.movies,
        ]);
        setHasMore(
          moviesResponse.data.movies.length === moviesResponse.data.limit
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [page]);

  const handleAddFavorite = async (movieId: string) => {
    if (status !== "authenticated") {
      router.push("/auth");
      return;
    }
    try {
      await addFavorite(movieId);
      // Optionally, you can show a success message here
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">IMDB Top 100 Movies</h1>
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button
            onClick={() => router.push("/favorites")}
            disabled={status !== "authenticated"}
          >
            View Favorites
          </Button>
        </div>
        {isLoading && movies.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : filteredMovies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.imdbid}
                  id={movie.imdbid}
                  title={movie.title}
                  imageUrl={movie.image}
                  rating={movie.rating}
                  year={movie.year}
                  isFavorite={false}
                  onToggleFavorite={handleAddFavorite}
                />
              ))}
            </div>
            {hasMore && !searchTerm && (
              <div className="mt-8 flex justify-center">
                <Button onClick={loadMore} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  Load More
                </Button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-xl">No movies found.</p>
        )}
      </div>
    </Layout>
  );
}
