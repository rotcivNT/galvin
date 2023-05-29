import { Button, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import productApi from '~/api/productApi';
import ProductAttributes from './ProductAttributes';
import { getBase64 } from '~/utils/getBase64';

function ProductForm({ typeComponent, data }) {
  const [categories, setCategories] = useState([]);
  const [typeProduct, setTypeProduct] = useState([]);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const dataToast = {
      message: 'Thêm sản phẩm thành công.',
      type: 'success',
    };
    const listProductImage = values.fields.map((field) =>
      field.thumbnail.fileList.map((file) => file.thumbUrl),
    );
    values.fields.map(
      (field, index) => (field.thumbnail = listProductImage[index]),
    );
    console.log(values);
    if (typeComponent === 'create') {
      await handleAddProduct(values, dataToast);
    } else if (typeComponent === 'update') {
      await handleUpdateCategory(values, dataToast);
    }
    // form.resetFields();
    // setFile([]);
    showToast(dataToast);
  };
  const handleAddProduct = async (payload, dataToast) => {
    const res = await productApi.addProduct(payload);
    if (res.data.code === 2) {
      dataToast.message = 'Sản phẩm này đã tồn tại !';
      dataToast.type = 'error';
    }
  };
  const handleUpdateCategory = async (payload, dataToast) => {
    payload = {
      ...payload,
      id: data.id,
      // thumbnail: file[0].thumbUrl,
    };
    const res = await productApi.updateProduct(payload);
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
        categoryId: data.categoryId,
        productName: data.productName,
        percentSaleOff: data.percentSaleOff,
        quantity: data.quantity,
        salePrice: data.salePrice,
        type: data.type,
      });
      // setFile([
      //   {
      //     url: data.thumbnail,
      //   },
      // ]);
    }
    const fetchCategory = async () => {
      const res = await productApi.getCategoryWithoutImg();
      setCategories(res.data.data);
    };
    const fetchTypeProduct = async (type) => {
      const res = await productApi.getAllCode(type);
      setTypeProduct(res.data.data);
    };
    fetchCategory();
    fetchTypeProduct('PRODUCT');
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
        onFinish={onFinish}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên sản phẩm',
            },
          ]}
          name="productName"
          label="Tên sản phẩm"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập giá bán',
            },
          ]}
          name="salePrice"
          label="Giá bán"
        >
          <Input />
        </Form.Item>
        <Form.Item name="percentSaleOff" label="Giảm giá (%)">
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn danh mục',
            },
          ]}
          name="categoryId"
          label="Danh mục"
        >
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
              message: 'Vui lòng chọn loại sản phẩm',
            },
          ]}
          name="type"
          label="Loại sản phẩm"
        >
          <Select>
            {typeProduct.map((type) => (
              <Select.Option key={type.id} value={type.key}>
                {type.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <ProductAttributes />
        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 14,
          }}
        >
          <Button htmlType="submit" type="primary">
            {typeComponent === 'create' ? 'Thêm sản phẩm' : 'Lưu sản phẩm'}
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer theme="dark" transition={Bounce} />
    </>
  );
}

export default ProductForm;
