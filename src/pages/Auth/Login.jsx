import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import z from "zod"

function Login() {
    const navigate = useNavigate()
  const LoginSchema = z.object({
  
    email: z.string().min(4, "Please fill up properly").email("Invalid email"),
    password: z.string().min(8, "Minimum 8 characters"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  })

  async function onsubmit(data) {
 const ExistingData =   localStorage.getItem( JSON.stringify(data) )
 if(!ExistingData){
alert("User NOT FOUND!")
navigate("/SignUp")
}

    console.log("SAved to local Storage")
  }

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
  
      <div className="w-24 h-1 bg-red-600 rounded-full mb-10"></div>

      
      <div className="w-full max-w-sm border border-white/20 rounded-2xl bg-white/5 backdrop-blur-md shadow-2xl shadow-red-900/20 p-8 flex flex-col items-center gap-6">
        
        <h1 className="text-3xl font-bold tracking-wide">
         LOGIN<span className="text-red-600">in</span>
        </h1>

        <form onSubmit={handleSubmit(onsubmit)} className="w-full flex flex-col gap-4">
          
          
          <div className="flex flex-col gap-1">
            <input
              type="email"
              {...register("email")}
              id="email"
              placeholder="Enter your email"
              className="w-full rounded-full bg-white/10 border border-white/20 focus:border-red-600 focus:outline-none text-center p-3 placeholder-white/40 transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-sm text-center">{errors.email.message}</p>
            )}
          </div>

     
          <div className="flex flex-col gap-1">
            <input
              type="password"
              {...register("password")}
              id="password"
              placeholder="Enter your password"
              className="w-full rounded-full bg-white/10 border border-white/20 focus:border-red-600 focus:outline-none text-center p-3 placeholder-white/40 transition-colors"
            />
            {errors.password && (
              <p className="text-red-500 text-sm text-center">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-red-600 hover:bg-red-700 active:scale-95 transition-all py-3 font-semibold tracking-wide"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;