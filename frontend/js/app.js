const API_BASE = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", () => {
    const statusText = document.getElementById("status-text");
    
    setTimeout(() => {
        statusText.textContent = "Frontend is running successfully! Waiting for Backend & AI Service integration.";
        statusText.style.color = "#4ade80";
    }, 1000);
});