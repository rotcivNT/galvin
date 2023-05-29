import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { useDebounce } from '~/hooks/useDebounce/useDebounce';
const { Search } = Input;
function HeaderSearch({ loading, handleSearchRequest }) {
  const [query, setQuery] = useState('');
  const debounce = useDebounce(query, 500);
  const handleOnInput = (value) => {
    setQuery(value);
  };
  useEffect(() => {
    handleSearchRequest(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);
  return (
    <>
      <Search
        placeholder="Nhập thông tin cần tìm ..."
        loading={loading}
        allowClear
        enterButton="Search"
        style={{
          marginBottom: 20,
        }}
        onChange={(e) => handleOnInput(e.target.value)}
      />
    </>
  );
}

export default HeaderSearch;
