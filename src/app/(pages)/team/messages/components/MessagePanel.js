import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const MessagePanel = ({
    conversation,
    messages = [],
    currentUserId = '',
    loading = false,
    onSendMessage = () => { },
    onBack = () => { }
}) => {
    const [newMessage, setNewMessage] = useState('');
    const messageEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom when new messages are loaded or added
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input when conversation changes
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [conversation]);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Get conversation display name
    const getConversationName = () => {
        if (conversation.type === 'group') return conversation.name;

        // For direct messages, show the name of the other participant
        const otherParticipant = conversation.participantNames.find((_, index) =>
            conversation.participants[index] !== currentUserId
        );

        return otherParticipant || 'Unknown User';
    };

    // Get avatar for a message sender
    const getSenderAvatar = (senderId, senderName) => {
        // Find the participant index
        const participantIndex = conversation.participants.indexOf(senderId);
        let avatar = null;

        if (participantIndex >= 0) {
            avatar = conversation.participantAvatars[participantIndex];
        }

        if (avatar) {
            return (
                <Image
                    src={avatar}
                    alt={senderName}
                    width={32}
                    height={32}
                    className="rounded-full"
                />
            );
        }

        // Create initials avatar
        const initials = senderName
            ? senderName.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2)
            : '??';

        return (
            <div className="w-8 h-8 bg-primary/10 flex items-center justify-center rounded-full">
                <span className="text-primary text-xs font-semibold">{initials}</span>
            </div>
        );
    };

    // Format message timestamp
    const formatMessageTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Format message date for dividers
    const formatMessageDate = (timestamp) => {
        if (!timestamp) return '';

        const date = new Date(timestamp);
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);

        // If today
        if (
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        ) {
            return 'Today';
        }

        // If yesterday
        if (
            date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear()
        ) {
            return 'Yesterday';
        }

        // Otherwise, show full date
        return date.toLocaleDateString([], {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };

    // Check if we need to show date divider between messages
    const shouldShowDateDivider = (message, prevMessage) => {
        if (!prevMessage) return true;

        const messageDate = new Date(message.timestamp);
        const prevMessageDate = new Date(prevMessage.timestamp);

        // Compare year, month, day
        return (
            messageDate.getFullYear() !== prevMessageDate.getFullYear() ||
            messageDate.getMonth() !== prevMessageDate.getMonth() ||
            messageDate.getDate() !== prevMessageDate.getDate()
        );
    };

    // Group consecutive messages from the same sender
    const getGroupedMessages = () => {
        const groups = [];
        let currentGroup = null;

        messages.forEach((message, index) => {
            // Check if we need a date divider
            if (shouldShowDateDivider(message, messages[index - 1])) {
                groups.push({
                    type: 'dateDivider',
                    date: message.timestamp,
                    id: `date-${message._id}`
                });
            }

            // If message is from same sender and within 5 mins, group it
            if (
                currentGroup &&
                currentGroup.senderId === message.senderId &&
                !message.isSystemMessage &&
                Math.abs(
                    new Date(message.timestamp) -
                    new Date(messages[index - 1].timestamp)
                ) < 5 * 60 * 1000 // 5 minutes
            ) {
                currentGroup.messages.push(message);
            } else {
                // Start new group
                currentGroup = {
                    type: 'messageGroup',
                    id: `group-${message._id}`,
                    senderId: message.senderId,
                    senderName: message.senderName,
                    isSystemMessage: message.isSystemMessage,
                    messages: [message]
                };
                groups.push(currentGroup);
            }
        });

        return groups;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(newMessage.trim());
            setNewMessage('');
        }
    };

    // Handle sending when pressing Enter (but not with Shift)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const renderMessageGroup = (group) => {
        if (group.type === 'dateDivider') {
            return (
                <div key={group._id} className="flex justify-center my-4">
                    <div className="bg-base-300 text-base-content/60 px-3 py-1 text-xs rounded-full">
                        {formatMessageDate(group.date)}
                    </div>
                </div>
            );
        }

        const isCurrentUser = group.senderId === currentUserId;

        // Display system messages differently
        if (group.isSystemMessage) {
            return (
                <div key={group._id} className="flex justify-center my-3">
                    <div className="bg-base-300/50 text-base-content/70 px-3 py-1 text-xs rounded-full">
                        {group.messages[0].text}
                    </div>
                </div>
            );
        }

        return (
            <div
                key={group._id}
                className={`flex mb-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
                {!isCurrentUser && (
                    <div className="mr-2 pt-1">
                        {getSenderAvatar(group.senderId, group.senderName)}
                    </div>
                )}

                <div className={`max-w-[75%] flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                    {!isCurrentUser && (
                        <div className="text-xs text-base-content/70 mb-1 pl-1">{group.senderName}</div>
                    )}

                    <div className="flex flex-col">
                        {group.messages.map((message, i) => (
                            <div
                                key={message._id}
                                className={`
                  rounded-lg py-2 px-3 my-0.5
                  ${isCurrentUser
                                        ? 'bg-primary/20 text-base-content'
                                        : 'bg-base-300 text-base-content'
                                    }
                  ${message.sending ? 'opacity-70' : ''}
                `}
                            >
                                {message.text}
                                {message.hasAttachment && (
                                    <div className="mt-1 flex items-center text-primary text-sm">
                                        <i className="fas fa-paperclip mr-1"></i>
                                        <span>Attachment</span>
                                    </div>
                                )}
                                <div className={`text-xs mt-1 text-base-content/50 text-right`}>
                                    {formatMessageTime(message.timestamp)}
                                    {message.sending && (
                                        <i className="fas fa-clock ml-1"></i>
                                    )}
                                    {message.read && isCurrentUser && !message.sending && (
                                        <i className="fas fa-check ml-1"></i>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Render the participants for a group conversation
    const renderGroupParticipants = () => {
        if (conversation.type !== 'group') return null;

        return (
            <div className="text-xs text-base-content/60 px-4">
                {conversation.participantNames.join(', ')}
            </div>
        );
    };

    const messagePanelName = getConversationName();
    const groupedMessages = getGroupedMessages();

    return (
        <>
            {/* Mobile header for conversation */}
            <div className="md:hidden flex items-center p-3 border-b border-base-300 bg-base-200">
                <button onClick={onBack} className="btn btn-ghost btn-sm mr-2">
                    <i className="fas fa-arrow-left"></i>
                </button>
                <div className="flex-1">
                    <div className="font-medium">{messagePanelName}</div>
                </div>
            </div>

            {/* Desktop header for conversation */}
            <div className="hidden md:flex items-center p-3 border-b border-base-300 bg-base-100">
                <div className="flex-1">
                    <div className="font-medium">{messagePanelName}</div>
                    {renderGroupParticipants()}
                </div>
            </div>

            {/* Message list */}
            <div className="flex-1 overflow-y-auto p-4 bg-base-100">
                {loading ? (
                    <div className="flex flex-col space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                {i % 2 === 0 && (
                                    <div className="h-8 w-8 bg-base-300 rounded-full mr-2"></div>
                                )}
                                <div className="animate-pulse">
                                    <div className={`h-16 ${i % 2 === 0 ? 'w-48 bg-base-300' : 'w-32 bg-primary/20'} rounded-lg`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-base-content/60">
                                <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mb-4">
                                    <i className="fas fa-comments text-3xl"></i>
                                </div>
                                <p className="text-lg">No messages yet</p>
                                <p className="text-sm">Start the conversation by sending a message below</p>
                            </div>
                        ) : (
                            <>
                                {groupedMessages.map(renderMessageGroup)}
                                <div ref={messageEndRef} />
                            </>
                        )}
                    </>
                )}
            </div>

            {/* Message input */}
            <div className="p-3 border-t border-base-300 bg-base-100">
                <form onSubmit={handleSubmit} className="flex items-end">
                    <textarea
                        ref={inputRef}
                        className="input input-bordered flex-1 resize-none h-12 py-2 min-h-12"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                    />
                    <button type="button" className="btn btn-ghost ml-1 h-12 w-12">
                        <i className="fas fa-paperclip"></i>
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary ml-1 h-12 w-12"
                        disabled={!newMessage.trim()}
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </>
    );
};

export default MessagePanel;