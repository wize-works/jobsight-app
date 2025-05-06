'use client';

import { useRouter } from 'next/navigation';

export default function EquipmentNotFound() {
    const router = useRouter();

    return (
        <div className="container mx-auto p-4">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                    <h2 className="card-title justify-center text-2xl mb-2">Equipment Not Found</h2>
                    <p>The equipment you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <div className="card-actions justify-center mt-4">
                        <button
                            className="btn btn-primary"
                            onClick={() => router.push('/equipment')}
                        >
                            Back to Equipment List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}