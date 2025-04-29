import { createContext, useReducer } from "react";

export const JournalContext = createContext()

export const journalReducer = (state, action) => {
    switch (action.type) {
        case 'SET_JOURNAL':
            return {
                journal: action.payload
            }
        case 'CREATE_JOURNAL':
            return {
                journal: [action.payload, ...state.journal]
            }
        default:
            return state
    }
}

export const JournalContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(journalReducer, {
        journal: null
    });

    return (
        <JournalContext.Provider value={{...state, dispatch}} >
            {children}
        </JournalContext.Provider>
    )
}  