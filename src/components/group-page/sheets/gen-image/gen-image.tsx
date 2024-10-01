import ButtonCustom from "@/components/common/button";
import React, { useEffect, useState } from "react";
import * as htmlToImage from "html-to-image";
import InputCustom from "@/components/common/input";
import { Form } from "antd";

interface SheetsGenImageProps {
  children?: React.ReactNode;
  onFinishAndClickToImage?: (price: string) => void;
  loading?: boolean;
}

const SheetsGenImage: React.FC<SheetsGenImageProps> = ({
  children,
  onFinishAndClickToImage,
  loading,
}) => {
  useEffect(() => {}, []);
  return (
    <div className="flex flex-col gap-2">
      <Form
        onFinish={(e: any) => {
          onFinishAndClickToImage?.(e.price_admin);
        }}
        className="w-full"
      >
        <div className="flex gap-2">
          <Form.Item
            style={{ marginBottom: 0 }}
            name={"price_admin"}
            rules={[{ required: true, message: "ไม่สามารถปล่อยว่าง" }]}
            className="w-full"
          >
            <InputCustom
              inputMode="numeric"
              className="w-full"
              placeholder="ใส่ราคารวม"
            ></InputCustom>
          </Form.Item>
          <ButtonCustom
            loading={loading}
            disabled={loading}
            btnColor="#49c866"
            htmlType="submit"
            type="primary"
          >
            บันทึกรูปภาพ
          </ButtonCustom>
        </div>
      </Form>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
};

export default SheetsGenImage;
