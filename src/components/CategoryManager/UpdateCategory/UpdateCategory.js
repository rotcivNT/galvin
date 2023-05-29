import { useLocation } from 'react-router-dom';
import CategoryForm from '../CategoryForm';

function UpdateCategory() {
  const location = useLocation();
  return (
    <>
      <CategoryForm typeComponent="update" data={location.state} />
    </>
  );
}

export default UpdateCategory;
