import { User } from "@/dto/user.dto"

type PostProfileType = {
  user: User
}
const PostProfile = ({user} : PostProfileType) => {
  return (
    <div className="post-profile flex items-center">
      <img className="w-[31] h-[31]" src="/images/Avatar.png" />
      <span className="post-profile-name ml-[10]">{user?.name}</span>
    </div>
  )
}

export default PostProfile