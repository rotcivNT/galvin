import AdminDashboard from '~/layouts/adminDashboard';
import UserManager from '~/components/UserManager';
import CreateUser from '~/components/UserManager/CreateUser';
import UpdateUser from '~/components/UserManager/UpdateUser';
import AddProduct from '~/components/ProducManager/AddProduct/AddProduct';
import ProductManager from '~/components/ProducManager/ProductManager';
import UpdateProduct from '~/components/ProducManager/UpdateProduct';
import AddCategory from '~/components/CategoryManager/AddCategory';
import CategoryManager from '~/components/CategoryManager';
import UpdateCategory from '~/components/CategoryManager/UpdateCategory';
import DefaultLayout from '~/layouts/DefaultLayout';
import HomePage from '~/pages/HomePage';
import VoucherManager from '~/components/VoucherManager/VoucherManager';
import AddVoucher from '~/components/VoucherManager/AddVoucher';
import ProductPage from '~/pages/ProductPage';

export const routes = [
  {
    path: '/admin',
    layout: AdminDashboard,
    component: UserManager,
  },
  {
    path: '/admin/user-manager',
    layout: AdminDashboard,
    component: UserManager,
  },
  {
    path: '/admin/add-user',
    layout: AdminDashboard,
    component: CreateUser,
  },
  {
    path: '/admin/edit-user',
    layout: AdminDashboard,
    component: UpdateUser,
  },
  {
    path: '/admin/add-product',
    layout: AdminDashboard,
    component: AddProduct,
  },
  {
    path: '/admin/add-category',
    layout: AdminDashboard,
    component: AddCategory,
  },
  {
    path: '/admin/category-manager',
    layout: AdminDashboard,
    component: CategoryManager,
  },
  {
    path: '/admin/product-manager',
    layout: AdminDashboard,
    component: ProductManager,
  },
  {
    path: '/admin/update-category',
    layout: AdminDashboard,
    component: UpdateCategory,
  },
  {
    path: '/admin/update-product',
    layout: AdminDashboard,
    component: UpdateProduct,
  },
  {
    path: '/admin/voucher-manager',
    layout: AdminDashboard,
    component: VoucherManager,
  },
  {
    path: '/admin/add-voucher',
    layout: AdminDashboard,
    component: AddVoucher,
  },
  {
    path: '/',
    layout: DefaultLayout,
    component: HomePage,
  },
  {
    path: '/collections/:id',
    layout: DefaultLayout,
    component: ProductPage,
  },
];
