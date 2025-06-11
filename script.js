// --- UI ELEMENTS ---
const entryForm = document.getElementById('entry-form');
const confirmationMessage = document.getElementById('confirmation-message');
const messageInput = document.getElementById('message-input');
const deliveryYearsInput = document.getElementById('delivery-years');
const saveButton = document.getElementById('save-button');
const resetButton = document.getElementById('reset-button');
const errorMessage = document.getElementById('error-message');

/**
 * Formats a date object into the YYYYMMDD format required by Google Calendar links.
 * @param {Date} date The date object to format.
 * @returns {string} The formatted date string.
 */
function formatGoogleDate(date) {
    return date.toISOString().slice(0, 10).replace(/-/g, '');
}

/**
 * Generates a Google Calendar link and opens it in a new tab.
 */
function createCalendarLink() {
    const message = messageInput.value.trim();
    const deliveryYears = parseInt(deliveryYearsInput.value, 10);

    errorMessage.textContent = '';

    if (!message) {
        errorMessage.textContent = 'Please write a message to your future self.';
        return;
    }

    if (!deliveryYears || deliveryYears <= 0) {
        errorMessage.textContent = 'Please enter a valid number of years (1 or more).';
        return;
    }

    // Calculate future date
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() + deliveryYears);
    
    // For an all-day event, the end date is the next day
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    // Format dates for the URL
    const formattedStartDate = formatGoogleDate(startDate);
    const formattedEndDate = formatGoogleDate(endDate);
    
    // Construct the Google Calendar URL
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const title = encodeURIComponent('A Message From Your Past Self');
    const details = encodeURIComponent(message);
    const dates = encodeURIComponent(`${formattedStartDate}/${formattedEndDate}`);

    const calendarUrl = `${baseUrl}&text=${title}&details=${details}&dates=${dates}`;

    // Open the link in a new tab
    window.open(calendarUrl, '_blank');
    
    // Show the confirmation screen on this page
    entryForm.classList.add('hidden');
    confirmationMessage.classList.remove('hidden');
}

/**
 * Resets the UI to the initial state to write a new message.
 */
function resetForm() {
    messageInput.value = '';
    deliveryYearsInput.value = '';
    errorMessage.textContent = '';
    confirmationMessage.classList.add('hidden');
    entryForm.classList.remove('hidden');
}

// --- EVENT LISTENERS ---
saveButton.addEventListener('click', createCalendarLink);
resetButton.addEventListener('click', resetForm); 