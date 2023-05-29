import { Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { RiDeleteBin5Line, RiPencilLine } from 'react-icons/ri';
import { Buffer } from 'buffer';
import productApi from '~/api/productApi';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CategoryManager() {
  const [data, setData] = useState([]);
  const [ids, setIds] = useState([]);
  const navigate = useNavigate();
  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Danh mục cha',
      dataIndex: 'parent_name',
      key: 'parent_name',
    },
    {
      title: 'Ảnh danh mục',
      dataIndex: 'imagePath',
      key: 'thumbnail',
      render: (_, { imagePath }) => (
        <img width={100} height={100} src={imagePath} alt="Category" />
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, category) => (
        <Space size="middle">
          <RiPencilLine
            onClick={() => handleAction('update', category)}
            style={{ fontSize: '2rem', cursor: 'pointer' }}
          />
          <RiDeleteBin5Line
            onClick={() => handleAction('delete', category.id)}
            style={{ fontSize: '2rem', cursor: 'pointer' }}
          />
        </Space>
      ),
    },
  ];
  const showToast = (data) => {
    toast[data.type](data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleAction = async (action, data) => {
    if (action === 'delete') {
      const dataToast = {
        message: 'Xóa tài khoản thành công.',
        type: 'success',
      };
      const res = await productApi.deleteCategory(data);
      if (res.data.code === 0) showToast(dataToast);
      setData((pre) => pre.filter((user) => user.id !== data));
    } else {
      if (action === 'update') {
        navigate('/admin/update-category', { state: data });
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await productApi.getAllCategory();
      const arrIds = [];
      res.data.data.forEach(async (item) => {
        if (item.imagePath) {
          item.imagePath = Buffer.from(item.imagePath).toString('binary');
        } else {
          item.imagePath =
            'https://kdigimind.com/wp-content/uploads/2020/06/premium-quality-lettering-banner_28633-267.jpg';
        }
        arrIds.push(item.parent_id);
      });
      setIds(arrIds);
      setData(res.data.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (!ids) return;
    Promise.all(
      ids.map(async (id) => {
        const resCategory = await productApi.getCategoryById(id);
        return resCategory.data.data;
      }),
    ).then((result) => {
      setData((pre) => {
        let newData;
        newData = pre.map((category, index) => ({
          ...category,
          parent_name: result[index]?.categoryName,
        }));
        return newData;
      });
    });
  }, [ids]);
  return (
    <>
      <Table rowKey="id" columns={columns} dataSource={data} />
      <ToastContainer theme="dark" transition={Bounce} />
    </>
  );
}

export default CategoryManager;
