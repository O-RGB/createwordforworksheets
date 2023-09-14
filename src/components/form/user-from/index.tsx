import ButtonCustom from "@/components/common/button";
import InputCustom from "@/components/common/input";
import TextAreaCustom from "@/components/common/text-area";
import { Form } from "antd";
import React, { useEffect, useState } from "react";

interface UserFormProps {
  onFinish?: (output: IUserInput) => void;
  initData?: IUserInput;
  removeCancel?: boolean;
  onCancel?: () => void;
  openOnChangeMode?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
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
      <InputCustom
        initialValue={initData?.username}
        name="username"
        label="ชื่อผู้เพิ่มข้อมูล (หลักฐานคนเพิ่มข้อมูล)"
        required
        rules={[
          {
            message: "ไม่สามารถปล่อยว่าง",
            required: true,
          },
        ]}
      ></InputCustom>
      <TextAreaCustom
        autoSize
        rules={[
          {
            message: "ไม่สามารถปล่อยว่าง",
            required: true,
          },
        ]}
        initialValue={initData?.googlesheets}
        name="googlesheets"
        label="Google App URL (ติดต่อส้มโอ)"
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

export default UserForm;
