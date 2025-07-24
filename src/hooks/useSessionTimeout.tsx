import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useSessionTimeout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSessionTimeout = () => {
      navigate('/login');
    };

    window.addEventListener('sessionTimeout', handleSessionTimeout);

    return () => {
      window.removeEventListener('sessionTimeout', handleSessionTimeout);
    };
  }, [navigate]);
};

export default useSessionTimeout;
