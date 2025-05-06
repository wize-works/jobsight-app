'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const NewInvoicePage = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({
        projectId: '',
        clientId: '',
        invoiceNumber: '',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        items: [
            {
                description: '',
                quantity: 1,
                unitPrice: 0,
                amount: 0
            }
        ],
        notes: '',
        terms: '',
        taxRate: 0,
        status: 'draft'
    });

    useEffect(() => {
        // TODO: Implement projects and clients geting
        const getData = async () => {
            try {
                // Simulated API calls
                await Promise.all([
                    new Promise(resolve => setTimeout(resolve, 1000)),
                    new Promise(resolve => setTimeout(resolve, 1000))
                ]);
                setProjects([]);
                setClients([]);
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to get data',
                    variant: 'destructive'
                });
            }
        };

        getData();
    }, [toast]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index] = {
            ...newItems[index],
            [field]: value,
            amount: field === 'quantity' || field === 'unitPrice'
                ? (field === 'quantity' ? value : newItems[index].quantity) *
                (field === 'unitPrice' ? value : newItems[index].unitPrice)
                : newItems[index].amount
        };
        setFormData(prev => ({
            ...prev,
            items: newItems
        }));
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [
                ...prev.items,
                {
                    description: '',
                    quantity: 1,
                    unitPrice: 0,
                    amount: 0
                }
            ]
        }));
    };

    const removeItem = (index) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const calculateSubtotal = () => {
        return formData.items.reduce((sum, item) => sum + item.amount, 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * (formData.taxRate / 100);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // TODO: Implement invoice creation
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast({
                title: 'Success',
                description: 'Invoice created successfully'
            });
            router.push('/invoicing');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to create invoice',
                variant: 'destructive'
            });
            setIsLoading(false);
        }
    };

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="animate-fadeIn">
                {/* Breadcrumbs */}
                <div className="text-sm breadcrumbs mb-4">
                    <ul>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/invoicing">Invoicing</Link></li>
                        <li className="text-base-content/70">New Invoice</li>
                    </ul>
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">New Invoice</h1>
                        <p className="text-base-content/70">Create a new invoice for your project.</p>
                    </div>
                </div>

                {/* Invoice Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Project</span>
                                    </label>
                                    <select
                                        name="projectId"
                                        value={formData.projectId}
                                        onChange={handleInputChange}
                                        className="select select-bordered w-full"
                                        required
                                    >
                                        <option value="">Select Project</option>
                                        {projects.map(project => (
                                            <option key={project._id} value={project._id}>
                                                {project.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Client</span>
                                    </label>
                                    <select
                                        name="clientId"
                                        value={formData.clientId}
                                        onChange={handleInputChange}
                                        className="select select-bordered w-full"
                                        required
                                    >
                                        <option value="">Select Client</option>
                                        {clients.map(client => (
                                            <option key={client._id} value={client._id}>
                                                {client.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Invoice Number</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="invoiceNumber"
                                        value={formData.invoiceNumber}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Issue Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="issueDate"
                                        value={formData.issueDate}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Due Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Tax Rate (%)</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="taxRate"
                                        value={formData.taxRate}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Invoice Items</h2>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="btn btn-primary btn-sm"
                                >
                                    <i className="fas fa-plus mr-2"></i> Add Item
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th>Amount</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.items.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={item.description}
                                                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                                        className="input input-bordered w-full"
                                                        required
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                                                        className="input input-bordered w-full"
                                                        min="1"
                                                        required
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={item.unitPrice}
                                                        onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                                                        className="input input-bordered w-full"
                                                        min="0"
                                                        step="0.01"
                                                        required
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={item.amount}
                                                        className="input input-bordered w-full"
                                                        disabled
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(index)}
                                                        className="btn btn-ghost btn-sm text-error"
                                                        disabled={formData.items.length === 1}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3" className="text-right font-semibold">Subtotal:</td>
                                            <td>${calculateSubtotal().toFixed(2)}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" className="text-right font-semibold">Tax ({formData.taxRate}%):</td>
                                            <td>${calculateTax().toFixed(2)}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" className="text-right font-semibold">Total:</td>
                                            <td>${calculateTotal().toFixed(2)}</td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Notes</span>
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        className="textarea textarea-bordered h-24"
                                        placeholder="Add any additional notes..."
                                    ></textarea>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Terms & Conditions</span>
                                    </label>
                                    <textarea
                                        name="terms"
                                        value={formData.terms}
                                        onChange={handleInputChange}
                                        className="textarea textarea-bordered h-24"
                                        placeholder="Add payment terms and conditions..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Link href="/invoicing" className="btn btn-ghost">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Creating...
                                </>
                            ) : (
                                'Create Invoice'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default NewInvoicePage;