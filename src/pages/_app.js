import 'tailwindcss/tailwind.css'
import '@/styles/index.css'
import { ContextProvider } from '@/contexts/QuestionContext'

const App = ({ Component, pageProps }) => {
    return (
        <ContextProvider>
            <Component {...pageProps} />
        </ContextProvider>
    )
}

export default App
