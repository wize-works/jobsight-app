'use client';

import { useState } from 'react';
import ProjectForm from '../components/project-form';
import { useToast } from '@/hooks/use-toast';

const NewProject = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateProject = async (projectData) => {
        setIsSubmitting(true);

        try {
            // In a real app, this would be an API call to create the project
            // For demonstration, we'll simulate a delay and success
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Here you would typically call your API service
            // e.g., await createProject(projectData);

            return true;
        } catch (error) {
            console.error("Error creating project:", error);
            toast({
                title: "Error",
                description: "Failed to create project. Please try again.",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Create New Project</h1>
                <p className="text-base-content/70">Fill in the project details below to get started.</p>
            </div>

            <ProjectForm onSubmit={handleCreateProject} isEdit={false} />
        </main>
    );
};

export default NewProject;