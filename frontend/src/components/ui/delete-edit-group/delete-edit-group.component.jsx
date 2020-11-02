import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../../../assets/img/delete-icon.svg";
import { ReactComponent as EditIcon } from "../../../assets/img/edit-icon.svg";

const DeleteEditGroup = ({
   handleShow,
   handleEditForm,
   handleShowParam,
   handleEditFormParam,
}) => {
   return (
      <React.Fragment>
         <div className="d-flex justify-content-end">
            <div
               className="ml-2 cursor-pointer"
               onClick={() => handleShow(handleShowParam)}
            >
               <DeleteIcon />
            </div>

            <div
               className="cursor-pointer ml-4"
               onClick={() => handleEditForm(handleEditFormParam)}
            >
               <Link>
                  <EditIcon />
               </Link>
            </div>
         </div>
      </React.Fragment>
   );
};

export default DeleteEditGroup;
