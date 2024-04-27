import InputCustom from "@/components/common/input";
import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { BgCal, CalColor, colorPrimary, colorSecondary } from "@/config/color";

interface FacebookUrlDetectProps {}

type IBaseType = "FB_MESSAGE" | "IG_MESSAGE";

export const onInputFacebookUrl = (url?: string) => {
  let check = true;
  if (url === undefined) {
    return { check: check, data: undefined };
  }
  try {
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);

    // ดึงค่าพารามิเตอร์ต่าง ๆ จาก URLSearchParams
    const assetId = searchParams.get("asset_id");
    const mailboxId = searchParams.get("mailbox_id");
    const selectedItemId = searchParams.get("selected_item_id");
    let threadType = searchParams.get("thread_type");

    if (!assetId || !mailboxId || !selectedItemId || !threadType) {
      check = false;
    } else {
      check = true;
      if (threadType === "FB_MESSAGE" || threadType === "IG_MESSAGE") {
        let type: IBaseType = threadType;
        return {
          check: check,
          data: { assetId, mailboxId, selectedItemId, type },
        };
      }
    }
    return { check: check, data: undefined };
  } catch (error) {
    check = false;
  }
  if (url.length == 0) {
    check = true;
  }
  return { check: check, data: undefined };
};

const FacebookUrlDetect: React.FC<FacebookUrlDetectProps> = ({}) => {
  const baseUrl = "https://business.facebook.com/latest/inbox/all/?";
  const [onInputFaceLink, setFaceLink] = useState<string>();
  const [type, setType] = useState<IBaseType>("FB_MESSAGE");

  useEffect(() => {}, []);

  const BaseBoxSelect = (
    typeName: React.ReactNode,
    type: IBaseType,
    initType: IBaseType
  ) => (
    <div
      style={{
        backgroundColor: type === initType ? CalColor(colorPrimary) : undefined,
        borderWidth: type !== initType ? "1px" : undefined,
      }}
      className={`p-3 rounded-md`}
    >
      {typeName}
    </div>
  );

  return (
    <>
      <InputCustom
        name="facebook_url"
        // required
        label="Facebook URL (ไม่ใส่ก็ได้)"
        rules={[
          {
            validator: (_, value) => {
              const input = value;

              if (typeof input === "string") {
                console.log(input);
                setFaceLink(input.length > 0 ? input : undefined);
                let valid = onInputFacebookUrl(input);

                console.log(valid);

                if (!valid.check) {
                  let classText = "text-red-500";
                  return Promise.reject(
                    <div className={classText}>
                      รูปแบบ URL ไม่ถูกต้อง
                      <div className="text-xs text-gray-400">
                        ตัวอย่าง:{" "}
                        <span className={classText}>
                          https://business.facebook.com/latest/inbox/all/?
                        </span>
                        <span className={classText}>asseft_id</span>
                        =000&
                        <span className={classText}>mailbox_id</span>
                        =000&
                        <span className={classText}>selected_item_id</span>
                        =000&
                        <span className={classText}>thread_type</span>
                        =IG_MESSAGE
                      </div>
                    </div>
                  );
                } else {
                  if (valid.data?.type) {
                    setType(valid.data.type);
                  }
                  return Promise.resolve();
                }
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
      ></InputCustom>

      <label
        htmlFor=""
        className={`   ${
          onInputFaceLink
            ? "h-4 opacity-100"
            : "h-0 overflow-hidden opacity-100 -my-1 p-0"
        } duration-300`}
      >
        URL Type
      </label>
      <div
        className={`flex gap-2  ${
          onInputFaceLink
            ? "h-14 opacity-100"
            : "h-0 overflow-hidden opacity-100 -my-1 p-0"
        } duration-300`}
      >
        {BaseBoxSelect(
          <FaFacebook
            className={`text-3xl p-0.5 ${
              type === "FB_MESSAGE" ? "text-white" : "text-gray-300"
            }`}
          />,
          type,
          "FB_MESSAGE"
        )}
        {BaseBoxSelect(
          <AiFillInstagram
            className={`text-3xl p-0.5 ${
              type === "IG_MESSAGE" ? "text-white" : "text-gray-300"
            }`}
          />,
          type,
          "IG_MESSAGE"
        )}
      </div>

      {/* <RadioCustom
        defaultValue={"3"}
        disabled={onInputFaceLink === undefined}
        radioOption={[
          {
            label: (
              <div className="mt-[5px]">
                <FaFacebook
                  className={`${
                    onInputFaceLink === undefined ? "" : "text-[#0765ff]"
                  } text-3xl p-0.5`}
                />
              </div>
            ),
            value: "0",
          },
          {
            label: (
              <div className="mt-[5px]">
                <AiFillInstagram
                  className={`${
                    onInputFaceLink === undefined ? "" : "text-pink-600"
                  }  text-3xl`}
                />
              </div>
            ),
            value: "1",
          },
        ]}
      ></RadioCustom> */}
    </>
  );
};

export default FacebookUrlDetect;
