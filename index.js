const express = require("express");
const app = express();
app.use(express.json());

const PORT = 5000;

let notes = [
  { id: 1, title: "My Goals", content: "too big & not easy" },
  {
    id: 2,
    title: "Web dev",
    content: "First I Want to web developer, the gatway to my future goals",
  },
  {
    id: 3,
    title: "Elon code",
    content: "Want to code more than Elen musk to create the applications",
  },
  {
    id: 4,
    title: "AI Full Understanding",
    content:
      "Later I want to know all about AI and use it in my goals to earn for future goals",
  },
];

//all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

//single note
app.get("/notes/:id", (req, res) => {
  const note = notes.find((note) => note.id === parseInt(req.params.id));
  if (!note) {
    res.status(404).json({ message: "Note not found" });
  }
  res.json(note);
});

//add note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  const newNote = {
    id: notes.length + 1,
    title,
    content,
  };

  notes.push(newNote);

  res.json(notes);
});

//update note
app.put("/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).json({ Message: "Note not found" });

  const { title, content } = req.body;
  note.title = title || note.title;
  note.content = content || note.content;
  res.json(note);
});

//delete note
app.delete("/notes/:id", (req, res) => {
  notes = notes.filter((n) => n.id !== parseInt(req.params.id));

  res.json({ message: "Note Deleted ", notes });
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
