'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import ProjectForm from '../../../components/project-form';
import { updateExistingProject } from '@/services/project';

export const EditProjectForm = ({ project }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle project update
    const handleUpdateProject = async (projectData) => {
        try {
            setIsSubmitting(true);

            // Ensure numerical values are properly parsed
            projectData.progress = parseInt(projectData.progress, 10) || 0;
            projectData.budget = parseFloat(projectData.budget) || 0;
            projectData.tags = projectData.tags || [];

            // Update the project
            await updateExistingProject(project._id, projectData);

            toast({
                title: "Project Updated",
                description: "The project has been updated successfully.",
            });

            return true;
        } catch (error) {
            console.error("Error updating project:", error);
            toast({
                title: "Error",
                description: "Failed to update project",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ProjectForm project={project} onSubmit={handleUpdateProject} isEdit={true} />
    );
};

export default EditProjectForm;