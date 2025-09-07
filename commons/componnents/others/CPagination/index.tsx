import Link from "next/link";

interface ICPagination {
  page: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onChangePage: (n: number) => void;
}

const CPagination = ({ page, totalPages, onChangePage }: ICPagination) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;
    const startPage = Math.max(2, page - 1);
    const endPage = Math.min(totalPages - 1, page + 1);
    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <li
            key={i}
            className={`flex ${page === i ? "border-b-2 border-b-main-default" : ""}`}
          >
            <Link
              className={`page-link px-3 py-[0.375rem] ${page === i ? "font-bold text-main-default" : "hover:bg-[#F3F6F8] hover:text-main-default"}`}
              href="#"
              onClick={() => onChangePage(i)}
            >
              {i}
            </Link>
          </li>
        );
      }
    } else {
      pages.push(
        <li
          key={1}
          className={`flex ${page === 1 ? "border-b-2 border-b-main-default" : ""}`}
        >
          <Link
            className={`page-link px-3 py-[0.375rem] ${page === 1 ? "font-bold text-main-default" : "hover:bg-[#F3F6F8] hover:text-main-default"}`}
            href="#"
            onClick={() => onChangePage(1)}
          >
            1
          </Link>
        </li>
      );

      if (startPage > 2) {
        pages.push(
          <li key="start-ellipsis" className="flex">
            <span className="page-link px-3 py-[0.375rem]">...</span>
          </li>
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <li
            key={i}
            className={`flex ${page === i ? "border-b-2 border-b-main-default" : ""}`}
          >
            <Link
              className={`page-link px-3 py-[0.375rem] ${page === i ? "font-bold text-main-default" : "hover:bg-[#F3F6F8] hover:text-main-default"}`}
              href="#"
              onClick={() => onChangePage(i)}
            >
              {i}
            </Link>
          </li>
        );
      }

      if (endPage < totalPages - 1) {
        pages.push(
          <li key="end-ellipsis" className="flex">
            <span className="page-link px-3 py-[0.375rem]">...</span>
          </li>
        );
      }

      pages.push(
        <li
          key={totalPages}
          className={`flex ${page === totalPages ? "border-b-2 border-b-main-default" : ""}`}
        >
          <Link
            className={`page-link px-3 py-[0.375rem] ${page === totalPages ? "font-bold text-main-default" : "hover:bg-[#F3F6F8] hover:text-main-default"}`}
            href="#"
            onClick={() => onChangePage(totalPages)}
          >
            {totalPages}
          </Link>
        </li>
      );
    }

    return pages;
  };

  return (
    <>
      <nav aria-label="Page navigation ">
        <ul className="flex w-max text-[#536485FF]">
          <li className="flex">
            <Link
              className="page-link px-3 py-[0.375rem] hover:rounded-s-lg hover:bg-[#F3F6F8] hover:text-main-default"
              href="#"
              aria-label="Previous"
              onClick={() => onChangePage(Math.max(1, page - 1))}
            >
              Prev
            </Link>
          </li>
          {renderPageNumbers()}
          <li className="flex">
            <Link
              className="page-link px-3 py-[0.375rem] hover:rounded-e-lg hover:bg-[#F3F6F8] hover:text-main-default"
              href="#"
              aria-label="Next"
              onClick={() => onChangePage(Math.min(totalPages, page + 1))}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default CPagination;
