'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const InvoiceDetailPage = ({ params }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [invoice, setInvoice] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const [isMarkingPaid, setIsMarkingPaid] = useState(false);

    const getInvoice = useCallback(async () => {
        try {
            // TODO: Implement invoice geting
            await new Promise(resolve => setTimeout(resolve, 1000));
            setInvoice({
                id: params._id,
                number: 'INV-001',
                project: 'Sample Project',
                client: 'Sample Client',
                issueDate: '2024-03-20',
                dueDate: '2024-04-20',
                status: 'draft',
                items: [
                    {
                        description: 'Sample Item',
                        quantity: 1,
                        unitPrice: 100,
                        amount: 100
                    }
                ],
                subtotal: 100,
                taxRate: 10,
                taxAmount: 10,
                total: 110,
                notes: 'Sample notes',
                terms: 'Sample terms'
            });
            setIsLoading(false);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to get invoice',
                variant: 'destructive'
            });
            setIsLoading(false);
        }
    }, [params._id, toast]);

    useEffect(() => {
        getInvoice();
    }, [getInvoice]);

    const handleSendInvoice = async () => {
        setIsSending(true);
        try {
            // TODO: Implement invoice sending
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast({
                title: 'Success',
                description: 'Invoice sent successfully'
            });
            setInvoice(prev => ({ ...prev, status: 'sent' }));
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to send invoice',
                variant: 'destructive'
            });
        }
        setIsSending(false);
    };

    const handleMarkAsPaid = async () => {
        setIsMarkingPaid(true);
        try {
            // TODO: Implement mark as paid
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast({
                title: 'Success',
                description: 'Invoice marked as paid'
            });
            setInvoice(prev => ({ ...prev, status: 'paid' }));
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to mark invoice as paid',
                variant: 'destructive'
            });
        }
        setIsMarkingPaid(false);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this invoice?')) {
            try {
                // TODO: Implement invoice deletion
                await new Promise(resolve => setTimeout(resolve, 1000));
                toast({
                    title: 'Success',
                    description: 'Invoice deleted successfully'
                });
                router.push('/invoicing');
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to delete invoice',
                    variant: 'destructive'
                });
            }
        }
    };

    if (isLoading) {
        return (
            <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
                <div className="flex items-center justify-center h-full">
                    <div className="loading loading-spinner loading-lg"></div>
                </div>
            </main>
        );
    }

    if (!invoice) {
        return (
            <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Invoice Not Found</h1>
                    <p className="text-base-content/70 mb-6">The invoice you&apos;re looking for doesn&apos;t exist or has been deleted.</p>
                    <Link href="/invoicing" className="btn btn-primary">
                        Back to Invoices
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="animate-fadeIn">
                {/* Breadcrumbs */}
                <div className="text-sm breadcrumbs mb-4">
                    <ul>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/invoicing">Invoicing</Link></li>
                        <li className="text-base-content/70">Invoice {invoice.number}</li>
                    </ul>
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Invoice {invoice.number}</h1>
                        <p className="text-base-content/70">
                            {invoice.project} - {invoice.client}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={handleSendInvoice}
                            disabled={isSending || invoice.status !== 'draft'}
                            className="btn btn-primary"
                        >
                            {isSending ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-paper-plane mr-2"></i>
                                    Send Invoice
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleMarkAsPaid}
                            disabled={isMarkingPaid || invoice.status !== 'sent'}
                            className="btn btn-success"
                        >
                            {isMarkingPaid ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-check mr-2"></i>
                                    Mark as Paid
                                </>
                            )}
                        </button>
                        <Link
                            href={`/invoicing/${invoice._id}/edit`}
                            className="btn btn-ghost"
                        >
                            <i className="fas fa-edit mr-2"></i>
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="btn btn-ghost text-error"
                        >
                            <i className="fas fa-trash mr-2"></i>
                            Delete
                        </button>
                    </div>
                </div>

                {/* Invoice Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Status Card */}
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold mb-2">Status</h2>
                                        <span className={`badge ${invoice.status === 'paid' ? 'badge-success' :
                                            invoice.status === 'overdue' ? 'badge-error' :
                                                invoice.status === 'sent' ? 'badge-info' :
                                                    invoice.status === 'draft' ? 'badge-warning' :
                                                        'badge-neutral'
                                            }`}>
                                            {invoice.status}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-base-content/70">Due Date</p>
                                        <p className="font-semibold">{invoice.dueDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="text-lg font-semibold mb-4">Invoice Items</h2>
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Quantity</th>
                                                <th>Unit Price</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoice.items.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.description}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>${item.unitPrice.toFixed(2)}</td>
                                                    <td>${item.amount.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="3" className="text-right font-semibold">Subtotal:</td>
                                                <td>${invoice.subtotal.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" className="text-right font-semibold">Tax ({invoice.taxRate}%):</td>
                                                <td>${invoice.taxAmount.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" className="text-right font-semibold">Total:</td>
                                                <td>${invoice.total.toFixed(2)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Notes and Terms */}
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
                                <div className="space-y-4">
                                    {invoice.notes && (
                                        <div>
                                            <h3 className="font-semibold mb-2">Notes</h3>
                                            <p className="text-base-content/70 whitespace-pre-wrap">{invoice.notes}</p>
                                        </div>
                                    )}
                                    {invoice.terms && (
                                        <div>
                                            <h3 className="font-semibold mb-2">Terms & Conditions</h3>
                                            <p className="text-base-content/70 whitespace-pre-wrap">{invoice.terms}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Client Information */}
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="text-lg font-semibold mb-4">Client Information</h2>
                                <div className="space-y-2">
                                    <p className="font-semibold">{invoice.client}</p>
                                    {/* TODO: Add more client details */}
                                </div>
                            </div>
                        </div>

                        {/* Project Information */}
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="text-lg font-semibold mb-4">Project Information</h2>
                                <div className="space-y-2">
                                    <p className="font-semibold">{invoice.project}</p>
                                    {/* TODO: Add more project details */}
                                </div>
                            </div>
                        </div>

                        {/* Invoice Actions */}
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="text-lg font-semibold mb-4">Actions</h2>
                                <div className="space-y-2">
                                    <button className="btn btn-outline w-full">
                                        <i className="fas fa-download mr-2"></i>
                                        Download PDF
                                    </button>
                                    <button className="btn btn-outline w-full">
                                        <i className="fas fa-print mr-2"></i>
                                        Print
                                    </button>
                                    <button className="btn btn-outline w-full">
                                        <i className="fas fa-copy mr-2"></i>
                                        Duplicate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default InvoiceDetailPage;