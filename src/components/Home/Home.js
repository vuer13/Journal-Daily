import React from 'react'
import {useEffect} from 'react'
import JournalDetails from './../Details'
import './Home.css'
import { useJournalContext } from '../../hooks/useJournalContext'
import {useAuthContext} from '../../hooks/useAuthContext'

const Home = () => {

    const {journal, dispatch} = useJournalContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchEntry =  async() => {
            const response = await fetch('/api/journals', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({type: 'SET_JOURNAL', payload: json})
            }
        }
        if (user) {
            fetchEntry()
        }
    }, [dispatch, user]);

  return (
    <div className='Journals'>
        {journal && journal.map((journal) => (
            <JournalDetails className="detail" key={journal._id} journal={journal} />
        ))}
    </div>
  )
}

export default Home