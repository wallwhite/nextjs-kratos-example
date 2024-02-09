'use client';

import React, { FC } from 'react';
import { JsonView, type Props, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import styles from './json-tree.module.css';

interface JsonTreeProps {
  data: Props['data'];
}

export const JsonTree: FC<JsonTreeProps> = ({ data }) => (
  <JsonView
    data={data}
    style={{
      ...darkStyles,
      container: styles.container,
      stringValue: styles.stringValue,
      booleanValue: styles.booleanValue,
      punctuation: styles.punctuation,
      label: styles.label,
    }}
  />
);
