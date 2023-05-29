import classNames from 'classnames/bind';
import Slider from '~/layouts/components/Slider';
import styles from './HomePage.module.scss';
import FlashSale from './Section/FlashSale';
import HomeArticle from './Section/HomeArticle';
import HomeBanner from './Section/HomeBanner/HomeBanner';
import HomeBrand from './Section/HomeBrand';
import NewProduct from './Section/NewProduct';
import Policy from './Section/Policy';
import Voucher from './Section/VoucherSection/Voucher';

const cx = classNames.bind(styles);

function HomePage() {
  return (
    <div>
      <Slider />
      <div className={cx('content')}>
        <Policy />
        <FlashSale />
        <Voucher />
        <HomeBanner />
        <NewProduct />
        <HomeArticle />
        <HomeBrand />
      </div>
    </div>
  );
}

export default HomePage;
