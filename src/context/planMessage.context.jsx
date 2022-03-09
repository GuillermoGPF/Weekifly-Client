import React, { createContext, useState } from 'react';

const PlanMessageContext = createContext();

function PlanMessageProvider(props) {
    const [showMessage, setShowMessage] = useState(false)
    const [messageInfo, setMessageInfo] = useState()

    return (
        <PlanMessageContext.Provider value={{ showMessage, setShowMessage, messageInfo, setMessageInfo }}>
            {props.children}
        </PlanMessageContext.Provider>
    )
}

export { PlanMessageContext, PlanMessageProvider };