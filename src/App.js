import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';

import API from './services/pixabayservices';

const newsApi = new API();

export default class App extends Component {
  state = {
    pictureName: '',
    pictureModal: null,
    showModal: false,
    picture: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.pictureName;
    const nextName = this.state.pictureName;
    if (nextName !== prevName) {
      this.setState({ loading: true, picture: null });

      newsApi.query = nextName;
      newsApi.resetPage();
      newsApi
        .fetchImages()
        .then(({ hits }) => {
          this.setState({ picture: hits });

          if (hits.length === 0) {
            this.setState({ picture: null });
            toast.error('Sorry, there are no images matching your search query. Please try again.');
            return;
          }
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  fetchMorePictures = () => {
    const { picture } = this.state;

    this.setState({ loading: true });
    return newsApi
      .fetchImages()
      .then(({ hits }) => {
        this.setState({ picture: [...picture, ...hits] });
        if (hits.length === 0) {
          toast.error('Sorry, there are no more images matching your search.');
          return;
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
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
    const { showModal, pictureModal } = this.state;
    const { picture, loading } = this.state;

    return (
      <div>
        <Searchbar formSubmit={this.formSubmitHandler}></Searchbar>

        {picture && <ImageGallery picture={picture} onClick={this.toggleModal}></ImageGallery>}

        {picture && <Button pagination={this.fetchMorePictures}></Button>}
        {loading && <Loader></Loader>}

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
