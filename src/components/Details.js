const Details = ( {journal} ) => {
    return (
        <div className="details">
            <h4>
                {journal.title}
            </h4>
            <p>
                {journal.enter}
            </p>
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
            <p>
                {journal.createdAt}
            </p>
        </div>
    )
}

export default Details