import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';

export default class App extends Component {
  state = {
    pictureName: '',
    pictureModal: null,
    showModal: false,
  };

  formSubmitHandler = data => {
    const { name } = data;
    const normalizedNameContact = name.toLowerCase();
    this.setState({ pictureName: normalizedNameContact });
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ pictureModal: largeImageURL });
  };

  render() {
    const { pictureName, showModal, pictureModal } = this.state;

    return (
      <div>
        <Searchbar formSubmit={this.formSubmitHandler}></Searchbar>
        <ImageGallery pictureName={pictureName} onClick={this.toggleModal}></ImageGallery>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={pictureModal} alt="" />
          </Modal>
        )}

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}
