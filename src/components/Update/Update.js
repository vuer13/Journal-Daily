import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import './Update.css'

export const Update = () => {

    const [date, setDate] = useState('');

    useEffect(() => {
        const n = new Date();
        const y = n.getFullYear();
        const m = n.getMonth() + 1;
        const d = n.getDate();
        setDate(`${m}/${d}/${y}`);
    }, []);

    const { id } = useParams()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [entry, setEntry] = useState("");
    const [rating, setRating] = useState("");
    const [summary, setSummary] = useState("");
    const [error, setError] = useState(null);
    const [empty, setEmpty] = useState([])

    useEffect(() => {
        const getEntry = async () => {
            const response = await fetch('/api/journals/' + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                setTitle(json.title)
                setEntry(json.entry)
                setRating(json.rating)
                setSummary(json.summary)
            } else {
                setError(json.error)
            }
        }
        getEntry()
    }, [id, user])

    const submit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('Must be logged in')
            return
        }

        const journalEntry = { title, entry, rating, summary }

        const response = await fetch('/api/journals/' + id, {
            method: "PATCH",
            body: JSON.stringify(journalEntry),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            navigate(`/view/${id}`);
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
        <div className='update'>
            {error && <div className='error'>{error}</div>}
            <div className='entryAfter'>
                <h1 className='title'>Edit Journal Entry: </h1>
                {error && <div>{error}</div>}
                <p className='date' id="date">Date: {date} </p>
                <form onSubmit={submit}>
                    <label for='entry'>Updated Entry </label>
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
                    <label for='title'>Updated Title: </label>
                    <button className='groq' type="button" onClick={generateTitle}>Generate Title</button>
                    <input type='text'
                        required
                        id='title'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={empty?.includes('title') ? 'title error' : ''}
                    /> <br></br>
                    <label for='summary'>One Sentence to describe event: </label>
                    <button className='groq' type="button" onClick={generateSummary}>Generate Summary</button>
                    <input type='text'
                        required
                        id='summary'
                        name='summary'
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className={empty?.includes('summary') ? 'summary error' : ''}
                    /> <br></br>
                    <label for='rating'>Updated Rating (Out of 10)? </label>
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
                    <input type="submit" class='update' value='Update Entry' />
                </form>
            </div>
        </div>
    )
}

export default Update