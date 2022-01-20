/* import PropTypes from 'prop-types'; */
import styles from '../ImageGalleryItem/ImageGalleryItem.module.css';
/* import { ListItemStyle, NameContactStyle, ButtonContactStyle } from './ContactListItem.styled'; */

const ImageGalleryItem = ({ data }) => {
  const { webformatURL, tags } = data;

  /* console.log(data); */
  const { ImageGalleryItem, ImageGalleryItemImage } = styles;
  return (
    <li className={ImageGalleryItem}>
      <img className={ImageGalleryItemImage} src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;

/* ContactListItem.propTypes = {
  data: PropTypes.shape({
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  onDeleteContact: PropTypes.func.isRequired,
};
 */
