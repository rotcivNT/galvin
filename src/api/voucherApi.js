import { axiosClient } from '~/axiosClient/config';

const voucherApi = {
  addVoucher: (payload) => {
    return axiosClient.post('/add-voucher', payload);
  },
  getVoucher: () => {
    return axiosClient.get('/get-voucher');
  },
  deleteVoucher: (id) => {
    return axiosClient.delete(`/delete-voucher/${id}`);
  },
};

export default voucherApi;
