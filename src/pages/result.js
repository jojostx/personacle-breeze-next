import ResultDoughnutChart from '@/components/ResultDoughnutChart'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import Link from 'next/link'

const Result = () => {
    const [result, setResult] = useState()
    const [hasUnansweredQuestions, setHasUnansweredQuestions] = useState(false)

    useEffect(() => {
        async function getResultData() {
            const response = await axios.get('/v1/user/results')
            const result = response.data.data

            if (result) {
                setResult(result)
            }
        }

        async function getUnansweredQuestionsData() {
            const response = await axios.get('/v1/user/unanswered_questions')
            const result = response.data.data

            setHasUnansweredQuestions(result.length ? true : false)
        }

        if (!result) {
            getResultData()
        }

        if (!hasUnansweredQuestions) {
            getUnansweredQuestionsData()
        }
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Results
                </h2>
            }>
            <Head>
                <title>Personacle - Results</title>
            </Head>

            <div className="px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center min-h-[460px] justify-center w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    {hasUnansweredQuestions ? (
                        <div className="flex flex-col items-center h-full p-5">
                            <Link href="/questions">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Complete Personality Test
                                </h5>
                            </Link>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                You have some unanswered question, answer all of
                                them to view your result.
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
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Link>
                        </div>
                    ) : result ? (
                        <ResultDoughnutChart result={result} />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full p-12 space-y-4">
                            <LoadingSpinner />
                            loading...
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    )
}

export default Result
