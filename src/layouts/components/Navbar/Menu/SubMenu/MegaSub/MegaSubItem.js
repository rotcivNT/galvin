import { Buffer } from 'buffer';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './MegaSub.module.scss';

const cx = classNames.bind(styles);

function MegaSubItem({ data }) {
  return (
    <li className={cx('menu-item')}>
      <img alt="thumb" src={Buffer.from(data.imagePath).toString('binary')} />
      <Link className={cx('menu-link')}>{data.categoryName}</Link>
    </li>
  );
}

export default MegaSubItem;
