import { RiArrowLeftLine, RiArrowRightLine, RiSearchLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import Bookedmarked from "../components/Bookedmarked";
import {
  useGetUpcomingMoviesQuery,
  useSearchMoviesQuery,
  useGetMoviesByGenreQuery,
} from "../redux/FetchMovie";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

function NewMovies() {
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [now] = useState(() => Date.now());

  const upcomingResult = useGetUpcomingMoviesQuery(
    { page },
    { skip: debouncedSearch !== "" || selectedGenre !== "" }
  );

  const searchResult = useSearchMoviesQuery(
    { query: debouncedSearch, page },
    { skip: debouncedSearch === "" }
  );

  const genreResult = useGetMoviesByGenreQuery(
    { genreId: selectedGenre, page },
    { skip: selectedGenre === "" }
  );

  const activeResult = debouncedSearch
    ? searchResult
    : selectedGenre
    ? genreResult
    : upcomingResult;

  const { data, isLoading, isError } = activeResult;
  const movies = data?.results || [];
  const totalPages = data?.total_pages || 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  function nextPage() {
    if (page < totalPages) setPage(page + 1);
  }

  function prevPage() {
    if (page > 1) setPage(page - 1);
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
    setSelectedGenre("");
    setPage(1);
  }

  function handleGenre(e) {
    setSelectedGenre(e.target.value);
    setSearchQuery("");
    setPage(1);
  }

  if (isError)
    return (
      <div className="w-full h-screen bg-black flex flex-col items-center justify-center gap-10">
        <p className="text-red-600 text-3xl">Something went wrong.</p>
        <button className="bg-red-600 text-white text-lg px-6 py-3 rounded-md">
          Go Back
        </button>
      </div>
    );

  return (
    <div className="bg-black h-screen w-full absolute text-white">
      <div
        className={`liner w-full h-1 mt-20 ${
          isLoading ? "bg-orange-600 animate-ping" : "bg-red-600"
        }`}
      ></div>

      <div className="flex gap-20 flex-col h-150 w-full relative">
        <div className="w-full mt-20 flex justify-center items-center px-4 flex-col">
          <div className="flex flex-col justify-center items-center">
            <h1
              style={{ WebkitTextStroke: "1px white" }}
              className="font-bold text-7xl text-transparent"
            >
              What's New Coming
            </h1>
            <div className="w-full flex mt-10 font-bold text-2xl uppercase overflow-hidden gap-10 justify-center items-center text-center">
              <div className="w-full flex gap-20">
                <h1>"Coming</h1>
                <h1>soon</h1>
                <h1> to</h1>
                <h1> screen</h1>
                <h1> Stream </h1>
                <h1>near</h1>
                <h1> you."</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-10 text-white gap-10 relative flex justify-center items-center">
          <label htmlFor="input" className="flex gap-10">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="What's Coming...?"
              name="input"
              id="input"
              className="border w-140 px-10 py-4 rounded-2xl relative"
            />
            <button className="px-10 p-2 rounded-md absolute translate-y-2 translate-x-119">
              <RiSearchLine />
            </button>
          </label>

          <select
            name="Genre"
            onChange={handleGenre}
            value={selectedGenre}
            className="text-white border border-red-400 w-50 p-4 rounded-md scroller-none bg-red-600 flex flex-col justify-center items-center font-bold text-lg text-center"
            id="genre"
          >
            <option className="font-bold text-lg bg-black" value="">All Genres</option>
            <option className="font-bold text-lg bg-black" value="27">Horror</option>
            <option className="font-bold text-lg bg-black" value="12">Adventure</option>
            <option className="font-bold text-lg bg-black" value="80">Crime</option>
            <option className="font-bold text-lg bg-black" value="99">Documentary</option>
            <option className="font-bold text-lg bg-black" value="35">Comedy</option>
            <option className="font-bold text-lg bg-black" value="16">Animation</option>
          </select>
        </div>

        <div>
          <h1 className="absolute left-30 top-120 font-semibold text-[20px]">
            <span className="font-bold">RESULTS : </span>
            Total Pages : <span className="text-gray-400">{totalPages}</span>
          </h1>
        </div>
      </div>

      <div className="w-full flex flex-wrap gap-4 px-4 justify-center items-center">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="w-60">
              <Skeleton
                height={320}
                borderRadius={8}
                baseColor="#1a1a1a"
                highlightColor="#333"
              />
            </div>
          ))
        ) : movies.length === 0 ? (
          <p className="text-white text-center w-full text-xl py-20">
            No movies found. Try a different search or genre.
          </p>
        ) : (
          movies.map((movie) => (
            <div className="group w-60 h-80 rounded-md relative" key={movie.id}>
              <Link to={`/movie/${movie.id}`} className="absolute inset-0 z-0">
                <img
                  className="h-full w-full object-cover"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="absolute w-full h-full inset-0 bg-gradient-to-b from-black via-black/30 to-transparent"></div>
                <h1 className="absolute backdrop-blur-[2px] text-bold bottom-0">
                  {movie.title}
                </h1>
              </Link>

              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center z-10 pointer-events-none group-hover:pointer-events-auto">
                <Link
                  to={`/movie/${movie.id}`}
                  className="border flex py-3 px-4 gap-3 rounded-md bg-white/20 cursor-pointer font-bold hover:bg-white hover:text-black transition"
                >
                  View Description
                </Link>
              </div>

              <div className="z-10 relative">
                <Bookedmarked items={movie} />
                {now < new Date(movie.release_date).getTime() ? (
                  <h1 className="absolute left-0 font-bold">
                    Coming Soon : {movie.release_date}
                  </h1>
                ) : (
                  <h1 className="absolute bottom-0 left-0 font-bold">Released</h1>
                )}
              </div>
              <h1 className="absolute bottom-0 right-0 font-bold">
                {movie.original_language}
              </h1>
            </div>
          ))
        )}
      </div>

      <div className="w-full p-6 flex gap-10 justify-center items-center bg-black font-bold">
        <button onClick={prevPage} className="cursor-pointer h-10" disabled={page === 1}>
          <RiArrowLeftLine />
        </button>
        <span><h1>{page}</h1></span>
        <button
          onClick={nextPage}
          className="animate-pulse cursor-pointer"
          disabled={page >= totalPages}
        >
          <RiArrowRightLine />
        </button>
      </div>
    </div>
  );
}

export default NewMovies;