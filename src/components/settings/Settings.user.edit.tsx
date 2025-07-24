import React, { useState, FormEvent, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { PageTitle } from '../common';
import { useGetUserById } from '../../services/user/getDetail.user.ts';
import { useGetAllRole } from '../../services/user/getAllRole.user.ts';
import { useAssignRole, AssignUserRequest } from '../../services/user/assignRole.user.ts';

interface Props {
  onClose: () => void;
  userId: string;
}

export const EditUser: React.FC<Props> = ({ onClose, userId }) => {
  const [formData, setFormData] = useState<AssignUserRequest>({
    userId,
    newRoleId: '',
  });
  const { mutateAsync, data: roleList } = useGetAllRole();

  const { data } = useGetUserById(
    { pathParams: userId },
    {
      onFreshFetched: (data) => {
        setFormData({
          userId: data.adminUser.id,
          newRoleId: data.adminUser.role,
        });
      },
    },
  );

  const userName = data?.adminUser.userName || '';

  useEffect(() => {
    mutateAsync({ data: { refKey: undefined } });
  }, []);

  const { mutateAsync: mutateAsyncAssign } = useAssignRole();

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, newRoleId: value as string }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await mutateAsyncAssign({ data: formData });
      onClose();
    } catch (e) {
      console.error('Error saving user:', e);
    }
  };

  return (
    <div>
      <PageTitle title={'修改用戶'} />

      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <TextField
          label="用戶名"
          variant="outlined"
          fullWidth
          name="userName"
          value={userName}
          disabled
          sx={{ mb: 3 }} // Add margin bottom for spacing
        />

        {/* Role Selection Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>用戶權限等級</InputLabel>
          <Select
            value={formData.newRoleId}
            onChange={handleSelectChange}
            name="newRoleId"
            label="用戶權限等級"
            sx={{ textAlign: 'start' }}
          >
            {roleList?.roleList.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }} // Add margin top for spacing
          >
            修改用戶
          </Button>
        </Box>
      </form>
    </div>
  );
};
