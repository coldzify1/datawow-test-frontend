import HomeBar from "@/components/common/HomeBar";
import Layout from "@/components/common/Layout";
import CreatePostModal from "@/components/post/CreatePostModal";
import Post from "@/components/post/Post";
import { CreatePostBody, Post as PostDto } from "@/dto/post.dto";
import clientApi from "@/utils/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts,setPosts] = useState<PostDto[]>([]);
  const [showCreatePost,setShowCreatePost] = useState(false);
  const [selectedCommunity,setSelectedCommunity] = useState("");
  useEffect(() => {
    fetchPosts();
  },[selectedCommunity])
  const fetchPosts = async () => {
    try{
      let params = {} as any
      if(selectedCommunity) params.community = selectedCommunity;
      const res = await clientApi.getAllPosts(params);
      setPosts(res.data);
    }
    catch(err){
      console.log(err)
    }
  }
  const onCreatePost = async (data: CreatePostBody) => {
    try {
      await clientApi.createPost(data);
      setShowCreatePost(false);
      fetchPosts();
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <Layout withPadding={true}>
      <div className="home-content md:max-w-[75%]">
        <HomeBar 
          onClickCreatePost={() => setShowCreatePost(true)} 
          selectedCommunity={selectedCommunity}
          setSelectedCommunity={setSelectedCommunity}
        />
        <div className="post-container bg-white mt-[24]">
          {
            posts.map(item => (
              <Post post={item} key={item.id}/>
            ))
          }
        </div>
       
      </div>
      <CreatePostModal 
        key={showCreatePost.toString()}
        show={showCreatePost} 
        onCloseModal={() => setShowCreatePost(false)} 
        onSubmit={onCreatePost}
      />
    </Layout>
  );
}
