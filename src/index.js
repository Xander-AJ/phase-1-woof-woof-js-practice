document.addEventListener("DOMContentLoaded", () => {
    const dogBar = document.getElementById("dog-bar");
    const dogInfo = document.getElementById("dog-info");
    const filterBtn = document.getElementById("filter-btn");
    let filterOn = false; // Flag to track filter state
  
    // Fetch pup data and populate dog bar
    const fetchPups = async () => {
      try {
        const response = await fetch("http://localhost:3000/pups");
        const pups = await response.json();
  
        pups.forEach(pup => {
          const pupSpan = document.createElement("span");
          pupSpan.textContent = pup.name;
          pupSpan.addEventListener("click", () => showPupInfo(pup));
          dogBar.appendChild(pupSpan);
        });
      } catch (error) {
        console.error("Error fetching pups:", error);
      }
    };
  
    // Display pup info in dog info section
    const showPupInfo = (pup) => {
      dogInfo.innerHTML = `
        <img src="${pup.image}" />
        <h2>${pup.name}</h2>
        <button id="good-bad-btn">${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
      `;
      document.getElementById("good-bad-btn").addEventListener("click", () => toggleGoodDogStatus(pup));
    };
  
    // Toggle Good Dog/Bad Dog status
    const toggleGoodDogStatus = async (pup) => {
      try {
        const updatedStatus = !pup.isGoodDog;
        const response = await fetch(`http://localhost:3000/pups/${pup.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({ isGoodDog: updatedStatus })
        });
        const updatedPup = await response.json();
        showPupInfo(updatedPup); // Update displayed status
      } catch (error) {
        console.error("Error updating pup status:", error);
      }
    };
  
    // Filter Good Dogs button functionality
    filterBtn.addEventListener("click", () => {
      filterOn = !filterOn;
      filterBtn.textContent = `Filter Good Dogs: ${filterOn ? "ON" : "OFF"}`;
      if (filterOn) {
        // Fetch and display only good dogs
        // Implement logic based on filter state
      } else {
        // Fetch and display all dogs
        // Implement logic based on filter state
      }
    });
  
    // Initial fetch and setup
    fetchPups();
  });
  