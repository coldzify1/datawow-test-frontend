import HomeBar from "@/components/common/HomeBar";
import Layout from "@/components/common/Layout";
import CreatePostModal from "@/components/post/CreatePostModal";
import DeletePostModal from "@/components/post/DeletePostModal";
import Post, { PostMode } from "@/components/post/Post";
import { CreatePostBody, Post as PostDto } from "@/dto/post.dto";
import { useUser } from "@/hooks/useUser";
import clientApi from "@/utils/api";
import { isAuthenticated } from "@/utils/auth";
import { useEffect, useState } from "react";

export default function OurBlog() {
  const [posts,setPosts] = useState<PostDto[]>([]);
  const [selectedCommunity,setSelectedCommunity] = useState("");
  const [showCreatePost,setShowCreatePost] = useState(false);
  const [showDeletePost,setShowDeletePost] = useState(false);
  const [modalMode,setModalMode] = useState<'edit' | 'create'>('edit')
  const [selectedPost,setSelectedPost] = useState<PostDto | null>(null);
  const {user} = useUser();
  useEffect(() => {
    if(isAuthenticated()){
      if(user){
        fetchPosts();
      }
    }
    else{
      window.location.href = '/login'
    }
   
  },[user,selectedCommunity])

 
  const onClickCreatePost = () => {
    setShowCreatePost(true);
    setModalMode('create');
  }
  const onClickEditPost = (id: number) => {
    setShowCreatePost(true);
    setModalMode('edit');
    setSelectedPost(posts.find(item => item.id === id) || null);
  }
  const onClickDeletePost = (id: number) => {
    setSelectedPost(posts.find(item => item.id === id) || null);
    setShowDeletePost(true);
  }
  const onCloseModal = () => {
    setSelectedPost(null);
    setShowCreatePost(false);
    setShowDeletePost(false);
  }
  const fetchPosts = async () => {
    try{
      const params = {
        authorId: user?.id
      } as any
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
      if(modalMode === 'create'){
        await clientApi.createPost(data);
      }
      else if(selectedPost){
        await clientApi.updatePost(selectedPost.id,data);
      }
      
      onCloseModal();
      fetchPosts();
    }
    catch (err) {
      console.log(err)
    }
  }
  const onDeletePost = async () => {
    if(!selectedPost) return;
    try{
      await clientApi.deletePost(selectedPost.id);
      fetchPosts();
      onCloseModal();
    }
    catch(err){
      console.log(err);
      alert('Delete post error!');
    }
  }
  return (
    <Layout withPadding={true}>
      <div className="home-content md:max-w-[75%]">
        <HomeBar 
          onClickCreatePost={onClickCreatePost} 
          selectedCommunity={selectedCommunity}
          setSelectedCommunity={setSelectedCommunity}
        />
        <div className="post-container bg-white mt-[24]">
          {
            posts.map(item => (
              <Post 
                post={item} 
                key={item.id} 
                mode={PostMode.EDIT}
                onClickEdit={onClickEditPost}
                onClickDelete={onClickDeletePost}
              />
            ))
          }
        </div>
       
      </div>
      <CreatePostModal 
        key={showCreatePost.toString()}
        show={showCreatePost} 
        onCloseModal={onCloseModal} 
        onSubmit={onCreatePost}
        mode={modalMode}
        data={selectedPost}
      />
      <DeletePostModal
        show={showDeletePost}
        onCloseModal={onCloseModal}
        onSubmit={onDeletePost}
      />
    </Layout>
  );
}
