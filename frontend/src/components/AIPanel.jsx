import { useState } from "react";
import API from "../services/api";

export default function AIPanel({ selectedNote, refresh }) {
  const [loading, setLoading] = useState(false);

  const runAI = async (action) => {
    if (!selectedNote) return;

    setLoading(true);

    try {
      const response = await API.post("/ai/assist", {
        action,
        text: selectedNote.content,
      });

      alert(response.data.result);

      refresh();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="w-72 bg-white border-l p-4">
      <h2 className="text-xl font-bold mb-4">AI Tools</h2>

      <button
        className="w-full bg-blue-500 text-white p-2 mb-3 rounded"
        onClick={() => runAI("summarize")}
      >
        Summarize
      </button>

      <button
        className="w-full bg-green-500 text-white p-2 mb-3 rounded"
        onClick={() => runAI("improve")}
      >
        Improve Writing
      </button>

      <button
        className="w-full bg-purple-500 text-white p-2 mb-3 rounded"
        onClick={() => runAI("continue")}
      >
        Continue Writing
      </button>

      {loading && <p>Loading...</p>}
    </div>
  );
}