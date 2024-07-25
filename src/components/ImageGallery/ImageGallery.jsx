import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  render() {
    const { children } = this.props;

    return <ul className={styles.ImageGallery}>{children}</ul>;
  }
}

ImageGallery.propTypes = {
  children: PropTypes.array.isRequired,
};
