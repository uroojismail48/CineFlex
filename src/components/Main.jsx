import { useEffect } from 'react';

import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules'; 
import Cards from './Cards'
import "swiper/css";
import Vd from './Vd';

import TrailerBtn from './TrailerBtn';
function Main({movies}) {
    useEffect(()=> {
    new Swiper(".swiper", {
        slidesPerView:1,
        spaceBetween:20,
         modules: [Autoplay], 
          autoplay: {
          delay: 3000,              
          disableOnInteraction: false,
    } })
},[])

  return (
    <div className="bg-black h-screen w-full relative ">
        <div className="w-full absolute top-0 left-0  z-9999">
        
        </div>
<div className="swiper h-full w-full">
    <div className="swiper-wrapper" >
      {movies.map((movie)=> (
            
            <div className="swiper-slide bg-black w-full h-full relative cursor-pointer " key={movie.id}>
               
       <img
    className="h-full w-full object-cover"
    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
    alt={movie.title}
  />
  <div className="absolute w-full h-full inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10">
  <div className="pl-20 w-160 gap-8  h-full flex justify-center items-start flex-col ">
       <h1 className='text-6xl font-bold '>{movie.title}</h1>
          <div className="flex justify-start  gap-5 "><h5>Available in : <b>{movie.original_language}</b></h5>
           <p>Polularity: <b>
             {
            Math.floor(movie.popularity) / 100
            }
            </b> <span >({movie.popularity
            }) </span> </p>
            <p> released On : <b>{movie.release_date}</b></p>
            </div>
 <div className="">
    <h1>{movie.overview}</h1>
   </div>


  <TrailerBtn  movieId={movie.id}  />


  </div>

  </div>
            </div>

        ))}
    </div>
</div>

<Cards className="absolute z-99999 -bottom-80 " />

<div className="h-screen w-full  mt-90 ">
<Vd/>
</div>
    </div>
  )
}

export default Main;