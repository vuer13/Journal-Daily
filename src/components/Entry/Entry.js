import React, { useState, useEffect } from 'react'
import "./Entry.css";

const Entry = () => {

    const [date, setDate] = useState('');

    useEffect(() => {
        const n = new Date();
        const y = n.getFullYear();
        const m = n.getMonth() + 1;
        const d = n.getDate();
        setDate(`${m}/${d}/${y}`);
    }, []);

    const [title, setTitle] = useState('');
    const [entry, setEntry] = useState('');
    const [rating, setRating] = useState(0);
    const [sentence, setSentence] = useState('');
    const [error, setError] = useState(null);

    const submit = async (e) => {
        e.preventDefault();

        const journalEntry = { title, entry, rating, sentence }

        const response = await fetch('/api/journals', {
            method: "POST",
            body: JSON.stringify(journalEntry),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setEntry('')
            setRating(0)
            setSentence('')
            setError(null)
            console.log("new journal added", json)
        }
    }

    return (
        <div className='entry'>
            <div className='entryAfter'>
                <h1 className='title'>Add a Journal Entry: </h1>
                <p className='date' id="date">Date: {date} </p>
                <form onSubmit={submit}>
                    <label for='title'>Title for today: </label>
                    <input type='text'
                        required
                        id='title'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                    /> <br></br>
                    <label for='sentence'>One Sentence to describe today: </label>
                    <input type='text'
                        required
                        id='sentence'
                        name='sentence'
                        value={sentence}
                        onChange={(e) => setSentence(e.target.value)}
                    /> <br></br>
                    <input type="submit" class='submit' value='Submit Entry' />

                </form>
            </div>
        </div>
    )
}

export default Entry