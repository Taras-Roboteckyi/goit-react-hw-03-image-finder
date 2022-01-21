import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from '../ImageGallery/ImageGallery.module.css';
import API from '../../services/pixabayservices';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

const newsApi = new API();

export default class ImageGallery extends Component {
  state = {
    picture: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pictureName;
    const nextName = this.props.pictureName;
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
          this.props.largestPicture(this.state.picture);
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
        this.props.largestPicture(this.state.picture);
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { picture, loading } = this.state;
    const { ImageGallery } = styles;

    return (
      <>
        <ul className={ImageGallery}>
          {picture &&
            picture.map(({ largeImageURL, webformatURL, tags }, index) => {
              return (
                <ImageGalleryItem
                  key={index}
                  data={{ largeImageURL, webformatURL, tags }}
                  largePicture={this.props.onClick}
                />
              );
            })}
        </ul>
        {picture && <Button pagination={this.fetchMorePictures}></Button>}
        {loading && <Loader></Loader>}
      </>
    );
  }
}
