import React from 'react'

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'danger'
      case 'medium':
        return 'warning'
      case 'low':
        return 'success'
      default:
        return 'secondary'
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className={`card mb-3 ${task.status === 'completed' ? 'bg-light' : ''}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">
            <h5 className={`card-title ${task.status === 'completed' ? 'text-decoration-line-through text-muted' : ''}`}>
              {task.title}
            </h5>
            {task.description && (
              <p className={`card-text ${task.status === 'completed' ? 'text-muted' : ''}`}>
                {task.description}
              </p>
            )}
            <div className="d-flex align-items-center gap-2">
              <span className={`badge bg-${getPriorityColor(task.priority)}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>
              <small className="text-muted">
                Created: {formatDate(task.createdAt)}
              </small>
              {task.status === 'completed' && (
                <small className="text-muted">
                  Completed: {formatDate(task.updatedAt)}
                </small>
              )}
            </div>
          </div>
          <div className="d-flex gap-2">
            <button
              className={`btn btn-sm ${task.status === 'completed' ? 'btn-outline-secondary' : 'btn-outline-success'}`}
              onClick={() => onToggleComplete(task.id)}
            >
              {task.status === 'completed' ? 'Reopen' : 'Complete'}
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskItem