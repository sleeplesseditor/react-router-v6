import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from './bookCard';

const BooksList = () => {
  const { state } = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    if(state) {
      console.warn(`No results found for ${state.id}`)
    }
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/books');
      setData(response.data);
    })()
  }, []);

  return data ? (
    <>
      {data.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </>
  ) : (
    <h3>Loading...</h3>
  )
}

export default BooksList