function Loader({ text = "Loading..." }) {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <div
        className="spinner-border text-warning"
        style={{ width: "4rem", height: "4rem" }}
        role="status"
      >
        <span className="visually-hidden">
          Loading...
        </span>
      </div>

      <h5 className="mt-4 text-secondary">
        {text}
      </h5>
    </div>
  );
}

export default Loader;