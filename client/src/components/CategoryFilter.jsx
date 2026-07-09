const categories = [
  "All",
  "Classic",
  "Veg",
  "Non-Veg",
  "Cheese",
  "Spicy"
];

function CategoryFilter({ category, setCategory }) {
  return (
    <div className="d-flex gap-2 flex-wrap mb-4">
      {categories.map((item) => (
        <button
          key={item}
          className={`btn ${
            category === item ? "btn-warning" : "btn-outline-dark"
          }`}
          onClick={() => setCategory(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;