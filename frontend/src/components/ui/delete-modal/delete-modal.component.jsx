import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

const DeleteModal = ({
   id,
   showModal,
   handleClose,
   message,
   handleDelete,
   deleting,
   messageId,
}) => {
   return (
      <Modal
         show={showModal}
         onHide={handleClose}
         className="delete-modal"
         size="sm"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header closeButton className="justify-content-center">
            <Modal.Title id="contained-modal-title-vcenter">
               <FormattedMessage
                  defaultMessage="Are You Sure?"
                  id="componentDeleteModalDeleteModalHeader"
               />
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <h6 className="text-muted user-type-content">
               <FormattedMessage defaultMessage={message} id={messageId} />
            </h6>
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={handleClose} className="popup-close-btn">
               <FormattedMessage
                  defaultMessage="Close"
                  id="componentUsersTabDeleteModalCloseButton"
               />
            </Button>
            <Button
               variant="primary"
               className="popup-save-btn"
               onClick={() => handleDelete(id)}
            >
               {deleting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
               )}
               <FormattedMessage
                  defaultMessage="Confirm"
                  id="componentUserTypesDeleteModalConfirmButton"
               />
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default DeleteModal;
