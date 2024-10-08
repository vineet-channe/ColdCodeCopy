const Post = require('../models/communityModel');

exports.fetchPostsByCommunity = async (req, res) => {
    const { community } = req.query; 
  
    try {
      
      const posts = await Post.find({ community });
  
      
      const formattedPosts = posts.map(post => ({
        ...post.toObject(), 
        comments: post.comments || [] 
      }));
  
      
      res.status(200).json(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Server error' }); 
    }
  };

exports.createPost = async (req, res) => {
    try {
        const { name, email, image ,content, community } = req.body;
        console.log(req.body)
        console.log("hi")

        const newPost = new Post({
            content,
            community,
            author: { name, email, image },
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create post.' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (post.author.email !== req.user.email) {
            return res.status(403).json({ error: 'Unauthorized action.' });
        }

        await post.remove();
        res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete post.' });
    }
};

exports.addComment = async (req, res) => {
    try {
        console.log("hi")
        const postId = req.params.id;

        const { content } = req.body;

        const { name, email, image } = req.user;

        const post = await Post.findById(postId);
        post.comments.push({ content, author: { name, email, image } });
        await post.save();

        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add comment.' });
    }
};
