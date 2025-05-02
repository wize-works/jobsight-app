const EquipmentTable = ({
    equipment = [],
    onManageEquipment = () => { },
    loading = false
}) => {
    if (loading) {
        return (
            <div className="card h-full">
                <div className="card-header p-5">
                    <div className="flex justify-between items-center">
                        <div className="animate-pulse h-6 bg-muted-foreground/20 w-40 rounded"></div>
                        <div className="animate-pulse h-8 bg-muted-foreground/20 w-32 rounded"></div>
                    </div>
                </div>
                <div className="p-5">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    {[...Array(4)].map((_, i) => (
                                        <th key={i} className="text-left pb-3">
                                            <div className="animate-pulse h-4 bg-muted-foreground/20 w-24 rounded"></div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(3)].map((_, i) => (
                                    <tr key={i} className="border-b">
                                        {[...Array(4)].map((_, j) => (
                                            <td key={j} className="py-3">
                                                <div className="animate-pulse h-4 bg-muted-foreground/20 w-full rounded"></div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    const getStatusIndicator = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'available':
                return <span className="flex w-3 h-3 bg-success rounded-full mr-2"></span>;
            case 'in use':
                return <span className="flex w-3 h-3 bg-primary rounded-full mr-2"></span>;
            case 'maintenance':
                return <span className="flex w-3 h-3 bg-warning rounded-full mr-2"></span>;
            case 'repair':
                return <span className="flex w-3 h-3 bg-error rounded-full mr-2"></span>;
            default:
                return <span className="flex w-3 h-3 bg-muted rounded-full mr-2"></span>;
        }
    };

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'available': return 'text-success';
            case 'in use': return 'text-primary';
            case 'maintenance': return 'text-warning';
            case 'repair': return 'text-error';
            default: return 'text-muted-foreground';
        }
    };

    return (
        <div className="card h-full">
            <div className="card-header p-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Equipment Status</h2>
                    <button onClick={onManageEquipment} className="btn btn-sm btn-outline">Manage Equipment</button>
                </div>
            </div>
            <div className="p-5">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left pb-3 text-sm font-medium text-muted-foreground">Equipment</th>
                                <th className="text-left pb-3 text-sm font-medium text-muted-foreground">Status</th>
                                <th className="text-left pb-3 text-sm font-medium text-muted-foreground">Location</th>
                                <th className="text-left pb-3 text-sm font-medium text-muted-foreground">Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipment.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-4 text-center text-muted-foreground">
                                        No equipment found
                                    </td>
                                </tr>
                            ) : (
                                equipment.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-muted/50">
                                        <td className="py-3">
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-xs text-muted-foreground">{item.id}</div>
                                        </td>
                                        <td className="py-3">
                                            <div className="flex items-center">
                                                {getStatusIndicator(item.status)}
                                                <span className={getStatusClass(item.status)}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-muted-foreground">{item.location || 'Unknown'}</td>
                                        <td className="py-3 text-muted-foreground">
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
        </div>
    );
};

export default EquipmentTable;