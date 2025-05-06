import React from 'react';
import Image from 'next/image';

const ConversationList = ({
    conversations = [],
    selectedId = null,
    currentUserId = '',
    loading = false,
    onSelect = () => { }
}) => {
    // Format the last message timestamp
    const formatLastMessageTime = (timestamp) => {
        if (!timestamp) return '';

        const date = new Date(timestamp);
        const now = new Date();

        // If the message is from today, show the time
        if (
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        ) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        // If the message is from yesterday
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        if (
            date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear()
        ) {
            return 'Yesterday';
        }

        // If the message is from this week, show the day name
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        if (date > weekAgo) {
            return date.toLocaleDateString([], { weekday: 'short' });
        }

        // For older messages, show the date
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    // Get conversation display name
    const getConversationName = (conversation) => {
        if (conversation.type === 'group') return conversation.name;

        // For direct messages, show the name of the other participant
        const otherParticipant = conversation.participantNames.find((_, index) =>
            conversation.participants[index] !== currentUserId
        );

        return otherParticipant || 'Unknown User';
    };

    // Get avatar for the conversation
    const getConversationAvatar = (conversation) => {
        if (conversation.type === 'group') {
            return (
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-full">
                    <i className="fas fa-users text-primary"></i>
                </div>
            );
        }

        // Find the other user's avatar in a direct message
        const otherParticipantIndex = conversation.participants.findIndex(id => id !== currentUserId);
        const avatar = conversation.participantAvatars[otherParticipantIndex];
        const name = conversation.participantNames[otherParticipantIndex];

        if (avatar) {
            return (
                <Image
                    src={avatar}
                    alt={name}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            );
        }

        // Create initials avatar
        const initials = name
            ? name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2)
            : '??';

        return (
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-full">
                <span className="text-primary font-semibold">{initials}</span>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex-1 overflow-y-auto p-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="p-2 flex items-center animate-pulse">
                        <div className="w-10 h-10 bg-base-300 rounded-full mr-3"></div>
                        <div className="flex-1">
                            <div className="h-4 bg-base-300 rounded w-24 mb-2"></div>
                            <div className="h-3 bg-base-300 rounded w-40"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (conversations.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center text-base-content/60">
                <div className="text-center p-4">
                    <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-comments text-2xl opacity-50"></i>
                    </div>
                    <p>No conversations yet</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto">
            {conversations.map(conversation => {
                const isSelected = conversation._id === selectedId;
                const displayName = getConversationName(conversation);
                const avatar = getConversationAvatar(conversation);
                const lastMessage = conversation.lastMessage;

                return (
                    <div
                        key={conversation._id}
                        className={`cursor-pointer p-3 flex items-start ${isSelected ? 'bg-primary/10 dark:bg-primary/20' : 'hover:bg-base-200'
                            }`}
                        onClick={() => onSelect(conversation)}
                    >
                        <div className="mr-3 relative">
                            {avatar}
                            {conversation.unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-error text-error-content text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                                </span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                                <div className="font-medium truncate">{displayName}</div>
                                {lastMessage && (
                                    <div className="text-xs text-base-content/60">
                                        {formatLastMessageTime(lastMessage.timestamp)}
                                    </div>
                                )}
                            </div>
                            {lastMessage && (
                                <div className="text-sm truncate text-base-content/70">
                                    {lastMessage.senderId === currentUserId ? 'You: ' : ''}
                                    {lastMessage.hasAttachment && (
                                        <i className="fas fa-paperclip mr-1 opacity-70"></i>
                                    )}
                                    {lastMessage.text}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ConversationList;