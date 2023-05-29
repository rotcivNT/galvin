import { Button, DatePicker, Form, Input } from 'antd';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import voucherApi from '~/api/voucherApi';

function AddVoucher() {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const dataToast = {
      message: 'Thêm Voucher thành công.',
      type: 'success',
    };
    values.endDate = values.endDate.$d.toLocaleDateString();
    const res = await voucherApi.addVoucher(values);
    if (res.data.code !== 0) {
      dataToast.type = 'error';
      dataToast.message = res.data.message;
    } else {
      form.resetFields();
    }
    showToast(dataToast);
  };
  const showToast = (data) => {
    toast[data.type](data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <div>
      <Form
        form={form}
        name="basic"
        layout="inline"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Giá trị giảm"
          name="value"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập giá trị giảm (%)',
            },
          ]}
          style={{ width: '40%' }}
        >
          <Input style={{ width: '250px' }} />
        </Form.Item>
        <Form.Item
          label="Giá trị đơn hàng"
          name="orderPrice"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập giá trị đơn hàng!',
            },
          ]}
          style={{ width: '40%' }}
        >
          <Input style={{ width: '250px' }} />
        </Form.Item>
        <Form.Item
          label="Hạn sử dụng"
          name="endDate"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn hạn sử dụng!',
            },
          ]}
          style={{ width: '40%', marginTop: 28 }}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          label="Mã voucher"
          name="voucherCode"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mã voucher!',
            },
          ]}
          style={{ width: '40%', marginTop: 28 }}
        >
          <Input style={{ width: '250px' }} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 14,
          }}
          style={{ width: '100%', marginTop: 32 }}
        >
          <Button type="primary" htmlType="submit">
            Thêm Voucher
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer theme="dark" transition={Bounce} />
    </div>
  );
}

export default AddVoucher;
