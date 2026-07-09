function SearchBar() {
  return (
    <section className="py-5 bg-light">
      <div className="container">

        <h2 className="fw-bold mb-4 text-center">
          Find Your Favorite Pizza
        </h2>

        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search pizzas..."
        />

      </div>
    </section>
  );
}

export default SearchBar;