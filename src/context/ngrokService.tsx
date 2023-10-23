import { createContext, FC, useState } from "react";
type AppNgrokUrl = {
  ngrokUrl: string | undefined;
  setNgrokUrl: (ngrokUrl: string | undefined) => void;
};

type AppDeliveryFeeProviderProps = {
  children: React.ReactNode;
};

export const NgrokUrlContext = createContext<AppNgrokUrl>({
  ngrokUrl: undefined,
  setNgrokUrl: () => {},
});

export const NgrokUrlProvider: FC<AppDeliveryFeeProviderProps> = ({
  children,
}) => {
  const [ngrokUrl, setNgrokUrl] = useState<string | undefined>(undefined);

  return (
    <NgrokUrlContext.Provider value={{ ngrokUrl, setNgrokUrl }}>
      {children}
    </NgrokUrlContext.Provider>
  );
};
