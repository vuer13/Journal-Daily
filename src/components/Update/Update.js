import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

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

    return (
        <div className='update'>
            <div className='entryAfter'>
                <h1 className='title'>Edit Journal Entry: </h1>
                {error && <div>{error}</div>}
                <p className='date' id="date">Date: {date} </p>
                <form onSubmit={submit}>
                    <label for='title'>Title for today: </label>
                    <input type='text'
                        required
                        id='title'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={empty?.includes('title') ? 'title error' : ''}
                    /> <br></br>
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
                    <label for='summary'>One Sentence to describe today: </label>
                    <input type='text'
                        required
                        id='summary'
                        name='summary'
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className={empty?.includes('summary') ? 'summary error' : ''}
                    /> <br></br>
                    <input type="submit" class='update' value='Update Entry' />
                </form>
            </div>
        </div>
    )
}

export default Update