import { Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { RiErrorWarningLine } from 'react-icons/ri';
import Button from '~/layouts/components/Button';
import styles from './Voucher.module.scss';

const cx = classNames.bind(styles);

function VoucherItem({ data }) {
  const popUpElement = () => (
    <div className={cx('pop-up')}>
      <p className={cx('pop-up-title')}>
        GIẢM NGAY {Math.round(data.value / 1000)}K
      </p>
      <div className={cx('pop-up-content')}>
        <p>
          <span>Mã voucher</span>
          <span>{data.voucherCode}</span>
        </p>
        <p>
          <span>Hạn sử dụng</span>
          <span>{data.endDate}</span>
        </p>
        <ul className={cx('info-list')}>
          <li>Cho đơn hàng từ {Math.round(data.orderPrice / 1000)}K</li>
          <li>Mỗi khách hàng được sử dụng tối đa 1 lần.</li>
          <li>Sao chép mã và nhập mã khuyến mãi ở trang thanh toán</li>
        </ul>
      </div>
    </div>
  );
  return (
    <div className={cx('voucher-item')}>
      <div className={cx('voucher-info')}>
        <div className={cx('left-content')}>
          <p className={cx('voucher-title')}>
            GIẢM NGAY <span>{Math.round(data.value / 1000)}K</span>
          </p>
          <div className={cx('voucher-action')}>
            <ul className={cx('voucher-text')}>
              <li>Cho đơn hàng từ {Math.round(data.orderPrice / 1000)}K</li>
            </ul>
            <Button rounded>Sao chép mã</Button>
          </div>
        </div>
        <div className={cx('right-content')}>
          <p className={cx('end-date')}>Hạn sử dụng: {data.endDate}</p>
          <div className={cx('more-info')}>
            <Tooltip
              overlayStyle={{ maxWidth: '600px' }}
              title={popUpElement()}
            >
              <RiErrorWarningLine />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoucherItem;
