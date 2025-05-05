'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import ConversationList from './components/ConversationList';
import MessagePanel from './components/MessagePanel';
import MessageEmpty from './components/MessageEmpty';

// Mock data for conversations - will be replaced with API calls later
const fetchConversations = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
        {
            id: 'conv-001',
            type: 'direct', // direct message vs group
            participants: ['member-001', 'member-005'],
            participantNames: ['Michael Chen', 'Brandon Korous'],
            participantAvatars: [null, null],
            lastMessage: {
                id: 'msg-001-003',
                senderId: 'member-005',
                senderName: 'Brandon Korous',
                text: 'Let me know when you have time to discuss the revised structural plans.',
                timestamp: '2025-05-01T14:30:00Z',
                read: true
            },
            unreadCount: 0
        },
        {
            id: 'conv-002',
            type: 'direct',
            participants: ['member-001', 'member-003'],
            participantNames: ['Michael Chen', 'David Smith'],
            participantAvatars: [null, null],
            lastMessage: {
                id: 'msg-002-005',
                senderId: 'member-003',
                senderName: 'David Smith',
                text: 'I submitted the concrete order. Should arrive next Tuesday.',
                timestamp: '2025-05-02T09:15:00Z',
                read: false
            },
            unreadCount: 3
        },
        {
            id: 'conv-003',
            type: 'group',
            name: 'Riverside Project Team',
            participants: ['member-001', 'member-003', 'member-004', 'member-005'],
            participantNames: ['Michael Chen', 'David Smith', 'Jennifer Wilson', 'Brandon Korous'],
            participantAvatars: [null, null, null, null],
            lastMessage: {
                id: 'msg-003-012',
                senderId: 'member-004',
                senderName: 'Jennifer Wilson',
                text: 'Updated HVAC specs attached. Please review by tomorrow.',
                timestamp: '2025-05-02T11:20:00Z',
                read: true,
                hasAttachment: true
            },
            unreadCount: 0
        },
        {
            id: 'conv-004',
            type: 'group',
            name: 'Office Tower Inspection',
            participants: ['member-001', 'member-002', 'member-005'],
            participantNames: ['Michael Chen', 'Sarah Johnson', 'Brandon Korous'],
            participantAvatars: [null, null, null],
            lastMessage: {
                id: 'msg-004-008',
                senderId: 'member-002',
                senderName: 'Sarah Johnson',
                text: 'Inspection scheduled for Friday at 3pm. I need someone from management to be present.',
                timestamp: '2025-05-01T16:45:00Z',
                read: true
            },
            unreadCount: 0
        },
        {
            id: 'conv-005',
            type: 'direct',
            participants: ['member-001', 'member-002'],
            participantNames: ['Michael Chen', 'Sarah Johnson'],
            participantAvatars: [null, null],
            lastMessage: {
                id: 'msg-005-002',
                senderId: 'member-001',
                senderName: 'Michael Chen',
                text: "I'll be there for the inspection. Do we need to prepare any documentation?",
                timestamp: '2025-05-02T08:30:00Z',
                read: false
            },
            unreadCount: 1
        }
    ];
};

// Mock data for messages within a conversation - will be replaced with API calls later
const fetchMessages = async (conversationId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const mockMessages = {
        'conv-001': [
            {
                id: 'msg-001-001',
                senderId: 'member-001',
                senderName: 'Michael Chen',
                text: 'Hi Brandon, I need to discuss the structural plans for Riverside Apartments.',
                timestamp: '2025-05-01T10:15:00Z',
                read: true
            },
            {
                id: 'msg-001-002',
                senderId: 'member-005',
                senderName: 'Brandon Korous',
                text: "Sure, what's the issue?",
                timestamp: '2025-05-01T10:20:00Z',
                read: true
            },
            {
                id: 'msg-001-003',
                senderId: 'member-005',
                senderName: 'Brandon Korous',
                text: 'Let me know when you have time to discuss the revised structural plans.',
                timestamp: '2025-05-01T14:30:00Z',
                read: true
            }
        ],
        'conv-002': [
            {
                id: 'msg-002-001',
                senderId: 'member-001',
                senderName: 'Michael Chen',
                text: 'David, we need to order concrete for the foundation pouring next week.',
                timestamp: '2025-05-01T15:30:00Z',
                read: true
            },
            {
                id: 'msg-002-002',
                senderId: 'member-001',
                senderName: 'Michael Chen',
                text: 'We need about 150 cubic yards. Can you handle this?',
                timestamp: '2025-05-01T15:32:00Z',
                read: true
            },
            {
                id: 'msg-002-003',
                senderId: 'member-003',
                senderName: 'David Smith',
                text: 'Yes, I can place the order. When exactly do we need it delivered?',
                timestamp: '2025-05-02T08:45:00Z',
                read: true
            },
            {
                id: 'msg-002-004',
                senderId: 'member-001',
                senderName: 'Michael Chen',
                text: 'Schedule it for Tuesday morning, around 7 AM.',
                timestamp: '2025-05-02T09:00:00Z',
                read: true
            },
            {
                id: 'msg-002-005',
                senderId: 'member-003',
                senderName: 'David Smith',
                text: 'I submitted the concrete order. Should arrive next Tuesday.',
                timestamp: '2025-05-02T09:15:00Z',
                read: false
            }
        ],
        'conv-003': [
            {
                id: 'msg-003-001',
                senderId: 'member-005',
                senderName: 'Brandon Korous',
                text: 'Welcome to the Riverside Project team channel!',
                timestamp: '2025-04-01T09:00:00Z',
                read: true,
                isSystemMessage: true
            },
            {
                id: 'msg-003-002',
                senderId: 'member-005',
                senderName: 'Brandon Korous',
                text: 'Let&amp;s use this space to coordinate on the Riverside Apartments project.',
                timestamp: '2025-04-01T09:02:00Z',
                read: true
            },
            // More messages would be here...
            {
                id: 'msg-003-011',
                senderId: 'member-001',
                senderName: 'Michael Chen',
                text: 'Jennifer, could you share the updated HVAC plans when ready?',
                timestamp: '2025-05-02T10:50:00Z',
                read: true
            },
            {
                id: 'msg-003-012',
                senderId: 'member-004',
                senderName: 'Jennifer Wilson',
                text: 'Updated HVAC specs attached. Please review by tomorrow.',
                timestamp: '2025-05-02T11:20:00Z',
                read: true,
                hasAttachment: true
            }
        ],
        'conv-004': [
            // Message history for Office Tower Inspection group
            {
                id: 'msg-004-008',
                senderId: 'member-002',
                senderName: 'Sarah Johnson',
                text: 'Inspection scheduled for Friday at 3pm. I need someone from management to be present.',
                timestamp: '2025-05-01T16:45:00Z',
                read: true
            }
        ],
        'conv-005': [
            // Direct message history between Michael and Sarah
            {
                id: 'msg-005-001',
                senderId: 'member-002',
                senderName: 'Sarah Johnson',
                text: 'Michael, can you attend the electrical inspection at Office Tower on Friday?',
                timestamp: '2025-05-02T08:15:00Z',
                read: true
            },
            {
                id: 'msg-005-002',
                senderId: 'member-001',
                senderName: 'Michael Chen',
                text: "I'll be there for the inspection. Do we need to prepare any documentation?",
                timestamp: '2025-05-02T08:30:00Z',
                read: false
            }
        ]
    };

    return mockMessages[conversationId] || [];
};

// Mock function to send a message - will be replaced with API call later
const sendMessage = async (conversationId, message) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    // In a real implementation, this would submit to the API and return the saved message
    return {
        id: `msg-new-${Date.now()}`,
        senderId: 'member-001', // Hardcoded as Michael Chen for now
        senderName: 'Michael Chen',
        text: message,
        timestamp: new Date().toISOString(),
        read: true
    };
};

// Current user ID - would come from auth context in real implementation
const currentUserId = 'member-001'; // Michael Chen

const TeamMessagesPage = () => {
    const router = useRouter();
    const { toast } = useToast();

    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoadingConversations, setIsLoadingConversations] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch conversations on initial load
    useEffect(() => {
        const loadConversations = async () => {
            setIsLoadingConversations(true);
            try {
                const data = await fetchConversations();
                const sortedData = [...data].sort((a, b) => {
                    return new Date(b.lastMessage?.timestamp || 0) - new Date(a.lastMessage?.timestamp || 0);
                });
                setConversations(sortedData);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to load conversations",
                    variant: "destructive",
                });
            } finally {
                setIsLoadingConversations(false);
            }
        };

        loadConversations();
    }, []);

    // Fetch messages when a conversation is selected
    useEffect(() => {
        if (!selectedConversation) return;

        const loadMessages = async () => {
            setIsLoadingMessages(true);
            try {
                const data = await fetchMessages(selectedConversation.id);
                setMessages(data);
                setIsLoadingMessages(false);

                // Mark conversation as read in the UI
                setConversations(prevConversations =>
                    prevConversations.map(conv =>
                        conv.id === selectedConversation.id
                            ? { ...conv, unreadCount: 0 }
                            : conv
                    )
                );
            } catch (error) {
                console.error("Error fetching messages:", error);
                toast({
                    title: "Error",
                    description: "Failed to load messages",
                    variant: "destructive",
                });
                setIsLoadingMessages(false);
            }
        };

        loadMessages();
    }, [selectedConversation, toast]);

    // Handle conversation selection
    const handleSelectConversation = (conversation) => {
        setSelectedConversation(conversation);
    };

    // Handle sending a new message
    const handleSendMessage = async (text) => {
        if (!selectedConversation || !text.trim()) return;

        try {
            // Optimistically add message to UI
            const tempMessage = {
                id: `temp-${Date.now()}`,
                senderId: currentUserId,
                senderName: 'Michael Chen', // Hardcoded for now
                text,
                timestamp: new Date().toISOString(),
                sending: true
            };

            setMessages(prev => [...prev, tempMessage]);

            // Send message to API
            const savedMessage = await sendMessage(selectedConversation.id, text);

            // Update messages with saved message (replacing temp)
            setMessages(prev => prev.map(msg =>
                msg.id === tempMessage.id ? savedMessage : msg
            ));

            // Update conversation list with new last message
            setConversations(prev => prev.map(conv =>
                conv.id === selectedConversation.id
                    ? {
                        ...conv,
                        lastMessage: savedMessage
                    }
                    : conv
            ));
        } catch (error) {
            console.error("Error sending message:", error);
            toast({
                title: "Error",
                description: "Failed to send message",
                variant: "destructive",
            });

            // Remove the temporary message
            setMessages(prev => prev.filter(msg => !msg.sending));
        }
    };

    // Filter conversations based on search term
    const filteredConversations = searchTerm
        ? conversations.filter(conv => {
            const searchLower = searchTerm.toLowerCase();
            // Search in conversation name (for group chats)
            if (conv.name && conv.name.toLowerCase().includes(searchLower)) {
                return true;
            }
            // Search in participant names
            return conv.participantNames.some(name =>
                name.toLowerCase().includes(searchLower)
            );
        })
        : conversations;

    // Create a new conversation - would navigate to a form/dialog in real implementation
    const handleNewConversation = () => {
        toast({
            title: "Coming Soon",
            description: "This feature is under development.",
        });
    };

    return (
        <main className="flex-1 overflow-hidden bg-base-200">
            <div className="flex h-full">
                {/* Conversation list sidebar */}
                <div className="hidden md:flex md:flex-col w-80 border-r border-base-300 bg-base-100">
                    <div className="p-4 border-b border-base-300">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-xl font-bold">Messages</h1>
                            <button
                                onClick={handleNewConversation}
                                className="btn btn-sm btn-primary"
                            >
                                <i className="fas fa-plus mr-1"></i> New
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search messages..."
                                className="input input-bordered w-full pr-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50"></i>
                        </div>
                    </div>

                    <ConversationList
                        conversations={filteredConversations}
                        selectedId={selectedConversation?.id}
                        currentUserId={currentUserId}
                        loading={isLoadingConversations}
                        onSelect={handleSelectConversation}
                    />
                </div>

                {/* Message panel */}
                <div className="flex-1 flex flex-col">
                    {selectedConversation ? (
                        <MessagePanel
                            conversation={selectedConversation}
                            messages={messages}
                            currentUserId={currentUserId}
                            loading={isLoadingMessages}
                            onSendMessage={handleSendMessage}
                            onBack={() => setSelectedConversation(null)}
                        />
                    ) : (
                        <MessageEmpty onNewConversation={handleNewConversation} />
                    )}
                </div>
            </div>
        </main>
    );
};

export default TeamMessagesPage;