import { Carousel } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaArrowRight } from 'react-icons/fa';
import productApi from '~/api/productApi';
import { Buffer } from 'buffer';
import ProductCard from '~/layouts/components/ProductCard';
import styles from '../Section.module.scss';
import Button from '~/layouts/components/Button';

const cx = classNames.bind(styles);

function NewProduct() {
  let perView = 3;
  if (window.matchMedia('(max-width: 992px)').matches) {
    perView = 2;
  }
  const [data, setData] = useState([]);

  const ButtonSlick = ({ currentSlide, slideCount, children, ...props }) => (
    <span {...props}>{children}</span>
  );
  useEffect(() => {
    const fetch = async (limit) => {
      const res = await productApi.getNewroducts(limit);
      setData(res.data.data);
    };
    fetch(9);
  }, []);
  return (
    <div className={cx('new-product', 'container')}>
      <h3 className={cx('title-section')}>
        <span>sản phẩm mới</span>
      </h3>
      <div className={cx('new-product-content')}>
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
          {data.length > 0 &&
            data.map((product) => (
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
      <div className={cx('new-product-btn')}>
        <Button
          rightIcon={<FaArrowRight style={{ display: 'block' }} />}
          rectangle
          to="/"
        >
          Xem tất cả
        </Button>
      </div>
    </div>
  );
}

export default NewProduct;
