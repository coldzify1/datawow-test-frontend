
const PostCommentCount = ({ commentCount = 0 }: { commentCount: number }) => {
  return (
    <div className="post-item-comment mt-[10] flex items-center">
      <div className="w-[16] h-[16] flex items-center justify-center">
        <img src="/images/icon-comment.png" />
      </div>
      <div className="ml-[5]">
        {`${commentCount} comments`}
      </div>
    </div>
  )
}
export default PostCommentCount