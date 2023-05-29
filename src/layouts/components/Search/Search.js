import classNames from 'classnames/bind';
import { IoSearchOutline } from 'react-icons/io5';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <input className={cx('search-input')} placeholder="Search for item" />
        <IoSearchOutline className={cx('search-icon')} />
      </div>
    </div>
  );
}

export default Search;
