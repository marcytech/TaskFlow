import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import TaskItem from './components/TaskItem';
import './styles/main.css';

const STORAGE_TASKS = 'taskflow_tasks';
const STORAGE_THEME = 'taskflow_theme';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_TASKS);
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem(STORAGE_THEME) === 'dark';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_THEME, darkMode ? 'dark' : 'light');
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const addTask = () => {
    if (!text.trim()) return;

    const newTask = {
      id: Date.now(),
      title: text.trim(),
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setText('');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id, newTitle) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle.trim() } : task
      )
    );
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === 'all'
          ? true
          : filter === 'completed'
          ? task.completed
          : !task.completed;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
  };

  return (
    <div className="app">
      <div className="container">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="task-form">
          <input
            type="text"
            placeholder="Digite uma nova tarefa..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask}>Adicionar</button>
        </div>

        <div className="toolbar">
          <input
            type="text"
            placeholder="Buscar tarefa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Todas</option>
            <option value="pending">Pendentes</option>
            <option value="completed">Concluídas</option>
          </select>
        </div>

        <StatsCards stats={stats} />

        <div className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))
          ) : (
            <p className="empty-message">Nenhuma tarefa encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;