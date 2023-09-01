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

  cardsContainer.innerHTML = "";

  data.data?.forEach((card) => {
    const singleCard = document.createElement("div");
    singleCard.innerHTML = `
    <!-- single card -->
        <div>
          <!-- img div -->
          <div>
            <img
              class="rounded-lg w-full"
              src="./images/test-img.png"
              alt="test-img.png"
            />
          </div>
          <!-- author profile and others info -->
          <div class="grid gap-2 grid-cols-7 mt-3">
            <!-- profile -->
            <div class="col-span-1">
              <img class="w-full" src="./images/Ellipse1.png" alt="" />
            </div>
            <!-- infos -->
            <div class="col-span-6">
              <h3
                class="text-[#171717] text-base lg:text-xs 2xl:text-lg font-bold"
              >
                Building a Winning UX Strategy Using the Kano Model
              </h3>
              <!-- author name and badge -->
              <div class="flex items-center">
                <p
                  class="py-[10px] lg:py-[5px] text-xs lg:text-[10px] 2xl:text-base"
                >
                  Awlad Hossain
                </p>
                <span id="badge"
                  ><img
                    class="h-[15px] lg:h-3 xl:h-[15px] ml-2"
                    src="./images/badge.png"
                    alt="badge.png"
                /></span>
              </div>
              <!-- views -->
              <p class="text-[#171717b3] text-sm lg:text-[10px] 2xl:text-base">
                91K views
              </p>
            </div>
          </div>
        </div>
    `;
    cardsContainer.appendChild(singleCard);
  });
};

handleCategories();
handleLoadCards("1000");
