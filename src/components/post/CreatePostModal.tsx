import { CreatePostBody } from "@/dto/post.dto";
import { useUser } from "@/hooks/useUser";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import Button from "../common/Button";
import PostCateDropdown from "./PostCateDropdown";

type CreatePostModalType = {
  show: boolean;
  onCloseModal: () => void
  onSubmit: (data: CreatePostBody) => Promise<void>
  mode?: 'create' | 'edit',
  data?: CreatePostFormData | null
}
type FieldError = {
  message: string
}
type FormError = {
  title?: FieldError
  content?: FieldError
  community?: FieldError
}
type CreatePostFormData = {
  title?: string
  content?: string
  community?: string
}

const initialFormData = {
  title: "",
  content: "",
  community: ""
}
const CreatePostModal = ({ show = false, onCloseModal, onSubmit, mode = 'create', data }: CreatePostModalType) => {
  const [formData, setFormData] = useState<CreatePostFormData>(initialFormData);
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
        title: formData.title,
        content: formData.content,
        community: formData.community,
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
    let key: keyof CreatePostFormData
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

        <h1>{mode === 'create' ? 'Create' : 'Edit'} Post</h1>
        <div className="mt-[30]">
          <PostCateDropdown
            selectedKey={formData.community}
            onChange={(key) => setFormData({ ...formData, community: key })}
            placeHolder="Choose a community"
            error={!!error.community}
          />
        </div>
        <div className="my-[14]">
          <input
            className={classNames("modal-input", { error: !!error.title })}
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className="my-[14]">
          <textarea
            className={classNames("modal-input", { error: !!error.content })}
            rows={10}
            placeholder="What’s on your mind..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </div>
        <div className="mt-[10] md:flex justify-end">
          <div>
            <Button className="btn-outline w-full md:w-[auto]" onClick={() => onCloseModal()}>Cancel</Button>
            <Button className="btn-primary w-full md:w-[auto] md:ml-[12] mt-[12] md:mt-0" type="button" onClick={onClickConfirm} disabled={loading} >
              {mode === 'create' ? 'Post' : 'Confirm'}
            </Button>
          </div>
        </div>
      </div>
      {/* <h1>Create Post</h1> */}
    </Modal >
  )
}

export default CreatePostModal