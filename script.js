const startDate = new Date('2021-12-10T23:15:00').getTime();

function updateTimer() {
    const now = new Date().getTime()

    const timeDiff = now - startDate;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(difference % ((1000 * 60 * 60 *24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
}

updateTimer();
setInterval(updateTimer, 1000);