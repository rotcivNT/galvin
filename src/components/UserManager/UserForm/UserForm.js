import { Button, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import userApi from '~/api/userApi';

function UserForm({ typeComponent, userData }) {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const dataToast = {
      message: 'Tạo tài khoản thành công.',
      type: 'success',
    };
    if (typeComponent === 'create') {
      await handleCreateUser(values, dataToast);
    } else if (typeComponent === 'update') {
      await handleUpdateUser(values, dataToast);
    }
    form.resetFields();
    showToast(dataToast);
  };
  const handleCreateUser = async (payload, dataToast) => {
    const res = await userApi.createUser(payload);
    if (res.data.code === 1) {
      dataToast.message = 'Email đã tồn tại !';
      dataToast.type = 'error';
    }
  };
  const handleUpdateUser = async (payload, dataToast) => {
    payload.id = userData.id; // -> Add id user to payload object
    const res = await userApi.updateUser(payload);
    if (res.data.code === 0) {
      dataToast.message = 'Cập nhật thành công !';
      dataToast.type = 'success';
    } else {
      dataToast.message = 'Cập nhật thất bại !';
      dataToast.type = 'error';
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const showToast = (data) => {
    toast[data.type](data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  useEffect(() => {
    if (typeComponent === 'update') {
      form.setFieldsValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        roleId: userData.roleId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Form
        form={form}
        initialValues={{
          roleId: 'Loại tài khoản',
        }}
        name="basic"
        layout="inline"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Họ và tên đệm"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ và tên đệm!',
            },
          ]}
          style={{ width: '40%' }}
        >
          <Input style={{ width: '250px' }} />
        </Form.Item>
        <Form.Item
          label="Tên"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên của bạn!',
            },
          ]}
          style={{ width: '40%' }}
        >
          <Input style={{ width: '250px' }} />
        </Form.Item>
        <Form.Item
          label="Tên tài khoản"
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên tài khoản!',
            },
          ]}
          style={{ width: '40%', marginTop: 28 }}
        >
          <Input style={{ width: '250px' }} />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu!',
            },
          ]}
          style={{ width: '40%', marginTop: 28 }}
        >
          <Input.Password style={{ width: '250px' }} />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại!',
            },
          ]}
          style={{ width: '40%', marginTop: 28 }}
        >
          <Input style={{ width: '250px' }} />
        </Form.Item>
        <Form.Item
          label="Loại tài khoản"
          name="roleId"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn loại tài khoản!',
            },
          ]}
          style={{ width: '40%', marginTop: 28 }}
        >
          <Select
            style={{
              width: 150,
            }}
            options={[
              {
                value: 'R1',
                label: 'Quản trị viên',
              },
              {
                value: 'R2',
                label: 'Khách hàng',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 14,
          }}
          style={{ width: '100%', marginTop: 32 }}
        >
          <Button type="primary" htmlType="submit">
            {typeComponent === 'create' ? 'Thêm tài khoản' : 'Lưu thông tin'}
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer theme="dark" transition={Bounce} />
    </div>
  );
}

export default UserForm;
