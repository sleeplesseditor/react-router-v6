import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { styled } from "styled-components";
import BookCard from './bookCard';

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const StyledP = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: crimson;
  margin-right: 14px;
`;

const List = styled.div`
  margin-top: 10px;
`;

const BooksList = () => {
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [ searchParams, setSearchParams ] = useSearchParams();

  useEffect(() => {
    if(state) {
      console.warn(`No results found for ${state.id}`)
    }
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/books');
      const params = Object.fromEntries([...searchParams]);
      sortBooks(response.data, params);
    })()
  }, []);

  const sortBooks = (data, params) => {
    if(!Object.keys(params).length > 0) {
      setData(data);
      return;
    }

    const sorted = [...data].sort((a,b) => {
      const {sort, order} = params;
      switch(order) {
        case 'descending': {
          return a[sort] < b[sort] ? 1 : -1;
        }
        default:
        case 'ascending': {
          return a[sort] > b[sort] ? 1 : -1;
        }
      }
    })
    setData(sorted);
  };

  const updateParams = (e) => {
    const { name, value } = e.target;
    const currentParams = Object.fromEntries([...searchParams]);
    const newParams = {...currentParams, [name]: value};
    setSearchParams(newParams);
    sortBooks(data, newParams);
  };

  return data ? (
    <>
      <RadioContainer>
        <StyledP>Sort with: </StyledP>
        <label>
          Title
          <input 
            aria-label="radio-btn-title" 
            type="radio" 
            name="sort" 
            value="title" 
            onChange={updateParams} 
            defaultChecked={searchParams.get('sort') === 'title'}
          />
        </label>
        <label>
          Price
          <input 
            aria-label="radio-btn-price" 
            type="radio" 
            name="sort" 
            value="price" 
            onChange={updateParams}
            defaultChecked={searchParams.get('sort') === 'price'}
          />
        </label>
      </RadioContainer>
      <RadioContainer>
        <StyledP>Order with: </StyledP>
        <label>
          Ascending
          <input 
            aria-label="radio-btn-asc" 
            type="radio" 
            name="order"
            value="ascending" 
            onChange={updateParams} 
            defaultChecked={searchParams.get('sort') === 'ascending'}
          />
        </label>
        <label>
          Descending
          <input 
            aria-label="radio-btn-desc" 
            type="radio" 
            name="order"
            value="descending" 
            onChange={updateParams}
            defaultChecked={searchParams.get('sort') === 'descending'}
          />
        </label>
      </RadioContainer>
      <List>
        {data.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </List>
    </>
  ) : (
    <h3>Loading...</h3>
  )
}

export default BooksList