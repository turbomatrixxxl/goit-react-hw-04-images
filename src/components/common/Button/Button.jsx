import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';
import clsx from 'clsx';

export default function Button({ type, children, variant = '', handleClick }) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={clsx(
        variant === 'button'
          ? styles.Button
          : variant === 'SearchFormButton'
          ? styles.SearchFormButton
          : variant === 'CloseModalButton'
          ? styles.CloseModalButton
          : null
      )}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
