import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGallery.module.css';

function ImageGallery({ children }) {
  return <ul className={styles.ImageGallery}>{children}</ul>;
}

ImageGallery.propTypes = {
  children: PropTypes.array.isRequired,
};

export default ImageGallery;
