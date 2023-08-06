import { Switch } from "antd";
import React, { useEffect, useState } from "react";

interface SwitchCustomProps {
  switchOption: Option[];
  value?: any;
  onChange?: (value: Option[]) => void;
  className?: string;
}

const SwitchCustom: React.FC<SwitchCustomProps> = ({
  switchOption,
  value,
  onChange,
  className,
}) => {
  const [option, setOption] = useState<Option[]>();

  useEffect(() => {
    if (switchOption) {
      setOption(switchOption);
    }
  }, [switchOption]);

  return (
    <div className={className}>
      {switchOption.map((data, swindex) => {
        return (
          <div key={`sw-index-key-${swindex}`} className="flex flex-col gap-1 ">
            <label className="text-sm">{data.label}</label>
            <Switch
              className="w-fit"
              onChange={(e) => {
                let clone = option;
                if (clone) {
                  clone[swindex].select = e;
                  onChange?.(clone);
                }
              }}
              defaultChecked={data.value == value}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SwitchCustom;
