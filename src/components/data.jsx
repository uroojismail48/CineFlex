import { useEffect, useState } from "react";
import Main from "./Main";
import Navbar from './Navbar'
import NewMovies from "../pages/NewMovies";
import AllGenres from "../pages/AllGenres"
import { Route, Routes } from "react-router-dom";
import Series from "../pages/Series";
import SeriesDetails from "../pages/SeriesDetails";
import WishList from "../pages/WishList";
import DetailedPage from "../pages/Detailedpage";
import NotFound from "../pages/404Page";
import GenreDetail from "../pages/GenreDetail";
function Data() {
  const [movies, setMovies] = useState([]);
  const apikey = import.meta.env.VITE_API_KEY;

  async function apiFetch() {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`
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
         <Navbar className=""/>
   </div>
  <Routes>
  <Route path="/" element={  <Main movies={movies} />}/>
    <Route path="/NewMovies" element={<NewMovies/>}/>
            <Route path="/Genre" element={<AllGenres/>}/>
            
                  <Route path="/Series" element={<Series/>}/>
                  <Route path="/Wishlists" element={<WishList/>}/>
      <Route path="/movie/:movieId" element={<DetailedPage/>}/>
<Route path="/series/:seriesId" element={<SeriesDetails />} />
<Route  path="*" element={<NotFound />} />
<Route path="/genre/:genreName" element={<GenreDetail />} />
</Routes>

    </div>
  );
}

export default Data;