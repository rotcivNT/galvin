import { useContext, useEffect, useState } from 'react';
import productApi from '~/api/productApi';
import MenuItem from './MenuItem';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { FaChevronDown, FaPlus, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { OpenContext } from '~/layouts/components/Header/Header';

const cx = classNames.bind(styles);

function Menu() {
  const [data, setData] = useState([]);
  const [ids, setIds] = useState([]);
  const { isOpen, setIsOpen } = useContext(OpenContext);
  const handleClose = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };
  useEffect(() => {
    const fetch = async () => {
      let ids;
      const response = await productApi.getHighLevelCategory();
      ids = response.data.data.map((item) => item.id);
      setData(response.data.data);
      setIds(ids);
    };
    fetch();
  }, []);
  useEffect(() => {
    const requests = data.map((item) => productApi.checkHasChild(item.id));
    Promise.all(requests).then((result) => {
      setData((pre) =>
        pre.map((item, index) => {
          let subMenuType;
          if (result[index].data.data) {
            if (item.categoryName.toLowerCase() === 'premium') {
              subMenuType = 'dropdown';
            } else {
              subMenuType = 'mega';
            }
          }
          return {
            ...item,
            hasChild: result[index].data.data ? true : false,
            subMenuType,
          };
        }),
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);
  return (
    <>
      <div
        className={cx('mobile-overlay', {
          show: isOpen,
        })}
      ></div>
      <div
        className={cx('wrapper', {
          active: isOpen,
        })}
      >
        <ul className={cx('menu-mobile-header')}>
          <li className={cx('menu-mobile-header-item')}>
            <Link to="/" className={cx('active')}>
              NAM
            </Link>
          </li>
          <li className={cx('menu-mobile-header-item')}>
            <Link to="/">NỮ</Link>
          </li>
        </ul>
        <ul className={cx('menu-list')}>
          {data.map((item, index) => (
            <MenuItem
              key={item.id}
              data={item}
              hot={index === 0}
              rightIcon={
                item.hasChild && <FaChevronDown className={cx('menu-icon')} />
              }
              mobileIcon={item.hasChild && <FaPlus />}
              subMenuType={item.subMenuType}
            />
          ))}
        </ul>
        <div onClick={(e) => handleClose(e)} className={cx('close-btn')}>
          <FaTimes className={cx('close-icon')} />
        </div>
      </div>
    </>
  );
}

export default Menu;
