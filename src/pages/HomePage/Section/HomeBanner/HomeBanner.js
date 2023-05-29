import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { images } from '~/assets/img';
import styles from '../Section.module.scss';

const cx = classNames.bind(styles);

function HomeBanner() {
  return (
    <div className={cx('container', 'home-banner')}>
      <div className={cx('banner-list')}>
        <Link className={cx('banner-item')}>
          <div className={cx('image-banner')}>
            <img alt="banner" src={images.banner1} />
          </div>
          <div className={cx('banner-info')}>
            <p className={cx('banner-title')}>Siêu Sale</p>
            <p>MUA NGAY</p>
          </div>
        </Link>
        <Link className={cx('banner-item')}>
          <div className={cx('image-banner')}>
            <img alt="banner" src={images.banner2} />
          </div>
          <div className={cx('banner-info')}>
            <p className={cx('banner-title')}>PREMIUM CAO CẤP</p>
            <p>MUA NGAY</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomeBanner;
