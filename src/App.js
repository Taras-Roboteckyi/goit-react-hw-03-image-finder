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
    picture: [],
    loading: false,
    error: null,
    image: null,
    scroll: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.pictureName;
    const nextName = this.state.pictureName;

    if (nextName !== prevName) {
      newsApi.resetPage();
      this.setState({ picture: [] });
      this.setState({ scroll: false });

      this.fetchMorePictures();
    }
  }

  fetchMorePictures = () => {
    const { pictureName, scroll } = this.state;

    this.setState({ loading: true, scroll: true });

    newsApi.query = pictureName;
    //console.log(this.state.pictureName);

    newsApi
      .fetchImages()
      .then(({ hits }) => {
        //console.log(hits.length);

        this.setState(prevState => ({
          picture: [...prevState.picture, ...hits],
          image: true,
        }));

        if (hits.length === 0) {
          toast.error('Sorry, there are no more images matching your search.');
          return;
        }
        if (scroll) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
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
    const { picture, loading, image } = this.state;

    return (
      <div>
        <Searchbar formSubmit={this.formSubmitHandler}></Searchbar>

        {image && <ImageGallery picture={picture} onClick={this.toggleModal}></ImageGallery>}

        {picture.length > 0 && picture.length % 12 === 0 && (
          <Button pagination={this.fetchMorePictures}></Button>
        )}
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
