import { createContext, useState, useContext, useReducer } from 'react'

const questionsAnsweredReducer = (state, action) => {
    const { answer, type } = action

    if (type === 'add') {
        return { answers: state.answers.add(answer) }
    }

    if (type === 'delete') {
        return { answers: state.answers.delete(answer) }
    }

    throw Error('Unknown action.')
}

export const stateContext = createContext({
    totalQuestions: 0,
    questionsAnswered: {},
    setTotalQuestions: () => {},
    setQuestionsAnswered: () => {},
})

export const ContextProvider = ({ children }) => {
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [
        questionsAnswered,
        setQuestionsAnswered,
    ] = useReducer(questionsAnsweredReducer, { answers: new Set([]) })

    const data = {
        totalQuestions,
        questionsAnswered,
        setTotalQuestions,
        setQuestionsAnswered,
    }

    return (
        <stateContext.Provider value={data}>{children}</stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext)
