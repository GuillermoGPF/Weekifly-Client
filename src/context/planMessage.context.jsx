import React, { createContext, useState } from 'react'

const PlanMessageContext = createContext()

function PlanMessageProvider(props) {
    const [showMessage, setShowMessage] = useState(true)

    return (
        <PlanMessageContext.Provider value={{ showMessage, setShowMessage }}>
            {props.children}
        </PlanMessageContext.Provider>
    )
}

export { PlanMessageContext, PlanMessageProvider }