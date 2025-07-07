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
            ]
        },
        game2: {
            title: "السحب والإفلات",
            description: "اسحب الكلمة إلى جمعها الصحيح",
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
                { singular: "Mouse", plural: "Mouses", correct: false },
                { singular: "Goose", plural: "Geese", correct: true },
                { singular: "Book", plural: "Books", correct: true },
                { singular: "Baby", plural: "Babys", correct: false },
                { singular: "Series", plural: "Series", correct: true },
                { singular: "City", plural: "Citys", correct: false },
                { singular: "Tomato", plural: "Tomatoes", correct: true },
                { singular: "Foot", plural: "Feets", correct: false },
                { singular: "Tooth", plural: "Teeth", correct: true }
            ]
        },
        game4: {
            title: "ألغاز مسلية",
            description: "استمتع بمجموعة من الألغاز الممتعة لتنشيط عقلك",
            riddles: [
                { question: "What gets bigger the more you take away from it?", answer: "hole", type: "text" },
                { question: "What word starts with 'T' and ends with 'a', and if you remove the 'T', it becomes a fruit?", answer: "apple", type: "text" },
                { question: "I am a number. If you multiply me by myself, the result is 9. What number am I?", answer: "3", type: "text" },
                { question: "White on top, black on bottom, gives light but never burns. What is it?", answer: "electric lamp", type: "text" },
                { question: "Which word means 'fast writing'?", options: ["Copy", "Typing", "Cloning", "Translating"], answer: "Typing", type: "multiple" },
                { question: "In HTML, what tag is used to show an image?", answer: "<img>", type: "text" }
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
    
    // لعبة السحب والإفلات المعدلة
    function loadDragDropGame() {
        const pairs = [...shuffledQuestions];
        const questionContainer = document.createElement('div');
        questionContainer.className = 'question-container';
        
        questionContainer.innerHTML = `
            <div class="question">اسحب كل كلمة إلى جمعها الصحيح</div>
            <div class="drag-drop-game">
                <div class="drag-words">
                    <h3>الكلمات</h3>
                    <div class="words-container"></div>
                </div>
                <div class="drop-targets">
                    <h3>الجمع الصحيح</h3>
                    <div class="targets-container"></div>
                </div>
            </div>
            <div class="feedback"></div>
        `;
        
        const wordsContainer = questionContainer.querySelector('.words-container');
        const targetsContainer = questionContainer.querySelector('.targets-container');
        const feedbackDiv = questionContainer.querySelector('.feedback');
        
        // إنشاء نسخة عشوائية من الكلمات
        const allSingulars = pairs.map(pair => pair.singular);
        const allPlurals = pairs.map(pair => pair.plural);
        
        // خلط الكلمات عشوائياً
        const shuffledSingulars = [...allSingulars].sort(() => Math.random() - 0.5);
        const shuffledPlurals = [...allPlurals].sort(() => Math.random() - 0.5);
        
        // إضافة الكلمات إلى الجانب الأيسر
        shuffledSingulars.forEach((word, index) => {
            const wordElement = document.createElement('div');
            wordElement.className = 'drag-word';
            wordElement.textContent = word;
            wordElement.draggable = true;
            wordElement.dataset.word = word;
            wordElement.dataset.type = 'singular';
            
            wordElement.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    word: word,
                    type: 'singular'
                }));
                this.classList.add('dragging');
            });
            
            wordElement.addEventListener('dragend', function() {
                this.classList.remove('dragging');
            });
            
            wordsContainer.appendChild(wordElement);
        });
        
        // إضافة مناطق الإفلات إلى الجانب الأيمن
        shuffledPlurals.forEach((word, index) => {
            const targetElement = document.createElement('div');
            targetElement.className = 'drop-target';
            targetElement.dataset.expected = pairs.find(p => p.plural === word).singular;
            
            const targetLabel = document.createElement('div');
            targetLabel.className = 'target-label';
            targetLabel.textContent = word;
            targetElement.appendChild(targetLabel);
            
            const dropArea = document.createElement('div');
            dropArea.className = 'drop-area';
            dropArea.textContent = 'افلت هنا';
            targetElement.appendChild(dropArea);
            
            targetElement.addEventListener('dragover', function(e) {
                e.preventDefault();
                dropArea.classList.add('drag-over');
            });
            
            targetElement.addEventListener('dragleave', function() {
                dropArea.classList.remove('drag-over');
            });
            
            targetElement.addEventListener('drop', function(e) {
                e.preventDefault();
                dropArea.classList.remove('drag-over');
                
                const draggedData = JSON.parse(e.dataTransfer.getData('text/plain'));
                const draggedWord = draggedData.word;
                const expectedWord = this.dataset.expected;
                
                if (draggedWord === expectedWord) {
                    dropArea.innerHTML = `
                        <div class="correct-match">
                            ${draggedWord} <span class="match-icon">✓</span>
                        </div>
                    `;
                    this.classList.add('matched');
                    
                    // إخفاء الكلمة المسحوبة
                    const draggedElement = document.querySelector(`.drag-word[data-word="${draggedWord}"]`);
                    if (draggedElement) draggedElement.style.visibility = 'hidden';
                    
                    score += 10;
                    showSuccessMessage();
                    feedbackDiv.textContent = 'إجابة صحيحة!';
                    feedbackDiv.style.color = '#4CAF50';
                    
                    // تحديث النقاط
                    document.querySelector('.score').textContent = `النقاط: ${score}`;
                    
                    // التحقق من اكتمال اللعبة
                    const allMatched = document.querySelectorAll('.drop-target.matched').length === pairs.length;
                    if (allMatched) {
                        setTimeout(() => {
                            currentQuestionIndex = shuffledQuestions.length;
                            loadGame('game2');
                        }, 1500);
                    }
                } else {
                    showErrorMessage();
                    feedbackDiv.textContent = 'إجابة خاطئة، حاول مرة أخرى!';
                    feedbackDiv.style.color = '#F44336';
                }
            });
            
            targetsContainer.appendChild(targetElement);
        });
        
        gameContent.appendChild(questionContainer);
    }

    // باقي دوال الألعاب (loadChooseCorrectGame, loadTrueFalseGame, loadPuzzleGame)
    // ... [ابقى الدوال الأخرى كما هي دون تغيير]
    
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
