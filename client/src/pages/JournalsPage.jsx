import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function JournalDetailPage() {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8888/JournalApi/GetJournal/${id}`, {
      credentials: "include"
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => {
        setJournal(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || "Failed to load journal.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading journal...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{journal.title}</h1>
      <hr />
      <div>
        {journal.messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <strong>{msg.sender === "user" ? "You" : "Adventry AI"}:</strong>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
