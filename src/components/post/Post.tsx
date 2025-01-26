import { Post as PostDto } from "@/dto/post.dto"
import PostProfile from "./PostProfile"
import PostTag from "./PostTag"
import Link from "next/link"
import PostComment from "./PostCommentCount"

type PostType = {
  post: PostDto
  mode?: PostMode
  onClickEdit?: (id: number) => void
  onClickDelete?: (id: number) => void
}
export enum PostMode {
  NORMAL = 'normal',
  EDIT = 'edit'
}
const Post = ({ post, mode = PostMode.NORMAL, onClickEdit, onClickDelete }: PostType) => {
  return (


    <div className="post">
      <div className="flex items-center justify-between">
        <PostProfile user={post.author} />
        {
          mode === PostMode.EDIT && (
            <div className="flex">
              <div className="btn-post w-[16] h-[16] flex items-center justify-center" onClick={() => onClickEdit?.(post.id)}>
                <img src="/images/icon-pen.png" />
              </div>
              <div className="btn-post w-[16] h-[16] ml-[15] flex items-center justify-center" onClick={() => onClickDelete?.(post.id)}>
                <img src="/images/icon-trash.png" />
              </div>
            </div>
          )
        }

      </div>

      <PostTag tagName={post.community || "History"} />
      <Link href={`/posts/${post.id}`}>
        <div className="post-title mt-[5]">{post.title}</div>
        <div className="post-content line-clamp-2">{post.content}</div>
      </Link>
      <PostComment commentCount={post.comments?.length || 0} />
      {/* <div className="post-item-comment mt-[10] flex items-center">
        <div className="w-[16] h-[16] flex items-center justify-center">
          <img src="/images/icon-comment.png" />
        </div>
        <div className="ml-[5]">
          {`${post.comments?.length || 0} comments`}
        </div>
      </div> */}
    </div>

  )
}

export default Post