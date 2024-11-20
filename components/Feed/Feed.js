// This is a component that will display the feed of the app. It will display the posts and comments of the users.

// this are the imports for the component
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../Contexts/AuthContext';
import axios from 'axios';


// this is the main component of the file
const Feed = () => {
  // this is the state of the component, it will store the posts and the new post. Every time the state changes the component will re-render.
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ postcontent: '', topic: '' }); 
  const [newComments, setNewComments] = useState({}); // this is the state that will store the new comments of the posts, its {} because it will be an object with the postId as the key and the comment as the value.

  // this is a function that will fetch the posts from the server.
  useEffect(() => {
    fetchPosts();
  }, []);

  // this is the ip address of the server (its need to be changed to the ip address of the local network)
  // La ipv4 de mi casa '***********'
  // La ipv4 de la UCU: '10.4.0.156'
  const ipadress = '10.4.0.156'
  console.log('ipadress:', ipadress)

  // this is a function that will fetch the posts from the server.
  const fetchPosts = async () => {
    try {
      console.log(`http://${ipadress}:3001/api/post/DESC`) 
      const response = await axios.get(`http://${ipadress}:3001/api/post/DESC`); // get the posts from the server.
      setPosts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // this is a function that will handle the submit of a post.
  const handleSubmitPost = async () => {
    const formData = {
      user_id: user.sub,
      postcontent: newPost.postcontent,
      author: user.name,
      topic: newPost.topic,
      created_at: new Date().toISOString()
    };

    try {
      const response = await axios.post(`http://${ipadress}:3001/api/post`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPosts([response.data, ...posts]); // add the new post to the list of posts, and re render the component.
      setNewPost({ postcontent: '', topic: '' }); // clear the input fields.
    } catch (err) {
      console.log(err);
    }
  };


  // this is a function that will handle the add of a comment.
  const handleAddComment = async (postId) => {
    const content = newComments[postId]; // this is the content of the comment. (use [postId] to get the content of the comment of the post with the id postId.)
    if (!content) return;

    const created_at = new Date().toISOString();
    try {
      const response = await axios.post(`http://${ipadress}:3001/api/comments`, { content, author: user.name, created_at, post_id: postId }); // send the comment to the server.
      const updatedPosts = posts.map(post => { // update the posts with the new comment.
        if (post.id === postId) { // if the post id is the same as the postId, then add the comment to the post.
          return {
            ...post,
            comments: [...(post.comments || []), response.data] // add the new comment to the list of comments of the post.
          };
        }
        return post;
      });
      setPosts(updatedPosts); // update the posts, and re render the component.
      setNewComments({...newComments, [postId]: ''});
    } catch (err) {
      console.log(err);
    }
  };

  // this is a function that will handle the vote of a post or a comment.
  const handleVote = async (postId, comment_id, increment) => {
    try {
      if (comment_id) { // if the comment_id is defined, then the vote is for a comment.
        const response = await axios.put(`http://${ipadress}:3001/api/vote/comments/${comment_id}/${increment}`);
        setPosts(response.data);
      } else { // if the postId is defined, then the vote is for a post.
        const response = await axios.put(`http://${ipadress}:3001/api/vote/post/${postId}/${increment}`);
        setPosts(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // this is a function that will render a comment.
  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <TouchableOpacity // this is the vote button of the comment.
        style={styles.commentVoteButton} 
        onPress={() => handleVote(null, item.id, "up")}
      >
        <Feather name="arrow-up" size={20} color="#FF4500" />
      </TouchableOpacity>
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentAuthor}>{user.name}</Text>
          <Text style={styles.commentDate}>
            {new Date(item.created_at).toLocaleString()}
          </Text>
        </View>
        <Text style={styles.commentText}>{item.content}</Text>
        <Text style={styles.voteCount}>{item.votes} votes</Text>
      </View>
      <TouchableOpacity 
        style={styles.commentVoteButton} 
        onPress={() => handleVote(null, item.id, "down")}
      >
        <Feather name="arrow-down" size={20} color="#FF4500" />
      </TouchableOpacity>
    </View>
  );

  // this is a function that will render a post.
  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image 
          source={{ uri: user.picture || 'https://via.placeholder.com/150' }}  // if the user.picture is not defined, then use a placeholder image.
          style={styles.userAvatar} 
        />
        <View style={styles.postHeaderText}>
          <Text style={styles.postAuthor}>{user.name}</Text>
          <Text style={styles.postMeta}>
          #{item.topic}
          </Text>
          <Text style={styles.postMeta}>
            {new Date(item.created_at).toLocaleDateString()} • {new Date(item.created_at).toLocaleTimeString()}
          </Text>
        </View>
      </View>
      <View style={styles.postContentWrapper}>
        <TouchableOpacity 
          style={styles.postVoteButton} 
          onPress={() => handleVote(item.id, null, "up")}
        >
          <Feather name="arrow-up" size={24} color="#FF4500" />
        </TouchableOpacity>
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{item.postcontent}</Text>
          <View style={styles.postStats}>
            <Text style={styles.postStatsText}>{item.votes} votes</Text>
            <Text style={styles.postStatsText}>{item.comments ? item.comments.length : 0} comments</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.postVoteButton} 
          onPress={() => handleVote(item.id, null, "down")}
        >
          <Feather name="arrow-down" size={24} color="#FF4500" />
        </TouchableOpacity>
      </View>
      {item.comments && item.comments.length > 0 && ( // this will render the comments of the post if there are comments.
        <View style={styles.commentsSection}>
          <Text style={styles.commentsSectionTitle}>Comments</Text>
          <FlatList // FlatList is a component that will render a list of items, in this case, the comments of the post.
            data={item.comments} // the data that will be rendered.
            renderItem={renderComment} // the function that will render each item of the list.
            keyExtractor={(comment) => comment.id.toString()} // a function that will return the key of each item of the list.
            style={styles.commentsList} // the style of the list.
          />
        </View>
      )}
      <View style={styles.addCommentContainer}> 
        <TextInput // this is the input field to add a comment.
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={newComments[item.id] || ''}
          onChangeText={(text) => setNewComments({...newComments, [item.id]: text})}
        />
        <TouchableOpacity // this is the button to add a comment.
          style={styles.addCommentButton} 
          onPress={() => handleAddComment(item.id)}
          accessibilityLabel="Post comment"
        >
          <Text style={styles.addCommentButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // And this is the return of the component.
  return (
    <KeyboardAvoidingView 
      behavior={"height"}
      style={styles.container}
    >
      <View style={styles.postForm}>
        <TextInput
          style={styles.input}
          placeholder="que quieres escribir?"
          value={newPost.postcontent}
          onChangeText={(text) => setNewPost({ ...newPost, postcontent: text })}
        />
        <TextInput 
          style={styles.input}
          placeholder="sobre que tema?"
          value={newPost.topic}
          onChangeText={(text) => setNewPost({ ...newPost, topic: text })}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPost}>
          <Text style={styles.submitButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </KeyboardAvoidingView>
  );
};

// this are the style of the component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  postForm: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postContainer: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postHeaderText: {
    flex: 1,
  },
  postAuthor: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1a1a1a',
  },
  postMeta: {
    color: '#888',
    fontSize: 12,
  },
  postContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  postContent: {
    flex: 1,
    padding: 15,
  },
  postTitle: {
    fontSize: 18,
    color: '#1a1a1a',
    lineHeight: 24,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  postStatsText: {
    color: '#888',
    fontSize: 14,
  },
  postVoteButton: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentsSection: {
    backgroundColor: '#f8f9fa',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e1e4e8',
  },
  commentsSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginLeft: 15,
    marginBottom: 10,
  },
  commentsList: {
    paddingHorizontal: 15,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  commentContent: {
    flex: 1,
    marginHorizontal: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  commentAuthor: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1a1a1a',
  },
  commentDate: {
    fontSize: 12,
    color: '#888',
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  commentVoteButton: {
    padding: 5,
  },
  voteCount: {
    fontSize: 12,
    color: '#888',
  },
  addCommentContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: '#f8f9fa',
  },
  addCommentButton: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
  },
  addCommentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Feed;