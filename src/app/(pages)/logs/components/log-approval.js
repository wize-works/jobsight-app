import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const LogApproval = ({ log, className = '' }) => {
    const { toast } = useToast();
    const [approvalState, setApprovalState] = useState(log.approvalStatus || 'pending');
    const [loading, setLoading] = useState(false);

    const handleApproval = async (newStatus) => {
        try {
            setLoading(true);

            // In a real app, here would be an API call to update the log approval status
            // await updateLogApproval(log.id, newStatus);

            // For demo purposes, we're just updating the local state
            setApprovalState(newStatus);

            toast({
                title: 'Success',
                description: `Log ${newStatus === 'approved' ? 'approved' : 'rejected'}`,
                variant: 'default',
            });
        } catch (error) {
            console.error('Error updating log approval:', error);
            toast({
                title: 'Error',
                description: 'Failed to update log approval status',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const getApprovalStatus = () => {
        switch (approvalState) {
            case 'approved':
                return {
                    label: 'Approved',
                    icon: 'check-circle',
                    color: 'text-success',
                    bgColor: 'bg-success/10',
                    borderColor: 'border-success'
                };
            case 'rejected':
                return {
                    label: 'Rejected',
                    icon: 'times-circle',
                    color: 'text-error',
                    bgColor: 'bg-error/10',
                    borderColor: 'border-error'
                };
            case 'pending':
            default:
                return {
                    label: 'Pending Approval',
                    icon: 'clock',
                    color: 'text-warning',
                    bgColor: 'bg-warning/10',
                    borderColor: 'border-warning'
                };
        }
    };

    const status = getApprovalStatus();

    // Only show approval actions if the log is pending
    const showApprovalActions = approvalState === 'pending';

    return (
        <div className={`bg-base-100 rounded-lg shadow-md p-6 ${className}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Approval Status</h3>
                    <div className={`inline-flex items-center px-4 py-2 rounded-full border ${status.borderColor} ${status.bgColor}`}>
                        <i className={`fas fa-${status.icon} ${status.color} mr-2`}></i>
                        <span className={`font-medium ${status.color}`}>{status.label}</span>
                    </div>
                </div>

                {showApprovalActions && (
                    <div className="flex gap-2">
                        <button
                            className="btn btn-outline btn-success"
                            onClick={() => handleApproval('approved')}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                                <i className="fas fa-check mr-2"></i>
                            )}
                            Approve
                        </button>
                        <button
                            className="btn btn-outline btn-error"
                            onClick={() => handleApproval('rejected')}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                                <i className="fas fa-times mr-2"></i>
                            )}
                            Reject
                        </button>
                    </div>
                )}

                {approvalState === 'approved' && (
                    <div className="text-sm text-base-content/60">
                        Approved by {log.approvedBy || 'Project Manager'} on {formatDate(log.approvedAt || new Date())}
                    </div>
                )}

                {approvalState === 'rejected' && (
                    <div className="text-sm text-base-content/60">
                        Rejected by {log.rejectedBy || 'Project Manager'} on {formatDate(log.rejectedAt || new Date())}
                    </div>
                )}
            </div>

            {log.approvalNotes && (
                <div className="mt-4 p-3 bg-base-200 rounded-lg">
                    <p className="text-sm font-medium">Approval Notes:</p>
                    <p className="text-sm">{log.approvalNotes}</p>
                </div>
            )}
        </div>
    );
};

// Helper function to format dates
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export default LogApproval;