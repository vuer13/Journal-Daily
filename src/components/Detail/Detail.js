import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import './Detail.css'

export const Detail = () => {
    const { id } = useParams()
    const [journal, setJournal] = useState(null)
    const [error, setError] = useState(null)
    const { user } = useAuthContext()

    useEffect(() => {

        const getJournal = async () => {
            const response = await fetch('/api/journals/' + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if(!response.ok) {
                setError(json.error)
                return
            }
            setJournal(json)
        }
        getJournal()
    }, [id])

    if (error) return <div>{error}</div>
    if (!journal) return <div>Loading...</div>
    
    return (
        <div className="journal">
          <h2>{journal.title}</h2>
          <p><em>Created: {new Date(journal.createdAt).toLocaleString()}</em></p>
          <p><strong>Entry:</strong> {journal.entry}</p>
          <p><strong>Summary:</strong> {journal.summary}</p>
          <p><strong>Rating:</strong> {journal.rating}/10</p>
          <Link className='link' to={'/' + id}>Edit Entry</Link>
        </div>
      )
}

export default Detail
