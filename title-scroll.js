// title-scroll.js
document.addEventListener("DOMContentLoaded", function () {
    let msg = " 🎃 ようこそ 🎃 "; // your scrolling text
    let speed = 200; // lower = faster (ms)
    let pos = 0;

    function scrollTitle() {
        document.title = msg.substring(pos) + msg.substring(0, pos);
        pos = (pos + 1) % msg.length;
    }

    setInterval(scrollTitle, speed);
});
