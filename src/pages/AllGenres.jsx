import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import Bookedmarked from "../components/Bookedmarked";
import {
  useGetMoviesByGenreQuery,
  useGetMoviesByCountryQuery,
  useGetAdultMoviesQuery,
} from "../redux/FetchMovie";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

function AllGenres() {
  const [activeTab, setActiveTab] = useState("genre");
  const [selectedGenre, setSelectedGenre] = useState("28");
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [page, setPage] = useState(1);

  const [now] = useState(() => Date.now());
  const genres = [
    { id: "28", name: "Action" },
    { id: "12", name: "Adventure" },
    { id: "16", name: "Animation" },
    { id: "35", name: "Comedy" },
    { id: "80", name: "Crime" },
    { id: "99", name: "Documentary" },
    { id: "18", name: "Drama" },
    { id: "10751", name: "Family" },
    { id: "14", name: "Fantasy" },
    { id: "27", name: "Horror" },
    { id: "9648", name: "Mystery" },
    { id: "10749", name: "Romance" },
    { id: "878", name: "Science Fiction" },
    { id: "53", name: "Thriller" },
    { id: "10752", name: "War" },
  ];

  const countries = [
    { code: "US", name: "USA" },
    { code: "GB", name: "UK" },
    { code: "IN", name: "India" },
    { code: "PK", name: "Pakistan" },
    { code: "KR", name: "South Korea" },
    { code: "JP", name: "Japan" },
    { code: "FR", name: "France" },
    { code: "CN", name: "China" },
  ];

  const genreResult = useGetMoviesByGenreQuery(
    { genreId: selectedGenre, page },
    { skip: activeTab !== "genre" }
  );

  const countryResult = useGetMoviesByCountryQuery(
    { country: selectedCountry, page },
    { skip: activeTab !== "country" }
  );

  const adultResult = useGetAdultMoviesQuery(
    { page },
    { skip: activeTab !== "adult" }
  );

  const activeResult =
    activeTab === "genre" ? genreResult :
    activeTab === "country" ? countryResult :
    adultResult;

  const { data, isLoading, isError } = activeResult;
  const movies = data?.results || [];
  const totalPages = data?.total_pages || 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, selectedGenre, selectedCountry, page]);

  function switchTab(tab) {
    setActiveTab(tab);
    setPage(1);
  }

  function nextPage() {
    if (page < totalPages) setPage(page + 1);
  }

  function prevPage() {
    if (page > 1) setPage(page - 1);
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
    <div className="bg-black min-h-screen w-full absolute text-white">
      <div
        className={`liner w-full h-1 my-20 ${
          isLoading ? "bg-orange-600 animate-ping" : "bg-red-600"
        }`}
      ></div>

      <div className="w-full flex flex-col items-center px-4">
        <h1
          style={{ WebkitTextStroke: "1px white" }}
          className="font-bold text-7xl text-transparent mb-10"
        >
          Explore
        </h1>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => switchTab("genre")}
            className={`px-6 py-2 rounded-md font-bold border ${
              activeTab === "genre" ? "bg-red-600 border-red-600" : "border-white/30"
            }`}
          >
            By Genre
          </button>
          <button
            onClick={() => switchTab("country")}
            className={`px-6 py-2 rounded-md font-bold border ${
              activeTab === "country" ? "bg-red-600 border-red-600" : "border-white/30"
            }`}
          >
            By Country
          </button>
          <button
            onClick={() => switchTab("adult")}
            className={`px-6 py-2 rounded-md font-bold border ${
              activeTab === "adult" ? "bg-red-600 border-red-600" : "border-white/30"
            }`}
          >
            18+
          </button>
        </div>

        {activeTab === "genre" && (
          <div className="flex flex-wrap gap-3 justify-center mb-10 max-w-4xl">
            {genres.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setSelectedGenre(g.id);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                  selectedGenre === g.id
                    ? "bg-white text-black border-white"
                    : "border-white/30 text-white"
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        )}

        {activeTab === "country" && (
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {countries.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setSelectedCountry(c.code);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                  selectedCountry === c.code
                    ? "bg-white text-black border-white"
                    : "border-white/30 text-white"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        {activeTab === "adult" && (
          <p className="text-gray-400 text-sm mb-10">
            Showing mature/adult-flagged content from TMDB.
          </p>
        )}

        <h1 className="self-start font-semibold text-lg mb-4">
          <span className="font-bold">RESULTS : </span>
          Total Pages : <span className="text-gray-400">{totalPages}</span>
        </h1>
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
          movies.map((movie) => {
            const releaseDate = movie.release_date ? new Date(movie.release_date).getTime() : null;
            const isComingSoon = releaseDate !== null && now < releaseDate;

            return (
              <div className="group w-60 h-80 rounded-md relative" key={movie.id}>
                <Link to={`/movie/${movie.id}`} className="absolute inset-0 z-0">
                  <img
                    className="h-full w-full absolute object-cover rounded-md"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/fallback.jpg"
                    }
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
                  {isComingSoon ? (
                    <h1 className="absolute bottom-0 left-0 font-bold">
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
            );
          })
        )}
      </div>

      <div className="w-full p-6 flex gap-10 justify-center items-center bg-black font-bold">
        <button onClick={prevPage} className="cursor-pointer h-10" disabled={page === 1}>
          <RiArrowLeftLine />
        </button>
        <span><h1>{page}</h1></span>
        <button onClick={nextPage} className="animate-pulse cursor-pointer" disabled={page >= totalPages}>
          <RiArrowRightLine />
        </button>
      </div>
    </div>
  );
}

export default AllGenres;