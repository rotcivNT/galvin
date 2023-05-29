import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import productApi from '~/api/productApi';

function CategoryForm({ typeComponent, data }) {
  const [file, setFile] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const dataToast = {
      message: 'Thêm danh mục thành công.',
      type: 'success',
    };
    const payload = {
      ...values,
      imagePath: file[0] && file[0].thumbUrl,
    };
    if (typeComponent === 'create') {
      await handleAddCategory(payload, dataToast);
    } else if (typeComponent === 'update') {
      await handleUpdateCategory(values, dataToast);
    }
    form.resetFields();
    setFile([]);
    showToast(dataToast);
  };
  const handleAddCategory = async (payload, dataToast) => {
    const res = await productApi.addCategory(payload);
    if (res.data.code === 2) {
      dataToast.message = 'Danh mục này đã tồn tại !';
      dataToast.type = 'error';
    }
  };
  const handleUpdateCategory = async (payload, dataToast) => {
    payload = {
      ...payload,
      id: data.id,
      imagePath: file[0].thumbUrl,
    };
    const res = await productApi.updateCategory(payload);
    if (res.data.code === 0) {
      dataToast.message = 'Cập nhật thành công !';
      dataToast.type = 'success';
    } else {
      dataToast.message = 'Cập nhật thất bại !';
      dataToast.type = 'error';
    }
  };
  const showToast = (data) => {
    toast[data.type](data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  useEffect(() => {
    if (typeComponent === 'update') {
      form.setFieldsValue({
        categoryName: data.categoryName,
        parent_id: data.parent_id,
      });
      setFile([
        {
          url: data.imagePath,
        },
      ]);
    }

    const fetchCategory = async () => {
      const res = await productApi.getCategoryWithoutImg();
      setCategories(res.data.data);
    };
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onFinish={(values) => onFinish(values)}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên danh mục',
            },
          ]}
          name="categoryName"
          label="Tên danh mục"
        >
          <Input />
        </Form.Item>
        <Form.Item name="parent_id" label="Danh mục cha">
          <Select>
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.categoryName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn ảnh danh mục',
            },
          ]}
          label="Ảnh danh mục"
          valuePropName="fileList"
        >
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            onChange={(value) => setFile(value.fileList)}
            listType="picture-card"
            fileList={file}
          >
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 14,
          }}
          style={{ width: '100%', marginTop: 32 }}
        >
          <Button htmlType="submit" type="primary">
            {typeComponent === 'create' ? 'Thêm danh mục' : 'Lưu danh mục'}
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer theme="dark" transition={Bounce} />
    </>
  );
}

export default CategoryForm;
