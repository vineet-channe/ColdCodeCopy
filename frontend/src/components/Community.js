import React, { useState, useEffect } from 'react';

const CommunityForum = () => {
  const [selectedCommunity, setSelectedCommunity] = useState('General');
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [commentContent, setCommentContent] = useState('');

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
  }, [selectedCommunity, token]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/forum/getpost?community=${selectedCommunity}`);
      const data = await response.json();
      // Ensure each post has a comments array
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
        console.log(postContent);
        const response = await fetch('http://localhost:5000/api/forum/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Add this line to specify JSON format
            'Authorization': `Bearer ${token}` // If you have authorization, include the token here
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
        // Initialize comments as an empty array for the new post
        newPost.comments = newPost.comments || [];
        setPosts([...posts, newPost]);
        setPostContent(''); // Reset post content input
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };
  

  // Handler for adding a comment
  const handleAddComment = async (postId, postIndex) => {
    if (commentContent.trim()) {
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
        setCommentContent('');
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
      const updatedPosts = posts.filter((_, i) => i !== index);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
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
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
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
  );
};

export default CommunityForum;
