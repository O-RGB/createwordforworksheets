import { createContext, FC, useState } from "react";
type AppDeliveryFee = {
  deliveryFee: number;
  setDeliveryFee: (deliveryFee: number) => void;
};

type AppDeliveryFeeProviderProps = {
  children: React.ReactNode;
};

export const DeliveryFeeContext = createContext<AppDeliveryFee>({
  deliveryFee: 40,
  setDeliveryFee: () => {},
});

export const DeliveryFeeProvider: FC<AppDeliveryFeeProviderProps> = ({
  children,
}) => {
  const [deliveryFee, setDeliveryFee] = useState<number>(40);

  return (
    <DeliveryFeeContext.Provider value={{ deliveryFee, setDeliveryFee }}>
      {children}
    </DeliveryFeeContext.Provider>
  );
};
