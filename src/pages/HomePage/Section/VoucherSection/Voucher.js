import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import voucherApi from '~/api/voucherApi';
import { images } from '~/assets/img';
import styles from './Voucher.module.scss';
import VoucherItem from './VoucherItem';

const cx = classNames.bind(styles);

function Voucher() {
  const [vouchers, setVouchers] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await voucherApi.getVoucher();
      setVouchers(res.data.data);
    };
    fetch();
  }, []);
  return (
    <div className={cx('voucher')}>
      <div className={cx('voucher-banner')}>
        <img alt="voucher" src={images.voucher} />
      </div>
      <div className={cx('voucher-list')}>
        {vouchers.map((voucher) => (
          <VoucherItem key={voucher.id} data={voucher} />
        ))}
      </div>
    </div>
  );
}

export default Voucher;
