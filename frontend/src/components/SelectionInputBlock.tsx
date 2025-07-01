import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface ChildProps {
  labelValue: string;
  selectValue: string;
  guideString: string;
  setSelectValue: React.Dispatch<React.SetStateAction<string>>;
  require: boolean;
  selectArray: {
    label: string;
    value: string;
  }[];
}

const SelectionInputBlock: React.FC<ChildProps> = ({
  labelValue,
  selectValue,
  guideString,
  setSelectValue,
  selectArray,
  require,
}) => {
  return (
    <div className="flex flex-col  mt-[15px]">
      <div className="flex">
        <label htmlFor="" className="font-bold mr-1">
          {labelValue}
        </label>
        {require && <span className="text-red-500 mr-1">*</span>}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-question-mark-icon lucide-circle-question-mark bg-[#99bcdb] text-white rounded-[50%] cursor-pointer"
          data-tooltip-id={labelValue}
          data-tooltip-content={guideString}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>

        <Tooltip id={labelValue} place="right" />
      </div>

      <select className="text-[14px] mt-2 border border-[#ccc] rounded-[5px] px-[12px] py-[6px] focus:border-[#66afe9] focus:outline-none focus:shadow-[0_0_4px_1px_#66afe9]">
        {selectArray.length !== 0 &&
          selectArray.map((s, index) =>
            s.value ? (
              <option key={index} value={s.value}>
                {s.label}
              </option>
            ) : (
              <option key={index}>{s.label}</option>
            )
          )}
      </select>
    </div>
  );
};

export default SelectionInputBlock;
