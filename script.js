let check = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    let yearValue;

    const daysInMonth = {
        leapYear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        nonLeapYear: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    };

    // Change style
    changeStyle = (inputInfo, input, labelClass) => {
        inputInfo.style.color = 'var(--light-red)';
        input.style.borderColor = 'var(--light-red)';
        document.querySelector(`.${labelClass}`).style.color = 'var(--light-red)';
    }

    yearValue = document.querySelector('input[name="yearInput"]').value.trim();

    // Check if year is a leap year
    let year;
    yearValue % 4 == 0  && yearValue ? (year = daysInMonth.leapYear) : (year = daysInMonth.nonLeapYear);

    let monthInput = document.querySelector('input[name="monthInput"]');

    // Day validation
    let inputInfoDay = document.querySelector('.inputInfoDay');
    let dayInput = document.querySelector('input[name="dayInput"]');
    let dayValue = dayInput.value.trim();
    let parsedDayValue = parseInt(dayValue);

    const checkMaxDayValue = (day, month) => {
        const maxDayValue = year[month - 1];
        
        if (day > maxDayValue) {
            inputInfoDay.innerHTML = `Max value for this <br> month: ${maxDayValue}`;
            changeStyle(inputInfoDay, dayInput, 'dayLabel');

            return false;
        }

        if (day > 31) {
            inputInfoDay.innerHTML = `Max value for day: 31`;
            changeStyle(inputInfoDay, dayInput, 'dayLabel');
            
            return false;
        }
    
        return true;
    };

    // Month validation
    let inputInfoMonth = document.querySelector('.inputInfoMonth');
    let monthValue = monthInput.value.trim();

    const checkMaxMonthValue = (month) => {
        if (month > 12) {
            inputInfoMonth.innerHTML = 'Month cannot be<br>greater than 12';
            changeStyle(inputInfoMonth, monthInput, 'monthLabel');

            return false;
        }
        return true;
    };

    // Year validation
    let inputInfoYear = document.querySelector('.inputInfoYear');
    let yearInput = document.querySelector('input[name="yearInput"]');
    yearValue = yearInput.value.trim();

    const checkMaxYearValue = (yearValue) => {

        if(validation(yearInput, inputInfoYear, yearValue, 'yearLabel'))
        {

        if (yearValue > currentYear) {
            inputInfoYear.innerHTML = `Year cannot exceed ${currentYear}`;
            changeStyle(inputInfoYear, yearInput, 'yearLabel');

            return false;
        }
    
        if (String(yearValue).length !== 4) {
            inputInfoYear.innerHTML = 'Year must have 4 digits';
            changeStyle(inputInfoYear, yearInput, 'yearLabel');

            return false;
        }
        return true;
    }

    };

    const validation = (input, inputInfo, value, labelClass, otherValidation) => {
        if (value === '') {
            inputInfo.innerHTML = 'This field is required';
            input.style.borderColor = 'var(--light-red)';
            document.querySelector(`.${labelClass}`).style.color = 'var(--light-red)';
            return false;
        } 
        else if (value <= 0) {
            inputInfo.innerHTML = 'The value in the field<br>must be greater than 0';
            input.style.borderColor = 'var(--light-red)';
            document.querySelector(`.${labelClass}`).style.color = 'var(--light-red)';
            return false;
        }
        else {
            inputInfo.innerHTML = '';
            input.style.borderColor = '';
            document.querySelector(`.${labelClass}`).style.color = '';
            return true;
        }
    };

    const clearResults = () => {
        let yearsP = document.querySelector('.yearsP');
        let monthsP = document.querySelector('.monthsP');
        let daysP = document.querySelector('.daysP');

        yearsP.innerHTML = '<span>--</span>years';
        monthsP.innerHTML = '<span>--</span>months';
        daysP.innerHTML = '<span>--</span>days';
    };

    clearResults();
    
    const isDayValid = checkMaxDayValue(parsedDayValue, parseInt(monthInput.value)) && validation(dayInput, inputInfoDay, dayValue, 'dayLabel');
    const isMonthValid = checkMaxMonthValue(parseInt(monthValue)) && validation(monthInput, inputInfoMonth, monthValue, 'monthLabel');
    const isYearValid = checkMaxYearValue(yearValue) && validation(yearInput, inputInfoYear, yearValue, 'yearLabel');

    if (isDayValid && isMonthValid && isYearValid) {
        // ---Main code---
        const enteredDate = new Date(`${yearValue}-${monthValue}-${dayValue}`);
        const timeDifferenceInMilliseconds = currentDate - enteredDate;

        let yearsDifference = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
        let monthsDifference = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        let daysDifference = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));

        const addZero = (difference) => {
            return String(difference).length < 2 ? String(difference).padStart(2, '0') : String(difference);
        };

        yearsDifference = addZero(yearsDifference);
        monthsDifference = addZero(monthsDifference);
        daysDifference = addZero(daysDifference);

        let yearsP = document.querySelector('.yearsP');
        let monthsP = document.querySelector('.monthsP');
        let daysP = document.querySelector('.daysP');

        yearsP.innerHTML = `<span>${yearsDifference}</span> ${yearsDifference === '01' ? 'year' : 'years'}`;
        monthsP.innerHTML = `<span>${monthsDifference}</span> ${monthsDifference === '01' ? 'month' : 'months'}`;
        daysP.innerHTML = `<span>${daysDifference}</span> ${daysDifference === '01' ? 'day' : 'days'}`;
    } else {
        console.log('Day validation:', isDayValid);
        console.log('Month validation:', isMonthValid);
        console.log('Year validation:', isYearValid);
    }
};
