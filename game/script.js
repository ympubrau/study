const timerText = document.getElementById('timer')
const attemptsText = document.getElementById('attempts')
const cards = document.getElementsByClassName('card')

let winArray
let timePassed = 0
let timer
let moves = 0
let gameStarted = false
let cardsAmount = 0
let openedCards = []
let animTime = '0.15s'
timerText.innerText = '00:00'
attemptsText.innerText = '0'

for (let i = 0; i < cards.length; i += 1) {
    cards[i].addEventListener('click', (evt) => performMove(evt, i))
}

function convertSecondstoTime(given_seconds) {
    minutes = Math.floor((given_seconds / 60));
    seconds = given_seconds  - (minutes * 60);

    timeString = 
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0');

    return timeString
}

function setToQuestions() {
    clearInterval(timer)
    gameStarted = false
    cardsAmount = 0
    timePassed = 0
    moves = 0
    timerText.innerText = convertSecondstoTime(timePassed)
    attemptsText.innerText = 0
    for (const iterator of cards) {
        iterator.src = 'img/10.png'
        iterator.classList.remove('opened')
        iterator.style.border = 'none'
    }
}

function startGame() {
    document.getElementById('btn').innerText = 'Заново'
    if(!gameStarted) {
        gameStarted = true
        timer = setInterval(() => {
            timePassed += 1
            timerText.innerText = convertSecondstoTime(timePassed)
        }, 1000)

        winArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
        // winArray.sort(() => Math.random() - 0.5);

    } else {
        setToQuestions()
        startGame()
    }
}


function performMove(evt, i) {
    srcCard = evt.target
    if(!srcCard.classList.contains('opened') && openedCards.length != 2 && gameStarted) {
        srcCard.style.opacity = "0"
        srcCard.style.transition = animTime
        setTimeout(() => {
            srcCard.style.opacity = "1"
            srcCard.style.transition = animTime
            moves += 1
            attemptsText.innerText = moves
    
            openedCards.push(srcCard)
            srcCard.src = `img/${winArray[i] % 8 + 1}.png`
            srcCard.classList.add('opened')
    
    
            if(openedCards.length == 2) {
                if(openedCards[0].src == openedCards[1].src && openedCards[0] != openedCards[1]) {
                    openedCards[0].style.border = '1px solid green'
                    openedCards[0].style.borderRadius = '16px'
                    openedCards[1].style.border = '1px solid green'
                    openedCards[1].style.borderRadius = '16px'

                    openedCards = []
                    cardsAmount += 2
                    if(cardsAmount == 16) {
                        setTimeout(() => {
                            alert('Победа!')
                            setToQuestions()
                            startGame()
                        }, 200)
                    }
                } else {
                    setTimeout(() => {
                        openedCards[0].style.opacity = "0"
                        openedCards[0].style.transition = animTime
                        openedCards[1].style.opacity = "0"
                        openedCards[1].style.transition = animTime
                        setTimeout(() => {
                            openedCards[0].style.opacity = "1"
                            openedCards[0].style.transition = animTime
                            openedCards[1].style.opacity = "1"
                            openedCards[1].style.transition = animTime

                            openedCards[0].src = 'img/10.png'
                            openedCards[1].src = 'img/10.png'
                            openedCards[0].classList.remove('opened')
                            openedCards[1].classList.remove('opened')
                            openedCards = []
                        }, 250)

                    }, 750)
                }
            }
        }, 250)
       
        
    }
}


