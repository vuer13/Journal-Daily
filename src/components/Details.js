import './Home/Home.css'

const Details = ( {journal} ) => {

    const date = new Date(journal.createdAt);
    const formattedDate = date.toISOString().split('T')[0];

    return (
        <div className="details">
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
            <p className="end">
                Created on: {formattedDate}
            </p>
        </div>
    )
}

export default Details