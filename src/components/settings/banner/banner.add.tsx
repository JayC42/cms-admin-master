import React, { useEffect, useState } from 'react';
import { DialogContent } from '@mui/material';
import { Toast } from '../../../utils/Toast.ts';
import { BannerFormData, DEFAULT_BANNER_DATA } from './common.ts';
import {
  DialogActionBar,
  ActionButton,
  DialogTitleBar,
  TextInputSegment,
  MainFormSegment,
  DateSegment,
  TabsSegment,
  ImageToolTip,
  UploadImageButton,
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
import { useCreateBanner } from '../../../services/banner/create.banner.ts';
import { useUploadBannerFile } from '../../../services/file/uploadBanner.file.ts';

function transformFormData(formData: BannerFormData) {
  return {
    label: formData.data.map((d) => ({
      locale: d.locale,
      title: d.title,
      description: d.description,
      image: d.image,
    })),
    startDate: formData.startDate,
    endDate: formData.endDate,
    redirectionLink: formData.redirectionLink,
  };
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddBannerDialog: React.FC<Props> = ({ open, onClose }) => {
  const { formData, setFormData, selectedTab, setSelectedTab } = useSelectionChange();
  const [localeList] = useState<string[]>([]);

  useEffect(() => {
    if (!open) {
      setFormData(DEFAULT_BANNER_DATA);
      setSelectedTab('');
    }
  }, [open]);

  const handleInputChange = useInputChange(setFormData);

  const handleCommonInputChange = (value: string, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputArrayChange = (selectedLanguages: string[]) => {
    setFormData((prevData) => {
      const dataMap = new Map(prevData.data.map((d) => [d.locale, d]));
      const newData = selectedLanguages.map((locale) => {
        const existingData = dataMap.get(locale);
        return (
          existingData || {
            locale,
            title: '',
            description: '',
          }
        );
      });
      return {
        ...prevData,
        data: newData,
      };
    });
  };

  const handleDateChange = useDateChange(setFormData);

  const handleFileChange = useFileChange(setFormData);

  const { mutateAsync } = useCreateBanner();

  const { mutateAsync: mutateAsyncUpload } = useUploadBannerFile();

  const handleSubmit = async () => {
    const request = transformFormData(formData);
    try {
      const createBannerResponse = await mutateAsync({ data: request });
      const bannerId = createBannerResponse.newBanner;
      await Promise.all(
        formData.data
          .filter((localeData) => localeData.image)
          .map((localeData) => {
            const uploadRequest = {
              bannerId: bannerId,
              locale: localeData.locale,
              file: localeData.image,
            };
            return mutateAsyncUpload({
              data: {
                id: uploadRequest.bannerId,
                locale: uploadRequest.locale,
                ...(uploadRequest.file ? { file: uploadRequest.file } : {}),
              },
            });
          }),
      );
      Toast.success('公告上傳成功');
      onClose();
    } catch (e) {
      console.error('Error uploading banner files:', e);
      Toast.error('公告上傳失敗');
    }
  };

  return (
    <DialogFrame open={open} onClose={onClose}>
      <DialogTitleBar title="新增橫幅" onClose={onClose} />

      <DialogContent>
        <ContentWrapper>
          <HeaderSection>
            <MainFormSegment
              input={localeList}
              redirectionLink={formData.redirectionLink}
              onLanguageSelectionCompleted={handleInputArrayChange}
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
                          {localeData.image && (
                            <PreviewImage
                              src={URL.createObjectURL(localeData.image)}
                              alt={localeData.title}
                            />
                          )}
                        </div>
                        <UploadImageButton
                          onFileSelected={handleFileChange}
                          inputId={localeData.locale}
                        />
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
        <ActionButton variant="close" onClick={onClose} label="取消" />
        <ActionButton variant="update" onClick={handleSubmit} label="添加公告" />
      </DialogActionBar>
    </DialogFrame>
  );
};
