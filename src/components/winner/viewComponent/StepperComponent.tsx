import { Step, StepLabel, Stepper, styled } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import React from 'react';

/**
 * This Stepper temporary disabled, since the step is not finalized yet.r
 */
const steps = [
  { key: 'winnerSelected', label: '已選中' },
  { key: 'winnerRegistered', label: '已登記' },
  { key: 'rewardRedeemed', label: '已領取' },
];

/**
 * This Stepper temporary disabled, since the step is not finalized yet.r
 */
// eslint-disable-next-line react-refresh/only-export-components
const CustomStepIcon = styled('div')<{ completed?: boolean; active?: boolean }>(
  ({ theme, completed, active }) => ({
    color: completed
      ? theme.palette.success.main
      : active
        ? theme.palette.primary.main
        : theme.palette.grey[400],
  }),
);

/**
 * This Stepper temporary disabled, since the step is not finalized yet.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars,react-refresh/only-export-components
const StepperComponent: React.FC<{ currentStatus: string }> = ({ currentStatus }) => {
  const currentStep = steps.findIndex((step) => step.key === currentStatus);

  return (
    <Stepper
      activeStep={currentStep}
      sx={{
        width: '100%',
        my: 2,
      }}
    >
      {steps.map((step, index) => (
        <Step key={step.key} completed={index <= currentStep}>
          <StepLabel
            StepIconComponent={({ active, completed }) => (
              <CustomStepIcon completed={completed ?? false} active={active ?? false}>
                {completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
              </CustomStepIcon>
            )}
          >
            {step.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
