import { Carousel } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import productApi from '~/api/productApi';
import { images } from '~/assets/img';
import Button from '~/layouts/components/Button';
import { Buffer } from 'buffer';
import ProductCard from '~/layouts/components/ProductCard';
import styles from '../Section.module.scss';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const cx = classNames.bind(styles);

function FlashSale() {
  const [products, setProducts] = useState([]);
  let perView = 5;
  if (window.matchMedia('(max-width: 992px)').matches) {
    perView = 2;
  } else if (window.matchMedia('(max-width: 1200px)').matches) {
    perView = 4;
  }
  const ButtonSlick = ({ currentSlide, slideCount, children, ...props }) => (
    <span {...props}>{children}</span>
  );
  useEffect(() => {
    const fetch = async () => {
      const res = await productApi.getSaleProducts();
      setProducts(res.data.data);
    };
    fetch();
  }, []);
  return (
    <div className={cx('home-flashsale')}>
      <div className={cx('container')}>
        <div className={cx('flashsale-heading')}>
          <img alt="flash sale banner" src={images.flashSale} />
          <div className={cx('flashsale-btn-wrap')}>
            <Button className={cx('flashsale-btn')} to="/">
              Xem thêm
            </Button>
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('product-list-section')}>
            <Carousel
              autoplay
              prevArrow={
                <ButtonSlick>
                  <FaAngleLeft />
                </ButtonSlick>
              }
              nextArrow={
                <ButtonSlick>
                  <FaAngleRight />
                </ButtonSlick>
              }
              dots={false}
              arrows={true}
              slidesToShow={perView}
            >
              {products.length > 0 &&
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    src={
                      product.thumbnail &&
                      Buffer.from(product.thumbnail).toString('binary')
                    }
                    productName={product.productName}
                    salePrice={product.salePrice}
                    percentSaleOff={product.percentSaleOff}
                  />
                ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashSale;
