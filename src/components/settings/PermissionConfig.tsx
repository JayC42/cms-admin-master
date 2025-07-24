import { Checkbox } from '@mui/material';

interface PermissionData {
  id: string;
  name: string;
  canRead: boolean;
  canWrite: boolean;
}

interface PermissionConfig {
  id: string;
  name: string;
  canRead: boolean;
  canWrite: boolean;
}

interface Props {
  permissions: PermissionData[];
  onPermissionChange: (permissions: PermissionData[]) => void;
}

export const PermissionConfig: React.FC<Props> = ({ permissions, onPermissionChange }) => {
  const handleReadChange = (id: string, checked: boolean) => {
    const updatedPermissions = permissions.map((permission) => {
      if (permission.id === id) {
        return { ...permission, canRead: checked };
      }
      return permission;
    });
    console.log(updatedPermissions);
    onPermissionChange(updatedPermissions);
  };

  const handleWriteChange = (id: string, checked: boolean) => {
    const updatedPermissions = permissions.map((permission) => {
      if (permission.id === id) {
        if (checked) {
          return { ...permission, canWrite: checked, canRead: checked };
        } else {
          return { ...permission, canWrite: checked };
        }
      }
      return permission;
    });
    console.log(updatedPermissions);
    onPermissionChange(updatedPermissions);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>權限</th>
            <th>可以讀取</th>
            <th>可以修改</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id}>
              <td>{permission.name}</td>
              <td>
                <Checkbox
                  checked={permission.canRead}
                  onChange={(e) => handleReadChange(permission.id, e.target.checked)}
                  disabled={permission.canWrite}
                />
              </td>
              <td>
                <Checkbox
                  checked={permission.canWrite}
                  onChange={(e) => handleWriteChange(permission.id, e.target.checked)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
