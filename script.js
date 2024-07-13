async function fetchData() {
    const url = 'https://meowfacts.herokuapp.com/?count=3';

    try {
        const response = await fetch(url, {
            method: 'GET',  // The API endpoint seems to expect POST requests

        });
        if (response.query_status !== "ok") {
            const data = await response.json();
            data.data.forEach(fact => {
                const fact_data = document.getElementById("fact_data")
                fact_data.innerHTML = `
                        <h3 id="facts" style="color: red">${fact}</h3>
                        <button class="btn btn-warning" onclick=fetchData()>Get New Fact</button>
                        <button class="btn btn-warning" id="copy" onclick=copyToClipboard()>Copy</button>
                        <p id="copyStatus" class="copy-notification"></p>
                        <br>
                    `
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetchData();


function copyToClipboard() {
    const copyText = document.getElementById("facts").innerText;
    const copyStatus = document.getElementById("copyStatus");
    const copyButton = document.getElementById("copy").innerText

    if (copyText) {
        navigator.clipboard.writeText(copyText).then(() => {
            copyStatus.innerText = "Copied!";
            copyButton.innerText = "Edit"

        }).catch(err => {
            copyStatus.innerText = "Failed to copy.";
        });
    } else {
        copyStatus.innerText = "No URL to copy.";
    }

}

