import React, { useState } from 'react'
import { TaskPriority, createTask } from '../utils/taskHelpers'

const TaskForm = ({ show, onHide, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: TaskPriority.MEDIUM
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long'
    } else if (formData.title.trim().length > 200) {
      newErrors.title = 'Title must be 200 characters or less'
    }
    
    if (formData.description.trim().length > 1000) {
      newErrors.description = 'Description must be 1000 characters or less'
    }
    
    if (!Object.values(TaskPriority).includes(formData.priority)) {
      newErrors.priority = 'Please select a valid priority'
    }
    
    return newErrors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setIsSubmitting(false)
      return
    }
    
    try {
      const newTask = createTask(formData.title, formData.description, formData.priority)
      onSubmit(newTask)
      
      setFormData({
        title: '',
        description: '',
        priority: TaskPriority.MEDIUM
      })
      setErrors({})
      onHide()
    } catch (error) {
      console.error('Error creating task:', error)
      setErrors({ submit: 'Failed to create task. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      priority: TaskPriority.MEDIUM
    })
    setErrors({})
    onHide()
  }

  if (!show) return null

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Task</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCancel}
              disabled={isSubmitting}
            ></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {errors.submit && (
                <div className="alert alert-danger" role="alert">
                  {errors.submit}
                </div>
              )}
              
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter task title..."
                  maxLength="200"
                  disabled={isSubmitting}
                />
                {errors.title && (
                  <div className="invalid-feedback">
                    {errors.title}
                  </div>
                )}
                <small className="form-text text-muted">
                  {formData.title.length}/200 characters
                </small>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter task description (optional)..."
                  rows="4"
                  maxLength="1000"
                  disabled={isSubmitting}
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback">
                    {errors.description}
                  </div>
                )}
                <small className="form-text text-muted">
                  {formData.description.length}/1000 characters
                </small>
              </div>

              <div className="mb-3">
                <label htmlFor="priority" className="form-label">
                  Priority <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${errors.priority ? 'is-invalid' : ''}`}
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                >
                  <option value={TaskPriority.LOW}>Low Priority</option>
                  <option value={TaskPriority.MEDIUM}>Medium Priority</option>
                  <option value={TaskPriority.HIGH}>High Priority</option>
                </select>
                {errors.priority && (
                  <div className="invalid-feedback">
                    {errors.priority}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || !formData.title.trim()}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Creating...
                  </>
                ) : (
                  'Create Task'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TaskForm