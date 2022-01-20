import { TailSpin } from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from '../Loader/Loader.module.css';

const Loader = () => {
  const { spinner } = styles;
  return (
    <div className={spinner}>
      <TailSpin
        arialLabel="loading-indicator"
        height={40}
        width={40}
        strokeWidth={5}
        strokeWidthSecondary={1}
        color="blue"
      />
    </div>
  );
};

export default Loader;
