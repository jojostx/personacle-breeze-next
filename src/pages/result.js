import ResultDoughnutChart from '@/components/ResultDoughnutChart'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import React, { useEffect, useState } from 'react'

const Result = () => {
    const [result, setResult] = useState()
    
    useEffect(() => {
        async function getResultData() {
            const response = await axios.get('/api/v1/user/results')
            const result = response.data.data

            if (result) {
                setResult(result)
            }
        }
        if (!result) {
            getResultData()
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

            <div className="py-4">
                <div className="flex items-center justify-center h-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <ResultDoughnutChart result={result}/>
                </div>
            </div>
        </AppLayout>
    )
}

export default Result
