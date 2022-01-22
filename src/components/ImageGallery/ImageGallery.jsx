import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import styles from '../ImageGallery/ImageGallery.module.css';

const { ImageGallery } = styles;

const ImageGalleryPictures = ({ picture, onClick }) => {
  return (
    <ul className={ImageGallery}>
      {picture.map(({ largeImageURL, webformatURL, tags }, index) => {
        return (
          <ImageGalleryItem
            key={index}
            data={{ largeImageURL, webformatURL, tags }}
            largePicture={onClick}
          />
        );
      })}
    </ul>
  );
};

export default ImageGalleryPictures;

ImageGalleryPictures.propTypes = {
  picture: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onClick: PropTypes.func.isRequired,
};
