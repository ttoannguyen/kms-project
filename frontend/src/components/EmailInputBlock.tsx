import { Minus, Plus } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface ChildProps {
  labelValue: string;
  emailValues: string[];
  guideString: string;
  setEmailValues: React.Dispatch<React.SetStateAction<string[]>>;
  require: boolean;
}

const EmailInputBlock: React.FC<ChildProps> = ({
  labelValue,
  emailValues,
  guideString,
  setEmailValues,
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

      <div className="flex flex-col">
        {emailValues &&
          emailValues.map((emailValue, index) => (
            <div className="flex" key={index}>
              <input
                key={index}
                value={emailValue}
                type="text"
                className="w-[75%] text-[14px] mt-2 mb-4 mr-10 border border-[#ccc] rounded-[5px] px-[12px] py-[6px] focus:border-[#66afe9] focus:outline-none focus:shadow-[0_0_4px_1px_#66afe9]"
              />
              <button
                data-tooltip-id={emailValue + "_" + index + "+"}
                data-tooltip-content="Thêm"
                className="mt-2 mr-4 px-[10px] py-[10px] h-[100%] border border-[#ccc] rounded-[5px] bg-[linear-gradient(to_bottom,_#fff_0%,_#e0e0e0_100%)] hover:text-[#333] hover:bg-[#e6e6e6] hover:border-[#adadad] cursor-pointer"
              >
                <Plus size={14} />
              </button>

              {emailValues.length > 1 && (
                <button
                  data-tooltip-id={emailValue + "_" + index + "-"}
                  data-tooltip-content="Xóa"
                  className="mt-2 px-[10px] py-[10px] h-[100%] border border-[#ccc] rounded-[5px] bg-[linear-gradient(to_bottom,_#fff_0%,_#e0e0e0_100%)] hover:text-[#333] hover:bg-[#e6e6e6] hover:border-[#adadad] cursor-pointer"
                >
                  <Minus size={14} />
                </button>
              )}

              <Tooltip id={emailValue + "_" + index + "+"} place="top" />
              <Tooltip id={emailValue + "_" + index + "-"} place="top" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default EmailInputBlock;
