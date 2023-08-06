import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { themeConfig } from "../../config/theme";
import { DeliveryFeeProvider } from "@/context/deliveryFee";
import { BookProvider } from "@/context/bookService";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={themeConfig}>
      <DeliveryFeeProvider>
        <BookProvider>
          <Component {...pageProps} />
        </BookProvider>
      </DeliveryFeeProvider>
    </ConfigProvider>
  );
}
