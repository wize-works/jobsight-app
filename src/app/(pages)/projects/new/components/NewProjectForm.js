'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ProjectForm from '../../components/project-form';
import { createNewProject } from '@/services/project';

export const NewProjectForm = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateProject = async (projectData) => {
        setIsSubmitting(true);

        projectData.progress = parseInt(projectData.progress, 10) || 0; // Ensure progress is a number
        projectData.budget = parseFloat(projectData.budget) || 0; // Ensure budget is a number
        projectData.tags = projectData.tags || []; // Ensure tags is an array

        try {
            await createNewProject(projectData);
            toast({
                title: 'Project Created',
                description: 'Your project has been successfully created.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            return true;
        } catch (error) {
            console.error("Error creating project:", error);
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    return <ProjectForm onSubmit={handleCreateProject} isEdit={false} />;
};

export default NewProjectForm;