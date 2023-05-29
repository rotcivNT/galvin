import { Buffer } from 'buffer';
import classNames from 'classnames/bind';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Dropdown.module.scss';

const cx = classNames.bind(styles);

function Dropdown({ data, parentName, className, isOpenSub, closeMenu }) {
  return (
    <div
      className={cx('dropdown', {
        [className]: className,
        active: isOpenSub,
      })}
    >
      <p className={cx('dropdown-mobile-header')}>{parentName}</p>
      <ul className={cx('menu-list')}>
        {data.map((item) => (
          <li key={item.id} className={cx('menu-item')}>
            <Link className={cx('menu-link')} to={`collections/${item.id}`}>
              <img
                alt="thumb"
                src={Buffer.from(item.imagePath).toString('binary')}
              />
              {item.categoryName}
            </Link>
          </li>
        ))}
      </ul>
      <div onClick={(e) => closeMenu(e)} className={cx('back-btn')}>
        <FaLongArrowAltLeft className={cx('back-icon')} />
      </div>
    </div>
  );
}

export default Dropdown;
