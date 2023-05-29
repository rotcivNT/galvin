import {
  UserAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FaListOl, FaProductHunt } from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoMdAddCircle } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { images } from '~/assets/img';
import styles from './AdminDashboard.module.scss';
import { RiCoupon3Line } from 'react-icons/ri';

const { Header, Content, Footer, Sider } = Layout;
const cx = classNames.bind(styles);

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Người dùng', 'user', <UserOutlined />, [
    getItem(
      'Quản lý người dùng',
      '/admin/user-manager',
      <UserSwitchOutlined />,
    ),
    getItem('Thêm người dùng', '/admin/add-user', <UserAddOutlined />),
  ]),
  getItem('Danh mục', 'category', <BiCategoryAlt />, [
    getItem('Quản lý danh mục', '/admin/category-manager', <FaListOl />),
    getItem('Thêm danh mục', '/admin/add-category', <IoMdAddCircle />),
  ]),
  getItem('Sản phẩm', 'product', <FaProductHunt />, [
    getItem('Quản lý sản phẩm', '/admin/product-manager', <FaListOl />),
    getItem('Thêm sản phẩm', '/admin/add-product', <IoMdAddCircle />),
  ]),
  getItem('Voucher', 'voucher', <RiCoupon3Line />, [
    getItem('Quản lý Voucher', '/admin/voucher-manager', <FaListOl />),
    getItem('Thêm Voucher', '/admin/add-voucher', <IoMdAddCircle />),
  ]),
];

function AdminDashboard({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleClick = (key) => {
    // Handle click menu item
    navigate(key);
  };
  const handleOpenMenu = (value) => {
    setOpenKeys(value);
  };
  useEffect(() => {
    if (location.pathname.includes('user')) {
      setOpenKeys(['user']);
    }
  }, [location.pathname]);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={220}
      >
        <div
          style={{
            margin: '20px 0',
            textAlign: 'center',
          }}
        >
          <img
            className={cx('logo')}
            width="100%"
            height="100%"
            src={images.logo}
            alt="Galvin"
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          inlineIndent={15}
          onClick={({ key }) => handleClick(key)}
          selectedKeys={location.pathname}
          onOpenChange={(value) => handleOpenMenu(value)}
          openKeys={openKeys}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <div
            style={{
              padding: 24,
              margin: '16px 0 0',
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Copyright © 2022 Galvin
        </Footer>
      </Layout>
    </Layout>
  );
}

export default AdminDashboard;
