

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome Home </h1>
      <p style={styles.subtitle}>
        This is your React Router Home page.
      </p>

      <div style={styles.card}>
        <h2>Getting Started</h2>
        <p>
          You can now build your dashboard, SaaS app, or billing system here.
        </p>
        
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
    background: "#f5f7fb",
  },
  title: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "300px",
    textAlign: "center",
  },
};