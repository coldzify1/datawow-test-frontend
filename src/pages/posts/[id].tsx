import Button from "@/components/common/Button";
import Layout from "@/components/common/Layout";
import CreateCommentModal from "@/components/post/CreateCommentModal";
import PostComment from "@/components/post/PostComment";
import PostCommentCount from "@/components/post/PostCommentCount";
import PostTag from "@/components/post/PostTag";
import { CreateCommentBody } from "@/dto/comment.dto";
import { Post as PostDto } from "@/dto/post.dto";
import useIsMobile from "@/hooks/useIsMobile";
import { useUser } from "@/hooks/useUser";
import clientApi from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PostDetail() {
  const [post, setPost] = useState<PostDto | null>(null);
  const [openComment, setOpenComment] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();
  const {user} = useUser();
  const isMobile = useIsMobile();
  const id = router.query.id;
  useEffect(() => {
    fetchPost();
  }, [id])

  const fetchPost = async () => {
    if (!id) return;
    try {
      const res = await clientApi.getOnePost(id.toString());
      setPost(res.data);
    }
    catch (err) {
      console.log(err);
      alert('Fetch post error!');
    }
  }
  const onClickOpenComment = () => {
    if(!user){
      window.location.href = '/login';
      return;
    }
    setOpenComment(true);
  }
  const onConfirmComment = async () => {

    try {
      const data : CreateCommentBody = {
        postId: Number(id),
        content,
        authorId: user?.id,
      }
      await clientApi.createComment(data);
      fetchPost();
      setOpenComment(false);
      setContent("");
    }
    catch (err) {
      console.log(err);
      alert('Create comment error');
    }
  }
  const onConfirmCommentModal = async (data: CreateCommentBody) => {

    try {
      const tmp : CreateCommentBody = {
        postId: Number(id),
        content: data.content,
        authorId: user?.id,
      }
      await clientApi.createComment(tmp);
      fetchPost();
      setOpenComment(false);
      setContent("");
    }
    catch (err) {
      console.log(err);
      alert('Create comment error');
    }
  }


  return (
    <Layout loading={!!!post}>
      <div className="w-full bg-white min-h-[100vh] px-[16] py-[24] md:px-[100] xl:px-[144] xl:py-[36]">
        <div className="post-detail-container">
          <div>
            <div className="icon-arrow-box w-[44] h-[44] p-[10] flex items-center justify-center" onClick={() => router.back()}>
              <img src="/images/icon-left-arrow.png" />
            </div>
          </div>
          <div className="mt-[40]">
            <div className="post-profile flex items-center">
              <img className="w-[44] h-[44]" src="/images/Avatar.png" />
              <span className="post-detail-name ml-[10]">{post?.author.name}</span>
              <span className="post-time-ago ml-[10]">5mo. ago</span>
            </div>
            <div className="mt-[10]">
              <PostTag tagName={post?.community || "History"} />
            </div>

            <h1 className="my-[16]">{post?.title}</h1>
            <div className="post-detail-content">
              {post?.content}
            </div>
            <div className="mt-[28]">
              <PostCommentCount commentCount={post?.comments?.length || 0} />
            </div>
            {
              !openComment && (
                <div className="mt-[32]">
                  <Button className="btn btn-outline" type="button" onClick={onClickOpenComment}>Add Comments</Button>
                </div>
              )
            }

            {
              openComment && !isMobile && (
                <div className="mt-[20]">
                  <textarea
                    className="modal-input"
                    rows={5}
                    placeholder="What’s on your mind..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <div className="mt-[10] flex justify-end">
                    <div>
                      <Button className="btn-outline" onClick={() => setOpenComment(false)}>Cancel</Button>
                      <Button className="btn-primary ml-[12]" type="button" onClick={onConfirmComment} disabled={!content} >
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              )
            }
            <div className="comment-container mt-[24]">
              {
                post?.comments?.map(item => (
                  <PostComment data={item} />
                ))
              }
            </div>
          </div>

        </div>
      </div>
      <CreateCommentModal
        key={(isMobile && openComment).toString()}
        show={isMobile && openComment}
        onCloseModal={() => setOpenComment(false)}
        onSubmit={onConfirmCommentModal}
      />
    </Layout>
  );
}
