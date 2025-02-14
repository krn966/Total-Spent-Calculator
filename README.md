# 🛒 Flipkart Total Spent Calculator

This script helps you calculate the total amount spent on **Flipkart** by automatically scrolling through your order history and summing up all order totals.

## 🚀 Features

- **Automated Scrolling**: Loads all orders by scrolling to the bottom of the page.
- **Accurate Price Extraction**: Extracts order totals based on Flipkart's HTML structure.
- **Easy to Use**: Simply paste the script into your browser console.
- **Summarized Output**: Displays total spending in an easy-to-read format.

## 📌 How to Use

1. Open your **Flipkart Orders Page**: [https://www.flipkart.com/orders](https://www.flipkart.com/orders)
2. Open **Developer Console**:
   - **Windows/Linux**: `Ctrl + Shift + J` (Chrome) or `Ctrl + Shift + K` (Firefox)
   - **Mac**: `Cmd + Option + J` (Chrome) or `Cmd + Option + K` (Firefox)
3. Copy and paste the following script into the console and press **Enter**:

```javascript
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
            
            // Click "Show More Orders" button if present
            let showMoreButton = document.querySelector('button.QqFHMw.v0q-qo');
            if (showMoreButton) {
                showMoreButton.click();
                await new Promise(r => setTimeout(r, 2000)); // Wait for new orders to load
            }

            await scrollToBottom();
            await new Promise(r => setTimeout(r, 2000)); // Extra wait for content to load
        }
    }

    async function calculateTotalSpent() {
        await loadFullPage();
        
        let totalSpent = 0;
        let priceElements = document.querySelectorAll(".col-2-12.mcVLQq");

        priceElements.forEach(priceElement => {
            let text = priceElement.innerText.trim();
            let priceText = text.replace(/[^0-9]/g, ""); // Extract only numbers
            if (priceText) {
                totalSpent += parseInt(priceText, 10);
            }
        });

        console.log("%c───────────────────────────────────────────────", "font-size: 20px; font-weight: bold;");
        console.log("%c🛒 TOTAL AMOUNT SPENT ON FLIPKART: ₹ " + totalSpent, "font-size: 30px; font-weight: bold; color: green;");
        console.log("%c───────────────────────────────────────────────", "font-size: 20px; font-weight: bold;");
    }

    calculateTotalSpent();
})();

```
![Flipkart Script Demo](flipkart.gif)


## 📊 Expected Output

```
───────────────────────────────────────────────
🛒 TOTAL AMOUNT SPENT ON FLIPKART: ₹ 1,25,678
───────────────────────────────────────────────
```

## 📜 License

This project is licensed under the **MIT License**.

---

🔹 **Enjoy tracking your Flipkart expenses effortlessly!** 🚀

