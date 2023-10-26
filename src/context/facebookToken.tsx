import { createContext, FC, useState } from "react";
type FBToken = {
  FbToken: string | undefined;
  setFbTokenContext: (FbToken: string | undefined) => void;
};

type AppFBTokenProviderProps = {
  children: React.ReactNode;
};

export const FBTokenContext = createContext<FBToken>({
  FbToken: undefined,
  setFbTokenContext: () => {},
});

export const FBTokenProvider: FC<AppFBTokenProviderProps> = ({ children }) => {
  const [FbToken, setFbTokenContext] = useState<string | undefined>(undefined);

  return (
    <FBTokenContext.Provider value={{ FbToken, setFbTokenContext }}>
      {children}
    </FBTokenContext.Provider>
  );
};
