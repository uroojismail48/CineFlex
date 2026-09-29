import { useState } from "react";
import { RiBookmarkFill, RiUserFill} from  "@remixicon/react";
import { Link } from "react-router-dom";
import { SignedOut, UserButton } from "@clerk/clerk-react";








function Navbar({className = ""}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`w-full  ${className} px-20 `}>
      <div className="flex  rounded-md justify-between items-center px-4 py-4">
     <div className="">
         <h1 className="font-extrablack  justify-center text-4xl flex items-center text-red-700 text-center">
          <span className="  animate-pulse
text-white         font-bold
         rounded-md text-center">
     Cine
        </span>
        Flex</h1>
     </div>

      
        <button
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
        </button>

        <div className="hidden md:flex gap-10 font-bold text-lg">
          <Link to="/">Home</Link>
          
              <Link to="/newMovies">New</Link>
          <Link to="/Genre">Genre</Link>
          <Link to="/Series">Series</Link>
         
          <span>|</span>
            <Link to="/Wishlists"><RiBookmarkFill  /></Link>

   
              <SignedOut>
              <Link to="/Signup">    <RiUserFill color="white"  /></Link>
            </SignedOut>
            
              <UserButton/>
    
        
   
        </div>
      </div>

  
      <div className={`md:hidden 
        font-semibold
        absolute w-full  bg-black/50  flex flex-row gap-6 justify-center overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60 py-4" : "max-h-0"}`}>
    <Link to="/">Home</Link>
          
              <Link to="/newMovies">New</Link>
          <Link to="/Genre">Genre</Link>
          <Link to="/Series">Series</Link>
         
      </div>
    </div>
  );
}

export default Navbar;