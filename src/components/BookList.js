import { nanoid } from "nanoid";
const BookList = ({ books, deleteBook }) => {
  const allBooks = books.map((book) => {
    return (
      <tr key={nanoid()}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>
          <button onClick={() => deleteBook(book.id)}>delete</button>{" "}
        </td>
      </tr>
    );
  });
  return allBooks;
};

export default BookList;
