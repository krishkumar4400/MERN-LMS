import React from 'react'
import { assets } from '../../assets/assets/assets.js'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom';

const NavBar = () => {
  const {user} = useUser()
  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>
      <Link to='/'>
      <img src={assets.logo1} className='w-20 lg:w-20 rounded-full' alt="Logo"/>
      </Link>
      <div className='flex items-center gap-5 text-gray-500 relative'>
        <p>Hi! {user ? user.fullName : 'Developers'}</p>
        {user ? <UserButton/> : <img src={assets.profile_img} className='mx-w-8' alt="" />}
      </div>
    </div>
  )
}

export default NavBar