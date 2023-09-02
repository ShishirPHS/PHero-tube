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

const handleLoadCards = async (categoryId, sortByViews = false) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();

  const cardsContainer = document.getElementById("cards-container");

  cardsContainer.innerHTML = "";

  const noContentDiv = document.getElementById("no-content");

  if (data.data && data.data.length > 0) {
    // sort by views
    if (sortByViews) {
      data.data.sort(
        (a, b) => b.others?.views.slice(0, -1) - a.others?.views.slice(0, -1)
      );
    }

    data.data.forEach((card) => {
      // calculate posted time
      const postedTime = card.others?.posted_date;
      const hours = Math.floor(postedTime / 3600);
      const minutes = Math.floor((postedTime % 3600) / 60);

      const singleCard = document.createElement("div");
      singleCard.innerHTML = `
      <!-- single card -->
          <div>
            <!-- img div -->
            <div
              class="relative h-[250px] sm:h-[300px] md:h-[250px] lg:h-[150px] xl:h-[180px] 2xl:h-[200px] overflow-hidden flex items-center justify-center rounded-lg"
            >
              <img
                class="w-full h-full"
                src="${card.thumbnail}"
                alt="test-img.png"
              />
              <!-- time div -->
              <div class="absolute right-3 bottom-3 p-[5px] bg-[#171717] text-white rounded ${
                !card.others?.posted_date ? "hidden" : ""
              }">
                <p class="text-[10px] xl:text-xs 2xl:text-sm">${hours}hrs ${minutes} min ago</P>
              </div>
            </div>
            <!-- author profile and others info -->
            <div class="grid gap-2 grid-cols-7 mt-3">
              <!-- profile -->
              <div class="col-span-1">
                <img class="w-10 h-10 lg:w-[26px] lg:h-[26px] xl:h-[30px] xl:w-[30px] 2xl:h-[40px] 2xl:w-[40px] rounded-full" src="${
                  card.authors[0]?.profile_picture
                }" alt="" />
              </div>
              <!-- infos -->
              <div class="col-span-6">
                <h3
                  class="text-[#171717] text-base lg:text-xs 2xl:text-lg font-bold"
                >
                  ${card.title}
                </h3>
                <!-- author name and badge -->
                <div class="flex items-center">
                  <p
                    class="py-[5px] lg:py-[2px] text-xs lg:text-[10px] 2xl:text-base"
                  >
                    ${card.authors[0]?.profile_name}
                  </p>
                  <span id="badge" class="${
                    !card.authors[0]?.verified ? "hidden" : ""
                  }">
                    <img class="h-[15px] lg:h-3 xl:h-[15px] ml-2" 
                    src="./images/badge.png" alt="badge.png" />
                  </span>
                </div>
                <!-- views -->
                <p class="text-[#171717b3] text-sm lg:text-[10px] 2xl:text-base">
                  ${card.others?.views} views
                </p>
              </div>
            </div>
          </div>
      `;
      cardsContainer.appendChild(singleCard);
    });

    noContentDiv.classList.add("hidden");
  } else {
    noContentDiv.classList.remove("hidden");
  }
};

const sortByViews = () => {
  handleLoadCards("1000", true);
};

handleCategories();
handleLoadCards("1000");
