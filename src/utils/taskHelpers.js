export const TaskStatus = {
	ACTIVE: 'active',
	COMPLETED: 'completed'
}

export const TaskPriority = {
	LOW: 'low',
	MEDIUM: 'medium',
	HIGH: 'high'
}

export const createTask = (title, description = '', priority = TaskPriority.MEDIUM) => {
	return {
		id: Date.now() + Math.random().toString(),
		title: title.trim(),
		description: description.trim(),
		status: TaskStatus.ACTIVE,
		priority,
		createdAt: new Date(),
		updatedAt: new Date()
	}
}

export const sortTasks = (tasks, sortBy = 'createdAt', sortOrder = 'desc') => {
  const sortedTasks = [...tasks]
  
  return sortedTasks.sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]
    
    if (sortBy === 'priority') {
      const priorityOrder = { [TaskPriority.HIGH]: 3, [TaskPriority.MEDIUM]: 2, [TaskPriority.LOW]: 1 }
      aValue = priorityOrder[a.priority]
      bValue = priorityOrder[b.priority]
    }
    
    if (sortBy === 'createdAt' || sortBy === 'updatedAt' || sortBy === 'completedAt') {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }
    
    if (sortBy === 'title') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1
    }
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1
    }
    return 0
  })
}

export const filterTasks = (tasks, filters = {}) => {
  return tasks.filter(task => {
    if (filters.status && task.status !== filters.status) {
      return false
    }
    
    if (filters.priority && task.priority !== filters.priority) {
      return false
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const titleMatch = task.title.toLowerCase().includes(searchLower)
      const descriptionMatch = task.description.toLowerCase().includes(searchLower)
      if (!titleMatch && !descriptionMatch) {
        return false
      }
    }
    
    if (filters.dateRange) {
      const taskDate = new Date(task.createdAt)
      if (filters.dateRange.start && taskDate < new Date(filters.dateRange.start)) {
        return false
      }
      if (filters.dateRange.end && taskDate > new Date(filters.dateRange.end)) {
        return false
      }
    }
    
    return true
  })
}