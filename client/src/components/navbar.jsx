import React, { useContext, useEffect } from 'react'
import { FaBriefcase } from 'react-icons/fa'
import { useClerk,UserButton,useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/appContext'


function Navbar() {
  const {openSignIn}=useClerk()
  const {user}=useUser()

  const navigate=useNavigate()

  const { setShowRecriuterLogin }=useContext(AppContext)

  // useEffect (()=>{
  //   // document.body.style.overflow='hidden'
  //   return ()=>{
  //     document.body.style.overflow = 'unset'
  //   }
  // },[])
  return (
    <>
      <h1 className="cursor-pointer absolute top-5 left-5 flex items-center space-x-1 text-xl font-semibold">
        <FaBriefcase onClick={()=> navigate('/')}className="text-lime-500 text-2xl" />
        <span className="text-black">Job</span>
        <b className="text-lime-500">Portal</b>
      </h1>

      {
        user
        ?<div className="absolute top-0 right-0 p-4 space-x-4 flex items-center gap-1">
          <Link to={'/applications'}>applied jobs</Link>
          <p>hi {user.firstName+""+user.lastName}</p>
          <UserButton/>
        </div>
        :   <div className="absolute top-0 right-0 p-4 space-x-4">
        {/* Green Yellow Button */}
        <button onClick={e => setShowRecriuterLogin(true)} className="px-4 py-1 text-white bg-[#A3E635] rounded-lg">
  Company Log in
</button>


        {/* Smaller Grey Text Button */}
        <button className="px-4 py-1 text-gray-500 border border-gray-500 rounded-lg" onClick={ e => openSignIn()}>
          Log in
        </button>
      </div>
      }
   
    </>
  )
}

export default Navbar
