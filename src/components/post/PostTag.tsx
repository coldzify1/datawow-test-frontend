
type PostTagType = {
  tagName: string
}
const PostTag = ({tagName = "History"} : PostTagType) => {
  return (
    <div className="post-tag mt-[15]">
      <span>{tagName}</span>
    </div>
  )
}

export default PostTag