import classNames from 'classnames/bind';
import { images } from '~/assets/img';
import styles from '../Section.module.scss';

const cx = classNames.bind(styles);

function HomeBrand() {
  return (
    <div className={cx('home-brand', 'container')}>
      <h3 className={cx('title-section')}>
        <span>THƯƠNG HIỆU</span>
      </h3>
      <div className={cx('home-article-content')}>
        <ul className={cx('home-brand-list')}>
          <li>
            <img alt="brand img" src={images.brannd1} />
          </li>
          <li>
            <img alt="brand img" src={images.brannd2} />
          </li>
          <li>
            <img alt="brand img" src={images.brannd3} />
          </li>
          <li>
            <img alt="brand img" src={images.brannd4} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomeBrand;
