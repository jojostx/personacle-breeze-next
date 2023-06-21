import Head from 'next/head'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CookieBanner from '@/components/CookieBanner'

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen w-full overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Head>
                <title>Personacle</title>
            </Head>

            <Header />

            <Hero />

            <CookieBanner />
        </div>
    )
}
