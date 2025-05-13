import { useAuthContext } from './useAuthContext'
import { useJournalContext } from './useJournalContext'

export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: journalDispatch } = useJournalContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
        journalDispatch({ type: 'SET_JOURNAL', payload: null })
    }

    return { logout }
}

