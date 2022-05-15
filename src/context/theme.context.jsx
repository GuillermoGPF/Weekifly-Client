import React, { createContext, useState } from 'react'

const ThemeContext = createContext()

function ThemeProviderWrapper(props) {
    let [theme, setTheme] = useState('dark')

    if (localStorage) {
        theme = localStorage.getItem('theme')
    }

    const toggleTheme = () => {
        if (theme === 'light') { 
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            setTheme('light')
            localStorage.setItem('theme', 'light')
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProviderWrapper }