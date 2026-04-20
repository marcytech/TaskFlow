export default function StatsCards({ stats }) {
    return (
      <section className="stats">
        <div className="card">
          <span>Total</span>
          <strong>{stats.total}</strong>
        </div>
  
        <div className="card">
          <span>Concluídas</span>
          <strong>{stats.completed}</strong>
        </div>
  
        <div className="card">
          <span>Pendentes</span>
          <strong>{stats.pending}</strong>
        </div>
      </section>
    );
  }