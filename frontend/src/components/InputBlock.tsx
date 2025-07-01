import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface ChildProps {
  labelValue: string;
  inputValue: string;
  guideString: string;
  inputType: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  require: boolean;
}

const InputBlock: React.FC<ChildProps> = ({
  labelValue,
  inputValue,
  guideString,
  inputType,
  setInputValue,
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

      {labelValue === "Identifier" ? (
        <div className="border border-[#ccc] rounded-[5px] flex mt-2">
          <div className="px-[12px] py-[6px] bg-[#eee] rounded-tl-[5px]  rounded-bl-[5px]  border border-r-[#ccc]">
            <span className="text-[14px] text-[#555]">
              https://demo.dataverse.org/dataverse/
            </span>
          </div>
          <input
            type={inputType}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="text-[12px] flex-1 px-[12px] py-[6px] rounded-tr-[5px]  rounded-br-[5px]  focus:border-[#66afe9] focus:outline-none focus:shadow-[0_0_4px_1px_#66afe9] "
          />
        </div>
      ) : (
        <input
          type={inputType}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="text-[14px] mt-2 border border-[#ccc] rounded-[5px] px-[12px] py-[6px] focus:border-[#66afe9] focus:outline-none focus:shadow-[0_0_4px_1px_#66afe9] "
        />
      )}
    </div>
  );
};

export default InputBlock;
