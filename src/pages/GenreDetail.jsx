import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Bookedmarked from "../components/Bookedmarked";

function GenreDetail() {
  const { genreName } = useParams();
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apikey = import.meta.env.VITE_API_KEY;

  async function fetchGenreContent() {
    setIsLoading(true);

    // Step A: Movie genre list se naam match karke ID nikalo
    const movieGenresRes = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`
    );
    const movieGenresData = await movieGenresRes.json();
    const movieGenre = movieGenresData.genres.find(
      (g) => g.name.toLowerCase() === genreName.toLowerCase()
    );

    // Step B: TV genre list se bhi naam match karke ID nikalo
    const tvGenresRes = await fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${apikey}&language=en-US`
    );
    const tvGenresData = await tvGenresRes.json();
    const tvGenre = tvGenresData.genres.find(
      (g) => g.name.toLowerCase() === genreName.toLowerCase()
    );

    // Step C: Dono IDs mil jaye to dono fetch karo
    if (movieGenre) {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=${movieGenre.id}&sort_by=popularity.desc`
      );
      const movieData = await movieRes.json();
      setMovies(movieData.results);
    } else {
      setMovies([]);
    }

    if (tvGenre) {
      const tvRes = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apikey}&with_genres=${tvGenre.id}&sort_by=popularity.desc`
      );
      const tvData = await tvRes.json();
      setSeries(tvData.results);
    } else {
      setSeries([]);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchGenreContent();
    window.scrollTo(0, 0);
  }, [genreName]);

  return (
    <div className="w-full min-h-screen bg-black text-white p-10 pt-24">
      <h1
        style={{ WebkitTextStroke: "1px white" }}
        className="font-bold text-6xl text-transparent mb-10"
      >
        {genreName}
      </h1>

      {/* Movies section */}
      <h2 className="text-2xl font-bold mb-4">Movies</h2>
      <div className="w-full flex flex-wrap gap-4 mb-12">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-52">
              <Skeleton height={280} borderRadius={8} baseColor="#1a1a1a" highlightColor="#333" />
            </div>
          ))
        ) : movies.length === 0 ? (
          <p className="text-gray-400">No movies found for this genre.</p>
        ) : (
          movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="w-52 relative group"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover rounded-lg"
              />
              <p className="text-sm mt-2">{movie.title}</p>
            </Link>
          ))
        )}
      </div>

      {/* Series section */}
      <h2 className="text-2xl font-bold mb-4">Series</h2>
      <div className="w-full flex flex-wrap gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-52">
              <Skeleton height={280} borderRadius={8} baseColor="#1a1a1a" highlightColor="#333" />
            </div>
          ))
        ) : series.length === 0 ? (
          <p className="text-gray-400">No series found for this genre.</p>
        ) : (
          series.map((serie) => (
            <Link
              key={serie.id}
              to={`/series/${serie.id}`}
              className="w-52 relative group"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                alt={serie.name}
                className="w-full h-72 object-cover rounded-lg"
              />
              <p className="text-sm mt-2">{serie.name}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default GenreDetail;