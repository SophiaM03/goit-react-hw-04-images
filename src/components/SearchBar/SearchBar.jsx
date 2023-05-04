import React from 'react';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { SearchBtn, InputSearch, SearchBarStyled } from './SearchBar.styled';

export function SearchBar({ onSubmit }) {
  const handleOnSubmit = e => {
    e.preventDefault();
    if (!e.target.search.value) {
      return;
    }
    onSubmit(e.target.search.value);
  };

  return (
    <SearchBarStyled onSubmit={handleOnSubmit}>
      <SearchBtn type="submit">
        <FiSearch size="16px" />
      </SearchBtn>
      <InputSearch
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
      />
    </SearchBarStyled>
  );
}
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
