import React from 'react';

export interface IEquifoodConfig {
  apiUrl: string;
}

export const EquifoodContigContext =
  React.createContext<IEquifoodConfig | null>(null);
