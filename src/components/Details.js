import './Home/Home.css'
import { Link } from 'react-router-dom';

const Details = ({ journal }) => {

    const date = new Date(journal.createdAt);
    const formattedDate = date.toISOString().split('T')[0];

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
                <div className='links'>
                    <Link to="/delete">Delete</Link>
                    <Link to="/view">View</Link>
                </div>
            </ div>
        </div>
    )
}

export default Details