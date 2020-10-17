/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes } from 'react';
import { ButtonBase } from '@material-ui/core';

import './styles.scss';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
  return (
    <ButtonBase className="primary-button" {...props}>
      {children}
    </ButtonBase>
  );
}
