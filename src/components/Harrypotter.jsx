import { useEffect, useState } from "react";

import "swiper/css";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
function Harrypotter() {
    const [now] = useState(() => Date.now())
    const [movies, setMovies] = useState([])
 async function getHarryPotter() {

  const apikey = import.meta.env.VITE_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/collection/1241?api_key=${apikey}&language=en-US`
  );
  const data = await res.json();
 
 setMovies(data.parts)
}

useEffect(() => {
getHarryPotter()
},[])


    return (
    <div className="w-full h-110 bg-black text-white  ">
   <div className="relative
   w-full h-100 overflow-x-hidden  flex justify-center  pointer-events-none
        items-center flex-1">
                {movies.length > 0 && (
        <Swiper

        spaceBetween={10}
        loop={true}
        speed={4000 }
        slidesPerView="auto"
          freeMode={{
               enabled: true,
          momentum: false,
        }}
          autoplay={{
            delay: 0,

          }}
         modules={[Autoplay, FreeMode]}
        className="w-full h-full  absolute"

        >
                {movies.map((movie) => (
        <SwiperSlide className='  h-[60px]
         !w-[300px] flex shrink-0 justify-center items-center' key={movie.id}>
              <img
                className="h-full w-full object-cover "
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
        <div className="absolute w-full h-full inset-0 bg-gradient-to-b from-black via-black/40 to-transparent"></div>
              <div className="absolute top-10 left-0

              px-4 border

              border-white/60 backdrop-blur-[2px] text-bold rounded-md ">
                <h1>{movie.title}</h1>

              </div>
               <h1  className='absolute bottom-0 right-0 font-bold'>{movie.original_language}</h1>
                {now < new Date( movie.release_date).getTime() ? (

                    <h1  className='absolute bottom-0 left-0 font-bold'>Coming Soon : {movie.release_date}</h1>
               ): (
         <h1  className='absolute bottom-0 left-0 font-bold'>Released</h1>
               )



        }
        <h1 className="absolute top-0 right-5 font-bold text-center flex">{movie.vote_average.toFixed(1)}</h1>


        </SwiperSlide>
        ))}
        </Swiper>
                )}


        </div>

</div>

  )
}

export default Harrypotter
