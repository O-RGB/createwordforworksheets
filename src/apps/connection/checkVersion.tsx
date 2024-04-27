import { getConfigUrl } from "@/api/fetcher/getVersion";
import ButtonCustom from "@/components/common/button";
import {
  getFbToken,
  getVersion,
  setUsernameOrURL,
  setVersion,
} from "@/lib/checkGoogleSheetsUrl";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";

interface CheckVersionProps {
  getLocalInput: IUserInput;
}

const CheckVersion: React.FC<CheckVersionProps> = ({ getLocalInput }) => {
  const [version, setVersionNumber] = useState<string>();
  const [lastVersion, setLastVersionNumber] = useState<string>();
  //   const [versionAlert, setVersionAlert] = useState<string>();
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onClickUpdate = () => {
    setLoading(true);
    if (getLocalInput.googlesheets) {
      getConfigUrl(getLocalInput.googlesheets, {
        key: "app_script",
      })
        .then((ver) => {
          if (ver.configData && lastVersion) {
            setUsernameOrURL({ googlesheets: ver.configData });
            setVersion(lastVersion);
            setModalUpdate(false);
            setTimeout(() => {
              window.location.reload();
            }, 500);
          } else {
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    if (!version) {
      if (getLocalInput.googlesheets) {
        const versionLocal = getVersion();
        getConfigUrl(getLocalInput.googlesheets, {
          key: "app_script_version",
        }).then((ver) => {
          if (ver.configData) {
            // setVersion(ver.configData);
            setLastVersionNumber(ver.configData);
            if (versionLocal.version) {
              setVersionNumber(versionLocal.version);
              if (ver.configData === versionLocal.version) {
                // setVersionAlert("เวอร์ชันล่าสุด");
              } else {
                setModalUpdate(true);
                // setVersionAlert("เวอร์ชันเก่า");
              }
            } else {
              setVersionNumber("ตรวจไม่พบเวอร์ชัน");
              setModalUpdate(true);
            }
          }
        });
      }
    }
  }, [getLocalInput]);

  return (
    <>
      <Modal
        title={"ตรวจพบเวอร์ชันใหม่"}
        open={modalUpdate}
        footer={<></>}
        closable={false}
      >
        *กรุณากดปุ่ม "อัปเดต" สีส้มเพื่อใช้งานต่อ
        <div className="flex flex-col gap-2">
          <div className="p-3 border rounded-md text-red-500 ">
            <div>เวอร์ชันของคุณ: {version}</div>
          </div>
          <div className="p-3 border rounded-md text-green-500 flex justify-between items-center">
            <div>เวอร์ชันใหม่: {lastVersion}</div>
            <div>
              <ButtonCustom
                loading={loading}
                onClick={onClickUpdate}
                type="primary"
              >
                อัปเดต
              </ButtonCustom>
            </div>
          </div>
        </div>
      </Modal>
      {/* {version} {versionAlert} */}
    </>
  );
};

export default CheckVersion;
