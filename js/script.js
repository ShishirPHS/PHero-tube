const handleCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  const categoriesContainer = document.getElementById("categories-container");

  data.data?.forEach((category) => {
    const button = document.createElement("button");
    button.innerHTML = `
    <button
          onclick=handleLoadCards('${category.category_id}') class="text-[#252525b3] text-xs sm:text-base font-medium py-2 px-5 bg-[#25252526] rounded mx-[6px] sm:mx-3 mb-3"
        >
          ${category.category}
    </button>
    `;

    categoriesContainer.appendChild(button);
  });
};

const handleLoadCards = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();

  const cardsContainer = document.getElementById("cards-container");

  data.data?.forEach((card) => {
    const singleCard = document.createElement("div");
    singleCard.innerHTML = `
    
    `;
    cardsContainer.appendChild(singleCard);
  });
};

handleCategories();
