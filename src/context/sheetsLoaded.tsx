import { HeadWorkSheets } from "@/model/headworksheets";
import { createContext, FC, useState } from "react";
type AppSheetsLoaded = {
  sheetsLoaded: HeadWorkSheets[] | undefined;
  setSheetsLoaded: (sheetsLoaded: HeadWorkSheets[]) => void;
};

type AppSheetsLoadedProviderProps = {
  children: React.ReactNode;
};

export const SheetsLoadedContext = createContext<AppSheetsLoaded>({
  sheetsLoaded: undefined,
  setSheetsLoaded: () => {},
});

export const SheetsLoadedProvider: FC<AppSheetsLoadedProviderProps> = ({
  children,
}) => {
  const [sheetsLoaded, setSheetsLoaded] = useState<
    HeadWorkSheets[] | undefined
  >(undefined);

  return (
    <SheetsLoadedContext.Provider value={{ sheetsLoaded, setSheetsLoaded }}>
      {children}
    </SheetsLoadedContext.Provider>
  );
};
