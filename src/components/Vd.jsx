import Doom from '../assets/doomsday.mp4'
import Cicle from '../assets/circle.png'
import { useEffect, useState } from 'react';
import "swiper/css";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import HorrorCard from './HorrorCard';
import Genres from './Genres';
import Harrypotter from './Harrypotter';
import laptop from '../assets/laptop.png'
import mobile from '../assets/mobile.png'
import StrangerThings from './StrangerThings';
import Footer from './Footer';

function Vd() {
         const [movies, setMovies] = useState([])
        const [now] = useState(() => Date.now())
        const apikey = import.meta.env.VITE_API_KEY;
        async function bb(){
          const data = await fetch(     `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_companies=420&language=en-US&sort_by=popularity.desc`)
          const res =  await data.json()
         setMovies(res.results)
     
        
        }
        useEffect(()=> 
        {
                bb()
        },[])
        
  return (
    <div className="h-screen w-full  ">
         <div className="circlemax h-80   w-120  absolute ">
 <div className="one w-full h-full bg-red-600 absolute"></div>
 <div className="two  bg-red-600  absolute right-0"></div>
<div className="three    bg-red-600 absolute"></div>
</div>
<div className="v h-full z-[999] relative  w-full px-4 md:px-10  lg:px-20">
    <h1 className='text-7xl py-20 font-bold flex w-full border justify-center
     items-center text-center text-transparent'
       style={{ WebkitTextStroke: '1px white' }}
     >"Lights. Camera. Discover."</h1>
    <video className="h-100 w-full object-cover  border-white/30 
 rounded-4xl  
    
    " 
    autoPlay muted preload='auto'
    
    src={Doom}></video>
    </div> 

    <div className="w-full flex mt-10 font-bold text-6xl uppercase text-transparent
    overflow-hidden
    
    gap-10 justify-center items-center text-center" style={{WebkitTextStroke:'1px white'}}>
<div className="w-full flex gap-20 scoll">
       <h1>See </h1>
        <img src={Cicle} className='h-10 w-10' alt="" />
            <h1>It </h1>
                    <img src={Cicle} className='h-10 w-10' alt="" />
 <h1> Before</h1>
         <img src={Cicle} className='h-10 w-10' alt="" />
 <h1>You</h1>
        <img src={Cicle} className='h-10 w-10' alt="" />
 <h1> Stream </h1>
         <img src={Cicle} className='h-10 w-10' alt="" />
 <h1>It</h1>
          
                 <h1>See </h1>
        <img src={Cicle} className='h-10 w-10' alt="" />
            <h1>It </h1>
                    <img src={Cicle} className='h-10 w-10' alt="" />
 <h1> Before</h1>
         <img src={Cicle} className='h-10 w-10' alt="" />
 <h1>You</h1>
        <img src={Cicle} className='h-10 w-10' alt="" />
 <h1> Stream </h1>
         <img src={Cicle} className='h-10 w-10' alt="" />
 <h1>It</h1>
        <h1>See </h1>
        <img src={Cicle} className='h-10 w-10' alt="" />
            <h1>It </h1>
                    <img src={Cicle} className='h-10 w-10' alt="" />
 <h1> Before</h1>
         <img src={Cicle} className='h-10 w-10' alt="" />
 <h1>You</h1>
        <img src={Cicle} className='h-10 w-10' alt="" />
 <h1> Stream </h1>
         <img src={Cicle} className='h-10 w-10' alt="" />
 <h1>It</h1>
</div>
    </div>
<div className="w-full h-screen bg-black relative">

<div className="three  right-0  bg-red-600 absolute"></div>
<div className="relative 
  w-full h-100 overflow-x-hidden mt-20 flex justify-center  pointer-events-none
items-center flex-1">
        {movies.length > 0 && (
<Swiper 
  dir="rtl"
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
<div className="absolute w-full h-full inset-0 bg-gradient-to-b from-black via-black/30 to-transparent"></div>
      <div className="absolute top-0 left-0 
     flex text-start
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
<h1 className="absolute top-0 right-0 text-center flex">{movie.vote_average.toFixed(1)}</h1>
 

</SwiperSlide>
))}
</Swiper>
        )}


</div>
<div 

className="flex justify-start relative
 items-center text-2xl font-sans  font-bold  ">
<div className="three  left-0  bg-red-600 absolute"></div>

        <h1 
        style={{WebkitTextStroke:'1px red'}}
        className="border rounded-sm bg-red-950 animate-pulse animate-ping 
text-transparent
        p-2 my-4">From Heros To Horror</h1>
</div>
<HorrorCard/>
<div className="w-full h-1 bg-red-600 my-5">

</div>
<div className="h-auto   w-full bg-black">
   <Genres/>

  <div className="h-20  mt-20  w-full flex justify-evenly ">
    <img 
    className="h-20 w-40 object-cover"
    src="https://imgs.search.brave.com/_ZUHp45FODruCarsG44QY-p5TugaadTpd1NiZLVgSK8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMjMvSGFy/cnktUG90dGVyLUxv/Z28tUE5HLUltYWdl/LnBuZw" alt="" />

     <img 
    className="h-20 w-60 object-cover"
    src="https://imgs.search.brave.com/MQXKTGP_5ta_fjqZ7Gx6U_YWHJ-EaNolPSVTVShzLQc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTMvQXZl/bmdlcnMtTG9nby1Q/TkctUGhvdG8ucG5n" alt="" />

    <img 
    className="h-20 w-40  object-cover"
    src="https://imgs.search.brave.com/l6F0cHln7_2K1KlTU4-V_vqTyePKTq5vbIVZvTjonOs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvcHJl/dmlld3MvMDI3LzEy/Ny80NTcvbm9uXzJ4/L3N0YXItd2Fycy1s/b2dvLXN0YXItd2Fy/cy1pY29uLXRyYW5z/cGFyZW50LWZyZWUt/cG5nLnBuZw" alt="" />
   <img 
    className="h-20 w-40  object-cover"
    src="
  
  https://imgs.search.brave.com/p-j-b9PuBf7LdHPS5iIdYABmLXI6Fo87-TeDZvDjusE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2xvZ29z/LmNvbS91cGxvYWRz/L3N0cmFuZ2VyLXRo/aW5ncy1sb2dvLXBu/Zy9zdHJhbmdlci10/aGluZ3MtbW92aWUt/cHJlZGF0b3ItbG9n/by05LnBuZw
  " alt="" />



   </div>
</div>
<div className="h-screen w-full bg-black text-white  relative">
        <div 

className="flex justify-end 
 items-center text-2xl font-sans  font-bold mb-10 ">

        <h1 
     
        className="border border-blue-400 rounded-sm bg-blue-650 animate-pulse animate-ping 
text-blue-400
        p-2 px-4 "> Nostalgia!
        </h1>
       

</div>
 <div className="three  right-0 top-10 bg-blue-500 absolute"></div>
<Harrypotter/>
<StrangerThings/>
<div className="h-100 my-30
font-mono relative
w-full flex justify-center items-center">


        <div className="">
  <h1 className='font-bold  relative text-lg '>"Where every story finds its screen."</h1>
        </div>
<div className="flex  relative">
        <img src={laptop}  className=''  alt="" />
<img src={mobile} className='w-50 h-60  absolute bottom-0 ' alt="" />

</div>
<div className="">
<h1 className='font-bold text-lg '>
        "Popcorn's on you. The movies are on us."

</h1>
</div>
</div>
<div className="w-full h-1 bg-red-600 my-5">

</div>
  <div className=" w-full z-50">
         <Footer />
   
   </div>
</div>
</div>


</div>
 
  )
}

export default Vd;