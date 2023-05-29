import { Radio } from 'antd';

function CategoryBtn({ categoryItem, setSelectedCategory }) {
  const handleOnClick = async (id) => {
    setSelectedCategory(id);
  };
  return (
    <>
      <Radio.Button
        onClick={(e) => {
          handleOnClick(e.target.value);
        }}
        style={{ marginBottom: 16 }}
        value={categoryItem.id}
      >
        {categoryItem.categoryName}
      </Radio.Button>
    </>
  );
}

export default CategoryBtn;
