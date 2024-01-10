import ButtonCustom from "@/components/common/button";
import { Modal } from "antd";
import Router from "next/router";
import React, { useEffect, useState } from "react";

interface PreviewImageProps {
  open: boolean;
  imageUrl?: string;
  onClose?: () => void;
}

const PreviewImage: React.FC<PreviewImageProps> = ({
  open,
  imageUrl,
  onClose,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onClose?.();
  };

  useEffect(() => {
    setIsModalOpen(open);
  }, [open]);
  return (
    <Modal
      title="สร้างรูปภาพแล้ว"
      open={isModalOpen}
      onOk={handleOk}
      footer={
        <>
          <div className="flex justify-between">
            <div>
              <ButtonCustom
                type="primary"
                btnColor="#49c866"
                onClick={() => {
                  if (imageUrl) {
                    var link = document.createElement("a");
                    link.download = "add-to-sheets";
                    link.href = imageUrl;
                    link.click();
                  }
                }}
              >
                ดาวน์โหลด
              </ButtonCustom>
            </div>
            <div>
              <ButtonCustom onClick={handleCancel}>แก้ไขราคา</ButtonCustom>
              <ButtonCustom
                onClick={() => {
                  Router.push("/");
                }}
                type="primary"
              >
                หน้าแรก
              </ButtonCustom>
            </div>
          </div>
        </>
      }
      onCancel={handleCancel}
    >
      <div>* มือถือ กดแช่ที่รูปเพื่อ Copy หรือ ดาวน์โหลดได้เหมือนกัน</div>
      <img src={imageUrl} className=" w-full h-96  object-contain" alt="" />
    </Modal>
  );
};

export default PreviewImage;
