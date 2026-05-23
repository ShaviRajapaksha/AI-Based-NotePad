import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import NoteEditor from "../components/NoteEditor";
import AIPanel from "../components/AIPanel";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const fetchNotes = async () => {
    const response = await API.get("/notes");
    setNotes(response.data);

    if (response.data.length > 0 && !selectedNote) {
      setSelectedNote(response.data[0]);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const saveNote = async (note) => {
    await API.put(`/notes/${note.id}`, note);
    fetchNotes();
  };

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar
          notes={notes}
          setSelectedNote={setSelectedNote}
        />

        <NoteEditor
          selectedNote={selectedNote}
          saveNote={saveNote}
        />

        <AIPanel
          selectedNote={selectedNote}
          refresh={fetchNotes}
        />
      </div>
    </div>
  );
}