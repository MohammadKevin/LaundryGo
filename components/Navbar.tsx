"use client"

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-5xl">
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`transition-all duration-500 rounded-[2rem] px-6 md:px-8 py-3 md:py-4 flex items-center justify-between border border-white/20 shadow-2xl shadow-black/5 ${
                    isScrolled 
                    ? "bg-white/90 backdrop-blur-2xl py-2 md:py-3 shadow-blue-500/5" 
                    : "bg-white/40 backdrop-blur-md"
                }`}
            >
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 group">
                    <motion.div 
                        whileHover={{ rotate: 0, scale: 1.1 }}
                        className="w-8 h-8 bg-blue-600 rounded-xl rotate-12 flex items-center justify-center text-white font-black text-sm transition-all"
                    >
                        L
                    </motion.div>
                    <span className="font-black tracking-tighter text-xl text-slate-950 group-hover:text-blue-600 transition-colors">
                        LaundryGo<span className="text-blue-600">.</span>
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                    {['Home', 'Services', 'Testimonials'].map((item) => (
                        <a 
                            key={item}
                            href={`#${item.toLowerCase()}`} 
                            className="hover:text-blue-600 transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full" />
                        </a>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <Link href="/login" className="hidden sm:block text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors px-4">
                        Login
                    </Link>
                    <Link 
                        href="/register" 
                        className="bg-slate-950 text-white px-5 py-2.5 md:px-7 md:py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                    >
                        Join Us
                    </Link>
                    
                    {/* Mobile Toggle */}
                    <button 
                        className="md:hidden p-2 text-slate-950"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-4 p-6 bg-white/95 backdrop-blur-xl rounded-[2rem] border border-slate-100 shadow-2xl md:hidden"
                    >
                        <div className="flex flex-col gap-6 text-center font-black text-xs uppercase tracking-widest text-slate-600">
                            <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
                            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
                            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Client</a>
                            <hr className="border-slate-100" />
                            <Link href="/login" className="text-blue-600">Login</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}