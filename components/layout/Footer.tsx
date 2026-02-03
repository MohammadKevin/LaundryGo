"use client"

import Link from "next/link"
import { Shirt, Instagram, Twitter, MessageCircle } from "lucide-react"

export default function Footer() {
    return (
        <footer className="border-t border-blue-900 bg-blue-950 text-blue-100/80">
            <div className="container mx-auto px-6 py-12">
                <div className="grid gap-12 md:grid-cols-3">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xl font-bold text-white">
                            <div className="rounded-lg bg-blue-600 p-1.5">
                                <Shirt className="h-5 w-5 text-white" />
                            </div>
                            LaundryGo
                        </div>
                        <p className="text-sm leading-relaxed">
                            Solusi laundry modern, praktis, dan terpercaya untuk gaya hidup sibuk Anda.
                            Cuci bersih, jemput antar, beres!
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-white">Layanan</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="transition-colors hover:text-blue-400">
                                    Cuci Lipat
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition-colors hover:text-blue-400">
                                    Cuci Setrika
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition-colors hover:text-blue-400">
                                    Dry Cleaning
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition-colors hover:text-blue-400">
                                    Cuci Karpet
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-white">Ikuti Kami</h4>
                        <div className="flex gap-4">
                            <Link href="https://www.instagram.com/laundrygo.indonesia/" className="rounded-full bg-blue-900 p-2 transition-all hover:bg-blue-600">
                                <Instagram className="h-5 w-5 text-white" />
                            </Link>
                            <Link href="https://wa.me/6282334027274?text=Halo%20saya%20ingin%20bertanya" className="rounded-full bg-blue-900 p-2 transition-all hover:bg-blue-600">
                                <MessageCircle className="h-5 w-5 text-white" />
                            </Link>
                            <Link href="#" className="rounded-full bg-blue-900 p-2 transition-all hover:bg-blue-600">
                                <Twitter className="h-5 w-5 text-white" />
                            </Link>
                        </div>
                        <p className="text-xs">support@laundrygo.com</p>
                    </div>
                </div>

                <hr className="my-8 border-blue-900" />

                <div className="flex flex-col items-center justify-between gap-4 text-xs md:flex-row">
                    <div className="space-y-1 text-center md:text-left">
                        <p>© 2026 LaundryGo. Hak Cipta Dilindungi.</p>
                        <p className="text-blue-200/70">
                            Dikembangkan oleh <span className="font-medium text-blue-200">LaundryGo Dev Team</span> • Versi 1.2.3
                        </p>
                        <br />
                        <p>Powered by <span className="font-medium text-blue-200">LaundryGo</span></p>
                    </div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:underline">
                            Kebijakan Privasi
                        </Link>
                        <Link href="#" className="hover:underline">
                            Syarat & Ketentuan
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
