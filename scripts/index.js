const beerBtn = document.querySelector('.beer')
const wineBtn = document.querySelector('.wine')
const startBtn = document.querySelector('.start-game')
const menu = document.querySelector('.menu')
let chooseH = '', chooseR = '', whoStep = '', difficulte = 'M'
let whoWinner = ''

let date = new Date()

const audioBeer = new Audio()
audioBeer.src = './assets/audio/beer.mp3'
const audioWine = new Audio()
audioWine.src = './assets/audio/wine.mp3'
const audioWin = new Audio()
audioWin.src = './assets/audio/win.mp3'
const audioLose = new Audio()
audioLose.src = './assets/audio/lose.mp3'
const audioDraw = new Audio()
audioDraw.src = './assets/audio/draw.mp3'

const middleBtn = document.querySelector('.middle-dif')
const hardBtn = document.querySelector('.hard-dif')

let countWin = 0
let countLose = 0
let countDraw = 0

const allResultsList = document.querySelectorAll('.last-game')
const allResults = []
allResultsList.forEach((el) => {
    allResults.push(el)
})
let last10StrRes = []
const gameListBtn = document.querySelector('.game-list')
const resetScoreBtn = document.querySelector('.reset-score')

const volumeBtn = document.querySelector('.vol')

const aboutBtn = document.querySelector('.about')
const aboutBlock = document.querySelector('.about-block')

aboutBtn.addEventListener('mouseover', () => {
    aboutBlock.classList.add('about-block-vis')
})

aboutBtn.addEventListener('mouseout', () => {
    aboutBlock.classList.remove('about-block-vis')
})

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('volume')
    volumeBtn.classList.toggle('volume-off')
    if(volumeBtn.classList.contains('volume')) {
        localStorage.removeItem('volume')
        audioBeer.volume = 0.5
        audioDraw.volume = 0.5
        audioLose.volume = 0.5
        audioWin.volume = 0.5
        audioWine.volume = 0.5
    } else {
        localStorage.setItem('volume', 1)
        audioBeer.volume = 0
        audioDraw.volume = 0
        audioLose.volume = 0
        audioWin.volume = 0
        audioWine.volume = 0
    }
})

if(localStorage.getItem('volume') != null) {
    volumeBtn.classList.toggle('volume')
    volumeBtn.classList.toggle('volume-off')
    audioBeer.volume = 0
    audioDraw.volume = 0
    audioLose.volume = 0
    audioWin.volume = 0
    audioWine.volume = 0
}

resetScoreBtn.addEventListener('click', () => {
    let isReal = confirm('Are you sure you want to clear the counter? The result of the last 10 games will remain.')
    if(isReal == true) {
        countWin = 0
        countLose = 0
        countDraw = 0
        document.querySelector('.score-game').innerHTML = (countWin + countLose + countDraw)
        document.querySelector('.score-win').innerHTML = countWin
        document.querySelector('.score-draw').innerHTML = countDraw
        document.querySelector('.score-lose').innerHTML = countLose
        localStorage.setItem('win', 0)
        localStorage.setItem('draw', 0)
        localStorage.setItem('lose', 0)
    }
})

gameListBtn.addEventListener('click', () => {
    document.querySelector('.table-res').classList.toggle('unvis')
})

if(localStorage.getItem('win') != null) {
    countWin = localStorage.getItem('win')
}

if(localStorage.getItem('draw') != null) {
    countDraw = localStorage.getItem('draw')
}

if(localStorage.getItem('lose') != null) {
    countLose = localStorage.getItem('lose')
}

if(localStorage.getItem('lastGames0') != '') {
    for(let i = 0; i < 10; ++i) {
        if(localStorage.getItem('lastGames' + i) != null) {
            last10StrRes.push(localStorage.getItem('lastGames' + i))
        }
    }
    removeLastRes()
}

function removeLastRes() {
    document.querySelector('.score-game').innerHTML = (Number(countWin) + Number(countLose) + Number(countDraw))
    document.querySelector('.score-win').innerHTML = countWin
    document.querySelector('.score-draw').innerHTML = countDraw
    document.querySelector('.score-lose').innerHTML = countLose
    if(last10StrRes.length > 10) {
        last10StrRes = last10StrRes.slice(0, 10)
    }
    for(let i = 0; i < last10StrRes.length; ++i) {
        localStorage.setItem('lastGames' + i, last10StrRes[i])
        let tempArr = last10StrRes[i].split(' ')
        if(tempArr[0] == 'W') {   
            allResults[i].querySelector('.res').innerHTML = 'Win'
            allResults[i].querySelector('.res').style.color = 'green'
        } else if(tempArr[0] == 'L') {
            allResults[i].querySelector('.res').innerHTML = 'Lose'
            allResults[i].querySelector('.res').style.color = 'red'
        } else {
            allResults[i].querySelector('.res').innerHTML = 'Draw'
            allResults[i].querySelector('.res').style.color = 'yellow'
        }
        if(tempArr[1] == 'beer') {
            allResults[i].querySelector('.choose-static').innerHTML = 'Beer'
            allResults[i].querySelector('.choose-static').style.color = 'gold'
        } else {
            allResults[i].querySelector('.choose-static').innerHTML = 'Wine'
            allResults[i].querySelector('.choose-static').style.color = 'DarkRed'
        }
        allResults[i].querySelector('.moves').innerHTML = 'Moves: ' + tempArr[2]
        if(tempArr[3] == 'M') {
            allResults[i].querySelector('.dif-game').innerHTML = 'Medium'
            allResults[i].querySelector('.dif-game').style.color = 'OrangeRed'
        } else {     
            allResults[i].querySelector('.dif-game').innerHTML = 'Hard'    
            allResults[i].querySelector('.dif-game').style.color = 'DarkRed'
        }
        allResults[i].querySelector('.date').innerHTML = tempArr[5] + ' ' + tempArr[6] + ' ' + tempArr[7] + ' ' + tempArr[8]      
    }
}

let mdl = () => {
    hardBtn.classList.remove('active')
    middleBtn.classList.add('active')
    difficulte = 'M'
}

let hrd = () => {
    hardBtn.classList.add('active')
    middleBtn.classList.remove('active')
    difficulte = 'H'
}

function addDifClick() { 
    middleBtn.addEventListener('click', mdl)
    hardBtn.addEventListener('click', hrd)
}

function removeDifClick() {  
    middleBtn.removeEventListener('click', mdl)
    hardBtn.removeEventListener('click', hrd)
}

addDifClick()

const allAreaList = document.querySelectorAll('.min-area')
let allArea = []
allAreaList.forEach((elem) => {
    allArea.push(elem)
})

let startGameF = () => {
    if(chooseH != '' ) {
        removeDifClick()
    document.querySelector('.area-lines').classList.add('area-lines-vis')
        allArea.forEach((ar) => {
            ar.classList.remove('areaWine')
            ar.classList.remove('areaBeer')
    })
    if(chooseH == 'wine') {
        whoStep = 'R'
    }
        whoWinner = ''
        arrAreaNum = []
        addClick();
        startBtn.removeEventListener('click', startGameF)
        startGame();
    }
}

startBtn.addEventListener('click', startGameF)

let addClickFun = (area) =>  {
    if(area.target.classList.contains('areaBeer') == false && area.target.classList.contains('areaWine') == false) {
        if(chooseH == 'beer') {
            audioBeer.play()
            whoStep = 'R'
            area.target.classList.add('areaBeer')
            arrAreaNum.push(allArea.indexOf(area.target))
            removeClick()
            checkWinner()
            startGame()
        } else {
            audioWine.play()
            whoStep = 'R'
            area.target.classList.add('areaWine')
            arrAreaNum.push(allArea.indexOf(area.target))
            removeClick()
            checkWinner()
            startGame()
        }    
    }         
}

function addClick() {
    for(let i = 0; i < allArea.length; ++i) {
        allArea[i].addEventListener('click', addClickFun)
    }
}

function removeClick() {
    allArea.forEach((area) => {
        area.removeEventListener('click', addClickFun)
    })
}

beerBtn.addEventListener('click', () => {
    allArea.forEach((ar) => {
        ar.classList.remove('areaWine')
        ar.classList.remove('areaBeer')
})
    chooseH = 'beer'
    chooseR = 'wine'
    whoStep = 'H'
    menu.classList.add('unvis')
})

wineBtn.addEventListener('click', () => {
    allArea.forEach((ar) => {
        ar.classList.remove('areaWine')
        ar.classList.remove('areaBeer')
})
    chooseH = 'wine'
    chooseR = 'beer'
    whoStep = 'R'
    menu.classList.add('unvis')
})

let arrAreaNum = []

function startGame() {
    if(whoWinner != '') {
        startBtn.addEventListener('click', startGameF)
        date = new Date()
        addDifClick()
        setTimeout(document.querySelector('.area-lines').classList.remove('area-lines-vis'), 1000)
        menu.classList.remove('unvis')
        if(whoWinner == chooseH) {
            ++countWin
            localStorage.setItem('win', countWin)
            audioWin.play()
            document.querySelector('.menu-p').innerHTML = 'You Won! Moves count: ' + arrAreaNum.length
            last10StrRes.unshift('W '+ chooseH + ' ' + arrAreaNum.length + ' ' + difficulte + ' ' + date)
        } else if (whoWinner == chooseR){
            ++countLose
            localStorage.setItem('lose', countLose)
            audioLose.play()
            document.querySelector('.menu-p').innerHTML = 'You Lose! Moves count: ' + arrAreaNum.length
            last10StrRes.unshift('L '+ chooseH + ' ' + arrAreaNum.length + ' '  + difficulte + ' ' + date)
        } else if (whoWinner == 'none'){
            ++countDraw
            localStorage.setItem('draw', countDraw)
            audioDraw.play()
            document.querySelector('.menu-p').innerHTML = 'Draw! Moves count: ' + arrAreaNum.length
            last10StrRes.unshift('D '+ chooseH + ' ' + arrAreaNum.length + ' ' + difficulte + ' '  + date)
        }
    removeLastRes()
    whoWinner = ''
    chooseH = ''
    chooseR = ''
    removeClick()
    arrAreaNum = []
}    
    else if(whoStep == 'H') {
        addClick()
    } else if(whoStep == 'R'){
        removeClick()
        setTimeout(computerStep, 1000)
        checkWinner()
    }
}

function checkWinner() {
    if(allArea[3].classList.contains('areaWine') && allArea[4].classList.contains('areaWine') && allArea[5].classList.contains('areaWine') ||
    allArea[0].classList.contains('areaWine') && allArea[1].classList.contains('areaWine') && allArea[2].classList.contains('areaWine') ||
    allArea[6].classList.contains('areaWine') && allArea[7].classList.contains('areaWine') && allArea[8].classList.contains('areaWine') ||
    allArea[0].classList.contains('areaWine') && allArea[3].classList.contains('areaWine') && allArea[6].classList.contains('areaWine') ||
    allArea[1].classList.contains('areaWine') && allArea[4].classList.contains('areaWine') && allArea[7].classList.contains('areaWine') ||
    allArea[2].classList.contains('areaWine') && allArea[5].classList.contains('areaWine') && allArea[8].classList.contains('areaWine') ||
    allArea[0].classList.contains('areaWine') && allArea[4].classList.contains('areaWine') && allArea[8].classList.contains('areaWine') ||
    allArea[6].classList.contains('areaWine') && allArea[4].classList.contains('areaWine') && allArea[2].classList.contains('areaWine'))
    {
        whoWinner = 'wine'
    }
     else if(allArea[3].classList.contains('areaBeer') && allArea[4].classList.contains('areaBeer') && allArea[5].classList.contains('areaBeer') ||
    allArea[0].classList.contains('areaBeer') && allArea[1].classList.contains('areaBeer') && allArea[2].classList.contains('areaBeer') ||
    allArea[6].classList.contains('areaBeer') && allArea[7].classList.contains('areaBeer') && allArea[8].classList.contains('areaBeer') ||
    allArea[0].classList.contains('areaBeer') && allArea[3].classList.contains('areaBeer') && allArea[6].classList.contains('areaBeer') ||
    allArea[1].classList.contains('areaBeer') && allArea[4].classList.contains('areaBeer') && allArea[7].classList.contains('areaBeer') ||
    allArea[2].classList.contains('areaBeer') && allArea[5].classList.contains('areaBeer') && allArea[8].classList.contains('areaBeer') ||
    allArea[0].classList.contains('areaBeer') && allArea[4].classList.contains('areaBeer') && allArea[8].classList.contains('areaBeer') ||
    allArea[6].classList.contains('areaBeer') && allArea[4].classList.contains('areaBeer') && allArea[2].classList.contains('areaBeer')) 
    {
        whoWinner = 'beer'
    } else if(arrAreaNum.length == 9) {
        whoWinner = 'none'
    }
}

function computerStep() {
    let countArea
    if(difficulte == 'M') {
        countArea = mediumStep()    
    } else {
        countArea = hardStep()
    } 
    if(chooseR == 'beer') {
        audioBeer.play()
        whoStep = 'H'
        allArea[countArea].classList.add('areaBeer')
        arrAreaNum.push(countArea)
        checkWinner()
        startGame()
    } else {
        audioWine.play()
        whoStep = 'H'
        allArea[countArea].classList.add('areaWine')
        arrAreaNum.push(countArea)
        checkWinner()
        startGame()
    }       
}

function mediumStep() {
    let num = Math.floor(Math.random() * 9)
    if(arrAreaNum.includes(4) == false) {
        num = 4
    } else if (allArea[0].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[1].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[2].classList.contains(chooseR)) {
        num = 2
    } else if (allArea[1].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[2].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[0].classList.contains(chooseR)) {
        num = 0
    } else if (allArea[0].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[2].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[1].classList.contains(chooseR)) {
        num = 1
    } else if (allArea[3].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[4].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[5].classList.contains(chooseR)) {
        num = 5
    } else if (allArea[3].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[5].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[4].classList.contains(chooseR)) {
        num = 4
    } else if (allArea[4].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[5].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[3].classList.contains(chooseR)) {
        num = 3
    } else if (allArea[6].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[7].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[8].classList.contains(chooseR)) {
        num = 8
    } else if (allArea[6].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[8].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[7].classList.contains(chooseR)) {
        num = 7
    } else if (allArea[7].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[8].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[6].classList.contains(chooseR)) {
        num = 6
    } else if (allArea[0].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[3].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[6].classList.contains(chooseR)) {
        num = 6
    } else if(allArea[0].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[6].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[3].classList.contains(chooseR)) {
        num = 3
    } else if(allArea[3].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[6].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[0].classList.contains(chooseR)) {
        num = 0
    } else if(allArea[0].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[3].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[6].classList.contains(chooseR)) {
        num = 6
    } else if(allArea[1].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[4].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[7].classList.contains(chooseR)) {
        num = 7
    } else if(allArea[7].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[4].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[1].classList.contains(chooseR)) {
        num = 1
    } else if(allArea[1].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[7].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[4].classList.contains(chooseR)) {
        num = 4
    } else if(allArea[0].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[4].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[8].classList.contains(chooseR)) {
        num = 8
    } else if(allArea[1].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[8].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[4].classList.contains(chooseR)) {
        num = 4
    } else if(allArea[8].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[4].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[0].classList.contains(chooseR)) {
        num = 0
    } else if(allArea[2].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[4].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[6].classList.contains(chooseR)) {
        num = 6
    } else if(allArea[2].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[6].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[4].classList.contains(chooseR)) {
        num = 4
    } else if(allArea[4].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && allArea[6].classList.contains('area' + chooseH[0].toUpperCase() + chooseH.substr(1)) && !allArea[2].classList.contains(chooseR)) {
        num = 2
    } 
    while(arrAreaNum.includes(num) == true) {
        num = Math.floor(Math.random() * 9)
    }

    return num
}

function hardStep() {
    let num = Math.floor(Math.random() * 9)
    while(arrAreaNum.includes(num) == true) {
        num = Math.floor(Math.random() * 9)
    }

    if(chooseR == 'beer') {
        if(arrAreaNum.length == 0) {
            num = 0
        } else if (arrAreaNum.length == 2) {
            if(allArea[4].classList.contains('areaWine')) {
                num = 8
            } else if(arrAreaNum[1] % 2 == 1) {
                num = 4
            } else if(arrAreaNum[1] != 8){
                num = 8
            } else {
                num = 4
            }
        } else if(arrAreaNum.length == 4) {
            if(allArea[0].classList.contains('areaBeer') && allArea[4].classList.contains('areaBeer')
            && allArea[8].classList.contains('areaWine') && allArea[5].classList.contains('areaWine')) {
                num = 2
            }
            else if(allArea[4].classList.contains('areaWine') && arrAreaNum[3] % 2 == 1) {
                if(arrAreaNum[3] == 1) {
                    num = 7
                } else if(arrAreaNum[3] == 3) {
                    num = 5
                } else if(arrAreaNum[3] == 5) {
                    num = 3
                } else {
                    num = 1
                }
            } else if(arrAreaNum[2] == 4) {
                if(!allArea[8].classList.contains('areaWine')) {
                    num = 8
                } else if(allArea[6].classList.contains('areaWine') && allArea[8].classList.contains('areaWine')) {
                    num = 7
                } else if(allArea[2].classList.contains('areaWine') && allArea[8].classList.contains('areaWine')) {
                    num = 5
                } else if (!allArea[3].classList.contains('areaWine')){
                    num = 6
                } else {
                    num = 2
                }
            } else if(!allArea[4].classList.contains('areaWine')) {
                num = 4
            }
            else if(!allArea[6].classList.contains('areaWine')){
                num = 6
            } else {
                num = 2
            }
        } else if(arrAreaNum.length == 6) {
            if(allArea[4].classList.contains('areaWine') && arrAreaNum[3] % 2 == 1) {
                if(arrAreaNum[5] == 6) {
                    num = 2
                } else if(arrAreaNum[5] == 2) {
                    num = 6
                }
            } else if(arrAreaNum[2] == 4 && arrAreaNum[4] == 6) {
                if (!allArea[3].classList.contains('areaWine')) {
                    num = 3
                } else if(!allArea[2].classList.contains('areaWine')) {
                    num = 2
                }
            } else if(arrAreaNum[2] == 4 && arrAreaNum[4] == 2) {
                if(!allArea[6].classList.contains('areaWine')) {
                    num = 6
                } else if(!allArea[1].classList.contains('areaWine')) {
                    num = 1
                }
            } else if(arrAreaNum[0] == 0 && arrAreaNum[2] == 8 && arrAreaNum[4] == 6) {
                if(!allArea[3].classList.contains('areaWine')) {
                    num = 3
                } else {
                    num = 7
                }
            } else if(arrAreaNum[0] == 0 && arrAreaNum[2] == 8 && arrAreaNum[4] == 2) {
                if(!allArea[1].classList.contains('areaWine')) {
                    num = 1
                } else {
                    num = 5
                }
            }
        }
    } else {
        if(arrAreaNum.length == 1) {
            if(arrAreaNum[0] != 4) {
                num = 4
            } else {
                num = 8
            }
        } else if(arrAreaNum.length == 3) {
            if(arrAreaNum[0] == 4) {
                if(arrAreaNum[2] == 0) {
                    num = 2
                } else if(arrAreaNum[2] == 2) {
                    num = 6
                } else if(arrAreaNum[2] == 1) {
                    num = 7
                } else if(arrAreaNum[2] == 3) {
                    num = 5
                } else if(arrAreaNum[2] == 5) {
                    num = 3
                } else if(arrAreaNum[2] == 6) {
                    num = 2
                } else if(arrAreaNum[2] == 7) {
                    num = 1
                } else {
                    num = 2
                }
            } else {
                if(arrAreaNum[0] == 0 && arrAreaNum[2] == 1 || arrAreaNum[0] == 1 && arrAreaNum[2] == 0) {
                    num = 2
                } else if(arrAreaNum[0] == 0 && arrAreaNum[2] == 2 || arrAreaNum[0] == 2 && arrAreaNum[2] == 0) {
                    num = 1
                } else if(arrAreaNum[0] == 0 && arrAreaNum[2] == 3 || arrAreaNum[0] == 3 && arrAreaNum[2] == 0) {
                    num = 6
                } else if(arrAreaNum[0] == 0 && arrAreaNum[2] == 6 || arrAreaNum[0] == 6 && arrAreaNum[2] == 0) {
                    num = 3
                } else if(arrAreaNum[0] == 3 && arrAreaNum[2] == 6 || arrAreaNum[0] == 6 && arrAreaNum[2] == 3) {
                    num = 0
                } else if(arrAreaNum[0] == 1 && arrAreaNum[2] == 2 || arrAreaNum[0] == 2 && arrAreaNum[2] == 1) {
                    num = 0
                } else if(arrAreaNum[0] == 8 && arrAreaNum[2] == 7 || arrAreaNum[0] == 7 && arrAreaNum[2] == 8) {
                    num = 6
                } else if(arrAreaNum[0] == 6 && arrAreaNum[2] == 7 || arrAreaNum[0] == 7 && arrAreaNum[2] == 6) {
                    num = 8
                } else if(arrAreaNum[0] == 8 && arrAreaNum[2] == 6 || arrAreaNum[0] == 6 && arrAreaNum[2] == 8) {
                    num = 7
                } else if(arrAreaNum[0] == 8 && arrAreaNum[2] == 5 || arrAreaNum[0] == 5 && arrAreaNum[2] == 8) {
                    num = 2
                } else if(arrAreaNum[0] == 8 && arrAreaNum[2] == 2 || arrAreaNum[0] == 2 && arrAreaNum[2] == 8) {
                    num = 5
                } else if(arrAreaNum[0] == 5 && arrAreaNum[2] == 2 || arrAreaNum[0] == 2 && arrAreaNum[2] == 5) {
                    num = 8
                }
            }
        } else if(arrAreaNum.length == 5) {
            if(allArea[4].classList.contains('areaBeer')) {
                if(allArea[0].classList.contains('areaBeer') && !allArea[8].classList.contains('areaWine')) {
                    num = 8
                } else if(allArea[1].classList.contains('areaBeer') && !allArea[7].classList.contains('areaWine')) {
                    num = 7
                } else if(allArea[2].classList.contains('areaBeer') && !allArea[6].classList.contains('areaWine')) {
                    num = 6
                } else if(allArea[3].classList.contains('areaBeer') && !allArea[5].classList.contains('areaWine')) {
                    num = 5
                } else if(allArea[5].classList.contains('areaBeer') && !allArea[3].classList.contains('areaWine')) {
                    num = 3
                } else if(allArea[6].classList.contains('areaBeer') && !allArea[2].classList.contains('areaWine')) {
                    num = 2
                } else if(allArea[7].classList.contains('areaBeer') && !allArea[1].classList.contains('areaWine')) {
                    num = 1
                } else if(allArea[8].classList.contains('areaBeer') && !allArea[0].classList.contains('areaWine')) {
                    num = 0
                }
            } else {
                if(allArea[0].classList.contains('areaBeer') && allArea[2].classList.contains('areaBeer') 
                && !allArea[1].classList.contains('areaWine')) {
                    num = 1
                } else if(allArea[0].classList.contains('areaBeer') && allArea[1].classList.contains('areaBeer') 
                && !allArea[2].classList.contains('areaWine')) {
                    num = 2
                } else if(allArea[1].classList.contains('areaBeer') && allArea[2].classList.contains('areaBeer') 
                && !allArea[0].classList.contains('areaWine')) {
                    num = 0
                } else if(allArea[0].classList.contains('areaBeer') && allArea[3].classList.contains('areaBeer') 
                && !allArea[6].classList.contains('areaWine')) {
                    num = 6
                } else if(allArea[0].classList.contains('areaBeer') && allArea[6].classList.contains('areaBeer') 
                && !allArea[3].classList.contains('areaWine')) {
                    num = 3
                } else if(allArea[3].classList.contains('areaBeer') && allArea[6].classList.contains('areaBeer') 
                && !allArea[0].classList.contains('areaWine')) {
                    num = 0
                } else if(allArea[8].classList.contains('areaBeer') && allArea[7].classList.contains('areaBeer') 
                && !allArea[6].classList.contains('areaWine')) {
                    num = 6
                }else if(allArea[6].classList.contains('areaBeer') && allArea[7].classList.contains('areaBeer') 
                && !allArea[8].classList.contains('areaWine')) {
                    num = 8
                }else if(allArea[6].classList.contains('areaBeer') && allArea[8].classList.contains('areaBeer') 
                && !allArea[7].classList.contains('areaWine')) {
                    num = 7
                }else if(allArea[5].classList.contains('areaBeer') && allArea[8].classList.contains('areaBeer') 
                && !allArea[2].classList.contains('areaWine')) {
                    num = 2
                }else if(allArea[5].classList.contains('areaBeer') && allArea[2].classList.contains('areaBeer') 
                && !allArea[8].classList.contains('areaWine')) {
                    num = 8
                }else if(allArea[2].classList.contains('areaBeer') && allArea[8].classList.contains('areaBeer') 
                && !allArea[5].classList.contains('areaWine')) {
                    num = 5
                }
            }
        } else if(arrAreaNum.length == 7) {
            if(arrAreaNum[0] == 4) {
                if(allArea[0].classList.contains('areaBeer') && !allArea[8].classList.contains('areaWine')) {
                    num = 8
                } else if(allArea[1].classList.contains('areaBeer') && !allArea[7].classList.contains('areaWine')) {
                    num = 7
                } else if(allArea[2].classList.contains('areaBeer') && !allArea[6].classList.contains('areaWine')) {
                    num = 6
                } else if(allArea[3].classList.contains('areaBeer') && !allArea[5].classList.contains('areaWine')) {
                    num = 5
                } else if(allArea[5].classList.contains('areaBeer') && !allArea[3].classList.contains('areaWine')) {
                    num = 3
                } else if(allArea[6].classList.contains('areaBeer') && !allArea[2].classList.contains('areaWine')) {
                    num = 2
                } else if(allArea[7].classList.contains('areaBeer') && !allArea[1].classList.contains('areaWine')) {
                    num = 1
                } else if(allArea[8].classList.contains('areaBeer') && !allArea[0].classList.contains('areaWine')) {
                    num = 0
                }
            } else {
                if(allArea[0].classList.contains('areaBeer') && allArea[2].classList.contains('areaBeer') 
                && !allArea[1].classList.contains('areaWine')) {
                    num = 1
                } else if(allArea[0].classList.contains('areaBeer') && allArea[1].classList.contains('areaBeer') 
                && !allArea[2].classList.contains('areaWine')) {
                    num = 2
                } else if(allArea[1].classList.contains('areaBeer') && allArea[2].classList.contains('areaBeer') 
                && !allArea[0].classList.contains('areaWine')) {
                    num = 0
                } else if(allArea[0].classList.contains('areaBeer') && allArea[3].classList.contains('areaBeer') 
                && !allArea[6].classList.contains('areaWine')) {
                    num = 6
                } else if(allArea[0].classList.contains('areaBeer') && allArea[6].classList.contains('areaBeer') 
                && !allArea[3].classList.contains('areaWine')) {
                    num = 3
                } else if(allArea[3].classList.contains('areaBeer') && allArea[6].classList.contains('areaBeer') 
                && !allArea[0].classList.contains('areaWine')) {
                    num = 0
                } else if(allArea[8].classList.contains('areaBeer') && allArea[7].classList.contains('areaBeer') 
                && !allArea[6].classList.contains('areaWine')) {
                    num = 6
                }else if(allArea[6].classList.contains('areaBeer') && allArea[7].classList.contains('areaBeer') 
                && !allArea[8].classList.contains('areaWine')) {
                    num = 8
                }else if(allArea[6].classList.contains('areaBeer') && allArea[8].classList.contains('areaBeer') 
                && !allArea[7].classList.contains('areaWine')) {
                    num = 7
                }else if(allArea[5].classList.contains('areaBeer') && allArea[8].classList.contains('areaBeer') 
                && !allArea[2].classList.contains('areaWine')) {
                    num = 2
                }else if(allArea[5].classList.contains('areaBeer') && allArea[2].classList.contains('areaBeer') 
                && !allArea[8].classList.contains('areaWine')) {
                    num = 8
                }else if(allArea[2].classList.contains('areaBeer') && allArea[8].classList.contains('areaBeer') 
                && !allArea[5].classList.contains('areaWine')) {
                    num = 5
                }
            }
        }
    }

    return num
}

