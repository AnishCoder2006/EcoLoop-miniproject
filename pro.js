function submitForm() {
    const inputs = document.querySelectorAll(".tv input, .lap input, .others input, .mob input");
    const data = {};

    inputs.forEach(input => {
        const parentDiv = input.closest("div");
        const category = parentDiv.classList[0]; // Gets category name (e.g., "tv", "lap")

        if (!data[category]) {
            data[category] = {};
        }

        if (input.type === "text") {
            data[category].brand = input.value;
        } else if (input.type === "number") {
            data[category].quantity = input.value;
        }
    });

    console.log("Submitted Data:", data); // Logs final data when submitted
    alert("Data submitted successfully! Check console for details.");
}