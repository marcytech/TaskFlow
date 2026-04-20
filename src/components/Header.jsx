export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <div>
        <h1>TaskFlow</h1>
        <p>Organize suas tarefas com praticidade</p>
      </div>

      <button
        className="theme-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  );
}