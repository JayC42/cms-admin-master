import { useState, useEffect, useRef } from 'react';
import {
  PostOfflineDrawRequest,
  usePostOfflineDraw,
} from '../../services/offlineEvent/postDraw.offlineEvent.ts';
import {
  OfflineDrawGift,
  useGetOfflineDraw,
} from '../../services/offlineEvent/getDraw.offlineEvent.ts';
import { useDeleteOfflineDraw } from '../../services/offlineEvent/deleteDraw.offlineEvent.ts';
import { usePutOfflineDraw } from '../../services/offlineEvent/putDraw.offlineEvent.ts';
import { useUploadOfflineGiftImage } from '../../services/file/uploadOfflineGiftImage.file.ts';
import { Toast } from '../../utils/Toast.ts';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Typography,
  Box,
  MenuItem,
} from '@mui/material';

export const OfflineEventInfo = () => {
  const eventId = '76f491d1-3b9a-4096-96cc-84f13f6bdb55';
  const [gifts, setGifts] = useState<OfflineDrawGift[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentGift, setCurrentGift] = useState<OfflineDrawGift | null>(null);
  const [newGift, setNewGift] = useState<PostOfflineDrawRequest>({
    giftName: '',
    giftImg: 'N/A', // Default value until image is uploaded
    winnerCount: 0,
    type: 'PFun',
    amount: 1,
  });

  // File input reference for image upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // API hooks
  const { refetch } = useGetOfflineDraw(
    { pathParams: `${eventId}/gifts` },
    {
      onFreshFetched: (response) => {
        if (response.success) {
          setGifts(response.data || []);
          setLoading(false);
        }
      },
    },
  );

  const deleteOfflineDraw = useDeleteOfflineDraw();
  const postOfflineDraw = usePostOfflineDraw();
  const putOfflineDraw = usePutOfflineDraw();
  const uploadOfflineGiftImage = useUploadOfflineGiftImage();

  useEffect(() => {
    loadGifts();
  }, []);

  const loadGifts = () => {
    setLoading(true);
    refetch().finally(() => setLoading(false));
  };

  const handleDelete = async (giftId: string) => {
    try {
      await deleteOfflineDraw.mutateAsync({ pathParams: `${eventId}/gifts/${giftId}` });
      Toast.success('禮品已被移除');
      loadGifts();
      setOpenDeleteDialog(false);
    } catch (e) {
      console.error('Failed to delete gift:', e);
      Toast.error('禮品移除失敗');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleAddGift = async () => {
    if (!selectedFile) {
      Toast.error('請選擇圖片');
      return;
    }

    setUploading(true);
    try {
      // Step 1: Create the gift and get giftId
      const createResponse = await postOfflineDraw.mutateAsync({
        data: newGift,
        pathParams: `${eventId}/gifts`,
      });
      console.log(createResponse);
      if (createResponse.status) {
        throw new Error('Failed to create gift');
      }

      const giftId = createResponse.giftId;

      // Step 2: Upload the image using the giftId
      const uploadResponse = await uploadOfflineGiftImage.mutateAsync({
        data: {
          file: selectedFile,
          giftId,
        },
      });

      if (!uploadResponse.result) {
        throw new Error('Failed to upload image');
      }

      const imageUrl = uploadResponse.result;

      // Step 3: Update the gift with the image URL
      await putOfflineDraw.mutateAsync({
        data: {
          giftName: newGift.giftName,
          giftImg: imageUrl,
          winnerCount: newGift.winnerCount,
          type: newGift.type,
          amount: newGift.amount,
        },
        pathParams: giftId,
      });

      Toast.success('禮品已添加');
      setOpenAddDialog(false);
      setNewGift({
        giftName: '',
        giftImg: 'N/A',
        winnerCount: 0,
        type: 'PFun',
        amount: 1,
      });
      setSelectedFile(null);
      loadGifts();
    } catch (e) {
      console.error('Failed to add gift:', e);
      Toast.error('添加禮品失敗');
    } finally {
      setUploading(false);
    }
  };

  const handleEditGift = async () => {
    if (!currentGift) return;

    try {
      // If a new image was selected, upload it first
      if (selectedFile) {
        const uploadResponse = await uploadOfflineGiftImage.mutateAsync({
          data: {
            file: selectedFile,
            giftId: currentGift.giftId,
          },
        });

        if (!uploadResponse.result) {
          throw new Error('Failed to upload image');
        }

        // Update the gift with the new image URL
        currentGift.giftImg = uploadResponse.result;
      }

      // Update the gift with all properties
      await putOfflineDraw.mutateAsync({
        data: {
          giftName: currentGift.giftName,
          giftImg: currentGift.giftImg,
          winnerCount: currentGift.winnerCount,
          type: currentGift.type as 'PFun' | 'regular',
          amount: currentGift.amount,
        },
        pathParams: currentGift.giftId,
      });

      Toast.success('禮品已更新');
      setOpenEditDialog(false);
      setSelectedFile(null);
      loadGifts();
    } catch (e) {
      console.error('Failed to update gift:', e);
      Toast.error('更新禮品失敗');
    }
  };

  const openEdit = (gift: OfflineDrawGift) => {
    setCurrentGift(gift);
    setOpenEditDialog(true);
  };

  const openDelete = (gift: OfflineDrawGift) => {
    setCurrentGift(gift);
    setOpenDeleteDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewGift({
      giftName: '',
      giftImg: 'N/A',
      winnerCount: 0,
      type: 'PFun',
      amount: 1,
    });
    setSelectedFile(null);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentGift(null);
    setSelectedFile(null);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrentGift(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">線下活動禮品管理</Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>
          添加禮品
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="40%">名稱</TableCell>
                <TableCell width="20%">數量</TableCell>
                <TableCell width="20%">已使用</TableCell>
                <TableCell width="20%" align="center">
                  操作
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gifts.length > 0 ? (
                gifts.map((gift, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <img
                          src={gift.giftImg}
                          alt={gift.giftName}
                          style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover',
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: 'calc(100% - 48px)', // 40px image + 8px gap
                          }}
                        >
                          {gift.giftName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{gift.amount}</TableCell>
                    <TableCell>{gift.wonCount}</TableCell>
                    <TableCell align="center">
                      <Button size="small" onClick={() => openEdit(gift)} sx={{ mr: 1 }}>
                        編輯
                      </Button>
                      <Button size="small" color="error" onClick={() => openDelete(gift)}>
                        刪除
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    暫無數據
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        PaperProps={{
          sx: { width: '500px', minHeight: '400px' },
        }}
      >
        <DialogTitle>添加禮品</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="名稱"
            margin="normal"
            value={newGift.giftName}
            onChange={(e) => setNewGift({ ...newGift, giftName: e.target.value })}
          />

          <Box mt={2} mb={2}>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Button variant="outlined" onClick={() => fileInputRef.current?.click()} fullWidth>
              {selectedFile ? selectedFile.name : '選擇圖片'}
            </Button>
          </Box>

          <TextField
            fullWidth
            select
            label="類型"
            margin="normal"
            value={newGift.type}
            onChange={(e) =>
              setNewGift({
                ...newGift,
                type: e.target.value as 'PFun' | 'regular',
                amount: e.target.value === 'regular' ? 1 : newGift.amount,
              })
            }
          >
            <MenuItem value="PFun">PFun</MenuItem>
            <MenuItem value="regular">一般</MenuItem>
          </TextField>

          {newGift.type === 'PFun' && (
            <TextField
              fullWidth
              label="數量"
              margin="normal"
              type="number"
              value={newGift.amount}
              onChange={(e) => setNewGift({ ...newGift, amount: parseInt(e.target.value) || 0 })}
            />
          )}

          <TextField
            fullWidth
            label="中獎人數"
            margin="normal"
            type="number"
            value={newGift.winnerCount}
            onChange={(e) => setNewGift({ ...newGift, winnerCount: parseInt(e.target.value) || 0 })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>取消</Button>
          <Button onClick={handleAddGift} variant="contained" color="primary" disabled={uploading}>
            {uploading ? <CircularProgress size={24} /> : '保存'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        PaperProps={{
          sx: { width: '500px', minHeight: '400px' },
        }}
      >
        <DialogTitle>編輯禮品</DialogTitle>
        <DialogContent>
          {currentGift && (
            <>
              <TextField
                fullWidth
                label="名稱"
                margin="normal"
                value={currentGift.giftName}
                onChange={(e) => setCurrentGift({ ...currentGift, giftName: e.target.value })}
              />

              <Box mt={2} mb={2}>
                {currentGift.giftImg && currentGift.giftImg !== 'N/A' && (
                  <img
                    src={currentGift.giftImg}
                    alt={currentGift.giftName}
                    style={{ maxWidth: '100px', maxHeight: '100px', marginBottom: '10px' }}
                  />
                )}

                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <Button variant="outlined" onClick={() => fileInputRef.current?.click()} fullWidth>
                  {selectedFile ? selectedFile.name : '更換圖片'}
                </Button>
              </Box>

              <TextField
                fullWidth
                select
                label="類型"
                margin="normal"
                value={currentGift.type}
                onChange={(e) =>
                  setCurrentGift({
                    ...currentGift,
                    type: e.target.value as 'PFun' | 'regular',
                    amount: e.target.value === 'regular' ? 1 : currentGift.amount,
                  })
                }
              >
                <MenuItem value="PFun">PFun</MenuItem>
                <MenuItem value="regular">一般</MenuItem>
              </TextField>

              {currentGift.type === 'PFun' && (
                <TextField
                  fullWidth
                  label="數量"
                  margin="normal"
                  type="number"
                  value={currentGift.amount}
                  onChange={(e) =>
                    setCurrentGift({ ...currentGift, amount: parseInt(e.target.value) || 0 })
                  }
                />
              )}

              <TextField
                fullWidth
                label="中獎人數"
                margin="normal"
                type="number"
                value={currentGift.winnerCount}
                onChange={(e) =>
                  setCurrentGift({ ...currentGift, winnerCount: parseInt(e.target.value) || 0 })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>取消</Button>
          <Button onClick={handleEditGift} variant="contained" color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          sx: { width: '400px' },
        }}
      >
        <DialogTitle>確認刪除</DialogTitle>
        <DialogContent>
          <Typography>確定要刪除 "{currentGift?.giftName}" 嗎？</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>取消</Button>
          <Button
            onClick={() => handleDelete(currentGift?.giftId || '')}
            variant="contained"
            color="error"
          >
            刪除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
