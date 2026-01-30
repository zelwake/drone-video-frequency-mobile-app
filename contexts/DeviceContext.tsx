import { createContext, FC, PropsWithChildren, useState } from 'react';

export type DeviceActionMode = 'edit' | 'delete';

export type DeviceModeContext = {
  mode: DeviceActionMode;
  setMode: (mode: DeviceActionMode) => void;
};

const context: DeviceModeContext = {
  mode: 'edit',
  setMode: () => null,
};

export const DeviceScreenContext = createContext<DeviceModeContext>(context);

export const DeviceScreenProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<DeviceActionMode>('edit');

  return (
    <DeviceScreenContext.Provider value={{ mode, setMode }}>
      {children}
    </DeviceScreenContext.Provider>
  );
};
