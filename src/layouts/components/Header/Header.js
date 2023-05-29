import classNames from 'classnames/bind';
import { createContext, useState } from 'react';
import { BiHeart, BiMenu, BiShoppingBag, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { images } from '~/assets/img';
import Navbar from '../Navbar';
import Search from '../Search';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);
export const OpenContext = createContext();

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <OpenContext.Provider value={{ isOpen, setIsOpen }}>
      <div className={cx('wrapper')}>
        <div className={cx('header-top')}>
          <div className={cx('header-menu-icon')}>
            <BiMenu onClick={() => setIsOpen(true)} display="block" />
          </div>
          <div className={cx('logo')}>
            <Link to="/">
              <img alt="logo" src={images.headerLogo} />
            </Link>
          </div>
          <div className={cx('header-link')}>
            <Link className={cx('active')} to="/">
              Nam
            </Link>
            <Link to="/">Nữ</Link>
          </div>
          <Search />
          <div className={cx('right-content')}>
            <span className={cx('promotion')}>Đăng ký giảm ngay 10%</span>
            <ul className={cx('action')}>
              <li>
                <Link>
                  <BiUser display="block" className={cx('action-icon')} />
                </Link>
              </li>
              <li>
                <Link>
                  <BiHeart display="block" className={cx('action-icon')} />
                </Link>
              </li>
              <li>
                <Link>
                  <BiShoppingBag
                    display="block"
                    className={cx('action-icon')}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={cx('header-bottom')}>
          <Navbar isOpen={isOpen} />
        </div>
      </div>
    </OpenContext.Provider>
  );
}

export default Header;
