import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { themeConfig } from "../../config/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={themeConfig}>
      <Component {...pageProps} />{" "}
    </ConfigProvider>
  );
}
