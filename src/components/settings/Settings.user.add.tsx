import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
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
import { RoleData } from '../../models/RoleData.ts';
import { UserService } from '../../services/user.service.ts';
import { PageTitle } from '../common';
import { Toast } from '../../utils/Toast.ts';
import { useCreateUserApi } from '../../services/user/create.user.ts';

interface Props {
  onClose: () => void;
}

export const AddUser: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    roleId: '',
  });
  const [roleList, setRoleList] = useState<RoleData[]>([]);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    (await UserService.getAllRole(undefined)).subscribe((response) => {
      setRoleList(response.roleList);
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, roleId: value as string }));
  };

  const { mutateAsync } = useCreateUserApi();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await mutateAsync({ data: formData });
      if (response.success) {
        Toast.success('用戶創建成功，邀請郵件已發送。');
        onClose();
      } else {
        Toast.error(response.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <PageTitle title={'添加新用戶'} />
      <form onSubmit={handleSubmit}>
        <TextField
          label="用戶名"
          variant="outlined"
          fullWidth
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
        <TextField
          label="郵箱"
          variant="outlined"
          fullWidth
          name="userEmail"
          value={formData.userEmail}
          onChange={handleChange}
          margin="normal"
        />
        <FormControl margin="normal" sx={{ width: '100%' }}>
          <InputLabel>用戶權限等級</InputLabel>
          <Select
            value={formData.roleId}
            onChange={handleSelectChange}
            name="roleId"
            label="用戶權限等級"
            sx={{ textAlign: 'start' }}
            variant={'outlined'}
          >
            {roleList.map((role) => (
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
            添加用戶
          </Button>
        </Box>
      </form>
    </div>
  );
};
