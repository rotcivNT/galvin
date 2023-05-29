import { Radio, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { RiDeleteBin5Line, RiPencilLine } from 'react-icons/ri';
import { Buffer } from 'buffer';
import productApi from '~/api/productApi';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import formatCurrency from '~/utils/formatCurrency';
import HeaderSearch from '../UserManager/HeaderSearch';
import CategoryBtn from './CategoryBtn';

function ProductManager() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Danh mục',
      dataIndex: ['Category', 'categoryName'],
      key: 'categoryName',
      width: '20%',
    },
    {
      title: 'Giá bán',
      dataIndex: 'salePriceFormat',
      key: 'salePrice',
      sorter: (prd1, prd2) => prd1.salePrice - prd2.salePrice,
    },
    {
      title: 'Giảm giá (%)',
      dataIndex: 'percentSaleOff',
      key: 'percentSaleOff',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (prd1, prd2) => prd1.quantity - prd2.quantity,
    },
    {
      title: 'Ảnh danh mục',
      dataIndex: 'imagePath',
      key: 'thumbnail',
      render: (_, { thumbnail }) => (
        <img width={100} height={100} src={thumbnail} alt="Category" />
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
        message: 'Xóa sản phẩm thành công.',
        type: 'success',
      };
      const res = await productApi.deleteProduct(data);
      if (res.data.code === 0) showToast(dataToast);
      setData((pre) => pre.filter((user) => user.id !== data));
    } else {
      if (action === 'update') {
        navigate('/admin/update-product', { state: data });
      }
    }
  };
  const handleSearchRequest = (query) => {
    setQuery(query);
  };
  const fetchData = async (query = '', categoryId) => {
    const res = await productApi.getProduct(query, categoryId);
    res.data.data.forEach((item) => {
      console.log(item);
      item.thumbnail = Buffer.from(item.thumbnail).toString('binary');
      item.salePriceFormat = formatCurrency(parseInt(item.salePrice));
    });
    setLoading(false);
    setData(res.data.data);
  };
  const handleClickAllButton = () => {
    fetchData(query);
    setSelectedCategory('');
  };
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await productApi.getCategoryWithoutImg();
      setCategory(res.data.data);
    };
    fetchData(query, selectedCategory);
    fetchCategory();
  }, [query, selectedCategory]);
  return (
    <>
      <h3>Danh sách sản phẩm</h3>
      <HeaderSearch
        loading={loading}
        handleSearchRequest={handleSearchRequest}
      />
      <Radio.Group defaultValue="all" buttonStyle="solid">
        <Radio.Button
          onClick={handleClickAllButton}
          style={{ marginBottom: 16 }}
          value="all"
        >
          Tất cả
        </Radio.Button>
        {category.map((categoryItem) => (
          <CategoryBtn
            key={categoryItem.id}
            categoryItem={categoryItem}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </Radio.Group>

      <Table rowKey="id" columns={columns} dataSource={data} />
      <ToastContainer theme="dark" transition={Bounce} />
    </>
  );
}

export default ProductManager;
