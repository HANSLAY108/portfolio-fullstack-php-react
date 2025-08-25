import React, { useState, useEffect } from 'react';
import { Eye, Trash2, Archive, ArrowUpDown } from 'lucide-react';
import Modal from '../../components/common/Modal';
import toast from 'react-hot-toast';
import { getMessages, deleteMessage, updateMessageStatus } from '../../api/messagesApi';
import { format } from 'date-fns'; // A good library for formatting dates nicely

// Helper function to determine the color of the status badge
const getStatusBadgeColor = (status) => {
  switch (status) {
    case 'New':
      return 'bg-blue-500/20 text-blue-400';
    case 'Read':
      return 'bg-gray-500/20 text-gray-400';
    case 'Archived':
      return 'bg-green-500/20 text-green-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const data = await getMessages();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to fetch messages.");
      setMessages([]); // Set to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    if (message.status === 'New') {
      // Optimistically update the UI first for a snappy feel
      setMessages(prev => prev.map(m => m.id === message.id ? { ...m, status: 'Read' } : m));
      // Then, send the update to the backend
      updateMessageStatus(message.id, 'Read').catch(() => {
        // If the API call fails, revert the change and show an error
        toast.error("Failed to mark message as read.");
        setMessages(prev => prev.map(m => m.id === message.id ? { ...m, status: 'New' } : m));
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message permanently?')) {
      // Keep a copy of the original messages in case we need to revert
      const originalMessages = [...messages];
      // Optimistically remove the message from the UI
      setMessages(prev => prev.filter(m => m.id !== messageId));
      try {
        await deleteMessage(messageId);
        toast.success('Message deleted!');
      } catch (error) {
        toast.error("Failed to delete message. Restoring...");
        // If the API call fails, revert the UI change
        setMessages(originalMessages);
      }
    }
  };

  const handleArchive = async (messageId) => {
    const originalMessages = [...messages];
    setMessages(prev => prev.map(m => m.id === messageId ? { ...m, status: 'Archived' } : m));
    try {
      await updateMessageStatus(messageId, 'Archived');
      toast.success('Message archived!');
    } catch (error) {
      toast.error("Failed to archive message. Restoring...");
      setMessages(originalMessages);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-text-primary">Messages Management</h1>
      </div>

      {/* Incoming Messages List */}
      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-dark-text-primary">Incoming Messages</h2>
        <p className="text-sm text-dark-text-secondary mt-1 mb-6">Review and manage contact form submissions from your portfolio website.</p>
        
        <div className="overflow-x-auto">
          {isLoading ? (
            <p className="text-dark-text-secondary">Loading messages...</p>
          ) : (
            <table className="w-full text-sm text-left text-dark-text-secondary">
              <thead className="text-xs uppercase bg-dark-bg">
                <tr>
                  <th className="px-4 py-3 flex items-center gap-1">Sender <ArrowUpDown size={12} /></th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.length > 0 ? (
                  messages.map(message => (
                    <tr key={message.id} className="border-b border-dark-border hover:bg-dark-bg">
                      <td className="px-4 py-3 text-dark-text-primary font-medium">{message.name}</td>
                      <td className="px-4 py-3">{message.email}</td>
                      <td className="px-4 py-3 max-w-xs truncate">{message.subject}</td>
                      <td className="px-4 py-3">{format(new Date(message.created_at), 'yyyy-MM-dd hh:mm a')}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(message.status)}`}>
                          {message.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-4">
                          <button onClick={() => handleViewMessage(message)} className="hover:text-primary" title="View Message"><Eye size={16} /></button>
                          <button onClick={() => handleDelete(message.id)} className="hover:text-red-500" title="Delete Message"><Trash2 size={16} /></button>
                          {message.status !== 'Archived' && (
                            <button onClick={() => handleArchive(message.id)} className="hover:text-green-500" title="Archive Message"><Archive size={16} /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-8">You have no messages.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal for Viewing Message */}
      {selectedMessage && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedMessage.subject}>
          <div className="text-dark-text-secondary space-y-4">
            <p><strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})</p>
            <p><strong>Date:</strong> {format(new Date(selectedMessage.created_at), 'yyyy-MM-dd hh:mm a')}</p>
            <div className="border-t border-dark-border pt-4 mt-4">
              <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button onClick={() => setIsModalOpen(false)} className="bg-dark-bg border border-dark-border text-dark-text-secondary px-4 py-2 rounded-md hover:border-primary">Close</button>
              <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover">Reply via Email</a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminMessagesPage;