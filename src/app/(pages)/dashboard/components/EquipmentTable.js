import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getEquipments } from "@/services/equipment";

const EquipmentTable = ({
    onManageEquipment = () => { },
}) => {
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(false);

    // Updated to get real equipment data from the service
    useEffect(() => {
        const loadEquipment = async () => {
            setLoading(true);
            try {
                const equipmentData = await getEquipments();
                // Ensure equipment is always an array
                setEquipment(Array.isArray(equipmentData) ? equipmentData : []);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to load equipment",
                    variant: "destructive",
                });
                // Set equipment to empty array on error
                setEquipment([]);
            } finally {
                setLoading(false);
            }
        };

        loadEquipment();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 sm:p-4 bg-base-200 rounded-t-lg">
                    <div className="animate-pulse h-5 sm:h-6 bg-muted-foreground/20 w-32 sm:w-40 rounded"></div>
                    <div className="animate-pulse h-7 sm:h-8 bg-muted-foreground/20 w-24 sm:w-32 rounded"></div>
                </div>
                <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Equipment</th>
                                <th>Status</th>
                                <th className="hidden sm:table-cell">Location</th>
                                <th className="hidden md:table-cell">Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(3)].map((_, i) => (
                                <tr key={i}>
                                    <td colSpan="4" className="text-center p-4">
                                        <div className="animate-pulse h-4 bg-muted-foreground/20 w-full rounded"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    const getStatusIndicator = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'available':
                return (
                    <div className="inline-grid *:[grid-area:1/1]">
                        <div className="status status-success animate-ping"></div>
                        <div className="status status-success"></div>
                    </div>
                );
            case 'in use':
                return (
                    <div className="inline-grid *:[grid-area:1/1]">
                        <div className="status status-info animate-ping"></div>
                        <div className="status status-info"></div>
                    </div>
                );
            case 'maintenance':
                return (
                    <div className="inline-grid *:[grid-area:1/1]">
                        <div className="status status-warning animate-ping"></div>
                        <div className="status status-warning"></div>
                    </div>
                );
            case 'repair':
                return (
                    <div className="inline-grid *:[grid-area:1/1]">
                        <div className="status status-error animate-ping"></div>
                        <div className="status status-error"></div>
                    </div>
                );
            default:
                return <span className="flex w-2 h-2 sm:w-3 sm:h-3 bg-muted rounded-full mr-1 sm:mr-2"></span>;
        }
    };

    const getStatusclassName = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'available': return 'text-success';
            case 'in use': return 'text-info';
            case 'maintenance': return 'text-warning';
            case 'repair': return 'text-error';
            default: return 'text-muted-foreground';
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 sm:p-4 bg-base-200 rounded-t-lg">
                <h2 className="text-base sm:text-lg font-semibold">Equipment Status</h2>
                <button className="btn btn-primary btn-sm w-full sm:w-auto" onClick={onManageEquipment}>Manage Equipment</button>
            </div>
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th className="text-left text-xs sm:text-sm font-medium text-muted-foreground">Equipment</th>
                            <th className="text-left text-xs sm:text-sm font-medium text-muted-foreground">Status</th>
                            <th className="text-left text-xs sm:text-sm font-medium text-muted-foreground hidden sm:table-cell">Location</th>
                            <th className="text-left text-xs sm:text-sm font-medium text-muted-foreground hidden md:table-cell">Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipment.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center p-4">
                                    <p className="text-muted-foreground">No equipment found</p>
                                </td>
                            </tr>
                        ) : (
                            equipment.map((item) => (
                                <tr key={item.id} className="hover:bg-base-200 hover:shadow-md transition-colors duration-200">
                                    <td>
                                        <div className="font-medium text-sm sm:text-base">{item.name}</div>
                                        <div className="text-xs text-muted-foreground">{item.id}</div>
                                    </td>
                                    <td>
                                        <div className="">
                                            {getStatusIndicator(item.status)}
                                            <span className={`text-sm sm:text-sm ms-2 `}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-muted-foreground text-xs sm:text-sm hidden sm:table-cell">
                                        {item.location || 'Unknown'}
                                    </td>
                                    <td className="text-muted-foreground text-xs sm:text-sm hidden md:table-cell">
                                        {item.lastUpdated
                                            ? new Date(item.lastUpdated).toLocaleDateString()
                                            : 'Never'
                                        }
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EquipmentTable;