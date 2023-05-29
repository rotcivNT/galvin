import CategoryForm from '../CategoryForm';

function AddCategory() {
  return (
    <>
      <h3 style={{ fontSize: '2rem' }}>Thêm danh mục</h3>
      <CategoryForm typeComponent="create" />
    </>
  );
}

export default AddCategory;
