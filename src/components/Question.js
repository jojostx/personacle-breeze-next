import { useStateContext } from '@/contexts/QuestionContext'
import { range } from '@/lib/util'
import { Label, Radio } from 'flowbite-react'
import { useEffect, useState } from 'react'

const Question = ({ question, selectedOption }) => {
    const { setQuestionsAnswered } = useStateContext()
    const [selected, setSelected] = useState(selectedOption)

    const options = {
        1: 'Strongly Disagree',
        2: 'Disagree',
        3: 'Neutral',
        4: 'Agree',
        5: 'Strongly Agree',
    }

    const onQuestionAnswered = (event, question) => {
        event.preventDefault()

        setQuestionsAnswered({ answer: question, type: 'add' })

        setSelected(event.target.value)
    }

    useEffect(() => {
        setSelected(selectedOption)
        if (selectedOption) {
            setQuestionsAnswered({ answer: question.id, type: 'add' })
        }
    }, [selectedOption])

    return (
        <>
            <li
                key={question.id}
                className="p-4 space-y-2 bg-white md:py-8 md:px-8 dark:bg-gray-800 dark:border-gray-700">
                <span className="font-semibold text-black dark:text-gray-300">
                    {question.attributes.question}
                </span>

                <ul
                    onInput={event => onQuestionAnswered(event, question.id)}
                    id={question.id}
                    className="items-center w-full mt-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 divide-y rounded-lg md:divide-x md:divide-y-0 md:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {range(
                        Math.min(
                            question.attributes.min_score,
                            question.attributes.max_score,
                        ),
                        Math.max(
                            question.attributes.min_score,
                            question.attributes.max_score,
                        ),
                        question.attributes.score_step,
                        question.attributes.min_score >
                            question.attributes.max_score,
                    ).map(id => (
                        <li key={`${question.id}-${id}`} className="flex items-center w-full pl-3">
                              <Radio
                                {...(selected === id  && { defaultChecked: true })}
                                id={`answer-${question.id}-${id}`}
                                name={`q-${question.id}`}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                value={id}
                            />
                            <Label htmlFor={`answer-${question.id}-${id}`} className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                {options[id]}
                            </Label>
                        </li>
                    ))}
                </ul>
            </li>
        </>
    )
}

export default Question
