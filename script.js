const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('questions-container');
const questionsElements = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-btn')

let shuffledQuestions, currentquestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', ()=> {
    currentquestionIndex++
    setNextQuestion()
})

function startGame(){
    console.log("game start");
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(()=> Math.random() - 0.5)
    currentquestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentquestionIndex])
}
function showQuestion(question){
    questionsElements.innerText = question.question
    question.answers.forEach(answer =>{
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectButton = e.target
    const correct = selectButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentquestionIndex + 1){
        nextButton.classList.remove('hide')
    }else{
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    nextButton.classList.remove('hide')
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions=[
    {   
        question: 'what is 2 + 2',
        answers: [
            {text: '4', correct: true},
            {text: '20', correct: false}
        ]
    }
]