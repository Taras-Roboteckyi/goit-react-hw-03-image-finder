import PropTypes from 'prop-types';
import styles from '../ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({ data, largePicture }) => {
  const { webformatURL, tags, largeImageURL } = data;

  /* console.log(data); */
  const { ImageGalleryItem, ImageGalleryItemImage } = styles;
  return (
    <li className={ImageGalleryItem} onClick={() => largePicture(largeImageURL)}>
      <img className={ImageGalleryItemImage} src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  largePicture: PropTypes.func.isRequired,
};
