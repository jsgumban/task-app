import React, { useState } from 'react'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'
import {TaskPriority, TaskStatus} from "../utils/taskHelpers.js";


const TaskList = () => {
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the task management application including setup instructions and user guide.',
      status: TaskStatus.ACTIVE,
      priority: TaskPriority.HIGH,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Review code quality',
      description: 'Perform code review and ensure all components follow best practices and coding standards.',
      status: TaskStatus.ACTIVE,
      priority: TaskPriority.MEDIUM,
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date('2024-01-16')
    },
    {
      id: '3',
      title: 'Set up CI/CD pipeline',
      description: 'Configure automated testing and deployment pipeline for the application.',
      status: TaskStatus.COMPLETED,
      priority: TaskPriority.LOW,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-14')
    },
    {
      id: '4',
      title: 'Design user interface',
      description: 'Create wireframes and mockups for the task management interface with focus on user experience.',
      status: TaskStatus.ACTIVE,
      priority: TaskPriority.HIGH,
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12')
    },
    {
      id: '5',
      title: 'Implement data validation',
      description: 'Add client-side and server-side validation for all form inputs and data operations.',
      status: TaskStatus.COMPLETED,
      priority: TaskPriority.MEDIUM,
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-13')
    }
  ])

  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === TaskStatus.ACTIVE ? TaskStatus.COMPLETED : TaskStatus.ACTIVE,
              updatedAt: new Date()
            }
          : task
      )
    )
  }

  const handleDelete = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  const handleAddTask = (newTask) => {
    setTasks(prevTasks => [newTask, ...prevTasks])
  }

  const activeTasks = tasks.filter(task => task.status === TaskStatus.ACTIVE)
  const completedTasks = tasks.filter(task => task.status === TaskStatus.COMPLETED)

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Task Management</h2>
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-primary"
                onClick={() => setShowTaskForm(true)}
              >
                <i className="fas fa-plus me-2"></i>
                Add New Task
              </button>
              <div className="d-flex gap-3">
                <span className="badge bg-primary fs-6">
                  Active: {activeTasks.length}
                </span>
                <span className="badge bg-success fs-6">
                  Completed: {completedTasks.length}
                </span>
              </div>
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">No tasks found</h4>
              <p className="text-muted">Create your first task to get started!</p>
            </div>
          ) : (
            <>
              {activeTasks.length > 0 && (
                <div className="mb-4">
                  <h4 className="mb-3">Active Tasks</h4>
                  {activeTasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggleComplete={handleToggleComplete}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}

              {completedTasks.length > 0 && (
                <div className="mb-4">
                  <h4 className="mb-3">Completed Tasks</h4>
                  {completedTasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggleComplete={handleToggleComplete}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          <TaskForm
            show={showTaskForm}
            onHide={() => setShowTaskForm(false)}
            onSubmit={handleAddTask}
          />
        </div>
      </div>
    </div>
  )
}

export default TaskList