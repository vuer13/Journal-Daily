import './Home/Home.css'
import { Link } from 'react-router-dom';
import { useJournalContext } from '../hooks/useJournalContext';

const Details = ({ journal }) => {

    const { dispatch } = useJournalContext()

    const date = new Date(journal.createdAt);
    const formattedDate = date.toISOString().split('T')[0];

    const handleClick = async () => {
        const response = await fetch('/api/journals/' + journal._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_JOURNAL', payload: json })
        }
    }


    return (
        <div className="details">
            <div className="main">
                <h4 className="title">
                    {journal.title}
                </h4>
                <p>
                    <strong>
                        Rating: {journal.rating}
                    </strong>
                </p>
                <p>
                    <strong>
                        Summary: {journal.summary}
                    </strong>
                </p>
            </div>
            <div className="right">
                <p className="end">
                    Created on: {formattedDate}
                </p>
                <button onClick={handleClick}>Delete</button>
                <Link to="/view">View</Link>
            </ div>
        </div>
    )
}

export default Details