import { CommentDto } from "@/dto/comment.dto"
type CommentPropsType = {
  data: CommentDto
}

const PostComment = ({ data }: CommentPropsType) => {
  return (
    <div className="post-comment mb-[24]">
      <div className="flex items-center">
        <div className="comment-user-img-box w-[40] h-[40] flex items-center justify-center">
          <img src="/images/user.png" />
        </div>
        <div className="ml-[10]">
          <div className="comment-name inline-block">
            {data.commentor.name}
          </div>
          <span className="post-time-ago ml-[10]">12h ago</span>
        </div>
       
      </div>
      <div className="comment-content ml-[50] mt-[8]">
        {data.content}
      </div>

    </div>
  )
}
export default PostComment