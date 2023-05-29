import { images } from '~/assets/img';
import classNames from 'classnames/bind';
import styles from '../Section.module.scss';

const cx = classNames.bind(styles);

function PolicySection() {
  return (
    <div className={cx('policy')}>
      <div className={cx('policy-item')}>
        <img alt="policy-img" src={images.pocily1} />
        <p>FREESHIP COD với đơn hàng {'>'} 500k</p>
      </div>
      <div className={cx('policy-item')}>
        <img alt="policy-img" src={images.pocily2} />
        <p>Thanh toán khi nhận hàng</p>
      </div>
      <div className={cx('policy-item')}>
        <img alt="policy-img" src={images.pocily3} />
        <p>Hỗ trợ tư vấn khách hàng 24/7</p>
      </div>
    </div>
  );
}

export default PolicySection;
