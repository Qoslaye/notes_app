// EditNote.jsx
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCreateDate } from '../components/useCreateData/useCreateData';

const EditNote = ({ notes, setNotes }) => {
  const { id } = useParams();
  const note = notes.find(note => note.id == id);

  const [title, setTitle] = useState(note.title);
  const [details, setDetails] = useState(note.details);
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    if (title && details) {
      const newNote = { ...note, title, details, date };
      const newNotes = notes.map((item) => {
        if (item.id == id) {
          item = newNote;
        }
        return item;
      });
      setNotes(newNotes);
      navigate("/");
    }
  };

  const handleDelete = () => {
    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
    navigate("/");
  };

  return (
    <section className='w-full min-h-screen h-auto flex flex-col items-center'>
      <header className='create-note-header w-full flex items-center justify-between p-5'>
        <Link to="/" className="text-white text-3xl bg-zinc-600 p-2 rounded-md">
          <IoIosArrowBack />
        </Link>
        <button onClick={handleForm} type='submit' className="text-white text-lg bg-purple-600 py-2 px-4 rounded-md">Save</button>
        <button onClick={handleDelete} className="text-white text-3xl bg-red-500 p-2 rounded-md">
          <RiDeleteBin6Line />
        </button>
      </header>
      <form onSubmit={handleForm} className='create-note-form w-full flex flex-col items-start gap-4 p-5'>
        <input value={title} onChange={(e) => setTitle(e.target.value)}
          type="text" placeholder='Title' autoFocus className='w-full border-0 py-4 px-3 outline-none
          text-2xl text-gray-200 bg-transparent border-b border-zinc-700'
        />
        <textarea rows="28" value={details} onChange={(e) => setDetails(e.target.value)}
          placeholder='Note Details...' className="w-full border-0 py-4 px-3 outline-none
          text-lg text-gray-300 bg-transparent border-b border-zinc-700"></textarea>
      </form>
    </section>
  );
};

export default EditNote;
