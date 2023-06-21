import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Link from 'next/link'

const Dashboard = () => {
    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }>
            <Head>
                <title>Personacle - Dashboard</title>
            </Head>

            <div className="py-4">
                <div className="grid grid-cols-1 gap-4 px-4 mx-auto md:grid-cols-2 max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white border border-gray-200 rounded-lg shadow col-span-full md:col-span-1 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col p-5">
                            <Link href="/questions">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Start Personality Test
                                </h5>
                            </Link>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Answer some questions that help to evaluate your
                                Personality. These questions are carefully
                                curated to give unique insight into various
                                aspect of your Personality.
                            </p>
                            <Link
                                href="/questions"
                                className="inline-flex items-center px-3 py-2 mt-auto text-sm font-medium text-center text-white bg-blue-700 rounded-lg max-w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Start
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4 ml-2 -mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg shadow col-span-full md:col-span-1 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Share your Personality result
                                </h5>
                            </a>

                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Share result of your Personality test to others
                                by sharing a link to a beautiful persona board
                                with easily understandable visualizations.
                            </p>

                            <Link
                                href="/questions"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg justify-self-end max-w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Share
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4 ml-2 -mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
