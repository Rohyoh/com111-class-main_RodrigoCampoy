// form.js
console.log("Form script loaded");

// Function to add form data to the schedule table
function addToSchedule(event) {
    event.preventDefault();
    
    const date = document.getElementById('date').value;
    const timeStart = document.getElementById('time-start').value;
    const timeEnd = document.getElementById('time-end').value;
    const activity = document.getElementById('activity').value;
    const place = document.getElementById('place').value;
    const type = document.getElementById('type').value;
    const flag = document.getElementById('flag').value;
    const notes = document.getElementById('notes').value;
    const busy = document.getElementById('busy').checked;
    
    const tableBody = document.querySelector('.table tbody');
    
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td>${date}</td>
        <td>${timeStart}</td>
        <td>${timeEnd}</td>
        <td>
            <strong>${activity}</strong>
            ${notes ? `<br><small class="text-muted">${notes}</small>` : ''}
            ${type ? `<br><span class="badge bg-secondary">${type}</span>` : ''}
        </td>
        <td>${place}</td>
        <td>
            <span class="badge ${busy ? 'bg-danger' : 'bg-success'}">
                ${busy ? 'Busy' : 'Available'}
            </span>
        </td>
    `;
    
    newRow.style.borderLeft = `4px solid ${flag}`;
    
    tableBody.appendChild(newRow);
    
    const saveButton = document.getElementById('saveButton');
    const originalText = saveButton.innerHTML;
    
    saveButton.innerHTML = '<i class="bi bi-check-circle me-2"></i>Added!';
    saveButton.classList.remove('btn-primary');
    saveButton.classList.add('btn-success');
    
    setTimeout(() => {
        saveButton.innerHTML = originalText;
        saveButton.classList.remove('btn-success');
        saveButton.classList.add('btn-primary');
    }, 2000);
    
    document.getElementById('scheduleForm').reset();
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips and popovers
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    
    // Add event listener to the form
    const form = document.getElementById('scheduleForm');
    if (form) {
        form.addEventListener('submit', addToSchedule);
    }
    
    // Also update the existing save button click handler
    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        saveButton.addEventListener('click', function(event) {
            const spinner = this.querySelector('.spinner-border');
            spinner.classList.remove('d-none');
            
            setTimeout(() => {
                spinner.classList.add('d-none');
            }, 1000);
        });
    }
    
    console.log("Form functionality initialized");
});