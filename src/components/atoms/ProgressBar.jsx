import * as React from "react";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";

const PinkConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#e91e63",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#e91e63",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const PinkStepIconRoot = styled("div")(({ ownerState }) => ({
  backgroundColor: ownerState.completed || ownerState.active ? "#e91e63" : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 18,
  fontWeight: 600,
}));

function PinkStepIcon(props) {
  const { active, completed, className, icon } = props;

  return (
    <PinkStepIconRoot 
      ownerState={{ completed, active }} 
      className={className}
    >
      {icon}
    </PinkStepIconRoot>
  );
}

export default function ProgressBar({ steps = [], activeStep = 1, onStepClick, className }) {
  return (
    <div className={`w-full overflow-hidden ${className || ''}`} dir="ltr" style={{ direction: 'ltr' }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep - 1}
        connector={<PinkConnector />}
        sx={{
          width: '100%',
          padding: '0 16px',
          direction: 'ltr', // Force LTR direction
          '& *': {
            direction: 'ltr !important', // Force all children to be LTR
          },
          '& .MuiStep-root': {
            minWidth: 'auto',
            flex: 1,
          },
          '& .MuiStepLabel-root': {
            padding: '0 4px',
          },
          '& .MuiStepLabel-labelContainer': {
            width: 'auto',
            maxWidth: { xs: '70px', sm: '180px', md: '220px' }, // Increased from 120px to accommodate longer text
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign: 'center', // Keep text centered
          },
          '& .MuiStepConnector-root': {
            left: 'calc(-50% + 20px)',
            right: 'calc(50% + 20px)',
          },
        }}
      >
        {steps.map((step, index) => (
          <Step key={step.label} icon={step.icon ?? index + 1}>
            <StepLabel
              slots={{ stepIcon: PinkStepIcon }}
              onClick={() => onStepClick?.(index + 1)}
               sx={{
                cursor: onStepClick ? "pointer" : "default",
                '& .MuiStepLabel-label': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Smaller on mobile
                  fontWeight: 500,
                  color: activeStep === index + 1 ? '#e91e63' : 'inherit',
                  textAlign: 'center',
                  lineHeight: { xs: 1.2, sm: 1.4 }, // Tighter line spacing on mobile
                  // Mobile: Allow text wrapping
                  '@media (max-width: 600px)': {
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    hyphens: 'auto',
                  },
                  // Desktop: Single line with ellipsis
                  '@media (min-width: 601px)': {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                },
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}