import './App.css'
import AppRoutes from './routes/AppRoutes'
import UserMessage from './components/UserMessage/UserMessage'
import { ThemeContext } from './context/theme.context'
import { useContext } from 'react'

function App() {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={'App ' + theme}>
            <AppRoutes />
            <UserMessage />
        </div>
    )
}

export default App
