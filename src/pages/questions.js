import ArrowIcon from '@/components/ArrowIcon'
import Banner from '@/components/Banner'
import Button from '@/components/Button'
import AppLayout from '@/components/Layouts/AppLayout'
import Question from '@/components/Question'
import { useStateContext } from '@/contexts/QuestionContext'
import useWatch from '@/hooks/useWatch'
import axios from '@/lib/axios'
import { Progress, Toast } from 'flowbite-react'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const Questions = () => {
    const [questions, setQuestions] = useState()
    const [hasFormError, setHasFormError] = useState(false)
    const [formError, setFormError] = useState('')
    const {
        questionsAnswered,
        totalQuestions,
        setTotalQuestions,
    } = useStateContext()

    useEffect(() => {
        async function getQuestions() {
            const response = await axios.get('/api/v1/questions')
            const questions = response.data.data
            if (questions) {
                setQuestions(questions)
                setTotalQuestions(questions.length)
            }
        }
        if (!questions) {
            getQuestions()
        }
    }, [])

    useWatch(() => {
        if (questionsAnswered.answers.size == totalQuestions) {
            hideError()
        }
    }, [questionsAnswered])

    const submitForm = e => {
        // Prevent the browser from reloading the page
        e.preventDefault()

        if (getPercentageAnswered() < 100) {
            showError(
                'You have some unanswered questions, answer all before submitting.',
            )
            return
        }

        hideError()

        // Read the form data
        const form = e.target
        const formData = new FormData(form)

        // you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries())
        // console.log(formJson)

        // // You can pass formData as a fetch body directly:
        // fetch('/some-api', { method: form.method, body: formData })
    }

    const showError = body => {
        setHasFormError(true)
        setFormError(body)
    }

    const hideError = () => {
        setHasFormError(false)
        setFormError('')
    }

    const getPercentageAnswered = () => {
        console.log(questionsAnswered.answers.size, totalQuestions)
        return Math.round(
            (questionsAnswered.answers.size / totalQuestions) * 100,
        )
    }

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Questions
                </h2>
            }>
            
            <Head>
                <title>Personacle - Questions</title>
            </Head>

            <Banner isOpen={true} position={'top'}>
                <Progress
                    labelProgress
                    labelText
                    color="indigo"
                    progress={getPercentageAnswered()}
                    size="md"
                    textLabel="You have answered:"
                    progressLabelPosition="outside"
                    textLabelPosition="outside"
                />
            </Banner>
            
            <div className="pt-4">
                <form
                    onSubmit={submitForm}
                    className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="md:max-h-[420px] h-full overflow-hidden overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        {questions ? (
                            <ol className="space-y-2 list-decimal list-inside border border-gray-200 divide-y-2 divide-gray-300 rounded-lg shadow-sm dark:border-gray-700">
                                {questions?.map(q => (
                                    <Question question={q} key={q?.id} />
                                ))}
                            </ol>
                        ) : (
                            <div className="flex items-center justify-center h-full p-12">
                                loading...
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-center w-full my-4">
                        <Button className="items-center justify-center">
                            Submit
                            <ArrowIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </form>
            </div>

            {hasFormError && (
                <div className="fixed bottom-0 right-0 z-50 w-full md:right-12 md:bottom-8 md:w-auto">
                    <div className="flex items-center justify-between p-2 text-sm shadow-lg bg-danger-800 md:rounded">
                        <div className="flex-1 text-danger-100">
                            {formError}
                        </div>
                        <button
                            className={`p-3 ml-3 border-l border-danger-500 text-danger-300 hover:text-danger-200`}
                            onClick={() => setHasFormError(false)}>
                            <span className="sr-only">Close</span>
                            <svg
                                className="w-4 h-4 fill-current shrink-0"
                                viewBox="0 0 16 16">
                                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </AppLayout>
    )
}

export default Questions
