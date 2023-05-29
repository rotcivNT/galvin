import { Space, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { RiDeleteBin5Line, RiPencilLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import userApi from '~/api/userApi';
import HeaderSearch from './HeaderSearch/HeaderSearch';
import styles from './UserManager.module.scss';

const cx = classNames.bind(styles);

function UserManager() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Loại tài khoản',
      key: 'roleId',
      dataIndex: 'roleId',
      render: (_, { roleId }) => {
        let color = 'geekblue';
        let text = 'Quản trị viên';
        if (roleId === 'R2') {
          color = 'green';
          text = 'Khách hàng';
        }
        return (
          <Tag color={color} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, user) => (
        <Space size="middle">
          <RiPencilLine
            onClick={() => handleAction('update', user)}
            className={cx('action-icon')}
          />
          <RiDeleteBin5Line
            onClick={() => handleAction('delete', user.id)}
            className={cx('action-icon')}
          />
        </Space>
      ),
    },
  ];
  const showToast = (data) => {
    toast[data.type](data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleAction = async (action, data) => {
    if (action === 'delete') {
      const dataToast = {
        message: 'Xóa tài khoản thành công.',
        type: 'success',
      };
      const res = await userApi.deleteUser(data);
      if (res.data.code === 0) showToast(dataToast);
      setData((pre) => pre.filter((user) => user.id !== data));
    } else {
      if (action === 'update') {
        navigate('/admin/edit-user', { state: data });
      }
    }
  };
  const handleSearchRequest = (query) => {
    setQuery(query);
  };
  useEffect(() => {
    const fetchUser = async (query = '') => {
      setLoading(true);
      const res = await userApi.getAllUser(query);
      if (res.data) {
        res.data.forEach((item) => {
          item.fullName = `${item.firstName} ${item.lastName}`;
        });
        setLoading(false);
      }
      setData(res.data);
    };
    fetchUser(query);
  }, [query]);
  return (
    <div className={cx('wrapper')}>
      <h3>DANH SÁCH TÀI KHOẢN</h3>
      <HeaderSearch
        loading={loading}
        handleSearchRequest={handleSearchRequest}
      />
      <Table rowKey="id" columns={columns} dataSource={data} />
      <ToastContainer theme="dark" transition={Bounce} />
    </div>
  );
}

export default UserManager;
