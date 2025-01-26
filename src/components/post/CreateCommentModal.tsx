import { CreateCommentBody } from "@/dto/comment.dto";
import { useUser } from "@/hooks/useUser";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import Button from "../common/Button";

type CreatePostModalType = {
  show: boolean;
  onCloseModal: () => void
  onSubmit: (data: CreateCommentBody) => Promise<void>
  data?: CreateCommentFormData | null
}
type FieldError = {
  message: string
}
type FormError = {
  content?: FieldError
}
type CreateCommentFormData = {
  content?: string
}

const initialFormData = {
  content: "",
}
const CreateCommentModal = ({ show = false, onCloseModal, onSubmit, data }: CreatePostModalType) => {
  const [formData, setFormData] = useState<CreateCommentFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FormError>({});

  const { user } = useUser();

  useEffect(() => {
    if(data){
      setFormData({...initialFormData,...data});
    }
    else{
      resetForm();
    }
  },[data]);

  function resetForm(){
    setFormData(initialFormData);
  }

  const onClickConfirm = async () => {
    const isError = validate();
    if (isError) {
      return;
    }
    setLoading(true);
    try {
      let prep = {
        content: formData.content,
        authorId: user?.id
      }
      await onSubmit(prep);
      setLoading(false);
    }
    catch (err) {
      console.log(err)
      setLoading(false);
    }
  }
  function validate() {
    let isError = false;
    let key: keyof CreateCommentFormData
    let tmpError: FormError = {};
    for (key in formData) {
      if (!formData[key]) {
        isError = true;
        tmpError[key] = { message: 'Please fill the value.' }
      }
    }
    setError(tmpError);
    return isError;
  }

  console.log(error);

  return (
    <Modal
      isOpen={show}
      onRequestClose={() => onCloseModal()}
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <div className="modal-body">

        <h1>Add Comments</h1>
        <div className="my-[20]">
          <textarea
            className={classNames("modal-input", { error: !!error.content })}
            rows={5}
            placeholder="What’s on your mind..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </div>
        <div className="mt-[10] md:flex justify-end">
          <div>
            <Button className="btn-outline w-full md:w-[50%]" onClick={() => onCloseModal()}>Cancel</Button>
            <Button className="btn-primary w-full md:w-[50%] md:ml-[12] mt-[12] md:mt-0" type="button" onClick={onClickConfirm} disabled={loading} >
              Post
            </Button>
          </div>
        </div>
      </div>
      {/* <h1>Create Post</h1> */}
    </Modal >
  )
}

export default CreateCommentModal