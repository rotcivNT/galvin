import { Buffer } from 'buffer';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productApi from '~/api/productApi';
import styles from './Menu.module.scss';
import Dropdown from './SubMenu/Dropdown';
import MegaSub from './SubMenu/MegaSub';

const cx = classNames.bind(styles);

function MenuItem({ data, leftIcon, rightIcon, mobileIcon, hot, subMenuType }) {
  const [childData, setChildData] = useState([]);
  const [isOpenSub, setIsOpenSub] = useState(false);
  const isMobile = window.matchMedia('(max-width: 992px)');
  let submenu;
  let hasMega;
  const className = cx('sub-menu');
  const closeMenu = (e) => {
    e.stopPropagation();
    setIsOpenSub(false);
  };
  switch (subMenuType) {
    case 'dropdown':
      submenu = (
        <Dropdown
          data={childData}
          parentName={data.categoryName}
          className={className}
          isOpenSub={isMobile && isOpenSub}
          closeMenu={closeMenu}
        />
      );
      break;
    case 'mega':
      submenu = isMobile.matches ? (
        <Dropdown
          data={childData}
          parentName={data.categoryName}
          className={className}
          isOpenSub={isOpenSub}
          closeMenu={closeMenu}
        />
      ) : (
        <MegaSub data={childData} className={className} />
      );
      hasMega = 'has-mega';
      break;
    default:
      submenu = null;
  }
  const handleClickMenuItem = () => {
    if (isMobile.matches) {
      setIsOpenSub(true);
    }
  };
  useEffect(() => {
    const fetchChildData = async (id) => {
      const response = await productApi.getHighLevelCategory(id);
      setChildData(response.data.data);
    };
    fetchChildData(data.id);
  }, [data.id]);
  return (
    <li
      className={cx('menu-item', {
        [hasMega]: hasMega,
      })}
      onClick={handleClickMenuItem}
    >
      <Link
        className={cx('menu-link', {
          // eslint-disable-next-line no-useless-computed-key
          ['hot']: hot,
          // eslint-disable-next-line no-useless-computed-key
          ['has-thumb']: data.imagePath,
        })}
      >
        <p className={cx('menu-text')}>
          {leftIcon && <span>{leftIcon}</span>}
          {data?.categoryName}
          {rightIcon && <span>{rightIcon}</span>}
          {mobileIcon && (
            <span className={cx('mobile-icon')}>{mobileIcon}</span>
          )}
        </p>
        {data.imagePath && (
          <div className={cx('mobile-thumbnail')}>
            <img
              alt="thumb"
              src={Buffer.from(data.imagePath).toString('binary')}
            />
          </div>
        )}
      </Link>
      {submenu}
    </li>
  );
}

export default MenuItem;
