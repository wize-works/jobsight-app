'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const InvoicingPage = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [invoices, setInvoices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'draft', label: 'Draft' },
        { value: 'sent', label: 'Sent' },
        { value: 'paid', label: 'Paid' },
        { value: 'overdue', label: 'Overdue' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    const dateOptions = [
        { value: 'all', label: 'All Time' },
        { value: 'today', label: 'Today' },
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' },
        { value: 'quarter', label: 'This Quarter' },
        { value: 'year', label: 'This Year' }
    ];

    const getInvoices = useCallback(async () => {
        try {
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setInvoices([]);
            setIsLoading(false);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to get invoices',
                variant: 'destructive'
            });
            setIsLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        // TODO: Implement invoice geting
        getInvoices();
    }, [getInvoices]);

    const handleCreateInvoice = () => {
        router.push('/invoicing/new');
    };

    const handleDeleteInvoice = async (id) => {
        if (window.confirm('Are you sure you want to delete this invoice?')) {
            try {
                // TODO: Implement invoice deletion
                toast({
                    title: 'Success',
                    description: 'Invoice deleted successfully'
                });
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to delete invoice',
                    variant: 'destructive'
                });
            }
        }
    };

    const filteredInvoices = invoices.filter(invoice => {
        const matchesSearch = invoice.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.client?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
        // TODO: Implement date filtering
        return matchesSearch && matchesStatus;
    });

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="animate-fadeIn">
                {/* Breadcrumbs */}
                <div className="text-sm breadcrumbs mb-4">
                    <ul>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li className="text-base-content/70">Invoicing</li>
                    </ul>
                </div>

                {/* Header with Action Button */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Invoices</h1>
                        <p className="text-base-content/70">Manage and track all your project invoices.</p>
                    </div>
                    <div>
                        <button onClick={handleCreateInvoice} className="btn btn-primary">
                            <i className="fas fa-plus mr-2"></i> New Invoice
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="card bg-base-100 shadow-md mb-6">
                    <div className="card-body">
                        <h2 className="text-lg font-semibold mb-4">Filters</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="form-control w-full">
                                <label className="input">
                                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2.5"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <path d="m21 21-4.3-4.3"></path>
                                        </g>
                                    </svg>
                                    <input
                                        type="search"
                                        required
                                        placeholder="Search invoices..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </label>
                            </div>

                            <div className="form-control w-full">
                                <select
                                    className="select select-bordered w-full"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control w-full">
                                <select
                                    className="select select-bordered w-full"
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                >
                                    {dateOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Invoices Table */}
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body p-0">
                        {isLoading ? (
                            <div className="p-8 flex flex-col items-center justify-center">
                                <div className="loading loading-spinner loading-lg mb-4"></div>
                                <p className="text-base-content/70">Loading invoices...</p>
                            </div>
                        ) : filteredInvoices.length === 0 ? (
                            <div className="p-8 text-center">
                                <div className="mx-auto w-16 h-16 bg-base-200 flex items-center justify-center rounded-full mb-4">
                                    <i className="fas fa-file-invoice text-2xl text-base-content/50"></i>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">No Invoices Found</h3>
                                <p className="text-base-content/60 mb-6 max-w-md mx-auto">
                                    {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                                        ? "No invoices match your current filters. Try adjusting your search criteria."
                                        : "There are no invoices yet. Start by creating a new invoice."}
                                </p>
                                <button onClick={handleCreateInvoice} className="btn btn-primary">
                                    Create New Invoice
                                </button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th>Invoice #</th>
                                            <th>Client</th>
                                            <th>Date</th>
                                            <th>Due Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredInvoices.map((invoice) => (
                                            <tr key={invoice._id}>
                                                <td>{invoice.number}</td>
                                                <td>{invoice.client}</td>
                                                <td>{invoice.date}</td>
                                                <td>{invoice.dueDate}</td>
                                                <td>${invoice.amount}</td>
                                                <td>
                                                    <span className={`badge ${invoice.status === 'paid' ? 'badge-success' :
                                                        invoice.status === 'overdue' ? 'badge-error' :
                                                            invoice.status === 'sent' ? 'badge-info' :
                                                                invoice.status === 'draft' ? 'badge-warning' :
                                                                    'badge-neutral'
                                                        }`}>
                                                        {invoice.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <button
                                                            className="btn btn-ghost btn-sm"
                                                            onClick={() => router.push(`/invoicing/${invoice._id}`)}
                                                        >
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-ghost btn-sm"
                                                            onClick={() => router.push(`/invoicing/${invoice._id}/edit`)}
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-ghost btn-sm text-error"
                                                            onClick={() => handleDeleteInvoice(invoice._id)}
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default InvoicingPage;