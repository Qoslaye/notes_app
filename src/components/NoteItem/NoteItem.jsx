// NoteItem.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const NoteItem = ({ note }) => {
    return (
        <Link to={`/edit-note/${note.id}`} className="note">
            <div className='bg-purple-700 p-5 rounded-md'>
                <h4 className='text-zinc-100 font-semibold tracking-wider'>{note.title.length > 20 ? (note.title.substr(0, 20)) + '...' : note.title}</h4>
                <p className='mt-2 text-white text-xs'>{note.date}</p>
            </div>
        </Link>
    )
}

export default NoteItem
