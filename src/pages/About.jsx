export default function About() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Us</h1>

      <div style={styles.card}>
        <h2>Tech Stack</h2>
        <ul style={styles.list}>
          <li>React + Vite</li>
          <li>React Router</li>
          <li>Laravel API (backend)</li>
          <li>MySQL / PostgreSQL</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial",
    background: "#f5f7fb",
    padding: "20px",
  },
  title: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "20px",
    textAlign: "center",
    maxWidth: "500px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "320px",
    marginBottom: "15px",
  },
  list: {
    paddingLeft: "18px",
  },
};