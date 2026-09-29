import { useAuth } from "@clerk/clerk-react"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoutes() {
const { isSignedIn} =  useAuth()
  if(!isSignedIn){
    return <Navigate to="/Signin" replace />
  }
  return (
    <div>
   <Outlet/>     
    </div>
  )
  }

export default ProtectedRoutes