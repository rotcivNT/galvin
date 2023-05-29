import { useLocation } from 'react-router-dom';
import UserForm from '../UserForm';

function UpdateUser() {
  const location = useLocation(); // Get data pass from useNavigate
  return (
    <div>
      <UserForm typeComponent="update" userData={location.state} />
    </div>
  );
}

export default UpdateUser;
