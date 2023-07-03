import { createContext, useState, useContext, useReducer } from 'react'

const questionsAnsweredReducer = (state, action) => {
    const { answer, type } = action

    switch (type) {
        case 'add': {
            return { ...state, answers: state.answers.add(answer) }
        }

        case 'delete': {
            state.answers.delete(answer)
            return { ...state, answers: state.answers }
        }

        case 'clear': {
            state.answers.clear()
            return { ...state, answers: state.answers }
        }

        default:
            return state
    }
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
