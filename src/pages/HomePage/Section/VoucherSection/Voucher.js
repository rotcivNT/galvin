import classNames from 'classnames/bind';
import styles from './Voucher.module.scss';

const cx = classNames.bind(styles);

function Voucher() {
  return (
    <div className={cx('voucher')}>
      <div className={cx('voucher-banner')}></div>
    </div>
  );
}

export default Voucher;
