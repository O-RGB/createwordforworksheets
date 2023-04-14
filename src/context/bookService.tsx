import { createContext, FC, useState } from "react";
type AppBookService = {
  bookPrice: number;
  setBookPrice: (bookPrice: number) => void;
};

type AppBookServiceProviderProps = {
  children: React.ReactNode;
};

export const BookServiceContext = createContext<AppBookService>({
  bookPrice: 40,
  setBookPrice: () => {},
});

export const BookProvider: FC<AppBookServiceProviderProps> = ({ children }) => {
  const [bookPrice, setBookPrice] = useState<number>(40);

  return (
    <BookServiceContext.Provider value={{ bookPrice, setBookPrice }}>
      {children}
    </BookServiceContext.Provider>
  );
};
