"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 flex items-center justify-between ${
                isScrolled 
                ? "h-20 bg-white/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)]" 
                : "h-24 bg-transparent"
            }`}
        >
            <Link href="/" className="group flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform duration-300">
                    L
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tighter">
                    Laundry<span className="text-blue-600">Go.</span>
                </h1>
            </Link>

            <div className="hidden md:flex items-center gap-10">
                {['Services', 'Philosophy', 'Pricing'].map((item) => (
                    <Link 
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 hover:text-blue-600 transition-colors"
                    >
                        {item}
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <Link
                    href="/login"
                    className="px-6 py-2.5 text-sm font-black tracking-widest text-blue-600 uppercase hover:text-blue-800 transition"
                >
                    Login
                </Link>

                <Link
                    href="/register"
                    className="relative group px-7 py-2.5 bg-slate-900 text-white text-[11px] font-black tracking-[0.2em] uppercase rounded-full overflow-hidden shadow-xl hover:shadow-blue-500/20 transition-all duration-300 active:scale-95"
                >
                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10">Join Member</span>
                </Link>
            </div>
        </motion.nav>
    )
}