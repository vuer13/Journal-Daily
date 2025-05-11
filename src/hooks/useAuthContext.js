import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export const useJournalContext = () => {
    
    const context = useContext(AuthContext)

    if (!context) {
        throw Error("useAuthContext must be inside Provider")
    }

    return context
}