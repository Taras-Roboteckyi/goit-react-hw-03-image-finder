/* import PropTypes from 'prop-types'; */
import styles from '../Button/Button.module.css';
/* import styles from '../ImageGalleryItem/ImageGalleryItem.module.css'; */
/* import { ListItemStyle, NameContactStyle, ButtonContactStyle } from './ContactListItem.styled'; */

const Button = ({ pagination }) => {
  /* const { webformatURL, tags } = data; */
  const { Button } = styles;

  /* console.log(data); */
  /*  const { ImageGalleryItem, ImageGalleryItemImage } = styles; */
  return (
    <button type="button" className={Button} onClick={() => pagination()}>
      Load more
    </button>
  );
};

export default Button;

/* ContactListItem.propTypes = {
  data: PropTypes.shape({
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  onDeleteContact: PropTypes.func.isRequired,
};
 */
