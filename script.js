document.addEventListener('DOMContentLoaded', function() {
    // Game 1: Choose the correct plural
    const game1Questions = [
        { singular: "Child", options: ["children", "childs", "childes"], correct: "children" },
        { singular: "Bus", options: ["bus", "busses", "buses"], correct: "buses" },
        { singular: "Tooth", options: ["teeth", "tooths", "toothes"], correct: "teeth" },
        { singular: "Baby", options: ["babys", "babies", "babyes"], correct: "babies" },
        { singular: "Man", options: ["mans", "men", "mens"], correct: "men" },
        { singular: "Tomato", options: ["tomatos", "tomatoes", "tomatoies"], correct: "tomatoes" },
        { singular: "Wife", options: ["wifes", "wives", "wivies"], correct: "wives" },
        { singular: "Box", options: ["boxs", "boxes", "boxies"], correct: "boxes" },
        { singular: "Fish", options: ["fish", "fishes", "fishs"], correct: "fish" },
        { singular: "City", options: ["citys", "cities", "citis"], correct: "cities" }
    ];

    // Game 2: Drag and Drop - تم التحديث مع أخطاء شائعة
    const game2Pairs = [
        { 
            singular: "Man", 
            correct: "Men",
            incorrect: ["Mans", "Manes"]
        },
        { 
            singular: "Knife", 
            correct: "Knives",
            incorrect: ["Knifes", "Knive"]
        },
        { 
            singular: "Child", 
            correct: "Children",
            incorrect: ["Childs", "Childes"]
        },
        { 
            singular: "Box", 
            correct: "Boxes",
            incorrect: ["Boxs", "Boxen"]
        },
        { 
            singular: "Leaf", 
            correct: "Leaves",
            incorrect: ["Leafs", "Leavs"]
        },
        { 
            singular: "Foot", 
            correct: "Feet",
            incorrect: ["Feets", "Foots"]
        },
        { 
            singular: "Potato", 
            correct: "Potatoes",
            incorrect: ["Potatos", "Potaties"]
        },
        { 
            singular: "Woman", 
            correct: "Women",
            incorrect: ["Womans", "Womens"]
        }
    ];

    // Game 3: True or False
    const game3Questions = [
        { statement: "Mouse → Mouses", answer: false },
        { statement: "Goose → Geese", answer: true },
        { statement: "Book → Books", answer: true },
        { statement: "Baby → Babys", answer: false },
        { statement: "Series → Series", answer: true },
        { statement: "City → Citys", answer: false },
        { statement: "Tomato → Tomatoes", answer: true },
        { statement: "Foot → Feets", answer: false },
        { statement: "Tooth → Teeth", answer: true }
    ];

    // Game 4: Riddles
    const game4Riddles = [
        {
            question: "What gets bigger the more you take away from it?",
            answer: "hole",
            options: ["Tree", "Mountain", "Hole", "Balloon"]
        },
        {
            question: "What word starts with 'T' and ends with 'a', and if you remove the 'T', it becomes a fruit?",
            answer: "apple",
            options: ["Banana", "Orange", "Apple", "Tomato"]
        },
        {
            question: "I am a number. If you multiply me by myself, the result is 9. What number am I?",
            answer: "3",
            options: ["2", "3", "4", "5"]
        }
    ];

    // Game state variables
    let currentGame1Question = 0;
    let game1Score = 0;
    let currentGame2Pairs = [];
    let game2Score = 0;
    let currentGame3Question = 0;
    let game3Score = 0;
    let currentGame4Riddle = 0;
    let game4Score = 0;

    // DOM elements
    const game1Card = document.getElementById('game1Card');
    const game2Card = document.getElementById('game2Card');
    const game3Card = document.getElementById('game3Card');
    const game4Card = document.getElementById('game4Card');
    
    const game1Modal = document.getElementById('game1Modal');
    const game2Modal = document.getElementById('game2Modal');
    const game3Modal = document.getElementById('game3Modal');
    const game4Modal = document.getElementById('game4Modal');
    
    const closeBtns = document.querySelectorAll('.close-btn');
    
    const game1QuestionEl = document.getElementById('game1Question');
    const game1OptionsEl = document.getElementById('game1Options');
    const game1ScoreEl = document.getElementById('game1Score');
    const game1NextBtn = document.getElementById('game1NextBtn');
    const game1RestartBtn = document.getElementById('game1RestartBtn');
    
    const singularWordsEl = document.getElementById('singularWords');
    const pluralDropZonesEl = document.getElementById('pluralDropZones');
    const game2ScoreEl = document.getElementById('game2Score');
    const game2NextBtn = document.getElementById('game2NextBtn');
    const game2RestartBtn = document.getElementById('game2RestartBtn');
    
    const game3QuestionEl = document.getElementById('game3Question');
    const game3ScoreEl = document.getElementById('game3Score');
    const trueBtn = document.getElementById('trueBtn');
    const falseBtn = document.getElementById('falseBtn');
    const game3NextBtn = document.getElementById('game3NextBtn');
    const game3RestartBtn = document.getElementById('game3RestartBtn');
    
    const game4QuestionEl = document.getElementById('game4Question');
    const game4OptionsEl = document.getElementById('game4Options');
    const game4ScoreEl = document.getElementById('game4Score');
    const game4AnswerContainer = document.getElementById('game4AnswerContainer');
    const game4AnswerInput = document.getElementById('game4AnswerInput');
    const game4SubmitAnswer = document.getElementById('game4SubmitAnswer');
    const game4NextBtn = document.getElementById('game4NextBtn');
    const game4RestartBtn = document.getElementById('game4RestartBtn');
    
    const celebrationContainer = document.getElementById('celebrationContainer');
    const startBtn = document.getElementById('startBtn');

    // Event listeners
    game1Card.addEventListener('click', () => {
        startGame1();
        game1Modal.style.display = 'block';
    });
    
    game2Card.addEventListener('click', () => {
        startGame2();
        game2Modal.style.display = 'block';
    });
    
    game3Card.addEventListener('click', () => {
        startGame3();
        game3Modal.style.display = 'block';
    });
    
    game4Card.addEventListener('click', () => {
        startGame4();
        game4Modal.style.display = 'block';
    });
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    game1NextBtn.addEventListener('click', () => {
        currentGame1Question++;
        if (currentGame1Question < game1Questions.length) {
            loadGame1Question();
        } else {
            endGame1();
        }
    });
    
    game1RestartBtn.addEventListener('click', () => {
        currentGame1Question = 0;
        game1Score = 0;
        game1ScoreEl.textContent = game1Score;
        startGame1();
    });
    
    game2NextBtn.addEventListener('click', () => {
        startGame2();
    });
    
    game2RestartBtn.addEventListener('click', () => {
        game2Score = 0;
        game2ScoreEl.textContent = game2Score;
        startGame2();
    });
    
    game3NextBtn.addEventListener('click', () => {
        currentGame3Question++;
        if (currentGame3Question < game3Questions.length) {
            loadGame3Question();
        } else {
            endGame3();
        }
    });
    
    game3RestartBtn.addEventListener('click', () => {
        currentGame3Question = 0;
        game3Score = 0;
        game3ScoreEl.textContent = game3Score;
        startGame3();
    });
    
    game4NextBtn.addEventListener('click', () => {
        currentGame4Riddle++;
        if (currentGame4Riddle < game4Riddles.length) {
            loadGame4Riddle();
        } else {
            endGame4();
        }
    });
    
    game4RestartBtn.addEventListener('click', () => {
        currentGame4Riddle = 0;
        game4Score = 0;
        game4ScoreEl.textContent = game4Score;
        startGame4();
    });
    
    game4SubmitAnswer.addEventListener('click', checkGame4Answer);
    
    startBtn.addEventListener('click', () => {
        document.querySelector('.games-section').scrollIntoView({ behavior: 'smooth' });
    });

    // Game 1 functions
    function startGame1() {
        currentGame1Question = 0;
        game1Score = 0;
        game1ScoreEl.textContent = game1Score;
        loadGame1Question();
    }
    
    function loadGame1Question() {
        const question = game1Questions[currentGame1Question];
        game1QuestionEl.textContent = `ما هو جمع كلمة "${question.singular}"؟`;
        
        game1OptionsEl.innerHTML = '';
        question.options.forEach(option => {
            const optionEl = document.createElement('div');
            optionEl.classList.add('option');
            optionEl.textContent = option;
            optionEl.addEventListener('click', () => checkGame1Answer(option, question.correct));
            game1OptionsEl.appendChild(optionEl);
        });
        
        game1NextBtn.style.display = 'none';
    }
    
    function checkGame1Answer(selected, correct) {
        const options = document.querySelectorAll('#game1Options .option');
        options.forEach(option => {
            option.style.pointerEvents = 'none';
            if (option.textContent === correct) {
                option.classList.add('correct');
            } else if (option.textContent === selected && selected !== correct) {
                option.classList.add('incorrect');
            }
        });
        
        if (selected === correct) {
            game1Score++;
            game1ScoreEl.textContent = game1Score;
            showCelebration(true);
        } else {
            showCelebration(false);
        }
        
        game1NextBtn.style.display = 'block';
    }
    
    function endGame1() {
        game1QuestionEl.textContent = `انتهت اللعبة! نتيجتك النهائية: ${game1Score}/${game1Questions.length}`;
        game1OptionsEl.innerHTML = '';
        
        if (game1Score === game1Questions.length) {
            game1QuestionEl.innerHTML += '<br><span style="color: #4caf50; font-size: 1.5rem;">ممتاز! لقد أجبت على جميع الأسئلة بشكل صحيح!</span>';
        }
        
        game1NextBtn.style.display = 'none';
        game1RestartBtn.style.display = 'block';
    }

    // Game 2 functions - تم التحديث بشكل كامل
    function startGame2() {
        // Select 4 random pairs
        currentGame2Pairs = [...game2Pairs].sort(() => 0.5 - Math.random()).slice(0, 4);
        
        singularWordsEl.innerHTML = '';
        pluralDropZonesEl.innerHTML = '';
        
        // Create draggable singular words
        currentGame2Pairs.forEach(pair => {
            const dragItem = document.createElement('div');
            dragItem.classList.add('drag-item');
            dragItem.textContent = pair.singular;
            dragItem.draggable = true;
            dragItem.dataset.singular = pair.singular;
            
            dragItem.addEventListener('dragstart', dragStart);
            
            singularWordsEl.appendChild(dragItem);
        });
        
        // Create drop zones with correct and incorrect plurals
        currentGame2Pairs.forEach(pair => {
            // Create correct drop zone
            const correctDropZone = document.createElement('div');
            correctDropZone.classList.add('drop-zone');
            correctDropZone.textContent = pair.correct;
            correctDropZone.dataset.plural = pair.correct;
            correctDropZone.dataset.singular = pair.singular;
            correctDropZone.dataset.correct = "true";
            
            correctDropZone.addEventListener('dragover', dragOver);
            correctDropZone.addEventListener('dragleave', dragLeave);
            correctDropZone.addEventListener('drop', drop);
            
            pluralDropZonesEl.appendChild(correctDropZone);
            
            // Create incorrect drop zones (random selection)
            const randomIncorrect = pair.incorrect[Math.floor(Math.random() * pair.incorrect.length)];
            const incorrectDropZone = document.createElement('div');
            incorrectDropZone.classList.add('drop-zone');
            incorrectDropZone.textContent = randomIncorrect;
            incorrectDropZone.dataset.plural = randomIncorrect;
            incorrectDropZone.dataset.singular = pair.singular;
            incorrectDropZone.dataset.correct = "false";
            
            incorrectDropZone.addEventListener('dragover', dragOver);
            incorrectDropZone.addEventListener('dragleave', dragLeave);
            incorrectDropZone.addEventListener('drop', drop);
            
            pluralDropZonesEl.appendChild(incorrectDropZone);
        });
        
        // Shuffle the drop zones
        const dropZones = Array.from(pluralDropZonesEl.children);
        dropZones.sort(() => 0.5 - Math.random());
        dropZones.forEach(zone => pluralDropZonesEl.appendChild(zone));
        
        game2NextBtn.style.display = 'none';
        game2RestartBtn.style.display = 'none';
    }
    
    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.singular);
        e.target.classList.add('dragging');
    }
    
    function dragOver(e) {
        e.preventDefault();
        if (!e.target.classList.contains('filled')) {
            e.target.classList.add('drag-over');
        }
    }
    
    function dragLeave(e) {
        e.target.classList.remove('drag-over');
    }
    
    function drop(e) {
        e.preventDefault();
        e.target.classList.remove('drag-over');
        
        const singular = e.dataTransfer.getData('text/plain');
        const isCorrect = e.target.dataset.correct === "true";
        
        if (isCorrect) {
            e.target.innerHTML = `${singular} → ${e.target.dataset.plural}`;
            e.target.classList.add('filled');
            e.target.classList.remove('drop-zone');
            
            // Remove the dragged item
            document.querySelector(`.drag-item[data-singular="${singular}"]`).style.display = 'none';
            
            game2Score++;
            game2ScoreEl.textContent = game2Score;
            showCelebration(true);
        } else {
            e.target.innerHTML = `${singular} → ${e.target.dataset.plural} <span style="color:red">(خطأ)</span>`;
            e.target.classList.add('incorrect-drop');
            showCelebration(false);
        }
        
        // Check if all correct pairs are matched
        const remainingItems = document.querySelectorAll('.drag-item:not([style*="display: none"])');
        if (remainingItems.length === 0) {
            endGame2();
        }
    }
    
    function endGame2() {
        const dropZones = document.querySelectorAll('#pluralDropZones > div');
        dropZones.forEach(zone => {
            if (!zone.classList.contains('filled') && !zone.classList.contains('incorrect-drop')) {
                zone.textContent = 'إجابة خاطئة';
                zone.style.backgroundColor = '#ffebee';
            }
        });
        
        game2NextBtn.style.display = 'block';
        game2RestartBtn.style.display = 'block';
    }

    // Game 3 functions
    function startGame3() {
        currentGame3Question = 0;
        game3Score = 0;
        game3ScoreEl.textContent = game3Score;
        loadGame3Question();
    }
    
    function loadGame3Question() {
        const question = game3Questions[currentGame3Question];
        game3QuestionEl.textContent = `هل هذه صيغة الجمع الصحيحة؟\n${question.statement}`;
        
        trueBtn.style.display = 'block';
        falseBtn.style.display = 'block';
        game3NextBtn.style.display = 'none';
    }
    
    function checkGame3Answer(isTrue) {
        const question = game3Questions[currentGame3Question];
        
        trueBtn.style.display = 'none';
        falseBtn.style.display = 'none';
        
        if (isTrue === question.answer) {
            game3Score++;
            game3ScoreEl.textContent = game3Score;
            showCelebration(true);
        } else {
            showCelebration(false);
        }
        
        game3NextBtn.style.display = 'block';
    }
    
    trueBtn.addEventListener('click', () => checkGame3Answer(true));
    falseBtn.addEventListener('click', () => checkGame3Answer(false));
    
    function endGame3() {
        game3QuestionEl.textContent = `انتهت اللعبة! نتيجتك النهائية: ${game3Score}/${game3Questions.length}`;
        
        if (game3Score === game3Questions.length) {
            game3QuestionEl.innerHTML += '<br><span style="color: #4caf50; font-size: 1.5rem;">ممتاز! لقد أجبت على جميع الأسئلة بشكل صحيح!</span>';
        }
        
        game3NextBtn.style.display = 'none';
        game3RestartBtn.style.display = 'block';
    }

// Game 4 functions - المعدلة
function startGame4() {
    currentGame4Riddle = 0;
    game4Score = 0;
    game4ScoreEl.textContent = game4Score;
    loadGame4Riddle();
}

function loadGame4Riddle() {
    const riddle = game4Riddles[currentGame4Riddle];
    game4QuestionEl.textContent = riddle.question;
    
    game4OptionsEl.innerHTML = '';
    riddle.options.forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.classList.add('option');
        optionEl.textContent = option;
        optionEl.addEventListener('click', () => {
            // التحقق مباشرة عند الضغط على الخيار
            checkGame4Answer(option);
        });
        game4OptionsEl.appendChild(optionEl);
    });
    
    game4NextBtn.style.display = 'none';
    game4RestartBtn.style.display = 'none';
}

function checkGame4Answer(selectedAnswer) {
    const riddle = game4Riddles[currentGame4Riddle];
    const isCorrect = selectedAnswer.toLowerCase() === riddle.answer.toLowerCase();
    
    if (isCorrect) {
        game4Score++;
        game4ScoreEl.textContent = game4Score;
        showCelebration(true);
        
        // إظهار جميع الخيارات مع تمييز الصحيح
        const options = document.querySelectorAll('#game4Options .option');
        options.forEach(option => {
            option.style.pointerEvents = 'none';
            if (option.textContent.toLowerCase() === riddle.answer.toLowerCase()) {
                option.classList.add('correct');
            }
        });
    } else {
        showCelebration(false);
        
        // إظهار الخيار الصحيح وتمييز الخطأ
        const options = document.querySelectorAll('#game4Options .option');
        options.forEach(option => {
            option.style.pointerEvents = 'none';
            if (option.textContent.toLowerCase() === selectedAnswer.toLowerCase()) {
                option.classList.add('incorrect');
            }
            if (option.textContent.toLowerCase() === riddle.answer.toLowerCase()) {
                option.classList.add('correct');
            }
        });
    }
    
    game4NextBtn.style.display = 'block';
}

function endGame4() {
    game4QuestionEl.textContent = `انتهت اللعبة! نتيجتك النهائية: ${game4Score}/${game4Riddles.length}`;
    game4OptionsEl.innerHTML = '';
    
    if (game4Score === game4Riddles.length) {
        game4QuestionEl.innerHTML += '<br><span style="color: #4caf50; font-size: 1.5rem;">ممتاز! لقد حللت جميع الألغاز بشكل صحيح!</span>';
    }
    
    game4NextBtn.style.display = 'none';
    game4RestartBtn.style.display = 'block';
}

    // Celebration functions
    function showCelebration(isSuccess) {
        if (isSuccess) {
            createConfetti();
            showMessage('إجابة صحيحة!', true);
        } else {
            showMessage('إجابة خاطئة!', false);
        }
    }
    
    function createConfetti() {
        celebrationContainer.innerHTML = '';
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random position and color
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = getRandomColor();
            
            // Random size and animation duration
            const size = Math.random() * 10 + 5;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
            
            celebrationContainer.appendChild(confetti);
        }
        
        setTimeout(() => {
            celebrationContainer.innerHTML = '';
        }, 3000);
    }
    
    function getRandomColor() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f093fb', '#ffd166', '#06d6a0'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function showMessage(text, isSuccess) {
        const message = document.createElement('div');
        message.classList.add(isSuccess ? 'success-message' : 'error-message');
        message.textContent = text;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }
});
