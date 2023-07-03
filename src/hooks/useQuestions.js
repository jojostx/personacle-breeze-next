import useSWR from 'swr'
import axios from '@/lib/axios'

export const useQuestions = () => {
    const { data: questions } = useSWR('/v1/questions', () =>
        axios
            .get('/v1/questions')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                return []
            }),
    )

    const { data: answers } = useSWR('/v1/user/answers', () =>
        axios
            .get('/v1/user/answers')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                return []
            }),
    )

    return {
        questions,
        answers
    }
}
