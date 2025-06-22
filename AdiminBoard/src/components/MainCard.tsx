// src/components/MainCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';

type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function MainCard({ title, children }: Props) {
  return (
    <Card elevation={3} style={{ margin: '1rem' }}>
      {title && <CardHeader title={title} />}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
