import React from 'react'
import {useEffect} from 'react'
import JournalDetails from './../Details'
import './Home.css'
import { useJournalContext } from '../../hooks/useJournalContext'

const Home = () => {

    const {journal, dispatch} = useJournalContext()

    useEffect(() => {
        const fetchEntry =  async() => {
            const response = await fetch('/api/journals');
            const json = await response.json();

            if (response.ok) {
                dispatch({type: 'SET_JOURNAL', payload: json})
            }
        }

        fetchEntry();
    }, []);

  return (
    <div className='Journals'>
        {journal && journal.map((journal) => (
            <JournalDetails key={journal._id} journal={journal} />
        ))}
    </div>
  )
}

export default Home