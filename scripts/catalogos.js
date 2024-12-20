const allTabsBoxes = document.querySelectorAll(".tabs-box"); // Seleciona todas as caixas de tabs
const arrowIcons = document.querySelectorAll(".icon i");

allTabsBoxes.forEach((tabsBox) => {
    let isDragging = false,
        startX,
        scrollLeft;

    const handleIcons = (scrollVal, tabsBox) => {
        let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
        const icons = tabsBox.parentElement.querySelectorAll(".icon i");
        icons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
        icons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
    };

    const smoothScroll = (direction, tabsBox) => {
        const scrollStep = direction === "left" ? -10 : 10;
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            tabsBox.scrollLeft += scrollStep;
            scrollAmount += Math.abs(scrollStep);

            if (scrollAmount >= 250) {
                clearInterval(slideTimer);
                handleIcons(tabsBox.scrollLeft, tabsBox);
            }
        }, 10);
    };

    const icons = tabsBox.parentElement.querySelectorAll(".icon i");
    icons.forEach(icon => {
        icon.addEventListener("click", () => smoothScroll(icon.id, tabsBox));
    });

    const allTabs = tabsBox.querySelectorAll(".tab");
    allTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabsBox.querySelector(".active")?.classList.remove("active");
            tab.classList.add("active");
        });
    });

    // Function for mouse/touch drag start
    const dragStart = (e) => {
        isDragging = true;
        tabsBox.classList.add("dragging");
        startX = e.pageX || e.touches[0].pageX;
        scrollLeft = tabsBox.scrollLeft;
    };

    // Function for mouse/touch dragging
    const dragging = (e) => {
        if (!isDragging) return;
        const x = e.pageX || e.touches[0].pageX;
        const walk = (x - startX) * 0.75; // Adjust scroll speed
        tabsBox.scrollLeft = scrollLeft - walk;
        handleIcons(tabsBox.scrollLeft, tabsBox);
    };

    // Function for mouse/touch drag end
    const dragStop = () => {
        isDragging = false;
        tabsBox.classList.remove("dragging");
    };

    // Mouse events
    tabsBox.addEventListener("mousedown", dragStart);
    tabsBox.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    // Touch events for mobile compatibility
    tabsBox.addEventListener("touchstart", dragStart);
    tabsBox.addEventListener("touchmove", dragging);
    tabsBox.addEventListener("touchend", dragStop);
});
