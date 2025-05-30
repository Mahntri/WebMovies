import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'TV Series',
        path: '/tv'
    }
]; 

const Header = () => {
    const { pathname } = useLocation(); // Lấy đường dẫn hiện tại
    const headerRef = useRef(null); // Tham chiếu đến phần tử header

    const active = headerNav.findIndex(e => e.path === pathname); // Tìm chỉ số của đường dẫn hiện tại trong headerNav

    // useEffect(() => {
    //     const shrinkHeader = () => {
    //         if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    //             headerRef.current.classList.add('shrink'); // Thêm class 'shrink' khi cuộn xuống quá 100px
    //         } else {
    //             headerRef.current.classList.remove('shrink'); // Loại bỏ class 'shrink' khi cuộn lên trên 100px
    //         }
    //     };
    //     window.addEventListener('scroll', shrinkHeader);
    //     return () => {
    //         window.removeEventListener('scroll', shrinkHeader);
    //     };
    // }, []);

    return (
        <>
        {/* Desktop Header */}
        <div ref={headerRef} className="header bg-black p-6 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out hidden md:block">
            <div className="max-w-screen-lg h-10 mx-auto flex justify-between items-center">
            <div className="logo flex items-center text-5xl transition-colors duration-300">
                <img src="/logo.jpg" alt="Logo" className="w-16 mr-4" />
                <Link to="/" className="font-bold text-white text-4xl hover:text-red-500">MoiMovies</Link>
            </div>
            <ul className="header__nav flex space-x-12">
                {headerNav.map((e, i) => (
                <li key={i} className="relative text-white font-bold text-2xl group">
                    <Link 
                    to={e.path}
                    className={`inline-block text-white group-hover:text-red-500 ${i === active ? 'text-red-500' : ''}`}
                    >
                    {e.display}
                    </Link>
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${i === active ? 'scale-x-100' : ''}`}></span>
                </li>
                ))}
            </ul>
            </div>
        </div>

        {/* Mobile Logo */}
        <div className="md:hidden bg-black text-white text-center py-4 border-b border-gray-700 fixed top-0 left-0 right-0 z-50">
            <Link to="/" className="text-3xl font-bold tracking-wide">tMovies</Link>
        </div>

        {/* Mobile Nav */}
        <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-700 flex justify-around py-2 text-white md:hidden z-50">
            {headerNav.map((e, i) => (
            <Link
                key={i}
                to={e.path}
                className={`flex flex-col items-center text-sm ${pathname === e.path ? 'text-red-500' : ''}`}
            >
                {e.display}
            </Link>
            ))}
        </div>
        </>

    );
}

export default Header;