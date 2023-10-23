import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { themeConfig } from "../config/theme";
import { DeliveryFeeProvider } from "@/context/deliveryFee";
import { BookProvider } from "@/context/bookService";
import { SheetsProvider } from "@/context/sheetsService";
import { SheetsLoadedProvider } from "@/context/sheetsLoaded";
import { NgrokUrlProvider } from "@/context/ngrokService";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={themeConfig}>
      <SheetsProvider>
        <NgrokUrlProvider>
          <DeliveryFeeProvider>
            <BookProvider>
              <SheetsLoadedProvider>
                <Component {...pageProps} />
              </SheetsLoadedProvider>
            </BookProvider>
          </DeliveryFeeProvider>
        </NgrokUrlProvider>
      </SheetsProvider>
    </ConfigProvider>
  );
}
