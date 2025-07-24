import { Button, DialogContent } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { LocaleData, BannerFormData, DEFAULT_BANNER_DATA } from './common.ts';
import {
  DialogActionBar,
  ActionButton,
  DialogTitleBar,
  TextInputSegment,
  MainFormSegment,
  DateSegment,
  TabsSegment,
  ImageToolTip,
  ReplaceImageButton,
  DialogFrame,
  ContentWrapper,
  HeaderSection,
  FormSection,
  ImageSection,
  TabPanel,
  MainContent,
  PreviewImage,
} from './segments';
import { useDateChange, useInputChange, useSelectionChange, useFileChange } from './hooks';
import { BannerDetail, useGetBannerDetail } from '../../../services/banner/detail.banner.ts';
import { usePatchBanner } from '../../../services/banner/patch.banner.ts';
import { useUploadBannerFile } from '../../../services/file/uploadBanner.file.ts';
import { useDeleteBanner } from '../../../services/banner/delete.banner.ts';
import { Toast } from '../../../utils/Toast.ts';

function transformFormData(formData: BannerFormData) {
  return {
    label: formData.data.map((d) => ({
      locale: d.locale,
      title: d.title,
      subTitle: '',
      description: d.description,
    })),
    startDate: formData.startDate,
    endDate: formData.endDate,
    redirectionLink: formData.redirectionLink,
  };
}

function reverseTransform(label: BannerDetail): BannerFormData {
  const localeData: LocaleData[] = label.label.map((label) => ({
    locale: label.locale,
    title: label.title,
    description: label.description,
  }));

  return {
    data: localeData,
    startDate: new Date(label.startDate),
    endDate: new Date(label.endDate),
    redirectionLink: label.redirectionLink || '',
  };
}

type Props = {
  open: boolean;
  bannerId: string;
  rootImagePath: string;
  onClose: () => void;
};

export const ViewBannerDialog: React.FC<Props> = ({ open, bannerId, rootImagePath, onClose }) => {
  const { data, isSuccess } = useGetBannerDetail(
    { pathParams: bannerId, options: { enabled: Boolean(open && bannerId) } },
    {
      onFreshFetched: (data) => {
        setFormData(reverseTransform(data.banner));
      },
    },
  );
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const { formData, setFormData, selectedTab, setSelectedTab } = useSelectionChange();

  useEffect(() => {
    if (!open) {
      setFormData(DEFAULT_BANNER_DATA);
      setSelectedTab('');
    }
  }, [open]);

  useEffect(() => {
    if (isSuccess) {
      setFormData(reverseTransform(data.banner));
    }
  }, [isSuccess]);

  const localeList = data?.banner.label.map((label) => label.locale) || [];

  const { mutateAsync } = usePatchBanner();
  const { mutateAsync: mutateAsyncUpload } = useUploadBannerFile();

  const handleEdit = async () => {
    const request = transformFormData(formData);
    try {
      await mutateAsync({ data: request, pathParams: bannerId });
      const uploadPromises = formData.data.map(async (localeData) => {
        if (localeData.image) {
          const uploadRequest = {
            bannerId: bannerId,
            locale: localeData.locale,
            file: localeData.image,
          };
          return mutateAsyncUpload({
            data: {
              id: uploadRequest.bannerId,
              locale: uploadRequest.locale,
              file: uploadRequest.file,
            },
          });
        }
      });

      const uploadResults = await Promise.all(uploadPromises);
      console.log('All uploads completed', uploadResults);

      onClose();
    } catch (error) {
      console.error('Error during file upload.', error);
    }
  };

  const { mutateAsync: mutateAsyncDelete } = useDeleteBanner();

  const handleDelete = async () => {
    try {
      await mutateAsyncDelete({ pathParams: bannerId });
      onClose();
      Toast.success('公告刪除成功');
    } catch (e) {
      console.error(e);
      Toast.error('公告刪除失敗');
    }
  };

  const handleInputChange = useInputChange(setFormData);

  const handleCommonInputChange = (value: string, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value, // This will handle redirectionLink and other common fields
    }));
  };

  const handleInputArrayChange = useCallback(
    (selectedLanguages: string[]) => {
      setFormData((prevData) => {
        const localeDataMap = new Map(prevData.data.map((item) => [item.locale, item]));

        const newData = selectedLanguages.map((locale) => {
          return localeDataMap.get(locale) || { locale, title: '', description: '' };
        });

        return {
          ...prevData,
          data: newData,
        };
      });
    },
    [setFormData],
  );

  const handleDateChange = useDateChange(setFormData);

  const handleFileChange = useFileChange(setFormData);

  const handleImageChange = (file: File | null, locale: string) => {
    handleFileChange(file, locale);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({ ...prev, [locale]: previewUrl }));
    }
  };

  useEffect(() => {
    if (!open) {
      Object.values(previews).forEach(URL.revokeObjectURL);
      setPreviews({});
    }
  }, [open]);

  const handleOpenImage = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
  };

  return (
    <DialogFrame open={open} onClose={onClose}>
      <DialogTitleBar title="查看公告" onClose={onClose} />

      <DialogContent>
        <ContentWrapper>
          <HeaderSection>
            <MainFormSegment
              input={localeList}
              redirectionLink={formData.redirectionLink}
              onLanguageSelectionCompleted={(languages) => {
                handleInputArrayChange(languages);
                if (languages.length > 0 && !languages.includes(selectedTab)) {
                  setSelectedTab(languages[0]);
                }
              }}
              onInputChange={handleCommonInputChange}
            />

            <DateSegment
              startDate={formData.startDate}
              endDate={formData.endDate}
              onDateChange={handleDateChange}
            />
          </HeaderSection>

          {formData.data.length > 0 && (
            <MainContent>
              <TabsSegment
                selectedTab={selectedTab}
                setSelectedTab={(newValue) => {
                  setSelectedTab(newValue);
                }}
                data={formData.data}
              />

              {formData.data.map((localeData) => (
                <TabPanel key={localeData.locale} hidden={selectedTab !== localeData.locale}>
                  {selectedTab === localeData.locale && (
                    <FormSection>
                      <TextInputSegment
                        localeData={localeData}
                        handleInputChange={handleInputChange}
                      />

                      <ImageSection>
                        <ImageToolTip />
                        <div className="image-container">
                          <PreviewImage
                            src={
                              previews[localeData.locale] || rootImagePath + '_' + localeData.locale
                            }
                            alt={localeData.title}
                            onClick={() =>
                              handleOpenImage(
                                previews[localeData.locale] ||
                                  rootImagePath + '_' + localeData.locale,
                              )
                            }
                          />
                        </div>
                        <div className="image-controls">
                          <Tooltip title="在新分頁中開啟">
                            <Button
                              size="small"
                              startIcon={<OpenInNewIcon />}
                              onClick={() =>
                                handleOpenImage(
                                  previews[localeData.locale] ||
                                    rootImagePath + '_' + localeData.locale,
                                )
                              }
                              sx={{
                                backgroundColor: 'white',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                '&:hover': { backgroundColor: '#f8fafc' },
                              }}
                            >
                              開啟圖片
                            </Button>
                          </Tooltip>
                          <Tooltip title="更換圖片">
                            <ReplaceImageButton
                              onFileSelected={handleImageChange}
                              inputId={localeData.locale}
                            />
                          </Tooltip>
                        </div>
                      </ImageSection>
                    </FormSection>
                  )}
                </TabPanel>
              ))}
            </MainContent>
          )}
        </ContentWrapper>
      </DialogContent>

      <DialogActionBar>
        <ActionButton variant="delete" onClick={handleDelete} label="移除公告" />
        <ActionButton variant="close" onClick={onClose} label="關閉" />
        <ActionButton variant="update" onClick={handleEdit} label="更新公告" />
      </DialogActionBar>
    </DialogFrame>
  );
};
