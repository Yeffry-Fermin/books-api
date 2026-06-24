let books = [
  {
    id: 1,
    title: "The Pragmatic Programmer",
    author: "David Thomas",
    genre: "Tech",
    available: true,
  },
  {
    id: 2,
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    available: true,
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    available: false,
  },
  {
    id: 4,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    available: true,
  },
  {
    id: 5,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    available: true,
  },
];

let nextId = 6; // use this for any new book you create

const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Book Api is running"));
app.get("/api/books", (req, res) => res.json(books));

app.get("/api/books/:id", (req, res) => {
  const book = books.find((book) => {
    return book.id === Number(req.params.id);
  });

  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Books not found");
  }
});

app.post("/api/books", (req, res) => {
  const data = req.body;

  const newBook = {
    id: nextId,
    title: data.title,
    author: data.author,
    genre: data.genre,
    available: true,
  };

  books.push(newBook);
  res.status(200).json(newBook);
});

app.patch("/api/books/:id", (req, res) => {
  const book = books.find((book) => {
    if (Number(req.params.id) === book.id) {
      return book;
    } 
  });
  console.log(book)
  if (book) {
    Object.assign(book, req.body);
    res.status(200).json(book)
  } else {
    res.status(404).send("Not Found");
  }
});

app.delete("/api/books/:id", (req, res) => {
  const book = books.find((book) => {
    return book.id === Number(req.params.id)
  })
  if(!book) {
    res.status(404).send('Book not found')
  } else {
    books = books.filter((bk) => bk.id !== Number(req.params.id))
    res.sendStatus(204)
  }
})

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
