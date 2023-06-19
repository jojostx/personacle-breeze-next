import Link from 'next/link'
import React from 'react'
import Banner from './Banner'

export default function CookieBanner() {
    return (
        <Banner isOpen={true} position={'bottomRight'} color={'secondary'}>
            <p className="font-medium text-slate-50 px-1.5">
                We use cookies to improve your experience on this site{' '}
                <Link
                    className="font-medium hover:underline text-primary-300"
                    href="/"
                    target="_blank"
                    rel="noreferrer">
                    Privacy Policy
                </Link>
            </p>
        </Banner>
    )
}
