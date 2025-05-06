import { getEquipmentById, getEquipments } from '@/services/equipment';
import EquipmentDetail from './components/EquipmentDetail';
import EquipmentNotFound from './components/EquipmentNotFound';

export default async function EquipmentDetailPage({ params }) {
    const id = params.id;
    let equipment = null;
    let projects = [];

    try {
        // Server-side data fetching
        equipment = await getEquipmentById(id);

        // Get projects for the assignment dropdown
        const projectsData = await getEquipments();
        projects = projectsData?.data || [];
    } catch (error) {
        console.error("Error fetching equipment details:", error);
    }

    // Show not found state if equipment doesn't exist
    if (!equipment) {
        return (
            <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
                <EquipmentNotFound />
            </main>
        );
    }

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <EquipmentDetail equipment={equipment} projects={projects} />
        </main>
    );
}