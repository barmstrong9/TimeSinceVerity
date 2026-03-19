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