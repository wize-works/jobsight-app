'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchEquipmentById } from '@/app/services/equipment';
import { useToast } from '@/hooks/use-toast';
import EquipmentForm from '../../components/EquipmentForm';

export default function EditEquipmentPage({ params }) {
    const router = useRouter();
    const { toast } = useToast();
    const [equipment, setEquipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = params;

    useEffect(() => {
        const loadEquipment = async () => {
            try {
                setLoading(true);
                const data = await fetchEquipmentById(id);
                setEquipment(data);
            } catch (error) {
                toast({
                    title: 'Error loading equipment',
                    description: error.message || 'Could not load equipment details for editing',
                    variant: 'destructive',
                });
                router.push('/equipment');
            } finally {
                setLoading(false);
            }
        };

        loadEquipment();
    }, [id, router, toast]);

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center p-8">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-2 text-muted-foreground">Loading equipment data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">Edit Equipment</h1>
                <p className="text-muted-foreground mt-1">
                    Update details for {equipment?.name || 'equipment'}
                </p>
            </div>

            {equipment && <EquipmentForm equipment={equipment} isEditing={true} />}
        </div>
    );
}