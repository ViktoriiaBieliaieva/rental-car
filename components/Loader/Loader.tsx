import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="var(--gray)"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper"
      />
    </div>
  );
};

export default Loader;
