import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from '../ImageGallery/ImageGallery.module.css';
import API from '../../services/pixabayservices';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
/* import PropTypes from 'prop-types';
import API from './services/pixabayservices';

const newsApi = new API();
import ContactListItem from '../ContactListItem/ContactListItem';

import { ListStyle } from './ContactList.styled';

const ContactList = ({ visibleContact, onDeleteContact }) => {
  return (
    <ul>
      {visibleContact.map(({ name, id, number }) => {
        return (
          <ContactListItem key={id} data={{ number, name, id }} onDeleteContact={onDeleteContact} />
        );
      })}
    </ul>
  );
};

export default ContactList; */

/* ContactList.propTypes = {
  visibleContact: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
 */
const newsApi = new API();

export default class ImageGallery extends Component {
  state = {
    picture: null,
    loading: false,
    error: null,
    status: 'idle',
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
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  fetchMorePictures = () => {
    const { picture } = this.state;
    /* this.setState({ loading: false }); */
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

  render() {
    const { picture, loading } = this.state;
    /* if (status === 'idle') {
      return;
    }

    if (status === 'pending') {
      return <Loader></Loader>;
    } */

    /* if (status === 'resolved') {
      return (
        <>
          <ul className={styles.ImageGallery}>
            {console.log(picture)}
            {picture.map(({ id, webformatURL, tags }, index) => {
              return <ImageGalleryItem key={index} data={{ webformatURL, tags }} />;
            })}
          </ul>
          <Button pagination={this.fetchMorePictures}></Button>
        </>
      );
    } */

    return (
      <>
        <ul className={styles.ImageGallery}>
          {console.log(picture)}
          {picture &&
            picture.map(({ id, webformatURL, tags }, index) => {
              return <ImageGalleryItem key={index} data={{ webformatURL, tags }} />;
            })}
        </ul>
        {picture && <Button pagination={this.fetchMorePictures}></Button>}
        {loading && <Loader></Loader>}
      </>
    );
  }
}
