import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductPage.module.scss';

const cx = classNames.bind(styles);

function CheckBoxList({ data }) {
  const [checked, setChecked] = useState(Array(5).fill(false));
  const handleClickChecked = (indexCheck) => {
    const updateChecked = checked.map((item, index) => {
      if (index === indexCheck) item = !item;
      return item;
    });
    setChecked(updateChecked);
  };
  return (
    <ul className={cx('checkbox-list')}>
      {data.map((item, index) => (
        <li
          key={item.value}
          onClick={() => handleClickChecked(index)}
          className={cx('checkbox-item', {
            active: checked[index],
          })}
        >
          <input value={item.value} type="checkbox" />
          <label>{item.title}</label>
        </li>
      ))}
    </ul>
  );
}

export default CheckBoxList;
