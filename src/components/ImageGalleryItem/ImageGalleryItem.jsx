import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ src, alt, pageUrl, handleModal }) {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        onClick={handleModal}
        className={styles.ImageGalleryItemImage}
        src={src}
        alt={alt}
        pageurl={pageUrl}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  pageUrl: PropTypes.string.isRequired,
  handleModal: PropTypes.func.isRequired,
};
