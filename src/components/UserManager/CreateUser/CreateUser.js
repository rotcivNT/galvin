import classNames from 'classnames/bind';
import UserForm from '../UserForm';
import styles from './CreateUser.module.scss';

const cx = classNames.bind(styles);

function CreateUser() {
  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('title')}>TẠO NGƯỜI DÙNG MỚI</h3>
      <UserForm typeComponent="create" />
    </div>
  );
}

export default CreateUser;
