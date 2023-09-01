const handleCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  const categoriesContainer = document.getElementById("categories-container");

  data.data.forEach((category) => {
    const button = document.createElement("button");
    button.innerHTML = `
    <button
          class="text-[#252525b3] text-xs sm:text-base font-medium py-2 px-5 bg-[#25252526] rounded mx-[6px] sm:mx-3 mb-3"
        >
          ${category.category}
    </button>
    `;

    categoriesContainer.appendChild(button);
  });
};

handleCategories();
