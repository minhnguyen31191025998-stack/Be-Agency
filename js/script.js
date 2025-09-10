// Hàm format số với dấu phẩy ngăn cách
Number.prototype.format = function (n) {
    const r = new RegExp('\\d(?=(\\d{3})+' + (n > 0 ? '\\.' : '$') + ')', 'g');
    return this.toFixed(Math.max(0, Math.floor(n))).replace(r, '$&,');
};

// Hàm easing easeOutExpo (giống jQuery UI)
function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

// Hàm animate counter
function animateCounter(element, duration = 10000) {
    const start = 0;
    const end = parseInt(element.textContent, 10);
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutExpo(progress); // dùng easing
        const value = start + (end - start) * eased;

        element.textContent = value.format();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Chạy cho tất cả các phần tử có class "count"
document.querySelectorAll('.count').forEach(el => {
    animateCounter(el, 5000); // 10 giây
});
