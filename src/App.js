import { useEffect, useState } from "react";
import BookList from "./components/BookList";
import { nanoid } from "nanoid";
import db from "./firebase";
import {
  onSnapshot,
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

export default function App() {
  const [books, setBooks] = useState([{ title: "loading..." }]);
  // const [books, setBooks] = useState(
  //   JSON.parse(localStorage.getItem("books")) || []
  // );
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    // id: "", <--- do we want an id here? I think so, let's see
  });
  const [repeatNotice, setRepeatNotice] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem("books", JSON.stringify(books));
  // }, [books]);

  useEffect(
    () =>
      onSnapshot(collection(db, "books"), (snapshot) =>
        setBooks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
      // id: nanoid(),
    });
  };

  const updateBooks = () => {
    setBooks((prevBooks) => {
      // we can just use the key, if we make each id just be the title + author, e.g: id === 'harrypotterjkrowling'.
      if (prevBooks.includes(newBook)) {
        setRepeatNotice(true);
        return prevBooks;
      } else {
        setRepeatNotice(false);
        return [...prevBooks, newBook];
      }
    });
  };

  const deleteBook = async (id) => {
    deleteDoc(doc(db, "books", id));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   updateBooks();
  //   setNewBook({
  //     title: "",
  //     author: "",
  //     id: "",
  //   });
  // };

  // making async API calls calls for an async function. Do we make handleSubmit or updateBooks async?
  // thoughts: if we don't make handleSubmit async, will everything after the function which gets our new books, updateBooks, run before it finishes?

  const handleSubmit = async (e) => {
    // handleNew in mentor's yt video
    e.preventDefault();
    const collectionRef = collection(db, "books");
    const payload = newBook;
    // same thing as: const payload = { title: newBook.title, author: newBook.author };
    // We may be able to show message here, but how? below doesn't work
    // setRepeatNotice(false);
    // const isRepeated = (payload) => books.includes(payload);
    // if (books.some(isRepeated)) {
    //   setRepeatNotice(true);
    //   return;
    // }
    const docRef = await addDoc(collectionRef, payload);
    // setNewBook({ ...newBook, id: docRef.id }); //<--- will this work?
    // ^^^you don't need the id as property inside each object, firestore is tagging them at creation!
    console.log(docRef.id);
  };

  return (
    <main className="app-container">
      <header>Books</header>
      <section>
        <div className="registration-container">
          <h1>Register Book</h1>
          <form onSubmit={handleSubmit} className="registration-form">
            <fieldset>
              <legend>New book</legend>
              <label htmlFor="book-title">Title</label>
              <input
                name="title"
                id="book-title"
                value={newBook.title}
                onChange={(e) => handleChange(e)}
              ></input>
              <label htmlFor="book-author">Author</label>
              <input
                name="author"
                id="book-author"
                value={newBook.author}
                onChange={handleChange}
              ></input>
              <button
                style={{ width: "7rem", height: "3rem", fontSize: "1.3rem" }}
              >
                OK
              </button>
            </fieldset>
          </form>
          {repeatNotice && <span>Book already exists!</span>}
        </div>
      </section>
      <hr />

      <section className="library-section">
        <h1>Your Books</h1>
        <div className="library-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              <BookList books={books} deleteBook={deleteBook} />
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
