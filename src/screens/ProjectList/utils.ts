import { useProject } from 'hooks/project';
import { useUrlQueryParam } from 'hooks/useUrlQueryParam';
import { useMemo } from 'react';

export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(() => (
            { ...param, personId: Number(param.personId) }
        ), [param]),
        setParam
    ] as const
}

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam(['projectCreate'])
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
    const { data: editingProject, isLoading } = useProject(Number(editingProjectId))

    const open = () => {
        setProjectModalOpen({ projectCreate: true })
    }
    const close = () => {
        setProjectModalOpen({ projectCreate: undefined })
        setEditingProjectId({ editingProjectId: undefined })
    }
    const startEdit = (id: number) => {
        setEditingProjectId({editingProjectId: id})
    }

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}