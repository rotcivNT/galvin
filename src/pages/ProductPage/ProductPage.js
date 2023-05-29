import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import productApi from '~/api/productApi';
import { images } from '~/assets/img';
import ProductCard from '~/layouts/components/ProductCard';
import CheckBoxList from './CheckBoxList';
import styles from './ProductPage.module.scss';
import { Buffer } from 'buffer';

const cx = classNames.bind(styles);

const priceListTitle = [
  {
    title: 'Dưới 200,000đ',
    value: '0-200000',
  },
  {
    title: '200,000đ - 300,000đ',
    value: '200000-300000',
  },
  {
    title: '300,000đ - 400,000đ',
    value: '300000-400000',
  },
  {
    title: '400,000đ - 500,000đ',
    value: '400000-500000',
  },
  {
    title: 'Trên 500,000đ',
    value: '500000',
  },
];

const sizeListTitle = [
  {
    title: 'XS',
    value: 'XS',
  },
  {
    title: 'S',
    value: 'S',
  },
  {
    title: 'M',
    value: 'M',
  },
  {
    title: 'L',
    value: 'L',
  },
  {
    title: 'XL',
    value: 'XL',
  },
];

function ProductPage() {
  const [showList, setShowList] = useState({
    price: false,
    size: false,
  });
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const handleSetShowList = (type) => {
    setShowList((pre) => ({
      ...pre,
      [type]: !pre[type],
    }));
  };
  useEffect(() => {
    const fetch = async (id) => {
      const res = await productApi.getProductByCategory(id);
      console.log(res.data);
      setProducts(res.data.data);
    };
    fetch(id);
  }, [id]);
  console.log(products);
  return (
    <div className={cx('wrapper')}>
      <div className="container">
        <div className={cx('banner')}>
          <img alt="banner" src={images.somiBanner} />
        </div>
        <div className={cx('row')}>
          <div className="col l-3">
            <div className={cx('dropdown-filter')}>
              <div
                onClick={() => handleSetShowList('price')}
                className={cx('filter-title')}
              >
                <span>GIÁ SẢN PHẨM</span>
                <FaAngleDown className={cx('dropdown-filter-icon')} />
              </div>
              {showList.price && <CheckBoxList data={priceListTitle} />}
            </div>
            <div className={cx('dropdown-filter')}>
              <div
                onClick={() => handleSetShowList('size')}
                className={cx('filter-title')}
              >
                <span>KÍCH THƯỚC</span>
                <FaAngleDown className={cx('dropdown-filter-icon')} />
              </div>
              {showList.size && <CheckBoxList data={sizeListTitle} />}
            </div>
          </div>
          <div className="col l-9">
            <div className={cx('list-product-heading')}>
              <span>SƠ MI PREMIUM</span>
              <select>
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá: Tăng dần</option>
                <option value="price-desc">Giá: Giảm dần</option>
                <option value="best-selling">Bán chạy nhất</option>
              </select>
            </div>
            <div className="row">
              {products.map((product) => (
                <div className="col l-4">
                  <ProductCard
                    src={
                      product.imagePath &&
                      Buffer.from(product.imagePath).toString('binary')
                    }
                    productName={product.productName}
                    salePrice={product.salePrice}
                    percentSaleOff={product.percentSaleOff}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
