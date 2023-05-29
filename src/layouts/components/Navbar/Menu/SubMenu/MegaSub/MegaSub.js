import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';
import styles from './MegaSub.module.scss';
import MegaSubItem from './MegaSubItem';
import formatCurrency from '~/utils/formatCurrency';
import ProductCard from '~/layouts/components/ProductCard';

const cx = classNames.bind(styles);

function MegaSub({ data, className }) {
  const [firstProduct, setFirstProduct] = useState({});
  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    data.find((item) => {
      if (item.Products.length > 0) {
        setFirstProduct(item.Products[0]);
      }
    });
  }, [data]);
  return (
    <div
      className={cx('mega', {
        [className]: className,
      })}
    >
      <div className={cx('left-content')}>
        <span className={cx('title')}>SHOP BY BRAND</span>
        <ul className={cx('menu-list')}>
          {data.map((item) => (
            <MegaSubItem key={item.id} data={item} />
          ))}
        </ul>
      </div>
      <ProductCard
        src={
          firstProduct.thumbnail &&
          Buffer.from(firstProduct.thumbnail).toString('binary')
        }
        productName={firstProduct.productName}
        salePrice={firstProduct.salePrice}
        className={cx('mega-product')}
      />
    </div>
  );
}

export default MegaSub;
