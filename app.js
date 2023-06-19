//implemetação do botao dark
document.querySelector('.dark-mode-switch').onclick = () => {
    document.querySelector('body').classList.toggle('dark')
    document.querySelector('body').classList.toggle('light')
}

//verificar ano bissexto

const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400
        !==0) || (year % 100 === 0 && year % 400 ===0)  
}

const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

let calendar = document.querySelector('.calendar')

const month_names = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

let month_picker = document.querySelector('#month-picker')

let dataInput = document.querySelector('#dataInput')

month_picker = document.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

//Gerar Calendario
const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days')
    calendar_days.innerHTML = ''
    let calendar_header_year = document.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let currDate = new Date()

    month_picker.innerHTML = month_names[month]
    calendar_header_year.innerHTML = year

    let first_day = new Date(year, month, 1)

    for(let i = 0; i < days_of_month[month] + first_day.getDay(); i++){
        let day = document.createElement('div')
        let dateOfDay = [year, month, i - first_day.getDay() + 1]
        if(i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.onclick = () => selectDay(day, dateOfDay)
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if(i - first_day.getDay() + 1 === currDate.getDate() && year ===
            currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
                dataInput.value = currDate.toLocaleString().split(',')[0].split("/").reverse().join("-")
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div>${e}</div>`
    month.onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(curr_month.value, curr_year.value)
    } 
    month_list.appendChild(month)
})

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

selectDay = (day, dateOfDay) => {
    let old = document.querySelector('.curr-date')
    if(old != null){
        old.classList?.remove('curr-date')
    }
    day.classList.add('curr-date')
    let data = new Date(dateOfDay[0], dateOfDay[1], dateOfDay[2])
    dataInput.value = data.toISOString().split('T')[0]

}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)