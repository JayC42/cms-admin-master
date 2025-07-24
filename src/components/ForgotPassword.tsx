import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetPasswordApi } from '../services/user/resetPassword.user.ts';
import { useForgotPasswordApi } from '../services/user/forgotPassword.user.ts';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Track the current step
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const { mutateAsync } = useForgotPasswordApi();

  const handleSubmitEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const requestData = { email };
    try {
      const response = await mutateAsync({ data: requestData });
      console.log(response);
      if (!response.success) {
        setErrorMessage(response.error || '驗證碼發送失敗。');
        setIsSubmitting(false);
      } else {
        setSuccessMessage('驗證碼已經發送到你的電郵。');
        setIsSubmitting(false);
        setStep(2);
      }
    } catch (error) {
      console.log(`Unknown error: ${error}`);
      setIsSubmitting(false);
    }
  };

  const { mutateAsync: mutateAsyncReset } = useResetPasswordApi();

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setErrorMessage('密碼不一致');
      setIsSubmitting(false);
      return;
    }

    const requestData = { email, newPassword };

    try {
      const response = await mutateAsyncReset({ data: requestData });
      console.log(response);
      if (!response.success) {
        setErrorMessage(response.error || '密碼更新失敗，請重試。');
      } else {
        setSuccessMessage('密碼已經更新完畢。');
        setTimeout(() => navigate('/login'), 2000);
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(`Unknown error: ${error}`);
      setIsSubmitting(false);
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
          {step === 1 ? '忘記密碼？' : '重置密碼'}
        </Typography>
        <form
          onSubmit={step === 1 ? handleSubmitEmail : handleResetPassword}
          style={{ width: '100%', marginTop: '1rem' }}
        >
          {step === 1 && (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="電子郵件"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : '發送驗證碼'}
              </Button>
              <Button
                fullWidth
                variant="text"
                color="secondary"
                onClick={() => navigate('/login')}
                sx={{ mt: 2 }}
              >
                返回登錄界面
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="驗證碼"
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="新密碼"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : '重置密碼'}
              </Button>
            </>
          )}

          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          {successMessage && <Typography color="success.main">{successMessage}</Typography>}
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
