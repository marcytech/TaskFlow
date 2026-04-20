import { useState } from 'react';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    if (!newTitle.trim()) return;
    onEdit(task.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'done' : ''}`}>
      <div className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        {isEditing ? (
          <input
            className="edit-input"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        ) : (
          <span>{task.title}</span>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <button onClick={handleSave}>Salvar</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Editar</button>
        )}
        <button className="delete" onClick={() => onDelete(task.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
}