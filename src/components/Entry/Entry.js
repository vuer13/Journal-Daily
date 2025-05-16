import React, { useState, useEffect } from 'react'
import "./Entry.css";
import { useJournalContext } from '../../hooks/useJournalContext';
import { useAuthContext } from '../../hooks/useAuthContext';

const Entry = () => {

    const [date, setDate] = useState('');

    useEffect(() => {
        const n = new Date();
        const y = n.getFullYear();
        const m = n.getMonth() + 1;
        const d = n.getDate();
        setDate(`${m}/${d}/${y}`);
    }, []);

    const { dispatch } = useJournalContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('');
    const [entry, setEntry] = useState('');
    const [rating, setRating] = useState('');
    const [summary, setSummary] = useState('');
    const [error, setError] = useState(null);
    const [empty, setEmpty] = useState([])

    const submit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('Must be logged in')
            return
        }

        const journalEntry = { title, entry, rating, summary }

        const response = await fetch('/api/journals', {
            method: "POST",
            body: JSON.stringify(journalEntry),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        console.log("Sending request with data:", JSON.stringify(journalEntry, null, 2));

        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
            setEmpty(json.empty)
        }
        if (response.ok) {
            setTitle('')
            setEntry('')
            setRating('')
            setSummary('')
            setError(null)
            setEmpty([])
            console.log("new journal added", json)
            dispatch({ type: 'CREATE_JOURNAL', payload: json })
        }
    }

    const generateSummary = async () => {
        setSummary('')
        if (!entry) {
            setError('Please write something first')
            return
        }

        setError(null)

        const response = await fetch('/api/groq/generate-summary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entry })
        })

        const data = await response.json()

        if (response.ok) {
            setSummary(data.summary)
        } else {
            setError("Could not generate summary")
        }
    }

    const generateTitle = async () => {
        setTitle('')
        if (!entry) {
            setError('Please write something first')
            return
        }

        setError(null)

        const response = await fetch('/api/groq/generate-title', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entry })
        })

        const data = await response.json()

        if (response.ok) {
            setTitle(data.summary)
        } else {
            setError("Could not generate summary")
        }
    }

    return (
        <div className='entry'>
            {error && <div className='error'>{error}</div>}
            <h1 className='title'>Add a Journal Entry: </h1>
            <p className='date' id="date">Date: {date} </p>
            <form onSubmit={submit}>
                <label for='entry'>What happened today? </label>
                <textarea id='entry'
                    required
                    name='entry'
                    rows='10'
                    cols='100'
                    tabindex="1"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    className={empty?.includes('entry') ? 'entry error' : ''}
                /> <br></br>
                <label for='title'>Title for today: </label>
                <button className='groq' type="button" onClick={generateTitle}>Generate Title</button>
                <input type='text'
                    required
                    id='title'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={empty?.includes('title') ? 'title error' : ''}
                /> <br></br>
                <label for='summary'>One Sentence to describe today: </label>
                <button className='groq' type="button" onClick={generateSummary}>Generate Summary</button>
                <input type='text'
                    required
                    id='summary'
                    name='summary'
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className={empty?.includes('summary') ? 'summary error' : ''}
                /> <br></br>
                <label for='rating'>What do you rate today (Out of 10)? </label>
                <input type='number'
                    id='rating'
                    name='rating'
                    min='0'
                    max='10'
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className={empty?.includes('rating') ? 'rating error' : ''}
                /> <br></br>
                <input type="submit" class='submit' value='Submit Entry' />
            </form>
        </div>
    )
}

export default Entry