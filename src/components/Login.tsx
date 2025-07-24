import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { Subscription } from 'rxjs';
import { useLoginApi } from '../services/user/login.user.ts';
import { ACCESS_TOKEN, ROLE, REFRESH_TOKEN, PERMISSIONS } from '../utils/LocalStorage.helper.ts';
import { useGetAllRoleApi } from '../services/user/getAllRole.ts';

const Login: React.FC = () => {
  const userEmailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [subscriptions] = useState(new Subscription());
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      subscriptions.unsubscribe();
    };
  }, [subscriptions]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const { mutateAsync } = useLoginApi();
  const fetchRoles = useGetAllRoleApi();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggingIn) return;

    setIsLoggingIn(true);
    setError('');

    const email = userEmailRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsLoggingIn(false);
      return;
    }

    try {
      const response = await mutateAsync({ data: { email, password } }).catch((error) => error);
      if (!response.success) {
        setError('密碼或電郵錯誤: ' + response.error);
        setIsLoggingIn(false);
        return;
      }

      // Handle first-time login separately
      if (response.session) {
        navigate(`/first-login?session=${response.session}&email=${email}`);
        return; // Stop here for first-time login
      }

      // Only proceed with normal login flow if not first-time login
      localStorage.setItem(REFRESH_TOKEN, response.refreshToken);
      localStorage.setItem(ACCESS_TOKEN, response.accessToken);
      localStorage.setItem(ROLE, response.role);

      const roles = await fetchRoles.refetch();
      if (!roles.data) {
        setError('系統出錯');
        setIsLoggingIn(false);
        return;
      }

      if (roles.data.success) {
        const permission = roles.data.roleList.find(
          (role) => role.name === response.role,
        )?.allowedModule;
        localStorage.setItem(PERMISSIONS, JSON.stringify(permission ? permission : []));
      }

      navigate('/app/dashboard');
    } catch (error) {
      console.log(`Unknown error: ${error}`);
      setError('系統出錯');
      setIsLoggingIn(false);
    }
  };

  const handleForgotPassword = () => {
    window.location.href = '/forgot-password';
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Admin Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          inputRef={userEmailRef}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="電郵"
          autoComplete="username"
          autoFocus
          inputMode="email"
          type="email"
        />
        <TextField
          inputRef={passwordRef}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="密碼"
          type="password"
          autoComplete="current-password"
        />
        <Button type="submit" fullWidth variant="contained" color="primary" disabled={isLoggingIn}>
          {isLoggingIn ? '登錄中⋯⋯' : '登錄'}
        </Button>
        {error && <p>{error}</p>}
        <Button fullWidth variant="text" color="secondary" onClick={handleForgotPassword}>
          忘記密碼？
        </Button>
      </form>
    </Container>
  );
};

export default Login;
