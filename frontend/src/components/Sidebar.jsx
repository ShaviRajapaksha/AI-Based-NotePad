export default function Sidebar({ notes, setSelectedNote }) {
  return (
    <div className="w-1/4 bg-white border-r h-screen overflow-y-auto">
      <div className="p-4 font-bold text-lg">Notes</div>

      {notes.map((note) => (
        <div
          key={note.id}
          className="p-4 border-b cursor-pointer hover:bg-gray-100"
          onClick={() => setSelectedNote(note)}
        >
          <h2 className="font-semibold">{note.title}</h2>
          <p className="text-sm text-gray-500 truncate">
            {note.content}
          </p>
        </div>
      ))}
    </div>
  );
}