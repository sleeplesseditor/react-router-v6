import axios from 'axios';
import { useEffect, useState } from 'react';

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
        <div key={book.id}>{book.title}</div>
      ))}
    </>
  ) : (
    <h3>Loading...</h3>
  )
}

export default BooksList