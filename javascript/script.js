const startDateMs = new Date('2021-12-10T23:15:00').getTime();
const startDateObj = new Date('2021-12-10T23:15:00');

function updateTimer() {
    const timerElement = document.getElementById("timer");
    const formatSelector = document.getElementById("formatSelector");

    // GUARD: If there is no timer on this page, stop running the function
    if (!timerElement) return;

    const nowObj = new Date();
    const nowMs = nowObj.getTime();
    const timeDiff = nowMs - startDateMs;

    // Determine format: Use the selector's value if it exists, otherwise use 'default'
    const format = formatSelector ? formatSelector.value : "default";
    
    let displayText = ""; // Properly declare the variable

    if (format === 'seconds') {
        const totalSeconds = Math.floor(timeDiff / 1000);
        displayText = totalSeconds.toLocaleString() + " seconds";
    } else if (format === "ymd") {
        let years = nowObj.getFullYear() - startDateObj.getFullYear();
        let months = nowObj.getMonth() - startDateObj.getMonth();
        let days = nowObj.getDate() - startDateObj.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(nowObj.getFullYear(), nowObj.getMonth(), 0);
            days += prevMonth.getDate();
        }
        
        if (months < 0) {
            years--;
            months += 12;
        }

        displayText = years + "y " + months + "m " + days + "d";
    } else {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        displayText = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    }

    timerElement.innerHTML = displayText;
}

// Only add the listener if the selector actually exists on the page
const formatSelector = document.getElementById("formatSelector");
if (formatSelector) {
    formatSelector.addEventListener('change', updateTimer);
}

// Start the cycle
updateTimer();
setInterval(updateTimer, 1000);

// This function is safe because it's only called by an 'onclick' in the HTML
function toggleMenu() {
    const sidenav = document.getElementById("sidenav");
    if (sidenav) {
        sidenav.classList.toggle("active");
    }
}

// Ensure the DOM is fully loaded before attaching events
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Gallery Carousel & Modal Logic ---
    const modal = document.getElementById("photoModal");
    const photocards = document.querySelectorAll(".photocard");
    
    if (modal && photocards.length > 0) {
        const closeBtn = document.querySelector(".close-modal");
        
        // New variables for the smooth track
        const carouselTrack = document.getElementById("carouselTrack");
        
        const modalLocation = document.getElementById("modalLocation");
        const modalDate = document.getElementById("modalDate");
        const modalDescription = document.getElementById("modalDescription");
        
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        const carouselDots = document.getElementById("carouselDots");

        let currentImages = [];
        let currentIndex = 0;

        function updateCarousel() {
            // Slide the track using CSS transform
            // If index is 1, it moves left by 100%. If 2, moves left by 200%, etc.
            const slideAmount = -(currentIndex * 100);
            carouselTrack.style.transform = `translateX(${slideAmount}%)`;
            
            // Update dots
            const dots = document.querySelectorAll(".dot");
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add("active");
                } else {
                    dot.classList.remove("active");
                }
            });
        }

        // Open modal and load data
        photocards.forEach(card => {
            card.addEventListener("click", () => {
                const imagesString = card.getAttribute("data-images");
                currentImages = imagesString.split(",").map(url => url.trim());
                currentIndex = 0;

                modalLocation.textContent = card.getAttribute("data-location");
                modalDate.textContent = card.getAttribute("data-date");
                modalDescription.textContent = card.getAttribute("data-description");

                // Clear the old track and build the new one
                carouselTrack.innerHTML = "";
                carouselDots.innerHTML = "";
                
                // Snap back to the start instantly before showing the modal
                carouselTrack.style.transition = "none";
                carouselTrack.style.transform = `translateX(0%)`;
                
                // Force browser to register the instant snap before re-enabling smooth transition
                setTimeout(() => {
                    carouselTrack.style.transition = "transform 0.4s ease-in-out";
                }, 10);

                currentImages.forEach((src, index) => {
                    // Create images
                    const img = document.createElement("img");
                    img.src = src;
                    img.alt = `Memory photo ${index + 1}`;
                    carouselTrack.appendChild(img);

                    // Create dots
                    if (currentImages.length > 1) {
                        const dot = document.createElement("span");
                        dot.classList.add("dot");
                        if (index === 0) dot.classList.add("active");
                        
                        // Optional: Make dots clickable
                        dot.addEventListener("click", () => {
                            currentIndex = index;
                            updateCarousel();
                        });
                        
                        carouselDots.appendChild(dot);
                    }
                });

                // Show/hide buttons based on image count
                if (currentImages.length > 1) {
                    prevBtn.classList.remove("hidden");
                    nextBtn.classList.remove("hidden");
                } else {
                    prevBtn.classList.add("hidden");
                    nextBtn.classList.add("hidden");
                }

                modal.style.display = "block";
            });
        });

        // Next Button
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % currentImages.length;
            updateCarousel();
        });

        // Previous Button
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            updateCarousel();
        });

        // Close logic
        function closeModal() {
            modal.style.display = "none";
        }
        closeBtn.addEventListener("click", closeModal);
        window.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Bonus: Keyboard arrow navigation!
        document.addEventListener("keydown", (e) => {
            if (modal.style.display === "block" && currentImages.length > 1) {
                if (e.key === "ArrowRight") {
                    currentIndex = (currentIndex + 1) % currentImages.length;
                    updateCarousel();
                } else if (e.key === "ArrowLeft") {
                    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
                    updateCarousel();
                } else if (e.key === "Escape") {
                    closeModal();
                }
            }
        });
    }
});