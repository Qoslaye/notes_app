// Notes.jsx
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { BsPlus } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FiSun, FiMoon } from "react-icons/fi"; // import icons for dark/light mode

import NoteItem from '../components/NoteItem/NoteItem';

const Notes = ({ notes, theme, toggleTheme }) => { // accept theme and toggleTheme as props

    const [showSearch, setShowSearch] = useState(false);
    const [text, setText] = useState("");
    const [filterNotes, setFilterNotes] = useState(notes);

    const handleSearch = () => {
        setFilterNotes(notes.filter(note => {
            if (note.title.toLowerCase().match(text.toLowerCase())) {
                return note;
            }
        }))
    }

    useEffect(handleSearch, [text]);

    return (
        <section className='w-full min-h-screen flex flex-col items-center'>
            <header className='notes-header w-full flex items-center justify-between p-5'>
                {!showSearch ? <h2 className='text-slate-300 font-bold text-3xl'>My Notes</h2>
                    :
                    <input type="text" value={text} onChange={(e) => {
                        setText(e.target.value);
                        handleSearch()
                    }} autoFocus placeholder='Keyword...' className='bg-zinc-700 py-2 px-4 mr-3 w-full
                rounded-md outline-none text-white' />}
                <div className='flex items-center'>
                    <button onClick={toggleTheme} className='text-white text-3xl bg-zinc-600 p-2 rounded-md mr-3'>
                        {theme === 'dark' ? <FiSun /> : <FiMoon />}
                    </button>
                    <button onClick={() => setShowSearch(!showSearch)} className='text-white text-3xl bg-zinc-600 p-2 rounded-md'>
                        {showSearch ? <MdClose /> : <CiSearch />}
                    </button>
                </div>
            </header>

            <div className='notes-container w-full flex flex-wrap justify-start items-start p-5 gap-4'>
                {filterNotes.length === 0 ?
                    <h3 className='text-gray-400 mx-auto py-10'>There is no note.</h3>
                    :
                    filterNotes.map((note) => (
                        <NoteItem key={note.id} note={note} />
                    ))}
            </div>
            <Link to="/create-note" className='text-white font-bold fixed bottom-5 right-5
            text-2xl bg-zinc-600 p-3 rounded-md
            '> <BsPlus /> </Link>
        </section>
    )
}

export default Notes
