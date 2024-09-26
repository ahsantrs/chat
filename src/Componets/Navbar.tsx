import React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from '../assets/LogoIcon';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { userData } = useSelector((state:any) => state.authReducer);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
      {/* <img src='/images/logo.png' alt='logo' className="h-10 mr-4" /> */}
      <LogoIcon />
        <div className="flex items-center">
   
          <Link to={'/'} className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Product</Link>
          <Link to={'/chat'} className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Chat</Link>
        </div>
        <div>
          <Link to={'/signin'} className="text-gray-700 text-2xl px-3 py-1  capitalize bg-[#f7f7f7] rounded-full  font-medium ">{userData.username.charAt(0)}</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
