import Modal from 'react-modal';
import Button from "../common/Button";

type DeletePostModalType = {
  show: boolean;
  onCloseModal: () => void
  onSubmit: () => Promise<void>
}


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    width: '50%'
  },
};
const DeletePostModal = ({ show = false, onCloseModal, onSubmit}: DeletePostModalType) => {
  const onClickConfirm = async () => {
    onSubmit();
  }
  return (
    <Modal
      isOpen={show}
      onRequestClose={() => onCloseModal()}
      // style={customStyles}
      overlayClassName="modal-overlay"
      className="modal-content modal-delete"
    >
      <div className="modal-body">
        <h1 className='modal-delete-header text-center'>Please confirm if you wish to delete the post</h1>
        <div className="modal-delete-content text-center mt-[8]">
          Are you sure you want to delete the post? Once deleted, it cannot be recovered.
        </div>
        <div className="mt-[32] flex flex-col-reverse md:flex-row">
          <Button className="btn btn-outline w-full md:w-[50%] mt-[12] md:mt-0" onClick={() => onCloseModal()}>Cancel</Button>
          <Button className="btn btn-danger w-full md:w-[50%] md:ml-[12]" type="button" onClick={onClickConfirm}>Delete</Button>
          
        </div>
      </div>
      {/* <h1>Create Post</h1> */}
    </Modal >
  )
}

export default DeletePostModal