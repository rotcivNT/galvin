import classNames from 'classnames/bind';
import styles from '../Section.module.scss';

const cx = classNames.bind(styles);

function HomeArticle() {
  return (
    <div className={cx('home-article', 'container')}>
      <h3 className={cx('title-section')}>
        <span>TIN TỨC MỚI NHẤT</span>
      </h3>
      <div className={cx('home-article-content')}>
        <span>Chưa có bài viết nào trong danh mục này !</span>
      </div>
    </div>
  );
}

export default HomeArticle;
