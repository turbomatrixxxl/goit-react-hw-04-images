import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/Button/Button';
import { HiSearch } from 'react-icons/hi';

import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  render() {
    const { handleSubmit, handlechange, handleSearch } = this.props;

    return (
      <header className={styles.Searchbar}>
        <form onSubmit={handleSubmit} className={styles.SearchForm}>
          <Button
            handleClick={handleSearch}
            variant="SearchFormButton"
            type={'submit'}
          >
            <HiSearch size="20px" />
          </Button>

          <input
            onChange={handlechange}
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handlechange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
