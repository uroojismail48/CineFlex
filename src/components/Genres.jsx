import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Genres() {
  const [genres, setGenres] = useState([]);
  const [hoveredGenre, setHoveredGenre] = useState(null);
  const [genreMovies, setGenreMovies] = useState([]);
  const apikey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  async function getGenreList() {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`
    );
    const data = await res.json();
    setGenres(data.genres);
  }

  async function getMoviesByGenre(genreId) {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=${genreId}&sort_by=popularity.desc`
    );
    const data = await res.json();
    setGenreMovies(data.results);
  }

  useEffect(() => {
    getGenreList();
  }, []);

  function handleMouseEnter(genre) {
    setHoveredGenre(genre.id);
    getMoviesByGenre(genre.id);
  }

  function handleMouseLeave() {
    setHoveredGenre(null);
    setGenreMovies([]);
  }

  function handleGenreClick(genre) {
    navigate(`/genre/${genre.name}`);   // 👈 naam se navigate
  }

  return (
    <div className="w-full h-auto mt-30">
      {genres.slice(0, 6).map((genre) => (
        <div
          key={genre.id}
          onClick={() => handleGenreClick(genre)}   // 👈 click handler add kiya
          className="relative cursor-pointer w-full border-b hover:text-red-600 h-20 transition-colors duration-200 flex justify-center items-center text-8xl text-white font-bold"
          onMouseEnter={() => handleMouseEnter(genre)}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className="absolute z-50">{genre.name}</h1>

          {hoveredGenre === genre.id && genreMovies.length > 0 && (
            <div className="absolute top-0 skew-3 transition-all transition-discrete flex justify-between left-0 overflow-x-auto">
              {genreMovies.slice(0, 5).map((movie) => (
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="h-20 w-100 object-cover transition-all transition-discrete shrink-0"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Genres;