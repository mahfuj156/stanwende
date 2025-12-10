document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".cat-btn");
    const postContainer = document.getElementById("post-results");

    // Stop if elements missing
    if (!buttons.length || !postContainer) return;

    // When a category button is clicked
    buttons.forEach(button => {
        button.addEventListener("click", function () {

            let cat = this.dataset.category;

            // -------------------------
            // ACTIVE + INACTIVE STYLES
            // -------------------------

            // Reset all buttons to default style
            buttons.forEach(b => {
                b.classList.remove("bg-active", "text-white");
                b.classList.add("faq-button-shadow"); // default bg
            });

            // Activate clicked button
            this.classList.remove("faq-button-shadow");
            this.classList.add("bg-active", "text-white");

            // -------------------------
            // LOADING INDICATOR
            // -------------------------
            postContainer.innerHTML = `
                <div class="w-full text-center py-10 text-p18 text-gray-600">
                    Loading...
                </div>
            `;

            // -------------------------
            // AJAX REQUEST
            // -------------------------
            fetch(ztb_ajax.ajax_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `action=load_category_posts&category=${cat}&nonce=${ztb_ajax.nonce}`
            })
            .then(response => response.text())
            .then(data => {
                postContainer.innerHTML = data;
            })
            .catch(() => {
                postContainer.innerHTML = `
                    <div class="w-full text-center py-10 text-red-600">
                        Error loading posts. Try again.
                    </div>
                `;
            });

        });
    });

});
