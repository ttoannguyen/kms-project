import EmailInputBlock from "@/components/EmailInputBlock";
import FieldsMetadata from "@/components/FieldsMetadata";
import InputBlock from "@/components/InputBlock";
import SelectionInputBlock from "@/components/SelectionInputBlock";
import metadataBlockApi from "@/services/metadataBlockApi";
import type {
  MetadataBlockInterface,
  MetadataBlockResponse,
} from "@/types/metadataBlockI";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const CreateDataverse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [metadataBlock, setMetadataBlock] =
    useState<MetadataBlockInterface | null>(null);
  const [citationMetadata, setCitationMetadata] = useState<{
    id: string;
    displayName: string;
    displayOnCreate: boolean;
    name: string;
  } | null>(null);
  const ownerId = searchParams.get("ownerId");
  const [hostDataverseValue, setHostDataverseValue] =
    useState<string>("Demo Dataverse");

  const [dataverseNameValue, setDataverseNameValue] = useState<string>(
    "Vu Linh Nguyen Dataverse"
  );

  const [identifierValue, setIdentifierValue] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>("");
  const [emailValues, setEmailValues] = useState<string[]>([
    "linhqwertyuiop22@gmail.com",
    "linhqwertyuiop23@gmail.com",
  ]);
  const [affiliationValue, setAffiliationValue] = useState<string>("");
  const CategoriesArray: {
    label: string;
    value: string;
  }[] = [
    {
      label: "Select one...",
      value: "",
    },
    {
      label: "haha",
      value: "haha",
    },
    {
      label: "haha",
      value: "haha",
    },
    {
      label: "haha",
      value: "haha",
    },
  ];
  const [guestbookValue, setGuestbookValue] = useState<string>("");
  const guestbookArray: {
    label: string;
    value: string;
  }[] = [
    {
      label: "haha",
      value: "hihi",
    },
    {
      label: "haha",
      value: "hihi",
    },
    {
      label: "haha",
      value: "hihi",
    },
  ];

  const [checkMetadataDefault, setCheckMetadataDefault] =
    useState<boolean>(true);

  useEffect(() => {
    const getAllMetadataBlock = async (): Promise<void> => {
      const tempMetadataBlock: MetadataBlockResponse | null =
        await metadataBlockApi.getAllMetadataBlock();

      if (tempMetadataBlock) {
        setMetadataBlock({
          ...tempMetadataBlock,
          data: tempMetadataBlock.data
            .filter((metadata) => metadata.name !== "citation")
            .map((metadata) => ({
              id: metadata.id,
              displayName: metadata.displayName,
              displayOnCreate: metadata.displayOnCreate,
              name: metadata.name,
              checked: false,
            })),
        });
        setCitationMetadata(
          tempMetadataBlock.data.find(
            (metadata) => metadata.name === "citation"
          ) || null
        );
      }
    };
    getAllMetadataBlock();
  }, []);

  const [displayOptionId, setDisplayOptionId] = useState<{
    id: string;
    readOnly: boolean;
  } | null>(null);

  return (
    <div>
      <div className="py-[28px] text-[20px]">
        <span>New Dataverse</span>
      </div>
      <div className="mb-[15px]">BreadcrumbBlock</div>
      <div className="">
        <span className="text-red-600 mr-2">*</span>
        <span>Dấu hoa thị là trường bắt buộc</span>
      </div>

      <form className="mb-16">
        <div className="flex">
          <div className="flex-1 pr-[15px]">
            <InputBlock
              labelValue="Host Dataverse"
              inputValue={hostDataverseValue}
              inputType="text"
              setInputValue={setHostDataverseValue}
              guideString="haha"
              require={false}
            />
          </div>
          <div className="flex-1 pl-[15px]"></div>
        </div>
        <div className="flex">
          <div className="flex-1 pr-[15px]">
            <InputBlock
              labelValue="Dataverse Name"
              inputValue={dataverseNameValue}
              inputType="text"
              setInputValue={setDataverseNameValue}
              guideString="haha"
              require={true}
            />
          </div>
          <div className="flex-1 pl-[15px]">
            <InputBlock
              labelValue="Affiliation"
              inputValue={affiliationValue}
              inputType="text"
              setInputValue={setAffiliationValue}
              guideString="haha"
              require={true}
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 pr-[15px]">
            <InputBlock
              labelValue="Identifier"
              inputValue={identifierValue}
              inputType="text"
              setInputValue={setIdentifierValue}
              guideString="haha"
              require={true}
            />
          </div>
          <div className="flex-1 pl-[15px]"></div>
        </div>
        <div className="flex">
          <div className="flex-1  pr-[15px]">
            <SelectionInputBlock
              labelValue="Category"
              selectValue={categoryValue}
              setSelectValue={setCategoryValue}
              selectArray={CategoriesArray}
              require={true}
              guideString="hihi"
            />
          </div>
          <div className="flex-1  pl-[15px]">
            <div className="flex  flex-col  mt-[15px]">
              <div className="flex">
                <label htmlFor="" className="font-bold mr-1">
                  Description
                </label>

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
                  data-tooltip-id="description_guide"
                  data-tooltip-content="haha"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>

                <Tooltip id="description_guide" place="right" />
              </div>
              <p className="mt-[5px] mb-[10px]">
                This field supports only certain{" "}
                <span
                  data-tooltip-id="html_tag_guide"
                  className="text-hover-underline-blue cursor-pointer"
                >
                  HTML tags.
                </span>
                <Tooltip
                  id="html_tag_guide"
                  place="bottom"
                  className="!bg-white border border-[#ccc] rounded-[5px] custom-tooltip-description !w-[300px]"
                >
                  <div className="w-full">
                    <div className="bg-[#dedede] text-black w-full">
                      <h3>Allowed HTML Tags</h3>
                    </div>
                    <div className="text-red-500">
                      <p>
                        &lt;a&gt;, &lt;b&gt;, &lt;blockquote&gt;, &lt;br&gt;,
                        &lt;code&gt;, &lt;del&gt;, &lt;dd&gt;, &lt;dl&gt;,
                        &lt;dt&gt;, &lt;em&gt;, &lt;hr&gt;- &lt;h1&gt;,
                        &lt;h3&gt;, &lt;i&gt;, &lt;img&gt;, &lt;kbd&gt;,
                        &lt;li&gt;, &lt;ol&gt;, &lt;p&gt;, &lt;pre&gt;,
                        &lt;s&gt;, &lt;sup&gt;, &lt;sub&gt;, &lt;strong&gt;,
                        &lt;strike&gt;, &lt;u&gt;, &lt;ul&gt;,
                      </p>
                    </div>
                  </div>
                </Tooltip>
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 pr-[15px]">
            <EmailInputBlock
              labelValue="Email"
              emailValues={emailValues}
              setEmailValues={setEmailValues}
              require={true}
              guideString="wow"
            />
          </div>
          <div className="flex-1 pl-[15px]">
            <textarea
              name=""
              id=""
              rows={6}
              cols={70}
              className="py-[6px] px-[12px] border border-[#ccc]   rounded-[5px]  focus:border-[#66afe9] focus:outline-none focus:shadow-[0_0_4px_1px_#66afe9]"
            ></textarea>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 pr-[15px]"></div>
          <div className="flex-1 pl-[15px]">
            <SelectionInputBlock
              labelValue="Guestbook Mode"
              selectValue={guestbookValue}
              setSelectValue={setGuestbookValue}
              selectArray={guestbookArray}
              require={true}
              guideString="hihi"
            />
          </div>
        </div>
      </form>
      <div className="h-[1px] bg-[#ccc] my-4"></div>

      <div className="grid grid-cols-[30%_70%] px-4 py-2  border border-[#ccc] rounded-[5px]">
        <div className="font-bold">Metadata Fields</div>
        <div className="">
          <p className="text-[#737373]">
            Choose the metadata fields to use in dataset templates and when
            adding a dataset to this dataverse.
          </p>
          <div className="flex flex-col">
            <label htmlFor="metadata_default" className="my-[10px]">
              <input
                type="checkbox"
                name=""
                id="metadata_default"
                className="mr-2 cursor-pointer"
                checked={checkMetadataDefault}
                onChange={() => {
                  setCheckMetadataDefault(!checkMetadataDefault);
                  setMetadataBlock((prev) => {
                    if (!prev) return prev; // hoặc null

                    return {
                      ...prev,
                      data: prev.data.map((item) => ({
                        ...item,
                        checked: false,
                      })),
                    };
                  });
                }}
              />
              Use metadata fields from Demo Dataverse
            </label>

            {citationMetadata && (
              <div className="flex my-[5px] flex-col">
                <div className="flex">
                  <label htmlFor={`metadata_${citationMetadata.id}`}>
                    <input
                      type="checkbox"
                      name=""
                      id={`metadata_${citationMetadata.id}`}
                      className="mr-2 cursor-no-drop"
                      checked
                      disabled
                      value={citationMetadata.name}
                    />
                    {citationMetadata.displayName + " (Required)"}
                  </label>
                  {checkMetadataDefault ? (
                    <button
                      onClick={() =>
                        setDisplayOptionId({
                          id: citationMetadata.id,
                          readOnly: true,
                        })
                      }
                      className="ml-4 text-hover-underline-blue cursor-pointer"
                    >
                      {"[+] View fields"}
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setDisplayOptionId({
                          id: citationMetadata.id,
                          readOnly: false,
                        })
                      }
                      className="ml-4 text-hover-underline-blue cursor-pointer"
                    >
                      {"[+] View fields + set as hidden, required, or optional"}
                    </button>
                  )}
                </div>

                {displayOptionId &&
                  displayOptionId.id === citationMetadata.id && (
                    <FieldsMetadata
                      readOnly={displayOptionId.readOnly}
                      name={citationMetadata.name}
                      setDisplayOptionId={setDisplayOptionId}
                    />
                  )}
              </div>
            )}

            {metadataBlock !== null &&
              metadataBlock?.data.map((metadata) => (
                <div className="flex my-[5px]" key={metadata.id}>
                  <label htmlFor={`metadata_${metadata.id}`}>
                    <input
                      type="checkbox"
                      name=""
                      id={`metadata_${metadata.id}`}
                      className={
                        checkMetadataDefault
                          ? "mr-2 cursor-no-drop"
                          : "mr-2 cursor-pointer"
                      }
                      checked={metadata.checked}
                      disabled={checkMetadataDefault}
                      onChange={() =>
                        setMetadataBlock((prev) => {
                          if (!prev) return prev; // hoặc null

                          return {
                            ...prev,
                            data: prev.data.map((item) =>
                              item.id === metadata.id
                                ? { ...item, checked: !item.checked }
                                : item
                            ),
                          };
                        })
                      }
                    />
                    {metadata.displayName}
                  </label>
                  {!metadata.checked ? (
                    <button
                      onClick={() =>
                        setDisplayOptionId({
                          id: metadata.id,
                          readOnly: false,
                        })
                      }
                      className="ml-4 text-hover-underline-blue cursor-pointer"
                    >
                      {"[+] View fields"}
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setDisplayOptionId({
                          id: metadata.id,
                          readOnly: true,
                        })
                      }
                      className="ml-4 text-hover-underline-blue cursor-pointer"
                    >
                      {"[+] View fields + set as hidden, required, or optional"}
                    </button>
                  )}
                  {displayOptionId && displayOptionId.id === metadata.id && (
                    <div className="w-full bg-red-700"></div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDataverse;
