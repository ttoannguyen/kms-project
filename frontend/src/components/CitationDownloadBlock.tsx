const CitationDownloadBlock = () => {
  return (
    <div>
      <button className="pb-2">
        <div className="flex items-center ">
          <p className="hover:bg-gray-100 flex items-center cursor-pointer">
            Download EndNote XML
          </p>
        </div>
      </button>

      <button className="pb-2">
        <div className="flex items-center ">
          <p className="hover:bg-gray-100 flex items-center cursor-pointer">
            Download RIS
          </p>
        </div>
      </button>

      <button className="pb-2">
        <div className="flex items-center ">
          <p className="hover:bg-gray-100 flex items-center cursor-pointer">
            Download EndNote BibTeX
          </p>
        </div>
      </button>
    </div>
  );
};

export default CitationDownloadBlock;
