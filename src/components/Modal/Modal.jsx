import React from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

function Modal({ isOpenModal, children }) {
  return (
    isOpenModal && (
      <div className={styles.Overlay}>
        {/* <Button
            type={'button'}
            handleClick={handleModalClose}
            variant="CloseModalButton"
          >
            <HiX size="24px" />
          </Button> */}
        <div className={styles.Modal}>{children}</div>
      </div>
    )
  );
}

Modal.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;

// export default class Modal extends Component {
//   render() {
//     const { isOpenModal, children } = this.props;

//     return (
//       isOpenModal && (
//         <div className={styles.Overlay}>
//           {/* <Button
//             type={'button'}
//             handleClick={handleModalClose}
//             variant="CloseModalButton"
//           >
//             <HiX size="24px" />
//           </Button> */}
//           <div className={styles.Modal}>{children}</div>
//         </div>
//       )
//     );
//   }
// }
