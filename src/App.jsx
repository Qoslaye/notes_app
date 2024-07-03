// App.jsx
import React, { useEffect, useState } from 'react'

import { Routes, Route } from 'react-router-dom'

// Import Components
import CreateNote from './pages/CreateNote'
import EditNote from './pages/EditNote'
import Notes from './pages/Notes'

const App = () => {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme; // Set the theme class on the root element
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <main className={`${theme} bg-zinc-900`}>
      <Routes>
        <Route path='/' element={<Notes notes={notes} theme={theme} toggleTheme={toggleTheme} />} />
        <Route path='/create-note' element={<CreateNote setNotes={setNotes} />} />
        <Route path='/edit-note/:id' element={<EditNote notes={notes} setNotes={setNotes} />} />
      </Routes>
    </main>
  )
}

export default App
