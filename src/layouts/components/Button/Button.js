import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
  href,
  to,
  rounded,
  rectangle,
  children,
  rightIcon,
  className,
}) {
  let Component = 'button';
  const classNames = cx('wrapper', {
    [className]: className,
    rounded,
    rectangle,
  });
  if (href) {
    Component = 'a';
  } else if (to) {
    Component = Link;
  }
  return (
    <Component className={classNames}>
      <span className={cx('text')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Component>
  );
}

export default Button;
