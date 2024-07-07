// createNote.jsx
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import {useCreateDate} from '../components/useCreateData/useCreateData'

const CreateNote = ({ setNotes }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && details) {
      const note = {
        id: Math.random() * 100,
        title,
        details,
        date,
      };
      setNotes((prevNotes) => [note, ...prevNotes]);
      navigate('/');
    }
  };

  return (
    <section className="w-full min-h-screen h-auto flex flex-col items-center">
      <header className="create-note-header w-full flex items-center justify-between p-5">
        <Link to="/" className="text-white text-3xl bg-zinc-600 p-2 rounded-md">
          <IoIosArrowBack />
        </Link>
        <button onClick={handleSubmit} className="text-white text-lg bg-purple-600 py-2 px-4 rounded-md">
          Save
        </button>
      </header>
      <form onSubmit={handleSubmit} className="create-note-form w-full flex flex-col items-start gap-4 p-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          autoFocus
          className="w-full border-0 py-4 px-3 outline-none text-2xl text-gray-200 bg-transparent border-b border-zinc-700"
        />
        <textarea
          rows="28"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Note Details..."
          className="w-full border-0 py-4 px-3 outline-none text-lg text-gray-300 bg-transparent border-b border-zinc-700"
        ></textarea>
      </form>
    </section>
  );
};

export default CreateNote;
