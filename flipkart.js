(async function() {
    function scrollToBottom() {
        return new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 1000;
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight || window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 1000);
        });
    }

    async function loadFullPage() {
        let prevHeight = 0;
        while (document.body.scrollHeight !== prevHeight) {
            prevHeight = document.body.scrollHeight;
            await scrollToBottom();
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    async function calculateTotalSpent() {
        await loadFullPage();
        
        let totalSpent = 0;
        let priceElements = document.querySelectorAll(".col-2-12.mcVLQq");

        priceElements.forEach(priceElement => {
            let text = priceElement.innerText.trim();
            let priceText = text.replace(/[^0-9]/g, "");
            if (priceText) {
                totalSpent += parseInt(priceText, 10);
            }
        });

        console.log("───────────────────────────────────────────────");
        console.log("🛒 TOTAL AMOUNT SPENT ON FLIPKART: ₹ " + totalSpent);
        console.log("───────────────────────────────────────────────");
    }

    calculateTotalSpent();
})();
