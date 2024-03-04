// Show and hide responsive header menu

const bars = document.querySelector(".bars");
const overlay = document.querySelector(".overlay");

bars.addEventListener("click", () => {
    if (window.getComputedStyle(overlay, null).display === "none") {
        overlay.style.display = "block";
    } else {
        overlay.style.display = "none";
    }
});


// Dropdown filter menu
const expandFiltersButtons = document.querySelectorAll(".expand-filter");
const filtersDropdownContainers = Array.from(document.querySelectorAll(".filters-dropdown-container"));

if (expandFiltersButtons) {
    expandFiltersButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const filtersDropdown = filtersDropdownContainers[index].querySelector("ul");
            if (filtersDropdown.style.display === "block") {
                filtersDropdown.style.display = "none";
            } else {
                closeAllDropdowns();
                filtersDropdown.style.display = "block";
            }
        });
    });

    // Close all dropdowns except the one being opened
    function closeAllDropdowns() {
        filtersDropdownContainers.forEach(container => {
            const dropdown = container.querySelector("ul");
            if (dropdown.style.display === "block") {
                dropdown.style.display = "none";
            }
        });
    }

    // Event listener to close dropdowns when clicking outside
    window.addEventListener("click", (event) => {
        const isClickInsideDropdown = filtersDropdownContainers.some(container => container.contains(event.target));
        if (!isClickInsideDropdown) {
            closeAllDropdowns();
        }
    });
}



// Show filters modal
const filtersButton = document.querySelector(".filter-icon-container");
const filtersModal = document.querySelector(".filters-modal");
const closeModalButton = document.querySelector(".close-modal");
if (filtersButton) {
    filtersButton.addEventListener("click", () => {
        filtersModal.showModal();
    })

    closeModalButton.addEventListener("click", () => {
        filtersModal.close();
    })
}