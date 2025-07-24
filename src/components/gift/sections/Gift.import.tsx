import { Button, styled } from '@mui/material';
import { ExcelUtils } from '../../../utils/excel.utils.ts';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import React, { ChangeEvent, useState } from 'react';
import ImportHintTab from './import/ImportHintTab.tsx';
import { RichTextGeneratorDialog } from './import/RichTextGeneratorDialog.tsx';
import { downloadImportTemplate } from './import/ImportUtils.ts';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ImportErrorComponent } from './import/ImportErrorComponent.tsx';
import { ImportSuccessComponent } from './import/ImportSuccessComponent.tsx';
import { ImportOutputDialog } from './import/ImportOutputDialog.tsx';
import { usePutBatchCreate, BatchCreateResponse } from '../../../services/gift/batchCreate.gift.ts';
import AccordionPanel from './import/AccordionPanel.tsx';
import { extraction } from './import/extraction.ts';
import { ExtractionErrorObject } from './import/types/ExtractionErrorObject.ts';
import { ExtractionDataObject } from './import/types/ExtractionDataObject.ts';
import { TranslationObject } from '../../../models/TranslationObject.ts';

interface Props {
  onClose: () => void;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const GiftImports: React.FC<Props> = ({ onClose }) => {
  const [toggleOpenTextGenerator, setToggleOpenTextGenerator] = useState(false);
  const [toggleSuccessUploadDialog, setToggleSuccessUploadDialog] = useState(false);

  const [expanded, setExpanded] = useState<string | false>('gift');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [gift, setGift] = useState<ExtractionDataObject[]>([]);
  const [errorMessage, setErrorMessage] = useState<ExtractionErrorObject[]>([]);
  const [batchUploadResponse, setBatchUploadResponse] = useState<BatchCreateResponse | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const jsonData = await ExcelUtils.readMultiplePageExcel(event);
      const extractedData = extraction(jsonData);
      if (!extractedData) {
        setErrorMessage([{ error: '文件內容錯誤', index: 'NaN' }]);
        return;
      }
      setErrorMessage(extractedData.errorList);
      console.log('extractedData', extractedData);
      setGift(extractedData.output);
      event.target.value = '';
    } catch (e) {
      console.log(e);
      setErrorMessage([{ error: '文件格式錯誤', index: 'NaN' }]);
    }
  };

  const handleTemplateDownload = async () => {
    await downloadImportTemplate('Gift_Template.xlsx');
  };

  const handleReset = () => {
    setGift([]);
    setErrorMessage([]);
    setBatchUploadResponse(null);
  };

  const onRemove = (target: ExtractionDataObject) => {
    setGift(gift.filter((item) => item !== target));
  };
  const { mutateAsync } = usePutBatchCreate();

  const onBatchImport = async () => {
    preprocessGift();
    const request = {
      gifts: gift,
    };
    try {
      const response = await mutateAsync({ data: request.gifts });
      setToggleSuccessUploadDialog(true);
      setBatchUploadResponse(response);
    } catch (error) {
      console.error('Batch import failed', error);
      console.error('Batch import failed, request: ', request);
    }
  };

  const preprocessGift = () => {
    const processedGift = gift.map((item) => {
      let defaultLocale: TranslationObject | null = null;

      for (const label of item.label) {
        if (label.locale === 'zh-CN') {
          defaultLocale = label;
          break;
        }
      }

      const processedLabels = item.label.map((label) => {
        if (label.locale !== 'zh-CN' && defaultLocale) {
          return {
            ...label,
            title: label.title || defaultLocale.title,
            subTitle: label.subTitle || defaultLocale.subTitle,
            description: label.description || defaultLocale.description,
          };
        }
        return label;
      });

      return {
        ...item,
        label: processedLabels,
      };
    });

    setGift(processedGift);
  };

  const onImageUploadFinished = () => {
    setToggleSuccessUploadDialog(false);
    onClose();
  };

  return (
    <div style={{ paddingBottom: 0, flexDirection: 'row' }}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={{ marginRight: '10px' }}
      >
        上傳文件
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<DownloadIcon />}
        onClick={handleTemplateDownload}
        sx={{ marginRight: '10px' }}
      >
        下載範例
      </Button>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<RestartAltIcon />}
        onClick={handleReset}
      >
        重置数据
      </Button>
      {gift.length === 0 && (
        <div style={{ margin: '10px 0px', height: '1px', backgroundColor: 'lightgrey' }}></div>
      )}
      <div>
        {gift.length === 0 && errorMessage.length === 0 && (
          <ImportHintTab
            callRichTextGenerator={() => {
              setToggleOpenTextGenerator(true);
            }}
          />
        )}
        {(gift.length > 0 || errorMessage.length > 0) && (
          <div>
            <div style={{ margin: '10px 0px', height: '1px' }}></div>
            <AccordionPanel
              expanded={expanded === 'gift'}
              handleChange={handleChange('gift')}
              title="導入的數據"
              ariaControls="gift-content"
              id="gift-header"
            >
              <ImportSuccessComponent giftObject={gift} onRemove={onRemove} />
            </AccordionPanel>

            <AccordionPanel
              expanded={expanded === 'error'}
              handleChange={handleChange('error')}
              title="錯誤信息"
              badgeCount={errorMessage.length}
              ariaControls="error-content"
              id="error-header"
            >
              <ImportErrorComponent errorMessage={errorMessage} />
            </AccordionPanel>
          </div>
        )}
      </div>
      <div style={{ margin: '10px 0px', height: '1px' }}></div>
      {gift.length > 0 && (
        <Button variant="contained" color="primary" onClick={() => onBatchImport()}>
          批量上傳已導入的數據
        </Button>
      )}
      <RichTextGeneratorDialog
        open={toggleOpenTextGenerator}
        onClose={() => setToggleOpenTextGenerator(false)}
      />
      {batchUploadResponse && (
        <ImportOutputDialog
          open={toggleSuccessUploadDialog}
          response={batchUploadResponse}
          onClose={() => onImageUploadFinished()}
        />
      )}
    </div>
  );
};
