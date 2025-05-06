import React from 'react'
import { assets } from '../../assets/assets/assets.js'

const Footer = () => {
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-fulll mt-10'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
        <div className='flex flex-col md:items-start items-center w-full'>
          <img className="" src={assets.logo_dark} alt="logo" />
          <p className='mt-6 text-center md:text-left text-sm text-white/80'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis,reprehenderit pariatur, earum dolor unde tempore nesciunt.</p>
        </div>
        <div className='flex flex-col md:items:start items-center w-full'>
          <h2 className="font-semibold text-white mb-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li>Home </li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Provacy policy</li>
          </ul>

        </div>
        <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className="font-semibold text-white mb-5">Subscribe to our newsletter </h2>
          <p className="text-sm text-white/80">The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className='flex items-center gap-2 pt-4'>
          <input
          className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 text-sm rounded px-2"
           type="email" name="" id="" placeholder="Enter your Email id"
           />
          <button className="bg-blue-600 w-24 h-9 text-white rounded">Subscribe</button>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-white/60">Copyright 2025 © FirstLMS. All Right Reserved.</p>
    </footer>
  )
}

export default Footer