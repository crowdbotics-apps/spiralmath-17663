import React from "react";

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
   const pageNumbers = [];



   for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
      pageNumbers.push(i);
   }

   return (
      <nav>
         <ul className="pagination justify-content-center mb-0">
            {pageNumbers.map((number) => {
               return (
                  <li
                     key={number}
                     className={`${
                        number === currentPage && "active-page"
                     } page-item`}
                  >
                     <span
                        onClick={() => paginate(number)}
                        className="page-link border-0 pagination-link pointerType"
                     >
                        {number}
                     </span>
                  </li>
               );
            })}
         </ul>
      </nav>
   );
};

export default Pagination;
