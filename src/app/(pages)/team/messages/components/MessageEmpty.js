import React from 'react';

const MessageEmpty = ({ onNewConversation = () => { } }) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-base-100">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-comments text-3xl text-primary"></i>
            </div>

            <h2 className="text-xl font-semibold mb-2">Team Messages</h2>

            <p className="text-base-content/70 max-w-md mb-8">
                Select a conversation from the sidebar or start a new one to communicate with your team members in real-time.
            </p>

            <div className="flex gap-4 flex-col sm:flex-row">
                <button
                    className="btn btn-primary"
                    onClick={onNewConversation}
                >
                    <i className="fas fa-plus mr-2"></i>
                    New Conversation
                </button>

                <button className="btn btn-outline">
                    <i className="fas fa-users mr-2"></i>
                    View Team Directory
                </button>
            </div>

            <div className="mt-12 p-6 bg-base-200 rounded-lg max-w-md">
                <h3 className="font-medium mb-2">Quick Tips</h3>
                <ul className="text-sm text-left text-base-content/70 space-y-2">
                    <li className="flex items-start">
                        <i className="fas fa-check-circle text-success mt-1 mr-2"></i>
                        <span>Send direct messages to individual team members</span>
                    </li>
                    <li className="flex items-start">
                        <i className="fas fa-check-circle text-success mt-1 mr-2"></i>
                        <span>Create group conversations for project teams</span>
                    </li>
                    <li className="flex items-start">
                        <i className="fas fa-check-circle text-success mt-1 mr-2"></i>
                        <span>Share files and photos with your messages</span>
                    </li>
                    <li className="flex items-start">
                        <i className="fas fa-check-circle text-success mt-1 mr-2"></i>
                        <span>Receive notifications for new messages</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MessageEmpty;