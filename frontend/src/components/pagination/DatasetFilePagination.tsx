import "./pagination.css";
import ReactPaginate from "react-paginate";

interface ChildProps {
  pageCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const DatasetFilePagination: React.FC<ChildProps> = ({
  pageCount,
  // currentPage,
  setCurrentPage,
}) => {
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <div>
      <div className="pagination">
        <ReactPaginate
          onPageChange={handlePageClick}
          className="paginationPage"
          previousLabel="<"
          nextLabel=">"
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          previousClassName="prev"
          nextClassName="next"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default DatasetFilePagination;
