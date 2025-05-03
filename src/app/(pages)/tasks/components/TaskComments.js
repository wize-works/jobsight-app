import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const TaskComments = ({ taskId, comments: initialComments = [] }) => {
    const { toast } = useToast();
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) {
            return;
        }

        try {
            setIsSubmitting(true);

            // In a real app, you'd call an API to save the comment
            // const response = await addTaskComment(taskId, { content: newComment });

            // For now, we'll simulate the API response
            const mockResponse = {
                id: `comment-${Date.now()}`,
                content: newComment,
                createdAt: new Date().toISOString(),
                createdBy: {
                    id: 'current-user',
                    name: 'Current User',
                }
            };

            setComments([...comments, mockResponse]);
            setNewComment('');

            toast({
                title: 'Comment added',
                description: 'Your comment has been added successfully',
            });
        } catch (error) {
            console.error('Error adding comment:', error);
            toast({
                title: 'Error',
                description: 'Failed to add comment',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Comments & Activity</h3>

                {comments.length === 0 ? (
                    <div className="text-center py-8 text-base-content/50">
                        <i className="fas fa-comments text-3xl mb-2"></i>
                        <p>No comments yet</p>
                    </div>
                ) : (
                    <div className="space-y-4 mb-6">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                                <div className="avatar placeholder flex-shrink-0">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                                        <span>{comment.createdBy?.name?.charAt(0) || '?'}</span>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="bg-base-200 rounded-lg p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium">{comment.createdBy?.name || 'Unknown User'}</span>
                                            <span className="text-xs text-base-content/60">{formatDate(comment.createdAt)}</span>
                                        </div>
                                        <p className="whitespace-pre-wrap">{comment.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add comment form */}
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <textarea
                            className="textarea textarea-bordered h-24 w-full"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={handleCommentChange}
                            disabled={isSubmitting}
                        ></textarea>
                    </div>
                    <div className="mt-3 flex justify-end">
                        <button
                            type="submit"
                            className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                            disabled={!newComment.trim() || isSubmitting}
                        >
                            {isSubmitting ? 'Adding Comment...' : 'Add Comment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskComments;