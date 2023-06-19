import { useState, useEffect } from 'react'
import Link from 'next/link'
import MobileMenu from './MobileMenu'
import ApplicationLogo from './ApplicationLogo'
import { useAuth } from '@/hooks/auth'

export default function Header() {
    const [top, setTop] = useState(true)

    // detect whether user has scrolled the page down by 10px
    const scrollHandler = () => {
        window.pageYOffset > 10 ? setTop(false) : setTop(true)
    }

    const { user } = useAuth({ middleware: 'guest' })

    useEffect(() => {
        scrollHandler()
        window.addEventListener('scroll', scrollHandler)
        return () => window.removeEventListener('scroll', scrollHandler)
    }, [top])

    return (
        <header
            className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
                !top ? 'bg-white backdrop-blur-sm shadow-lg' : ''
            }`}>
            <div className="max-w-6xl px-5 mx-auto sm:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Site branding */}
                    <Link
                        href="/"
                        className="flex items-center mr-4 text-2xl font-semibold text-gray-900 shrink-0 dark:text-white">
                        <span className="mr-2">
                            <ApplicationLogo className="w-8 h-8 text-gray-500" />
                        </span>
                        Personacle
                    </Link>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex md:grow">
                        {/* Desktop sign in links */}
                        <ul className="flex flex-wrap items-center justify-end grow">
                            {user ? (
                                <Link
                                    href="/dashboard"
                                    className="ml-4 text-gray-200 bg-gray-900 btn-sm hover:bg-gray-800">
                                    <span>Dashboard</span>
                                    <svg
                                        className="w-3 h-3 ml-2 -mr-1 text-gray-400 fill-current shrink-0"
                                        viewBox="0 0 12 12"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                                            fillRule="nonzero"
                                        />
                                    </svg>
                                </Link>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            href="/login"
                                            className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900">
                                            Sign in
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/register"
                                            className="ml-3 text-gray-200 bg-gray-900 btn-sm hover:bg-gray-800">
                                            <span>Register</span>
                                            <svg
                                                className="w-3 h-3 ml-2 -mr-1 text-gray-400 fill-current shrink-0"
                                                viewBox="0 0 12 12"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                                                    fillRule="nonzero"
                                                />
                                            </svg>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>

                    <MobileMenu />
                </div>
            </div>
        </header>
    )
}
