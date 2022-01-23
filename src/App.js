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
      this.setState({ picture: [], scroll: false });

      this.fetchMorePictures();
    }
  }

  fetchMorePictures = () => {
    const { pictureName, scroll } = this.state;

    this.setState({ loading: true, scroll: true });

    newsApi.query = pictureName;
    console.log(this.state.pictureName);

    newsApi
      .fetchImages()
      .then(({ hits }) => {
        console.log(hits);

        this.setState(prevState => ({ picture: [...prevState.picture, ...hits], image: true }));
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

    /* const { picture } = this.state;

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
      .finally(() => this.setState({ loading: false })); */
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

        {picture.length > 0 && <Button pagination={this.fetchMorePictures}></Button>}
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

/* class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    showModal: false,
    isLoading: false,
    error: null,
    total: 0,
    modalImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImg();
    }
  }

  fetchImg = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    if (!searchQuery) {
      return;
    }

    this.setState({ isLoading: true });

    ImageApi.fetchImg(options)
      .then(hits => {
        console.log(hits.length);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
          total: hits.length,
        }));

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };
} */
