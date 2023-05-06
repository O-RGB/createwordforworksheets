import { Checkbox, Form, FormInstance, Input } from "antd";
import React, { useEffect, useState } from "react";
import InputCommon from "../input";
import InputCheckbox from "./input-checkbox";

interface ChlidCheckboxProps {
  form: FormInstance<any>;
  name: string;
  mainName: string;
}

const ChlidCheckBox: React.FC<ChlidCheckboxProps> = ({
  form,
  name,
  mainName,
}) => {
  const [fileSetting, setFileSerring] = useState<checkBoxSelect>({
    count: 0,
    id: `${name}-file`,
    type: "File",
    bool: false,
  });
  const [printSetting, setPrintSerring] = useState<checkBoxSelect>({
    count: 0,
    id: `${name}-print`,
    type: "Print",
    bool: false,
  });
  const [BookSetting, setBookSerring] = useState<checkBoxSelect>({
    count: 0,
    id: `${name}-book`,
    type: "Book",
    bool: false,
  });

  const getCheckInForm = () => {
    let checkBoxSelect: checkBoxSelect[] | undefined = form.getFieldValue(name);
    let checkFile: checkBoxSelect | undefined = undefined;
    let checkPrint: checkBoxSelect | undefined = undefined;
    let checkBook: checkBoxSelect | undefined = undefined;
    if (checkBoxSelect) {
      checkBoxSelect?.map((data) => {
        if (data) {
          if (data.type == "File") {
            checkFile = data;
          } else if (data.type == "Print") {
            checkPrint = data;
          } else if (data.type == "Book") {
            checkBook = data;
          }
        }
      });
    }
    return {
      file: checkFile,
      print: checkPrint,
      book: checkBook,
    };
  };

  const pushDataInForm = (get: {
    file: checkBoxSelect | undefined;
    print: checkBoxSelect | undefined;
    book: checkBoxSelect | undefined;
  }) => {
    let checkBoxSelect: checkBoxSelect[] = [];
    if (get.file) {
      if (get.file.bool) {
        checkBoxSelect?.push(get.file);
      }
    }
    if (get.print) {
      if (get.print.bool) {
        checkBoxSelect?.push(get.print);
      }
    }
    if (get.book) {
      if (get.book.bool) {
        checkBoxSelect?.push(get.book);
      }
    }
    if (checkBoxSelect.length > 0) {
      form.setFieldValue(name, checkBoxSelect);
    } else {
      form.resetFields([mainName]);
      form.setFieldValue(mainName, undefined);
    }
  };
  useEffect(() => {
    let get = getCheckInForm();
    let checkFile: checkBoxSelect | undefined = get.file;
    let checkPrint: checkBoxSelect | undefined = get.print;
    let checkBook: checkBoxSelect | undefined = get.book;
    if (checkFile) {
      setFileSerring(checkFile);
    }
    if (checkPrint) {
      setPrintSerring(checkPrint);
    }
    if (checkBook) {
      setBookSerring(checkBook);
    }
  }, []);

  const onChange = (
    select: boolean,
    value: number,
    type: ResultWorkSheetsMode
  ) => {
    let getElementFromForm = getCheckInForm();
    let MainFile: checkBoxSelect | undefined = getElementFromForm.file;
    let MainPrint: checkBoxSelect | undefined = getElementFromForm.print;
    let MainBook: checkBoxSelect | undefined = getElementFromForm.book;
    form.setFieldValue(name, undefined);

    if (type == "File") {
      let Ffile = fileSetting;
      Ffile.count = value;
      Ffile.bool = select;
      setFileSerring(Ffile);
      MainFile = Ffile;
    } else if (type == "Print") {
      let FPrint = printSetting;
      FPrint.count = value;
      FPrint.bool = select;
      setPrintSerring(FPrint);
      MainPrint = FPrint;
    } else if (type == "Book") {
      let FBook = BookSetting;
      FBook.count = value;
      FBook.bool = select;
      setBookSerring(FBook);
      MainBook = FBook;
    }
    pushDataInForm({
      file: MainFile,
      book: MainBook,
      print: MainPrint,
    });
  };
  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-2 select-none pb-3 p-3 divide-x">
        <Checkbox
          className="w-full md:w-auto"
          checked={fileSetting.bool}
          onChange={(e) => {
            onChange(e.target.checked, e.target.checked ? 1 : 0, "File");
          }}
        >
          💾 ไฟล์
        </Checkbox>
        <InputCheckbox
          className="pl-4 pr-0 md:pr-3"
          checked={printSetting.bool}
          type="Print"
          onChange={onChange}
          label={"📘 ปริ้น"}
        ></InputCheckbox>
        <InputCheckbox
          className="px-0 md:px-4 pl-4 "
          checked={BookSetting.bool}
          type="Book"
          onChange={onChange}
          label={"📕 เข้าเล่ม"}
        ></InputCheckbox>
      </div>
    </>
  );
};

export default ChlidCheckBox;
