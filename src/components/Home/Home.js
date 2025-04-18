import React from 'react'
import {useEffect, useState} from 'react'
import JournalDetails from './../Details'
import './Home.css'

const Home = () => {

    const [journal, setJournal] = useState(null);

    useEffect(() => {
        const fetchEntry =  async() => {
            const response = await fetch('/api/journals');
            const json = await response.json();

            if (response.ok) {
                setJournal(json);
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