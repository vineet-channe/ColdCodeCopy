import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";

const CommunityForum = () => {
  const [selectedCommunity, setSelectedCommunity] = useState('General');
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [commentContents, setCommentContents] = useState({}); // Use an object to manage comment inputs for each post

  const communities = ['General', 'Education', 'Coding', 'Art', 'Science'];
  const user = JSON.parse(localStorage.getItem('user-info'));
  const img = user.image;
  const name = user.name;
  const email = user.email;

  // Fetch the token from localStorage
  const token = localStorage.getItem('token');

  // Fetch posts for the selected community
  useEffect(() => {
    fetchPosts();
  }, [selectedCommunity]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/forum/getpost?community=${selectedCommunity}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Include token if needed
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      // Format posts
      const formattedPosts = data.map(post => ({
        ...post,
        comments: post.comments || [] // Initialize comments as an empty array if undefined
      }));
      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Handler for adding a post
  const handleAddPost = async () => {
    if (postContent.trim()) {
      try {
        const response = await fetch('http://localhost:5000/api/forum/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include token if needed
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
        newPost.comments = newPost.comments || []; // Initialize comments
        setPosts((prevPosts) => [...prevPosts, newPost]); // Append new post to existing posts
        setPostContent(''); // Reset post content input
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  // Handler for adding a comment
  const handleAddComment = async (postId, postIndex) => {
    const commentContent = commentContents[postId]; // Get the specific comment for the post
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
        updatedPosts[postIndex] = updatedPost; // Replace the updated post
        setPosts(updatedPosts);
        setCommentContents((prev) => ({ ...prev, [postId]: '' })); // Reset comment input for the specific post
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  // Handler for deleting a post
  const handleDeletePost = async (postId, index) => {
    try {
      await fetch(`http://localhost:5000/api/forum/post/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const updatedPosts = posts.filter((_, i) => i !== index); // Remove deleted post
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8 mt-16">
        <div className="container mx-auto">
          {/* Community Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Select Community</h1>
            <div className="flex space-x-4">
              {communities.map((community) => (
                <button
                  key={community}
                  onClick={() => setSelectedCommunity(community)}
                  className={`px-4 py-2 rounded-lg ${selectedCommunity === community ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} transition duration-200`}
                >
                  {community}
                </button>
              ))}
            </div>
          </div>

          {/* Forum Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">Community Forum: {selectedCommunity}</h2>
            <div className="mt-4">
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
              <button
                onClick={handleAddPost}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Post
              </button>
            </div>
          </div>

          {/* Posts and Comments */}
          <div>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div key={post._id} className="bg-white p-4 mb-4 rounded-lg shadow">
                  <div className="flex justify-between items-center">
                    <p>{post.content}</p>
                    <button
                      onClick={() => handleDeletePost(post._id, index)}
                      className="text-red-600 hover:text-red-800 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="mt-4">
                    <textarea
                      value={commentContents[post._id] || ''} // Manage individual comment content
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

                  {/* Comments Section */}
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
    </div>
  );
};

export default CommunityForum;
