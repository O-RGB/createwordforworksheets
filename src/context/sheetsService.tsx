import { createContext, FC, useState } from "react";
type AppSheets = {
  sheets: IMapDataToSheets[][];
  setSheets: (sheets: IMapDataToSheets[][]) => void;
};

type AppSheetsProviderProps = {
  children: React.ReactNode;
};

export const SheetsContext = createContext<AppSheets>({
  sheets: [],
  setSheets: () => {},
});

export const SheetsProvider: FC<AppSheetsProviderProps> = ({ children }) => {
  const [sheets, setSheets] = useState<IMapDataToSheets[][]>([]);

  return (
    <SheetsContext.Provider value={{ sheets, setSheets }}>
      {children}
    </SheetsContext.Provider>
  );
};
