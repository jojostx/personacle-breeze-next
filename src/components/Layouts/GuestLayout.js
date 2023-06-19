import Head from 'next/head'

const GuestLayout = ({ children }) => {
    return (
        <div>
            <Head>
                <title>Personacle</title>
            </Head>

            <div className="font-sans antialiased text-gray-900">
                {children}
            </div>
        </div>
    )
}

export default GuestLayout
