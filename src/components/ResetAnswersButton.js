import { useStateContext } from '@/contexts/QuestionContext'
import { publish } from '@/lib/event'
import React from 'react'


export default function ResetAnswersButton() {
    const { setQuestionsAnswered } = useStateContext()

    const resetAnswers = () => {
        publish('reset-answers')

        setQuestionsAnswered({ answer:null, type: 'clear' })
    }

    return (
        <button
            onClick={resetAnswers}
            title="Reset answers"
            className="inline-flex items-center p-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-indigo-700 border border-transparent rounded-md hover:bg-indigo-600 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-5"
                aria-hidden="true">
                <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                />
            </svg>
        </button>
    )
}
