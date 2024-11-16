import { useNavigate, Link } from 'react-router-dom';

function LinkButton({ children, to }) {
  const classname = 'text-sm text-blue-500 hover:text-blue-900 hover:underline';
  const navigate = useNavigate();
  if (to === '-1')
    return (
      <button className={classname} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={classname}>
      {children}
    </Link>
  );
}

export default LinkButton;
