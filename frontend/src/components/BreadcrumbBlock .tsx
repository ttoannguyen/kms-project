import type { DatasetParent, DataverseParent } from "@/types/file";
import { Link } from "react-router-dom";
interface Part {
  type: string;
  identifier: string;
  isReleased: boolean;
  displayName: string;
  isPartOf?: Part;
}

interface ChildProps {
  isPartOf: DatasetParent;
}

const BreadcrumbBlock: React.FC<ChildProps> = ({ isPartOf }) => {
  const newPart: Part = convertToPartFromDataset(isPartOf);

  function convertToPartFromDataset(dataset: DatasetParent): Part {
    return {
      type: dataset.type,
      identifier: dataset.persistentIdentifier,
      isReleased: true, // giả định dataset đã được phát hành
      displayName: dataset.displayName,
      isPartOf: convertToPartFromDataverse(dataset.isPartOf),
    };
  }

  function convertToPartFromDataverse(dataverse: DataverseParent): Part {
    return {
      type: dataverse.type,
      identifier: dataverse.identifier,
      isReleased: dataverse.isReleased,
      displayName: dataverse.displayName,
      isPartOf: dataverse.isPartOf
        ? convertToPartFromDataverse(dataverse.isPartOf)
        : undefined,
    };
  }

  function getIsPartOfChain(part: Part): Part[] {
    const chain: Part[] = [];

    // Duyệt từ phần hiện tại đến gốc, rồi đảo ngược thứ tự
    let current: Part | undefined = part;
    while (current) {
      chain.push(current);
      current = current.isPartOf;
    }

    // Đảo ngược mảng để phần tử gốc nằm đầu tiên
    return chain.reverse();
  }

  const breadcrumbArray: Part[] = getIsPartOfChain(newPart);

  const getLink = (b: Part): string => {
    switch (b.type) {
      case "DATASET":
        return `/dataset?persistentId=${b.identifier}`;
        break;

      case "DATAVERSE":
        return `/dataverse?q=${b.identifier}`;
        break;
      default:
        console.log("error");
        return "#";
        break;
    }
  };

  return (
    <div className="flex">
      {breadcrumbArray?.map((b, index) => (
        <div key={index} className="  ">
          <Link to={getLink(b)} className="text-hover-underline-blue">
            {b.displayName}
          </Link>

          <span> &gt; </span>
        </div>
      ))}
    </div>
  );
};

export default BreadcrumbBlock;
