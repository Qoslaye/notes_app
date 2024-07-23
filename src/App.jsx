// Importing necessary modules from React and React Router
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

// Importing the components/pages of the application
import CreateNote from './pages/CreateNote'
import EditNote from './pages/EditNote'
import Notes from './pages/Notes'

// Main App component
const App = () => {
  // State to store notes, initialized from local storage or an empty array
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);

  // State to store the current theme, initialized from local storage or set to 'dark' by default
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // useEffect hook to save notes to local storage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // useEffect hook to save the theme to local storage and apply it to the document root whenever the theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme; // Apply the theme class to the root element of the document
  }, [theme]);

  // Function to toggle between dark and light themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Rendering the main application
  return (
    <main className={`${theme} bg-zinc-900`}>  {/* Main container with dynamic theme and background color */}
      <Routes>  {/* Setting up the routes for different pages */}
        <Route path='/' element={<Notes notes={notes} theme={theme} toggleTheme={toggleTheme} />} />
        {/* Route for the home page, passing notes, theme, and toggleTheme function as props */}
        <Route path='/create-note' element={<CreateNote setNotes={setNotes} />} />
        {/* Route for creating a new note, passing setNotes function as a prop */}
        <Route path='/edit-note/:id' element={<EditNote notes={notes} setNotes={setNotes} />} />
        {/* Route for editing an existing note, passing notes and setNotes function as props */}
      </Routes>
    </main>
  )
}

// Exporting the App component as the default export
export default App
