document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear(),
    yearInput = document.getElementById('yearInput');

    if (yearInput) {
        yearInput.setAttribute('max', currentYear);
        yearInput.setAttribute('min', 1000);
    }
});

let check = () => {
    const currentDate = new Date(),
    currentYear = currentDate.getFullYear(),
    isCurrentYearLeap = currentYear % 4 === 0 && (currentYear % 100 !== 0 || currentYear % 400 === 0),
    daysInMonth = [31, isCurrentYearLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Change style of an input field
    const changeStyle = (inputInfo, input, labelClass) => {
        inputInfo.style.color = 'var(--light-red)';
        input.style.borderColor = 'var(--light-red)';
        document.querySelector(`.${labelClass}`).style.color = 'var(--light-red)';
    };

    // Get trimmed value from an input field
    const getInputValue = (input) => {
        return input.value.trim();
    };

    // Declare input elements and related info elements
    const yearInput = document.querySelector('input[name="yearInput"]'),
    monthInput = document.querySelector('input[name="monthInput"]'),
    inputInfoDay = document.querySelector('.inputInfoDay'),
    dayInput = document.querySelector('input[name="dayInput"]'),
    inputInfoMonth = document.querySelector('.inputInfoMonth'),
    inputInfoYear = document.querySelector('.inputInfoYear');

    // Get values and parsed values from input fields
    const yearValue = getInputValue(yearInput),
    monthValue = getInputValue(monthInput),
    dayValue = getInputValue(dayInput),
    parsedDayValue = parseInt(dayValue);

    // Check if the entered day value is valid for the selected month, considering leap years
    const checkMaxDayValue = (day, month, year) => {
        const maxDayValue = daysInMonth[month - 1];

        if (month === 2 && isCurrentYearLeap && year == currentYear) {
            if (day > maxDayValue + 1) {
                inputInfoDay.innerHTML = `Max value for this<br>month: ${maxDayValue}`;
                changeStyle(inputInfoDay, dayInput, 'dayLabel');
                return false;
            }
        } else {
            if (day > maxDayValue || day > 31) {
                const message = day > maxDayValue ? `Max value for this<br>month: ${maxDayValue}` : `Max value for<br>day: 31`;
                inputInfoDay.innerHTML = `${message}`;
                changeStyle(inputInfoDay, dayInput, 'dayLabel');
                return false;
            }
        }
        return true;
    };

    // Check if the entered month value is valid
    const checkMaxMonthValue = (month) => {
        if (month > 12) {
            inputInfoMonth.innerHTML = 'Month cannot be<br>greater than 12';
            changeStyle(inputInfoMonth, monthInput, 'monthLabel');
            return false;
        }
        return true;
    };

    // Check if the entered year value is valid
    const checkMaxYearValue = (yearValue) => {
        if (validation(yearInput, inputInfoYear, yearValue, 'yearLabel')) {
            if (yearValue > currentYear) {
                inputInfoYear.innerHTML = `Year cannot exceed ${currentYear}<br>&nbsp;`;
                changeStyle(inputInfoYear, yearInput, 'yearLabel');
                return false;
            }

            if (String(yearValue).length !== 4) {
                inputInfoYear.innerHTML = 'Year must have 4 digits<br>&nbsp;';
                changeStyle(inputInfoYear, yearInput, 'yearLabel');
                return false;
            }
        }
        return true;
    };

    // General validation function for input fields
    const validation = (input, inputInfo, value, labelClass) => {
        if (value === '' || value <= 0) {
            inputInfo.innerHTML = value === '' ? 'This field is required<br>&nbsp;' : 'The value must be<br>greater than 0';
            input.style.borderColor = 'var(--light-red)';
            document.querySelector(`.${labelClass}`).style.color = 'var(--light-red)';
            return false;
        } else {
            inputInfo.innerHTML = '&nbsp<br>&nbsp;';
            input.style.borderColor = '';
            document.querySelector(`.${labelClass}`).style.color = '';
            return true;
        }
    };

    // Clear result placeholders before displaying new results
    const clearResults = () => {
        ['yearsP', 'monthsP', 'daysP'].forEach((element) => {
            document.querySelector(`.${element}`).innerHTML = `<span>--</span>${element === 'yearsP' ? 'year' : (element === 'monthsP' ? 'month' : 'day')}s`;
        });
    };

    clearResults();

    // Perform input validation and display calculated date differences if input is valid
    const isDayValid = checkMaxDayValue(parsedDayValue, parseInt(monthValue), parseInt(yearValue)) && validation(dayInput, inputInfoDay, dayValue, 'dayLabel'),
    isMonthValid = checkMaxMonthValue(parseInt(monthValue)) && validation(monthInput, inputInfoMonth, monthValue, 'monthLabel'),
    isYearValid = checkMaxYearValue(yearValue) && validation(yearInput, inputInfoYear, yearValue, 'yearLabel');

    if (isDayValid && isMonthValid && isYearValid) {
        // Check if the entered date is not in the future
        const enteredDate = new Date(`${yearValue}-${monthValue}-${dayValue}`);
        if (enteredDate > currentDate) {
            inputInfoMonth.innerHTML = 'Entered date is<br>in the future.';
            return;
        }

        // Calculate date differences
        const timeDifferenceInMilliseconds = currentDate - enteredDate;

        let yearsDifference = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)),
        monthsDifference = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44)),
        daysDifference = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));

        // Add leading zeros to single-digit differences
        const addZero = (difference) => {
            return String(difference).length < 2 ? String(difference).padStart(2, '0') : String(difference);
        };

        // Display calculated differences in HTML
        let yearsP = document.querySelector('.yearsP'),
        monthsP = document.querySelector('.monthsP'),
        daysP = document.querySelector('.daysP');

        yearsP.innerHTML = `<span>${addZero(yearsDifference)}</span> ${yearsDifference === 1 ? 'year' : 'years'}`;
        monthsP.innerHTML = `<span>${addZero(monthsDifference)}</span> ${monthsDifference === 1 ? 'month' : 'months'}`;
        daysP.innerHTML = `<span>${addZero(daysDifference)}</span> ${daysDifference === 1 ? 'day' : 'days'}`;
    } else {
        // Log validation errors to the console
        console.log('Day validation:', isDayValid);
        console.log('Month validation:', isMonthValid);
        console.log('Year validation:', isYearValid);
    }
};
