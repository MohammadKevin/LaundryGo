"use client"

import { useState } from "react"
import Link from "next/link"
import { Shirt, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
                >
                    <div className="rounded-lg bg-blue-600 p-1.5 shadow-sm">
                        <Shirt className="h-5 w-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                        LaundryGo
                    </span>
                </Link>

                <div className="hidden items-center gap-4 md:flex">
                    <Link href="/login">
                        <Button
                            variant="ghost"
                            className="font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                        >
                            Masuk
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="bg-blue-600 text-white shadow-md shadow-blue-100 transition-all hover:bg-blue-700 active:scale-95">
                            Daftar
                        </Button>
                    </Link>
                </div>

                <button
                    className="p-2 text-blue-600 md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {isOpen && (
                <div className="animate-in slide-in-from-top flex flex-col gap-4 border-b border-blue-50 bg-white p-6 duration-300 md:hidden">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button
                            variant="outline"
                            className="w-full border-blue-200 text-blue-600"
                        >
                            Masuk
                        </Button>
                    </Link>

                    <Link href="/register" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-blue-600 text-white">
                            Daftar
                        </Button>
                    </Link>
                </div>
            )}
        </header>
    )
}
