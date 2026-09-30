import { useEffect, useState, lazy, Suspense } from "react";
import Main from "./Main";
import Navbar from "./Navbar";
const NewMovies = lazy(() => import("../pages/NewMovies"));
const AllGenres = lazy(() => import("../pages/AllGenres"));
import { Route, Routes } from "react-router-dom";
const Series = lazy(() => import("../pages/Series"));
const SeriesDetails = lazy(() => import("../pages/SeriesDetails"));
const WishList = lazy(() => import("../pages/WishList"));
const DetailedPage = lazy(() => import("../pages/Detailedpage"));
const NotFound = lazy(() => import("../pages/404Page"));
const GenreDetail = lazy(() => import("../pages/GenreDetail"));

const Signup = lazy(() => import("../pages/Auth/SignUp"));
const Login = lazy(() => import("../pages/Auth/Login"));
import ProtectedRoutes from "../JS/ProtectedRoutes";

function Data() {

  const [movies, setMovies] = useState([]);
  const apikey = import.meta.env.VITE_API_KEY;

  async function apiFetch() {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`,
    );
    const data = await res.json();

    setMovies(data.results);
  }

  useEffect(() => {
    apiFetch();
  }, []);

  return (
    <div className="w-full h-screen bg-black text-white relative ">
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar className="" />
      </div>
              <Suspense fallback={<p> loading...</p>}>
     
       
      <Routes>

        <Route path="/" element={<Main movies={movies} />} />
        <Route path="/NewMovies" element={<NewMovies />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/Wishlists" element={<WishList />} />
          <Route path="/movie/:movieId" element={<DetailedPage />} />
          <Route path="/series/:seriesId" element={<SeriesDetails />} />

          <Route path="/Series" element={<Series />} />
          <Route path="/Genre" element={<AllGenres />} />
          <Route path="/genre/:genreName" element={<GenreDetail />} />
        </Route>

        <Route
          path="/Signup/*"
          element={<Signup routing="path" path="/Signup" />}
        />
        <Route
          path="/Signin/*"
          element={<Login routing="path" path="/Signin" />}
        />
      </Routes>
       </Suspense>
    </div>
  );
}

export default Data;
