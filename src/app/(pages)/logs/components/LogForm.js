'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProjects } from '@/services/project';
import { useToast } from '@/hooks/use-toast';
import status from 'daisyui/components/status';

const LogForm = ({ log, onSubmit, isEdit = false }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [projects, setProjects] = useState([]);
    const [personnel, setPersonnel] = useState([{ name: '', role: '', hours: '' }]);
    const [equipment, setEquipment] = useState([{ name: '', hours: '', notes: '' }]);
    const [materials, setMaterials] = useState([{ name: '', quantity: '', status: 'Used' }]);
    const [tasks, setTasks] = useState([{ description: '', status: 'completed' }]);
    const [safetyIncidents, setSafetyIncidents] = useState([]);
    const [qualityIssues, setQualityIssues] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [attachments, setAttachments] = useState([]);

    const [formData, setFormData] = useState({
        projectId: '',
        date: new Date().toISOString().split('T')[0],
        submittedBy: '',
        summary: '',
        details: '',
        hours: {
            regular: '',
            overtime: ''
        },
        aiTranscription: '',
        weather: {
            temperature: '',
            conditions: '',
            windSpeed: ''
        },
        personnel: [],
        equipment: [],
        materials: [],
        safetyIncidents: [],
        qualityIssues: [],
    });

    // Load projects for the dropdown
    useEffect(() => {
        const loadProjects = async () => {
            try {
                const filterOptions = {
                    filter: {
                        status: {
                            in: ["in_progress", "completed"]
                        }
                    }
                };

                const projectsData = await getProjects(filterOptions);
                setProjects(projectsData.data);

                // If creating a new log and there are projects, pre-select the first one
                if (!isEdit && projectsData.length > 0 && !formData.projectId) {
                    setFormData(prev => ({
                        ...prev,
                        projectId: projectsData[0]._id,
                        projectName: projectsData[0].name
                    }));
                }
            } catch (error) {
                console.error('Error loading projects:', error);
            }
        };

        loadProjects();
    }, [isEdit, formData.projectId]);

    // If editing an existing log, populate the form
    useEffect(() => {
        if (isEdit && log) {
            setFormData({
                projectId: log.projectId || '',
                projectName: log.projectName || '',
                date: log.date ? new Date(log.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                author: log.author || '',
                weather: {
                    temperature: log.weather?.temperature || '',
                    conditions: log.weather?.conditions || '',
                    windSpeed: log.weather?.windSpeed || ''
                },
                summary: log.summary || '',
                details: log.details || '',
                hours: {
                    regular: log.hours?.regular || '',
                    overtime: log.hours?.overtime || ''
                }
            });

            // Initialize arrays with log data or empty arrays
            setPersonnel(log.personnel?.length > 0 ? log.personnel : [{ name: '', role: '', hours: '' }]);
            setEquipment(log.equipment?.length > 0 ? log.equipment : [{ name: '', hours: '', notes: '' }]);
            setMaterials(log.materials?.length > 0 ? log.materials : [{ name: '', quantity: '', status: 'Used' }]);
            setTasks(log.tasks?.length > 0 ? log.tasks : [{ description: '', status: 'completed' }]);
            setSafetyIncidents(log.safetyIncidents || []);
            setQualityIssues(log.qualityIssues || []);
            setPhotos(log.photos || []);
            setAttachments(log.attachments || []);
        }
    }, [isEdit, log]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle nested properties
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // If project selection changes, update projectName too
        if (name === 'projectId') {
            const selectedProject = projects.find(p => p._id === value);
            if (selectedProject) {
                setFormData(prev => ({
                    ...prev,
                    projectId: value,
                    projectName: selectedProject.name
                }));
            }
        }
    };

    // Handle array item changes
    const handleArrayChange = (index, field, key, value, setter) => {
        setter(prev => {
            const updatedItems = [...prev];
            updatedItems[index] = {
                ...updatedItems[index],
                [key]: value
            };
            return updatedItems;
        });
    };

    // Add new item to an array
    const handleAddItem = (defaultItem, setter) => {
        setter(prev => [...prev, defaultItem]);
    };

    // Remove item from array
    const handleRemoveItem = (index, setter) => {
        setter(prev => prev.filter((_, i) => i !== index));
    };

    // Add safety incident
    const handleAddSafetyIncident = () => {
        setSafetyIncidents(prev => [
            ...prev,
            { description: '', severity: 'low', actionTaken: '' }
        ]);
    };

    // Add quality issue
    const handleAddQualityIssue = () => {
        setQualityIssues(prev => [
            ...prev,
            { description: '', severity: 'low', resolution: '' }
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.projectId) {
            toast({
                title: "Validation Error",
                description: "Please select a project",
                variant: "destructive",
            });
            return;
        }

        if (!formData.date) {
            toast({
                title: "Validation Error",
                description: "Date is required",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare log data
            const logData = {
                projectId: formData.projectId,
                date: formData.date,
                summary: formData.summary,
                details: formData.details,
                hours: formData.hours,
                // personnel,
                // equipment,
                // materials,
                // //tasks,
                safetyIncidents,
                qualityIssues,
                //photos,
                //attachments,
                //approvals: log?.approvals || { requested: false, approved: false }
            };

            await onSubmit(logData);

            toast({
                title: `Log ${isEdit ? 'Updated' : 'Created'}`,
                description: `The log has been successfully ${isEdit ? 'updated' : 'created'}.`,
                variant: "success",
            });

            router.push('/logs');
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit log",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    // Weather condition options
    const weatherConditions = [
        'Clear',
        'Sunny',
        'Partly Cloudy',
        'Cloudy',
        'Overcast',
        'Light Rain',
        'Rain',
        'Heavy Rain',
        'Thunderstorm',
        'Snow',
        'Fog',
        'Windy'
    ];

    // Material status options
    const materialStatuses = ['Used', 'Delivered', 'Ordered', 'Pending', 'Returned', 'Damaged'];

    // Task status options
    const taskStatuses = ['completed', 'in_progress', 'pending', 'delayed', 'cancelled'];

    // Severity options
    const severityOptions = ['low', 'medium', 'high'];

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="">
                {/* Project & Date Selection */}
                <div className='bg-base-100 rounded-lg shadow-lg p-4 sm:p-6 space-y-6'>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Project*</span>
                            </label>
                            <select
                                name="projectId"
                                value={formData.projectId}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                                required
                            >
                                {projects.length === 0 ? (
                                    <option value="">Loading projects...</option>
                                ) : (
                                    <>
                                        <option value="">Select a project</option>
                                        {projects.map(project => (
                                            <option key={project._id} value={project._id}>
                                                {project.name}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Date*</span>
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                max={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>
                    </div>
                    {/* Author & Weather */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Weather Condition</span>
                            </label>
                            <select
                                name="weather.conditions"
                                value={formData.weather.conditions}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select condition</option>
                                {weatherConditions.map(condition => (
                                    <option key={condition} value={condition}>
                                        {condition}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Temperature (°F)</span>
                            </label>
                            <input
                                type="number"
                                name="weather.temperature"
                                value={formData.weather.temperature}
                                onChange={handleChange}
                                placeholder="e.g., 72"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Wind Speed</span>
                            </label>
                            <input
                                type="text"
                                name="weather.windSpeed"
                                value={formData.weather.windSpeed}
                                onChange={handleChange}
                                placeholder="e.g., 5 mph"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Regular Hours</span>
                            </label>
                            <input
                                type="number"
                                name="hours.regular"
                                value={formData.hours.regular}
                                onChange={handleChange}
                                placeholder="0"
                                className="input input-bordered w-full"
                                min="0"
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Overtime Hours</span>
                            </label>
                            <input
                                type="number"
                                name="hours.overtime"
                                value={formData.hours.overtime}
                                onChange={handleChange}
                                placeholder="0"
                                className="input input-bordered w-full"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Summary & Details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Summary*</span>
                        </label>
                        <input
                            type="text"
                            name="summary"
                            value={formData.summary}
                            onChange={handleChange}
                            placeholder="Brief summary of today's activities"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Details</span>
                        </label>
                        <textarea
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            placeholder="Detailed description of work performed"
                            className="textarea textarea-bordered h-24"
                        />
                    </div>
                </div>

                {/* Personnel */}
                <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-6'>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Personnel</h3>
                        <div className="card bg-base-100 p-4">
                            {personnel.map((person, index) => (
                                <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 p-3 bg-base-100 rounded-lg">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={person.name}
                                            onChange={(e) => handleArrayChange(index, 'personnel', 'name', e.target.value, setPersonnel)}
                                            placeholder="Worker name"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Role</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={person.role}
                                            onChange={(e) => handleArrayChange(index, 'personnel', 'role', e.target.value, setPersonnel)}
                                            placeholder="Job role"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Hours</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveItem(index, setPersonnel)}
                                                className="btn btn-ghost btn-xs text-error"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </label>
                                        <input
                                            type="number"
                                            value={person.hours}
                                            onChange={(e) => handleArrayChange(index, 'personnel', 'hours', e.target.value, setPersonnel)}
                                            placeholder="0"
                                            className="input input-bordered w-full"
                                            min="0"
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddItem({ name: '', role: '', hours: '' }, setPersonnel)}
                                className="btn btn-outline btn-sm mt-2"
                            >
                                <i className="fas fa-plus mr-2"></i> Add Person
                            </button>
                        </div>
                    </div>

                    {/* Equipment */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Equipment</h3>
                        <div className="card bg-base-100 p-4">
                            {equipment.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 p-3 bg-base-100 rounded-lg">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => handleArrayChange(index, 'equipment', 'name', e.target.value, setEquipment)}
                                            placeholder="Equipment name"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Hours Used</span>
                                        </label>
                                        <input
                                            type="number"
                                            value={item.hours}
                                            onChange={(e) => handleArrayChange(index, 'equipment', 'hours', e.target.value, setEquipment)}
                                            placeholder="0"
                                            className="input input-bordered w-full"
                                            min="0"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Notes</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveItem(index, setEquipment)}
                                                className="btn btn-ghost btn-xs text-error"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </label>
                                        <input
                                            type="text"
                                            value={item.notes}
                                            onChange={(e) => handleArrayChange(index, 'equipment', 'notes', e.target.value, setEquipment)}
                                            placeholder="Usage notes"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddItem({ name: '', hours: '', notes: '' }, setEquipment)}
                                className="btn btn-outline btn-sm mt-2"
                            >
                                <i className="fas fa-plus mr-2"></i> Add Equipment
                            </button>
                        </div>
                    </div>
                    {/* Materials */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Materials</h3>
                        <div className="card bg-base-100 p-4">
                            {materials.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 p-3 bg-base-100 rounded-lg">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => handleArrayChange(index, 'materials', 'name', e.target.value, setMaterials)}
                                            placeholder="Material name"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Quantity</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={item.quantity}
                                            onChange={(e) => handleArrayChange(index, 'materials', 'quantity', e.target.value, setMaterials)}
                                            placeholder="e.g., 10 yards"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Status</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveItem(index, setMaterials)}
                                                className="btn btn-ghost btn-xs text-error"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </label>
                                        <select
                                            value={item.status}
                                            onChange={(e) => handleArrayChange(index, 'materials', 'status', e.target.value, setMaterials)}
                                            className="select select-bordered w-full"
                                        >
                                            {materialStatuses.map(status => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddItem({ name: '', quantity: '', status: 'Used' }, setMaterials)}
                                className="btn btn-outline btn-sm mt-2"
                            >
                                <i className="fas fa-plus mr-2"></i> Add Material
                            </button>
                        </div>
                    </div>

                    {/* Tasks */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Tasks</h3>
                        <div className="card bg-base-100 p-4">
                            {tasks.map((task, index) => (
                                <div key={index} className="flex flex-col sm:flex-row gap-4 mb-4 p-3 bg-base-100 rounded-lg">
                                    <div className="form-control flex-1">
                                        <label className="label">
                                            <span className="label-text">Description</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={task.description}
                                            onChange={(e) => handleArrayChange(index, 'tasks', 'description', e.target.value, setTasks)}
                                            placeholder="Task description"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="form-control min-w-[200px]">
                                        <label className="label">
                                            <span className="label-text">Status</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveItem(index, setTasks)}
                                                className="btn btn-ghost btn-xs text-error"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </label>
                                        <select
                                            value={task.status}
                                            onChange={(e) => handleArrayChange(index, 'tasks', 'status', e.target.value, setTasks)}
                                            className="select select-bordered w-full"
                                        >
                                            {taskStatuses.map(status => (
                                                <option key={status} value={status}>
                                                    {status.replace(/_/g, ' ')}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddItem({ description: '', status: 'completed' }, setTasks)}
                                className="btn btn-outline btn-sm mt-2"
                            >
                                <i className="fas fa-plus mr-2"></i> Add Task
                            </button>
                        </div>
                    </div>
                </div>

                {/* Safety Incidents */}
                <div className="grid grid-cols-3 gap-6 mt-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Safety Incidents</h3>
                        <p className="text-sm mb-4">Report any safety incidents that occurred during work.</p>
                        <div className="card bg-base-100 p-4">

                            {safetyIncidents.length === 0 ? (
                                <div className="alert mb-4">
                                    <i className="fas fa-info-circle"></i>
                                    <span>No safety incidents reported.</span>
                                </div>
                            ) : (
                                safetyIncidents.map((incident, index) => (
                                    <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 p-3 bg-base-100 rounded-lg border-l-4 border-warning">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Description</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={incident.description}
                                                onChange={(e) => handleArrayChange(index, 'safetyIncidents', 'description', e.target.value, setSafetyIncidents)}
                                                placeholder="Incident description"
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Severity</span>
                                            </label>
                                            <select
                                                value={incident.severity}
                                                onChange={(e) => handleArrayChange(index, 'safetyIncidents', 'severity', e.target.value, setSafetyIncidents)}
                                                className="select select-bordered w-full"
                                            >
                                                {severityOptions.map(severity => (
                                                    <option key={severity} value={severity}>
                                                        {severity}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Action Taken</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveItem(index, setSafetyIncidents)}
                                                    className="btn btn-ghost btn-xs text-error"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </label>
                                            <input
                                                type="text"
                                                value={incident.actionTaken}
                                                onChange={(e) => handleArrayChange(index, 'safetyIncidents', 'actionTaken', e.target.value, setSafetyIncidents)}
                                                placeholder="Action taken"
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                    </div>
                                ))
                            )}

                            <button
                                type="button"
                                onClick={handleAddSafetyIncident}
                                className="btn btn-outline btn-warning btn-sm mt-2"
                            >
                                <i className="fas fa-plus mr-2"></i> Add Safety Incident
                            </button>
                        </div>
                    </div>

                    {/* Quality Issues */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Quality Issues</h3>
                        <p className="text-sm mb-4">Report any quality or workmanship issues identified.</p>

                        <div className='card bg-base-100 p-4'>
                            {qualityIssues.length === 0 ? (
                                <div className="alert mb-4">
                                    <i className="fas fa-info-circle"></i>
                                    <span>No quality issues reported.</span>
                                </div>
                            ) : (
                                qualityIssues.map((issue, index) => (
                                    <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 p-3 bg-base-100 rounded-lg border-l-4 border-info">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Description</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={issue.description}
                                                onChange={(e) => handleArrayChange(index, 'qualityIssues', 'description', e.target.value, setQualityIssues)}
                                                placeholder="Issue description"
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Severity</span>
                                            </label>
                                            <select
                                                value={issue.severity}
                                                onChange={(e) => handleArrayChange(index, 'qualityIssues', 'severity', e.target.value, setQualityIssues)}
                                                className="select select-bordered w-full"
                                            >
                                                {severityOptions.map(severity => (
                                                    <option key={severity} value={severity}>
                                                        {severity}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Resolution</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveItem(index, setQualityIssues)}
                                                    className="btn btn-ghost btn-xs text-error"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </label>
                                            <input
                                                type="text"
                                                value={issue.resolution}
                                                onChange={(e) => handleArrayChange(index, 'qualityIssues', 'resolution', e.target.value, setQualityIssues)}
                                                placeholder="Issue resolution"
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                            <button
                                type="button"
                                onClick={handleAddQualityIssue}
                                className="btn btn-outline btn-info btn-sm mt-2"
                            >
                                <i className="fas fa-plus mr-2"></i> Add Quality Issue
                            </button>
                        </div>

                    </div>
                    {/* Attachments & Photos - In a real app, these would have file upload functionality */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Photos & Attachments</h3>
                        <p className="text-sm mb-2">This is a placeholder for photo and file uploading functionality.</p>
                        <div className="card bg-base-100 p-4">

                            <div className="alert">
                                <i className="fas fa-info-circle"></i>
                                <span>File upload functionality will be implemented in a future update.</span>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4 border-t">
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                {isEdit ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            isEdit ? 'Update Log' : 'Create Log'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LogForm;