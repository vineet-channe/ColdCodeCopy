import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Polls from './Polls'; 

const CommunityForum = () => {
  const [selectedCommunity, setSelectedCommunity] = useState('General');
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [commentContents, setCommentContents] = useState({});

  const communities = ['General', 'Education', 'Coding', 'Art', 'Science'];
  const user = JSON.parse(localStorage.getItem('user-info'));
  const img = user.image;
  const name = user.name;
  const email = user.email;

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPosts();
  }, [selectedCommunity]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/forum/getpost?community=${selectedCommunity}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      // Format posts
      const formattedPosts = data.map(post => ({
        ...post,
        comments: post.comments || [] 
      }));
      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleAddPost = async () => {
    if (postContent.trim()) {
      try {
        const response = await fetch('http://localhost:5000/api/forum/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify({
            content: postContent,
            community: selectedCommunity,
            name: name,
            image: img,
            email: email
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create post');
        }

        const newPost = await response.json();
        newPost.comments = newPost.comments || []; 
        setPosts((prevPosts) => [...prevPosts, newPost]);
        setPostContent('');
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const handleAddComment = async (postId, postIndex) => {
    const commentContent = commentContents[postId];
    if (commentContent && commentContent.trim()) {
      try {
        const response = await fetch(`http://localhost:5000/api/forum/post/${postId}/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ content: commentContent })
        });

        const updatedPost = await response.json();
        const updatedPosts = [...posts];
        updatedPosts[postIndex] = updatedPost;
        setPosts(updatedPosts);
        setCommentContents((prev) => ({ ...prev, [postId]: '' })); 
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleDeletePost = async (postId, index) => {
    try {
      await fetch(`http://localhost:5000/api/forum/post/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const updatedPosts = posts.filter((_, i) => i !== index);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8 mt-16">

      <Polls /> 
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Communities</h1>
          <div className="flex space-x-4">
            {communities.map((community) => (
              <button
                key={community}
                onClick={() => setSelectedCommunity(community)}
                className={`px-4 py-2 rounded-lg transition duration-200 ${selectedCommunity === community ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-blue-300'}`}
              >
                {community}
              </button>
            ))}
          </div>
        </div>

        

        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Community Forum: {selectedCommunity}</h2>
          <div className="mt-4">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full h-14 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
            <button
              onClick={handleAddPost}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Post
            </button>
          </div>
        </div>

        <div>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={post._id} className="bg-white p-4 mb-4 rounded-lg shadow-lg transition-transform duration-200 hover:shadow-xl">
                <div className="flex justify-between items-center">
                  <p className="text-gray-800">{post.content}</p>
                  <button
                    onClick={() => handleDeletePost(post._id, index)}
                    className="text-red-600 hover:text-red-800 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
                <div className="mt-4">
                  <textarea
                    value={commentContents[post._id] || ''} 
                    onChange={(e) => setCommentContents((prev) => ({ ...prev, [post._id]: e.target.value }))}
                    placeholder="Write a comment..."
                    className="w-full h-16 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  ></textarea>
                  <button
                    onClick={() => handleAddComment(post._id, index)}
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
                  >
                    Comment
                  </button>
                </div>

                <div className="mt-4">
                  {Array.isArray(post.comments) && post.comments.length > 0 ? (
                    post.comments.map((comment, commentIndex) => (
                      <div key={commentIndex} className="border-t border-gray-200 mt-2 pt-2">
                        <p className="text-sm text-gray-600">{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No comments yet.</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts yet in this community. Be the first to post!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;
