import { Button, Checkbox, Form, InputNumber, Select, Upload } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import productApi from '~/api/productApi';

function ProductAttributes() {
  const [file, setFile] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  useEffect(() => {
    const fetchSizeList = async () => {
      const res = await productApi.getAllCode('SIZE');
      res.data.data.forEach((item) => {
        item.label = item.value;
        item.value = item.key;
      });
      setSizeList(res.data.data);
    };
    const fetchColorList = async () => {
      const res = await productApi.getAllCode('COLOR');
      setColorList(res.data.data);
    };
    fetchSizeList();
    fetchColorList();
  }, []);
  return (
    <Form.List name="fields">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn số lượng',
                    },
                  ]}
                  name={[index, 'quantity']}
                  label="Số lượng"
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn kích thước',
                    },
                  ]}
                  name={[index, 'sizeType']}
                  label="Kích thước"
                >
                  <Checkbox.Group options={sizeList} />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn màu sắc',
                    },
                  ]}
                  name={[index, 'colorType']}
                  label="Màu sắc"
                >
                  <Select>
                    {colorList.map((type) => (
                      <Select.Option key={type.id} value={type.key}>
                        {type.value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Ảnh sản phẩm" name={[index, 'thumbnail']}>
                  <Upload beforeUpload={() => false} listType="picture-card">
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
                {fields.length > 1 ? (
                  <Button
                    type="danger"
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
                  >
                    Xóa thuộc tính
                  </Button>
                ) : null}
              </div>
            ))}
            <Form.Item
              wrapperCol={{
                offset: 9,
                span: 8,
              }}
            >
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
              >
                <PlusOutlined /> Thêm thuộc tính
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
}

export default ProductAttributes;
