import { axiosClient } from '~/axiosClient/config';

const productApi = {
  addCategory: (payload) => {
    return axiosClient.post('/add-category', payload);
  },
  getAllCategory: () => {
    return axiosClient.get('/get-all-category');
  },
  getCategoryById: (id) => {
    return axiosClient.get(`/get-category-by-id/${id}`);
  },
  getHighLevelCategory: (parent_id = null) => {
    return axiosClient.get(`/get-category-by-parent/${parent_id}`);
  },
  getCategoryWithoutImg: () => {
    return axiosClient.get('/get-category-without-img');
  },
  checkHasChild: (id) => {
    return axiosClient.get(`check-has-child/${id}`);
  },
  deleteCategory: (id) => {
    return axiosClient.delete(`/delete-category/${id}`);
  },
  updateCategory: (payload) => {
    return axiosClient.put(`/update-category`, payload);
  },
  addProduct: (payload) => {
    return axiosClient.post('/add-product', payload);
  },
  getProduct: (query, categoryId) => {
    return axiosClient.get(`/get-product?q=${query}&categoryId=${categoryId}`);
  },
  getFirstProduct: (type) => {
    return axiosClient.get(`/get-first-product/${type}`);
  },
  deleteProduct: (id) => {
    return axiosClient.delete(`/delete-product/${id}`);
  },
  updateProduct: (payload) => {
    return axiosClient.put('/update-product', payload);
  },
  getProductByCategory: (id) => {
    return axiosClient.get(`/get-product-by-category/${id}`);
  },
  getAllCode: (type) => {
    return axiosClient.get(`/get-all-code/${type}`);
  },
  getSaleProducts: () => {
    return axiosClient.get('/get-sale-product');
  },
  getNewroducts: (limit) => {
    return axiosClient.get(`/get-new-product?limit=${limit}`);
  },
};

export default productApi;
