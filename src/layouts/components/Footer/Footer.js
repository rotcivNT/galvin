import classNames from 'classnames/bind';
import { BiMap, BiPhone, BiMailSend } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { images } from '~/assets/img';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('footer-top')}>
          <div className={cx('footer-logo')}>
            <img alt="footer-logo" src={images.headerLogo} />
          </div>
          <div className={cx('footer-contact')}>
            <div className={cx('footer-contact-item')}>
              <BiMap className={cx('footer-icon')} />
              <p>
                Địa chỉ:
                <span>
                  Số 47, Ngõ 16 Đường Hoàng Cầu, Quận Đống Đa, TP. Hà Nội
                </span>
                <a href="fb.com">Xem trên Google Maps</a>
              </p>
            </div>
          </div>
          <div className={cx('footer-contact')}>
            <div className={cx('footer-contact-item')}>
              <BiPhone className={cx('footer-icon')} />
              <p>
                Điện thoại:
                <span>
                  Mua hàng online: 1900633836 | Góp ý, khiếu nại: 0867866659 -
                  0377609999
                </span>
              </p>
            </div>
            <div className={cx('footer-contact-item')}>
              <BiMailSend className={cx('footer-icon')} />
              <p>
                Email:
                <span>info@galvin.com.vn</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('footer-bottom')}>
        <div className={cx('container')}>
          <div className={cx('footer-payment')}>
            <img alt="payment" src={images.payment} />
          </div>
          <ul className={cx('footer-menu')}>
            <li className={cx('footer-menu-item')}>
              <Link to="/">TÌM KIẾM</Link>
            </li>
            <li className={cx('footer-menu-item')}>
              <Link to="/">GIỚI THIỆU</Link>
            </li>
            <li className={cx('footer-menu-item')}>
              <Link to="/">CHÍNH SÁCH ĐỔI TRẢ</Link>
            </li>
            <li className={cx('footer-menu-item')}>
              <Link to="/">CHÍNH SÁCH BẢO MẬT</Link>
            </li>
            <li className={cx('footer-menu-item')}>
              <Link to="/">ĐIỀU KHOẢN DỊCH VỤ</Link>
            </li>
          </ul>
          <p className={cx('footer-cpy-right')}>Copyright © 2023 Galvin</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
