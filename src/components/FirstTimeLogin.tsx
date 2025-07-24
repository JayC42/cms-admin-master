import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useConfirmUserApi } from '../services/user/confirm.user.ts';
import { Toast } from '../utils/Toast.ts';

const validatePasswordPolicy = (password: string) => {
  if (password.length < 14) return '密碼必須超過14個字符';
  if (!/[A-Z]/.test(password)) return '密碼至少要有一個大寫字母';
  if (!/[a-z]/.test(password)) return '密碼至少要有一個小寫字母';
  if (!/[0-9]/.test(password)) return '密碼至少要有一個數字';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return '密碼至少要有一個特殊符號';
  return null;
};

const FirstTimeLogin: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const session = searchParams.get('session');
  const email = searchParams.get('email');

  const { mutateAsync } = useConfirmUserApi();

  useEffect(() => {
    if (!session || !email) {
      navigate('/login');
    }
  }, [session, email, navigate]);

  // If no session/email, don't render anything while redirecting
  if (!session || !email) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (newPassword !== confirmPassword) {
      setErrorMessage('新舊密碼不一致');
      return;
    }

    const passwordPolicyError = validatePasswordPolicy(newPassword);
    if (passwordPolicyError) {
      setErrorMessage(passwordPolicyError);
      return;
    }

    setIsSubmitting(true);

    if (!session || !email) return;

    try {
      const response = await mutateAsync({ data: { session, newPassword, email } });
      if (response.success) {
        Toast.success('密碼已更新，請重新登錄。');
        setTimeout(() => navigate('/login'), 2000);
        setIsSubmitting(false);
      } else {
        Toast.error('密碼修改失敗。');
        setIsSubmitting(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          First Time Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="新密碼"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            focused
            autoComplete="new-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="確認密碼"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          {errorMessage && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {successMessage}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : '更新密碼'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default FirstTimeLogin;
