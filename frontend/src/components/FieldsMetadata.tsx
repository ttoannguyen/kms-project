import metadataBlockApi from "@/services/metadataBlockApi";
import type {
  MetadataFieldItem,
  MetadataItemResponse,
} from "@/types/metadataBlockI";
import { useEffect, useState } from "react";

interface ChildProp {
  readOnly: boolean;
  name: string;
  setDisplayOptionId: React.Dispatch<
    React.SetStateAction<{
      id: string;
      readOnly: boolean;
    } | null>
  >;
}

const FieldsMetadata: React.FC<ChildProp> = ({
  readOnly,
  name,
  setDisplayOptionId,
}) => {
  const [metadataItem, setMetadataItem] = useState<MetadataItemResponse | null>(
    null
  );

  const [fieldArray, setFieldArray] = useState<MetadataFieldItem[] | null>(
    null
  );

  const conditionalLabel: string[] = ["producerName"];

  useEffect(() => {
    const getMetadataItem = async (): Promise<void> => {
      const tempMetadataItem: MetadataItemResponse | null =
        await metadataBlockApi.getMetadataItem(name);

      if (tempMetadataItem) {
        setMetadataItem(tempMetadataItem);

        const arr = Object.values(tempMetadataItem.data.fields).sort(
          (a, b) => a.displayOrder - b.displayOrder
        );
        setFieldArray(arr);
      }
    };

    getMetadataItem();
  }, [name]);

  console.log(fieldArray);

  function capitalizeFirstLetter(str: string): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className=" ml-[60px] mt-2">
      <div className="border border-[#ccc] rounded-[5px] w-[70%] max-h-[400px] overflow-y-scroll">
        <div className=" py-2">
          {fieldArray?.map((field, index) => (
            <div>
              <div
                key={index}
                className=" px-4 flex justify-between py-2 border-b border-[#ccc]"
              >
                <label htmlFor="">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="w-[15px] h-[15px] mr-2"
                    defaultChecked
                    disabled={readOnly}
                  />
                  <span>{capitalizeFirstLetter(field.name)}</span>
                </label>
                {field.isRequired ? (
                  <span> Required by Dataverse</span>
                ) : (
                  <div>
                    <label htmlFor="">
                      <input type="radio" name="" id="" />
                      Required
                    </label>

                    {Array.isArray(conditionalLabel) &&
                    conditionalLabel.includes(field.name || "") ? (
                      <label htmlFor="">
                        <input type="radio" name="" id="" />
                        Conditionally Required
                      </label>
                    ) : (
                      <label htmlFor="">
                        <input type="radio" name="" id="" />
                        Optional
                      </label>
                    )}
                  </div>
                )}
              </div>

              {field?.childFields &&
                Object.values(field.childFields).map((childField) => (
                  <div className="flex flex-col  pl-[50px] pr-4 border-b border-[#ccc] py-2 s">
                    {" "}
                    <div className="flex  justify-between ">
                      <span className="flex-1">{childField.displayName}</span>

                      {childField.isRequired ? (
                        <span> Required by Dataverse</span>
                      ) : (
                        <div>
                          <label htmlFor="">
                            <input type="radio" name="" id="" />
                            Required
                          </label>

                          {Array.isArray(conditionalLabel) &&
                          conditionalLabel.includes(childField.name || "") ? (
                            <label htmlFor="">
                              <input type="radio" name="" id="" />
                              Conditionally Required
                            </label>
                          ) : (
                            <label htmlFor="">
                              <input type="radio" name="" id="" />
                              Optional
                            </label>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <button className="px-4 cursor-pointer mr-4 py-2 border border-[#ccc] rounded-[5px] bg-[linear-gradient(to_bottom,_#fff_0%,_#e0e0e0_100%)] transition-all duration-200">
          Hoàn thành
        </button>
        <button
          onClick={() => setDisplayOptionId(null)}
          className="px-4 cursor-pointer py-2 border border-[#ccc] rounded-[5px] bg-[linear-gradient(to_bottom,_#fff_0%,_#e0e0e0_100%)]  transition-all duration-200"
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

export default FieldsMetadata;
