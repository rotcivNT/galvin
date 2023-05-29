import { useLocation } from 'react-router-dom';
import ProductForm from '../ProductForm';

function UpdateProduct() {
  const location = useLocation();
  return (
    <>
      <h3>Sửa thông tin sản phẩm</h3>
      <ProductForm typeComponent="update" data={location.state} />
    </>
  );
}

export default UpdateProduct;
