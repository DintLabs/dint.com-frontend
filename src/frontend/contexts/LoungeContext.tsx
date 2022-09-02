import _axios from 'frontend/api/axios';
import { DEFAULT_POSTS_PAGINATION, postTypes } from 'frontend/data';
import { createContext, useContext, useState } from 'react';

const useLoungeController = () => {
  const [counts, setCounts] = useState(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [textPosts, setTextPosts] = useState<any[]>([]);
  const [photoPosts, setPhotoPosts] = useState<any[]>([]);
  const [videoPosts, setVideoPosts] = useState<any[]>([]);

  const [paginationPosts, setPaginationPosts] = useState(DEFAULT_POSTS_PAGINATION);
  const [paginationTextPosts, setPaginationTextPosts] = useState({
    ...DEFAULT_POSTS_PAGINATION,
    post_type: postTypes.text.value
  });
  const [paginationPhotoPosts, setPaginationPhotoPosts] = useState({
    ...DEFAULT_POSTS_PAGINATION,
    post_type: postTypes.image.value
  });
  const [paginationVideoPosts, setPaginationVideoPosts] = useState({
    ...DEFAULT_POSTS_PAGINATION,
    post_type: postTypes.video.value
  });

  const getUserPostCounts = async () => {
    const { data } = await _axios.get(`/api/lounge/fetch-post-counts/`);
    if (data?.code === 200) {
      setCounts(data?.data);
    }
  };

  const addNewPostToContext = (post: any) => {
    if (post.type === 'text') {
      setTextPosts((prev) => (prev.length ? [post, ...prev] : prev));
    }
    if (post.type === 'image') {
      setPhotoPosts((prev) => (prev.length ? [post, ...prev] : prev));
    }
    if (post.type === 'video' && videoPosts.length) {
      setVideoPosts((prev) => (prev.length ? [post, ...prev] : prev));
    }
    setPosts((prev) => [post, ...prev]);
    getUserPostCounts();
  };

  return {
    counts,
    setCounts,
    posts,
    setPosts,
    photoPosts,
    setPhotoPosts,
    textPosts,
    setTextPosts,
    videoPosts,
    setVideoPosts,
    paginationPosts,
    setPaginationPosts,
    paginationTextPosts,
    setPaginationTextPosts,
    paginationPhotoPosts,
    setPaginationPhotoPosts,
    paginationVideoPosts,
    setPaginationVideoPosts,
    addNewPostToContext,
    getUserPostCounts,
  };
};

const LoungeContext = createContext({});

export const LoungeProvider = ({ children }: { children: any }) => (
  <LoungeContext.Provider value={useLoungeController()}>{children}</LoungeContext.Provider>
);

export const useLounge = () => useContext(LoungeContext);
