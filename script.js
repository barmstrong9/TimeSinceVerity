const startDateMs = new Date('2021-12-10T23:15:00').getTime();
const startDateObj = new Date('2021-12-10T23:15:00');

function updateTimer() {
    const nowObj = new Date();
    const nowMs = nowObj.getTime();

    const timeDiff = nowMs - startDateMs;

    const format = document.getElementById("formatSelector").value;

    if (format === 'seconds') {
        const totalSeconds = Math.floor(timeDiff / 1000);
        displayText = totalSeconds.toLocaleString() + " seconds";
    } else if (format === "ymd") {
        let years = nowObj.getFullYear() - startDateObj.getFullYear();
        let months = nowObj.getMonth() - startDateObj.getMonth();
        let days = nowObj.getDate() - startDateObj.getDate();

        if (days < 0) {
            months--;
            // Find out how many days were in the previous month to borrow from it
            const prevMonth = new Date(nowObj.getFullYear(), nowObj.getMonth(), 0);
            days += prevMonth.getDate();
        }
        
        // Adjust if the current month is earlier in the year than the start month
        if (months < 0) {
            years--;
            months += 12;
        }

        displayText = years + "y " + months + "m " + days + "d";
    } else {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(timeDiff % ((1000 * 60 * 60 *24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        displayText = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    }
    
    

    document.getElementById("timer").innerHTML = displayText;
}

document.getElementById("formatSelector").addEventListener('change', updateTimer);

updateTimer();
setInterval(updateTimer, 1000);

function toggleMenu() {
    const sidenav = document.getElementById("sidenav");
    sidenav.classList.toggle("active");
}