import { axiosClient } from '~/axiosClient/config';

const userApi = {
  createUser: (payload) => {
    return axiosClient.post('/create-user', payload);
  },
  getAllUser: (query) => {
    return axiosClient.get(`/get-all-user?q=${query}`);
  },
  deleteUser: (id) => {
    return axiosClient.delete(`/delete-user/${id}`);
  },
  updateUser: (payload) => {
    return axiosClient.put('/update-user', payload);
  },
};

export default userApi;
