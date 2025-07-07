document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const gameModal = document.getElementById('gameModal');
    const closeModal = document.getElementById('closeModal');
    const gameContent = document.getElementById('gameContent');
    const startBtn = document.getElementById('startBtn');
    const celebration = document.getElementById('celebration');
    
    // بيانات الألعاب
    const games = {
        game1: {
            title: "اختر الجمع الصحيح",
            description: "اختر الإجابة الصحيحة من بين الخيارات المتاحة لتكوين الجمع الصحيح للكلمة",
            questions: [
                {
                    singular: "Child",
                    options: ["children", "childs", "childes"],
                    correct: "children"
                },
                {
                    singular: "Bus",
                    options: ["bus", "busses", "buses"],
                    correct: "buses"
                },
                {
                    singular: "Tooth",
                    options: ["teeth", "tooths", "toothes"],
                    correct: "teeth"
                },
                {
                    singular: "Baby",
                    options: ["babys", "babies", "babyes"],
                    correct: "babies"
                },
                {
                    singular: "Man",
                    options: ["mans", "men", "mens"],
                    correct: "men"
                },
                {
                    singular: "Tomato",
                    options: ["tomatos", "tomatoes", "tomatoies"],
                    correct: "tomatoes"
                },
                {
                    singular: "Wife",
                    options: ["wifes", "wives", "wivies"],
                    correct: "wives"
                },
                {
                    singular: "Box",
                    options: ["boxs", "boxes", "boxies"],
                    correct: "boxes"
                },
                {
                    singular: "Fish",
                    options: ["fish", "fishes", "fishs"],
                    correct: "fish"
                },
                {
                    singular: "City",
                    options: ["citys", "cities", "citis"],
                    correct: "cities"
                }
            ]
        },
        game2: {
            title: "السحب والإفلات",
            description: "اسحب الكلمة المفردة إلى مكان الجمع الصحيح لها في العمود المقابل",
            pairs: [
                { singular: "Man", plural: "Men" },
                { singular: "Woman", plural: "Women" },
                { singular: "Knife", plural: "Knives" },
                { singular: "Cat", plural: "Cats" },
                { singular: "Box", plural: "Boxes" },
                { singular: "Child", plural: "Children" },
                { singular: "Leaf", plural: "Leaves" },
                { singular: "Bus", plural: "Buses" }
            ]
        },
        game3: {
            title: "صح أم خطأ",
            description: "اختر إذا كانت الكلمة المجموعة صحيحة أم خاطئة حسب قواعد الجمع",
            questions: [
                {
                    singular: "Mouse",
                    plural: "Mouses",
                    correct: false
                },
                {
                    singular: "Goose",
                    plural: "Geese",
                    correct: true
                },
                {
                    singular: "Book",
                    plural: "Books",
                    correct: true
                },
                {
                    singular: "Baby",
                    plural: "Babys",
                    correct: false
                },
                {
                    singular: "Series",
                    plural: "Series",
                    correct: true
                },
                {
                    singular: "City",
                    plural: "Citys",
                    correct: false
                },
                {
                    singular: "Tomato",
                    plural: "Tomatoes",
                    correct: true
                },
                {
                    singular: "Foot",
                    plural: "Feets",
                    correct: false
                },
                {
                    singular: "Tooth",
                    plural: "Teeth",
                    correct: true
                }
            ]
        },
        game4: {
            title: "ألغاز مسلية",
            description: "استمتع بمجموعة من الألغاز الممتعة لتنشيط عقلك",
            riddles: [
                {
                    question: "What gets bigger the more you take away from it?",
                    answer: "hole",
                    type: "text"
                },
                {
                    question: "What word starts with 'T' and ends with 'a', and if you remove the 'T', it becomes a fruit?",
                    answer: "apple",
                    type: "text"
                },
                {
                    question: "I am a number. If you multiply me by myself, the result is 9. What number am I?",
                    answer: "3",
                    type: "text"
                },
                {
                    question: "White on top, black on bottom, gives light but never burns. What is it?",
                    answer: "electric lamp",
                    type: "text"
                },
                {
                    question: "Which word means 'fast writing'?",
                    options: ["Copy", "Typing", "Cloning", "Translating"],
                    answer: "Typing",
                    type: "multiple"
                },
                {
                    question: "In HTML, what tag is used to show an image?",
                    answer: "<img>",
                    type: "text"
                }
            ]
        }
    };
    
    // متغيرات الحالة
    let currentGame = null;
    let currentQuestionIndex = 0;
    let score = 0;
    let shuffledQuestions = [];
    
    // أحداث النقر على الألعاب
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            const gameId = this.id;
            currentGame = games[gameId];
            currentQuestionIndex = 0;
            score = 0;
            
            // خلط الأسئلة عشوائياً
            if (currentGame.questions) {
                shuffledQuestions = [...currentGame.questions].sort(() => Math.random() - 0.5);
            } else if (currentGame.pairs) {
                shuffledQuestions = [...currentGame.pairs].sort(() => Math.random() - 0.5);
            } else if (currentGame.riddles) {
                shuffledQuestions = [...currentGame.riddles].sort(() => Math.random() - 0.5);
            }
            
            loadGame(gameId);
            gameModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // زر البداية
    startBtn.addEventListener('click', function() {
        document.querySelector('.games-section').scrollIntoView({ behavior: 'smooth' });
    });
    
    // إغلاق النافذة المنبثقة
    closeModal.addEventListener('click', function() {
        gameModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // إغلاق النافذة عند النقر خارجها
    window.addEventListener('click', function(e) {
        if (e.target === gameModal) {
            gameModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // تحميل اللعبة المحددة
    function loadGame(gameId) {
        gameContent.innerHTML = '';
        
        const gameHeader = document.createElement('div');
        gameHeader.className = 'game-header';
        gameHeader.innerHTML = `
            <h2>${currentGame.title}</h2>
            <p>${currentGame.description}</p>
            <div class="score">النقاط: ${score}</div>
        `;
        gameContent.appendChild(gameHeader);
        
        if (gameId === 'game1') {
            loadChooseCorrectGame();
        } else if (gameId === 'game2') {
            loadDragDropGame();
        } else if (gameId === 'game3') {
            loadTrueFalseGame();
        } else if (gameId === 'game4') {
            loadPuzzleGame();
        }
    }
    
    // لعبة اختيار الجمع الصحيح
    function loadChooseCorrectGame() {
        if (currentQuestionIndex >= shuffledQuestions.length) {
            showFinalScore();
            return;
        }
        
        const question = shuffledQuestions[currentQuestionIndex];
        const questionContainer = document.createElement('div');
        questionContainer.className = 'question-container';
        
        questionContainer.innerHTML = `
            <div class="question">ما هو جمع كلمة "${question.singular}"؟</div>
            <div class="options"></div>
        `;
        
        const optionsContainer = questionContainer.querySelector('.options');
        
        // خلط الخيارات عشوائياً
        const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
        
        shuffledOptions.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            
            optionElement.addEventListener('click', function() {
                if (option === question.correct) {
                    optionElement.classList.add('correct');
                    score += 10;
                    showSuccessMessage();
                } else {
                    optionElement.classList.add('incorrect');
                    showErrorMessage();
                }
                
                // تعطيل جميع الخيارات بعد الاختيار
                optionsContainer.querySelectorAll('.option').forEach(opt => {
                    opt.style.pointerEvents = 'none';
                    if (opt.textContent === question.correct) {
                        opt.classList.add('correct');
                    }
                });
                
                // زر التالي
                const nextBtn = document.createElement('button');
                nextBtn.className = 'next-btn';
                nextBtn.textContent = 'السؤال التالي';
                nextBtn.addEventListener('click', function() {
                    currentQuestionIndex++;
                    loadGame('game1');
                });
                
                questionContainer.appendChild(nextBtn);
                
                // تحديث النقاط
                document.querySelector('.score').textContent = `النقاط: ${score}`;
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        gameContent.appendChild(questionContainer);
    }
    
// لعبة السحب والإفلات المعدلة
function loadDragDropGame() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
        showFinalScore();
        return;
    }
    
    const pairs = [...shuffledQuestions];
    const questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';
    
    questionContainer.innerHTML = `
        <div class="question">اسحب كل كلمة إلى جمعها الصحيح</div>
        <div class="drag-drop-container">
            <div class="drag-column" id="wordsColumn">
                <h3>الكلمات</h3>
            </div>
            <div class="drag-column" id="matchesColumn">
                <h3>التوصيلات</h3>
            </div>
        </div>
    `;
    
    const wordsColumn = questionContainer.querySelector('#wordsColumn');
    const matchesColumn = questionContainer.querySelector('#matchesColumn');
    
    // إنشاء مصفوفة تحتوي على جميع الكلمات (مفرد وجمع)
    let allWords = [];
    pairs.forEach(pair => {
        allWords.push({text: pair.singular, type: 'singular', pair: pair.plural});
        allWords.push({text: pair.plural, type: 'plural', pair: pair.singular});
    });
    
    // خلط الكلمات عشوائياً
    allWords = allWords.sort(() => Math.random() - 0.5);
    
    // إضافة الكلمات إلى العمود الأول
    allWords.forEach(word => {
        const wordItem = document.createElement('div');
        wordItem.className = 'drag-item';
        wordItem.textContent = word.text;
        wordItem.draggable = true;
        wordItem.dataset.word = word.text;
        wordItem.dataset.type = word.type;
        wordItem.dataset.pair = word.pair;
        
        wordItem.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', JSON.stringify({
                text: word.text,
                type: word.type,
                pair: word.pair
            }));
            setTimeout(() => this.classList.add('dragging'), 0);
        });
        
        wordItem.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
        
        wordsColumn.appendChild(wordItem);
    });
    
    // إنشاء مناطق إفلات لكل كلمة
    allWords.forEach(word => {
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.dataset.word = word.text;
        
        dropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        
        dropZone.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });
        
        dropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            const draggedData = JSON.parse(e.dataTransfer.getData('text/plain'));
            const draggedWord = draggedData.text;
            const draggedType = draggedData.type;
            const correctPair = draggedData.pair;
            
            // إذا كانت الكلمة المسحوبة هي نظيرة الصحيحة لهذه المنطقة
            if (correctPair === this.dataset.word) {
                this.innerHTML = `
                    <div class="matched-pair">
                        <div>${draggedType === 'singular' ? draggedWord : this.dataset.word}</div>
                        <div class="arrow">↓</div>
                        <div>${draggedType === 'singular' ? this.dataset.word : draggedWord}</div>
                    </div>
                `;
                this.classList.add('filled');
                
                // إزالة العنصر المسحوب من القائمة
                const draggedItem = document.querySelector(`.drag-item[data-word="${draggedWord}"]`);
                if (draggedItem) draggedItem.style.display = 'none';
                
                // إزالة منطقة الإفلات المقابلة
                const pairZone = document.querySelector(`.drop-zone[data-word="${correctPair}"]`);
                if (pairZone) pairZone.style.display = 'none';
                
                score += 5;
                showSuccessMessage();
                
                // تحديث النقاط
                document.querySelector('.score').textContent = `النقاط: ${score}`;
                
                // التحقق من اكتمال اللعبة
                const allFilled = document.querySelectorAll('.drop-zone.filled').length === allWords.length/2;
                if (allFilled) {
                    const nextBtn = document.createElement('button');
                    nextBtn.className = 'next-btn';
                    nextBtn.textContent = 'اللعبة التالية';
                    nextBtn.addEventListener('click', function() {
                        currentQuestionIndex = shuffledQuestions.length;
                        loadGame('game2');
                    });
                    
                    questionContainer.appendChild(nextBtn);
                }
            } else {
                showErrorMessage();
            }
        });
        
        matchesColumn.appendChild(dropZone);
    });
    
    gameContent.appendChild(questionContainer);
}
    
    // لعبة صح أم خطأ
    function loadTrueFalseGame() {
        if (currentQuestionIndex >= shuffledQuestions.length) {
            showFinalScore();
            return;
        }
        
        const question = shuffledQuestions[currentQuestionIndex];
        const questionContainer = document.createElement('div');
        questionContainer.className = 'question-container';
        
        questionContainer.innerHTML = `
            <div class="question">هل جمع كلمة "${question.singular}" هو "${question.plural}"؟</div>
            <div class="true-false-container">
                <button class="tf-btn true-btn">صح</button>
                <button class="tf-btn false-btn">خطأ</button>
            </div>
        `;
        
        const trueBtn = questionContainer.querySelector('.true-btn');
        const falseBtn = questionContainer.querySelector('.false-btn');
        
        function handleAnswer(isTrue) {
            if ((isTrue && question.correct) || (!isTrue && !question.correct)) {
                score += 10;
                showSuccessMessage();
            } else {
                showErrorMessage();
            }
            
            // تعطيل الأزرار بعد الإجابة
            trueBtn.disabled = true;
            falseBtn.disabled = true;
            
            // تلوين الأزرار حسب الإجابة الصحيحة
            if (question.correct) {
                trueBtn.classList.add('correct');
            } else {
                falseBtn.classList.add('correct');
            }
            
            // زر التالي
            const nextBtn = document.createElement('button');
            nextBtn.className = 'next-btn';
            nextBtn.textContent = 'السؤال التالي';
            nextBtn.addEventListener('click', function() {
                currentQuestionIndex++;
                loadGame('game3');
            });
            
            questionContainer.appendChild(nextBtn);
            
            // تحديث النقاط
            document.querySelector('.score').textContent = `النقاط: ${score}`;
        }
        
        trueBtn.addEventListener('click', () => handleAnswer(true));
        falseBtn.addEventListener('click', () => handleAnswer(false));
        
        gameContent.appendChild(questionContainer);
    }
    
    // لعبة الألغاز
    function loadPuzzleGame() {
        if (currentQuestionIndex >= shuffledQuestions.length) {
            showFinalScore();
            return;
        }
        
        const riddle = shuffledQuestions[currentQuestionIndex];
        const puzzleContainer = document.createElement('div');
        puzzleContainer.className = 'puzzle-container';
        
        puzzleContainer.innerHTML = `
            <div class="puzzle-question">${riddle.question}</div>
        `;
        
        if (riddle.type === 'multiple') {
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'puzzle-options';
            
            riddle.options.forEach(option => {
                const optionBtn = document.createElement('button');
                optionBtn.className = 'puzzle-option';
                optionBtn.textContent = option;
                
                optionBtn.addEventListener('click', function() {
                    if (option === riddle.answer) {
                        optionBtn.classList.add('correct');
                        score += 10;
                        showSuccessMessage();
                    } else {
                        optionBtn.classList.add('incorrect');
                        showErrorMessage();
                    }
                    
                    // تعطيل جميع الخيارات بعد الاختيار
                    optionsContainer.querySelectorAll('.puzzle-option').forEach(opt => {
                        opt.disabled = true;
                        if (opt.textContent === riddle.answer) {
                            opt.classList.add('correct');
                        }
                    });
                    
                    // زر التالي
                    const nextBtn = document.createElement('button');
                    nextBtn.className = 'next-btn';
                    nextBtn.textContent = 'اللغز التالي';
                    nextBtn.addEventListener('click', function() {
                        currentQuestionIndex++;
                        loadGame('game4');
                    });
                    
                    puzzleContainer.appendChild(nextBtn);
                    
                    // تحديث النقاط
                    document.querySelector('.score').textContent = `النقاط: ${score}`;
                });
                
                optionsContainer.appendChild(optionBtn);
            });
            
            puzzleContainer.appendChild(optionsContainer);
        } else {
            const inputContainer = document.createElement('div');
            inputContainer.innerHTML = `
                <input type="text" class="puzzle-input" placeholder="اكتب إجابتك هنا...">
                <button class="play-btn" id="checkAnswer">تحقق</button>
            `;
            
            puzzleContainer.appendChild(inputContainer);
            
            const checkBtn = puzzleContainer.querySelector('#checkAnswer');
            const answerInput = puzzleContainer.querySelector('.puzzle-input');
            
            checkBtn.addEventListener('click', function() {
                const userAnswer = answerInput.value.trim().toLowerCase();
                const correctAnswer = riddle.answer.toLowerCase();
                
                if (userAnswer === correctAnswer) {
                    answerInput.classList.add('correct');
                    score += 10;
                    showSuccessMessage();
                } else {
                    answerInput.classList.add('incorrect');
                    showErrorMessage();
                }
                
                // زر التالي
                const nextBtn = document.createElement('button');
                nextBtn.className = 'next-btn';
                nextBtn.textContent = 'اللغز التالي';
                nextBtn.addEventListener('click', function() {
                    currentQuestionIndex++;
                    loadGame('game4');
                });
                
                puzzleContainer.appendChild(nextBtn);
                
                // تحديث النقاط
                document.querySelector('.score').textContent = `النقاط: ${score}`;
            });
        }
        
        gameContent.appendChild(puzzleContainer);
    }
    
    // عرض النتيجة النهائية
    function showFinalScore() {
        gameContent.innerHTML = '';
        
        const finalScore = document.createElement('div');
        finalScore.className = score >= 80 ? 'final-score excellent' : 'final-score';
        finalScore.textContent = `نهنئك! لقد حصلت على ${score} نقطة من ${shuffledQuestions.length * 10}`;
        
        const restartBtn = document.createElement('button');
        restartBtn.className = 'restart-btn';
        restartBtn.textContent = 'إعادة اللعب';
        restartBtn.addEventListener('click', function() {
            currentQuestionIndex = 0;
            score = 0;
            loadGame(currentGame === games.game1 ? 'game1' : 
                    currentGame === games.game2 ? 'game2' : 
                    currentGame === games.game3 ? 'game3' : 'game4');
        });
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'restart-btn';
        closeBtn.textContent = 'إغلاق';
        closeBtn.addEventListener('click', function() {
            gameModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        gameContent.appendChild(finalScore);
        gameContent.appendChild(restartBtn);
        gameContent.appendChild(closeBtn);
    }
    
    // عرض رسالة النجاح مع احتفالية
    function showSuccessMessage() {
        createConfetti();
        
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'إجابة صحيحة! 👍';
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.remove();
        }, 2000);
    }
    
    // عرض رسالة الخطأ مع تأثير
    function showErrorMessage() {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'إجابة خاطئة! 👎';
        document.body.appendChild(errorMsg);
        
        setTimeout(() => {
            errorMsg.remove();
        }, 2000);
    }
    
    // إنشاء احتفالية الكونفيتي
    function createConfetti() {
        celebration.innerHTML = '';
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // ألوان عشوائية
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f093fb', '#ffd166', '#06d6a0'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.backgroundColor = randomColor;
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 5 + 's';
            
            celebration.appendChild(confetti);
        }
        
        setTimeout(() => {
            celebration.innerHTML = '';
        }, 5000);
    }
});
