import { JournalContext } from "../contexts/JournalContext";
import { useContext } from "react";

export const useJournalContext = () => {
    
    const context = useContext(JournalContext)

    if (!context) {
        throw Error("useJournalContext must be inside Provider")
    }

    return context
}