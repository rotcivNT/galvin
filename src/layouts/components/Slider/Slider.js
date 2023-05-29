import { Carousel } from 'antd';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import { images } from '~/assets/img';

const cx = classNames.bind(styles);

function Slider() {
  return (
    <Carousel autoplay autoplaySpeed={5000}>
      <div>
        <img alt="slider" className={cx('slider-img')} src={images.slider1} />
      </div>
      <div>
        <img alt="slider" className={cx('slider-img')} src={images.slider2} />
      </div>
    </Carousel>
  );
}

export default Slider;
