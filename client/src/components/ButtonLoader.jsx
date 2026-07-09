function ButtonLoader({ text }) {
  return (
    <>
      <span
        className="spinner-border spinner-border-sm me-2"
        role="status"
      ></span>

      {text}
    </>
  );
}

export default ButtonLoader;