import { useStateContext } from '@/contexts/QuestionContext'
import { range } from '@/lib/util'

const Question = ({ question }) => {
    const options = {
        1: 'Strongly Disagree',
        2: 'Disagree',
        3: 'Neutral',
        4: 'Agree',
        5: 'Strongly Agree',
    }

    const { setQuestionsAnswered } = useStateContext()

    const onQuestionAnswered = (event, question) => {
        event.preventDefault()

        setQuestionsAnswered({ answer: question, type: 'add' })
    }

    return (
        <>
            <li
                key={question.id}
                className="p-4 space-y-2 text-gray-500 bg-white dark:text-gray-400 md:py-8 md:px-8 dark:bg-gray-800 dark:border-gray-700">
                {question.attributes.question}

                <ul
                    onInput={event => onQuestionAnswered(event, question.id)}
                    id={question.id}
                    className="items-center w-full mt-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 divide-y rounded-lg md:divide-x md:divide-y-0 md:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {range(
                        question.attributes.min_score,
                        question.attributes.max_score,
                        question.attributes.score_step,
                    ).map(id => (
                        <li
                            key={`${question.id}-${id}`}
                            className="flex items-center w-full pl-3">
                            <input
                                id={`answer-${question.id}-${id}`}
                                type="radio"
                                value={id}
                                name={`question-${question.id}`}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor={`answer-${question.id}-${id}`}
                                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                {options[id]}
                            </label>
                        </li>
                    ))}
                </ul>
            </li>
        </>
    )
}

export default Question
