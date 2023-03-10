import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewConversation = ({ userId, updateConversationList,onConversationClick, fetchConversationHistory}) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [messageBody, setMessageBody] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/messages/${userId}/friends`)
      .then((response) => {
        setFriends(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const handleFriendSelect = (event) => {
    setSelectedFriendId(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessageBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:3000/api/messages/messages/`, {
        fromId: userId,
        toId: Number(selectedFriendId),
        body: messageBody,
      })
      .then((response) => {
        // console.log("newconversation part, what is response :", response.data)
        updateConversationList();
        const friendId = response.data.to_id;
        fetchConversationHistory(friendId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="new-conversation-container">
      <h2 className="new-conversation-header">Start a new conversation With Your Friends</h2>
      <form onSubmit={handleSubmit}>
        <label className="new-conversation-label">
          Select a friend:
          <select className="new-conversation-select" value={selectedFriendId || ''} onChange={handleFriendSelect}>
            <option value="">-- Please select --</option>
            {friends.map((friend) => (
              <option key={friend.id} value={friend.id}>
                {friend.username}
              </option>
            ))}
          </select>
        </label>
        <label className="new-conversation-label">
          Message:
          <textarea className="new-conversation-textarea" value={messageBody} onChange={handleMessageChange}></textarea>
        </label>
        <div className="new-conversation-buttons">
          <button className="new-conversation-button new-conversation-send" type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default NewConversation;