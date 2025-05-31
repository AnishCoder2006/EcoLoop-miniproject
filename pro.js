
function submitForm() {
    const data = {
        tv: {
            brand: document.querySelector('input[name="tvBrand"]').value,
            quantity: document.querySelector('input[name="tvQty"]').value
        },
        laptop: {
            brand: document.querySelector('input[name="laptopBrand"]').value,
            quantity: document.querySelector('input[name="laptopQty"]').value
        },
        mobile: {
            brand: document.querySelector('input[name="mobileBrand"]').value,
            quantity: document.querySelector('input[name="mobileQty"]').value
        },
        washingMachine: {
            brand: document.querySelector('input[name="washBrand"]').value,
            quantity: document.querySelector('input[name="washQty"]').value
        },
        others: {
            brand: document.querySelector('input[name="otherBrand"]').value,
            quantity: document.querySelector('input[name="otherQty"]').value
        },
        description: document.getElementById("description").value
    };

    fetch("http://localhost:3000/store-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => alert(res.message || "Data submitted successfully!"))
    .catch(err => alert("Error submitting data!"));

    console.log("Submitted Data:", data);
}
