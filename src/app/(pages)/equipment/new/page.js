'use client';

import EquipmentForm from '../components/EquipmentForm';

export default function AddEquipmentPage() {
    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">Add New Equipment</h1>
                <p className="text-muted-foreground mt-1">Enter details for the new equipment item</p>
            </div>

            <EquipmentForm />
        </div>
    );
}