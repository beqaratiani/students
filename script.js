const data = {}
const lastId = 0
const studs = document.querySelector('#students')
let day = 0

const avg = (arr) => {
  let sum = arr.reduce((a, b) => a + b)
  return Math.round((sum / arr.length) * 10) / 10
}

const updateTotalDays = () => {
  const totalDays = document.querySelector('#total-days')
  totalDays.innerHTML = day
}

const updateTotalStud = () => {
  const counter = document.querySelector('#total-students')
  counter.innerHTML = Object.keys(data).length
}

const changeGrade = (e) => {
  let newGrade = +prompt('Enter Grade')
  console.log(newGrade + 2)
  e.target.innerHTML = newGrade
}

const addStud = document.querySelector('#add-stud')
addStud.addEventListener('click', () => {
  let name = prompt('Enter Student Name')
  if (name) {
    const newRow = document.createElement('div')
    newRow.classList.add('student-row')
    let insertName = document.createElement('h4')
    let insertAvg = document.createElement('h4')
    insertName.classList.add('student-name')
    insertAvg.classList.add('student-avg')
    insertName.innerHTML = name
    insertAvg.innerHTML = 0
    newRow.appendChild(insertName)
    newRow.appendChild(insertAvg)
    for (let i = 0; i < day; i++) {
      let dayStud = document.createElement('h4')
      dayStud.classList.add('day-stud')
      dayStud.innerHTML = 0
      newRow.appendChild(dayStud)
    }
    data[name] = new Array(day).fill(0)
    updateTotalStud()
    studs.appendChild(newRow)
  }
})

const remStud = document.querySelector('#rem-stud')
remStud.addEventListener('click', () => {
  if (Object.keys(data).length != 0) {
    studs.removeChild(studs.lastChild)
    delete data[Object.keys(data)[Object.keys(data).length - 1]]
    updateTotalStud()
  }
})

const dataRow = document.querySelector('.data')
const addDay = document.querySelector('#add-day')
addDay.addEventListener('click', () => {
  let newDay = document.createElement('h4')
  newDay.classList.add('day')
  day++
  updateTotalDays()
  if (studs) {
    const allStuds = document.querySelectorAll('.student-row')
    let index = 0
    for (student in data) {
      let dayStud = document.createElement('h4')
      dayStud.classList.add('day-stud')
      dayStud.innerHTML = 0
      allStuds[index].appendChild(dayStud)
      data[student].push(0)
      index++
    }
  }
  const allDays = document.querySelector('#students')
  newDay.innerHTML = `day ${day}`
  dataRow.appendChild(newDay)
  allDays.addEventListener('click', (e) => {
    changeGrade(e)
  })
})

const remDay = document.querySelector('#rem-day')
remDay.addEventListener('click', () => {
  const studentRows = document.querySelectorAll('.student-row')
  const dayRows = document.querySelector('.data')
  for (let i = 0; i < studentRows.length; i++) {
    if (studentRows[i].lastChild.className == 'day-stud') {
      console.log(dayRows)
      studentRows[i].removeChild(studentRows[i].lastChild)
    }
  }
  if (dayRows.lastChild.className == 'day') {
    dayRows.removeChild(dayRows.lastChild)
    day--
    updateTotalDays()
  }
  for (stud in data) {
    data[stud].pop()
  }
})
