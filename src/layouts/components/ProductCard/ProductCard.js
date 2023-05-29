import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { images } from '~/assets/img';
import formatCurrency from '~/utils/formatCurrency';
import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

function ProductCard({
  src,
  productName,
  salePrice,
  percentSaleOff,
  className,
}) {
  return (
    <div
      className={cx('product-content', {
        [className]: className,
      })}
    >
      <div className={cx('product-menu')}>
        <Link className={cx('product-link')}>
          <img alt="polo" src={src} />
          <p className={cx('product-name')}>{productName}</p>
        </Link>
        <p className={cx('price')}>
          <span>229,000đ</span>
          <span>{formatCurrency(parseInt(salePrice))}</span>
        </p>
      </div>
      <span className={cx('product-sale-off')}>-{percentSaleOff}%</span>
      <div className={cx('sale-gif')}>
        {percentSaleOff > 25 && <img alt="sale-gif" src={images.saleGif} />}
      </div>
    </div>
  );
}

export default ProductCard;
