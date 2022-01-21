import PropTypes from 'prop-types';
import styles from '../Button/Button.module.css';

const Button = ({ pagination }) => {
  const { Button } = styles;

  return (
    <button type="button" className={Button} onClick={() => pagination()}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  pagination: PropTypes.func.isRequired,
};
