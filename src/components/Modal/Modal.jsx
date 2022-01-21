import { Component } from 'react';
import styles from '../Modal/Modal.module.css';

const { Overlay, Modal } = styles;

export default class ModalWindow extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div className={Overlay} onClick={this.handleBackdropClick}>
        <div className={Modal}>{this.props.children}</div>
      </div>
    );
  }
}
