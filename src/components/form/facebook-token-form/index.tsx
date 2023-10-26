import ButtonCustom from "@/components/common/button";
import InputCustom from "@/components/common/input";
import TextAreaCustom from "@/components/common/text-area";
import { Form } from "antd";
import React, { useEffect, useState } from "react";

interface FacebookTokenFormProps {
  onFinish?: (output: IFacebookTokenInput) => void;
  initData?: IFacebookTokenInput;
  removeCancel?: boolean;
  onCancel?: () => void;
  openOnChangeMode?: boolean;
}

const FacebookTokenForm: React.FC<FacebookTokenFormProps> = ({
  onFinish,
  initData,
  onCancel,
  removeCancel = false,
  openOnChangeMode = false,
}) => {
  const [openBtn, setOpenBtn] = useState<boolean>(false);
  const onChangeAndOpenButton = () => {
    setOpenBtn(true);
  };

  useEffect(() => {}, [initData]);
  return (
    <Form
      onFinish={onFinish}
      onFieldsChange={onChangeAndOpenButton}
      layout="vertical"
      className="flex flex-col gap-4"
    >
      <TextAreaCustom
        autoSize
        rules={[
          {
            message: "ไม่สามารถปล่อยว่าง",
            required: true,
          },
        ]}
        initialValue={initData?.facebookToken}
        name="facebookToken"
        label="Facebook Token Page (ติดต่อส้มโอ)"
      ></TextAreaCustom>
      <div className="flex gap-2 justify-end">
        {!removeCancel && (
          <ButtonCustom type="default" onClick={onCancel}>
            Close
          </ButtonCustom>
        )}
        <ButtonCustom disabled={!openBtn} type="primary" htmlType="submit">
          Save
        </ButtonCustom>
      </div>
    </Form>
  );
};

export default FacebookTokenForm;
