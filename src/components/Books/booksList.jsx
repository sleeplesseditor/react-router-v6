import axios from 'axios';
import { useEffect, useState } from 'react';
import BookCard from './bookCard';

const BooksList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/books');
      setData(response.data);
    })()
  }, []);

  return data ? (
    <>
      {data.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </>
  ) : (
    <h3>Loading...</h3>
  )
}

export default BooksList