import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import voucherApi from '~/api/voucherApi';
import formatCurrency from '~/utils/formatCurrency';

function VoucherManager() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await voucherApi.getVoucher();
      res.data.data.forEach((item) => {
        item.orderPrice = formatCurrency(item.orderPrice);
      });
      setData(res.data.data);
    };
    fetch();
  }, []);
  const columns = [
    {
      title: 'Mã Voucher',
      dataIndex: 'voucherCode',
      key: 'voucherCode',
    },
    {
      title: 'Giá trị giảm',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Hạn sử dụng',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Giá đơn hàng (tối thiểu)',
      key: 'orderPrice',
      dataIndex: 'orderPrice',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, voucher) => (
        <Space size="middle">
          <RiDeleteBin5Line
            onClick={() => handleDelete(voucher.id)}
            style={{ fontSize: '2rem', cursor: 'pointer' }}
          />
        </Space>
      ),
    },
  ];
  const handleDelete = async (id) => {
    const dataToast = {
      message: 'Xóa thành công.',
      type: 'success',
    };
    const res = await voucherApi.deleteVoucher(id);
    if (res.data.code !== 0) {
      dataToast.message = res.data.message;
      dataToast.type = 'error';
    }
    setData((pre) => pre.filter((voucher) => voucher.id !== id));
    showToast(dataToast);
  };
  const showToast = (data) => {
    toast[data.type](data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <div>
      <Table rowKey="id" columns={columns} dataSource={data} />
      <ToastContainer theme="dark" transition={Bounce} />
    </div>
  );
}

export default VoucherManager;
