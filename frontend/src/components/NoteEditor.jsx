import { useEffect, useState } from "react";

export default function NoteEditor({ selectedNote, saveNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  const handleSave = () => {
    saveNote({
      ...selectedNote,
      title,
      content,
    });
  };

  return (
    <div className="flex-1 p-6">
      <input
        className="w-full text-3xl font-bold mb-4 outline-none"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full h-[70vh] p-4 border rounded-lg outline-none"
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        className="mt-4 bg-black text-white px-6 py-2 rounded"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}