document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const questionContainer = document.getElementById('question-container');

    // Quiz state
    let currentQuestion = 0;
    const totalQuestions = 500;

    // User's answers storage
    let userAnswers = new Array(totalQuestions).fill(null);

    // Sample questions (to be replaced with actual data)
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answer: 0
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: 1
        },
        {
            question: "What is the largest mammal in the world?",
            options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
            answer: 1
        }
    ];

    // Update progress display
    function updateProgress() {
        const progress = ((currentQuestion + 1) / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Question ${currentQuestion + 1} of ${totalQuestions}`;
        
        // Update button states
        prevBtn.disabled = currentQuestion === 0;
        nextBtn.disabled = !userAnswers[currentQuestion];
    }

    // Display current question
    function displayQuestion() {
        const question = questions[currentQuestion];
        const html = `
            <h2 class="text-xl font-semibold text-gray-900 mb-6">${question.question}</h2>
            <div class="space-y-4">
                ${question.options.map((option, index) => `
                    <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors option-container ${userAnswers[currentQuestion] === index ? 'border-indigo-500 bg-indigo-50' : ''}">
                        <input type="radio" name="answer" value="${index}" 
                            ${userAnswers[currentQuestion] === index ? 'checked' : ''} 
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500">
                        <span class="ml-3 ${userAnswers[currentQuestion] === index ? 'text-indigo-700 font-medium' : 'text-gray-700'}">${option}</span>
                    </label>
                `).join('')}
            </div>
        `;
        questionContainer.innerHTML = html;

        // Add event listeners to radio buttons
        const options = questionContainer.querySelectorAll('label');
        options.forEach((option, index) => {
            const radio = option.querySelector('input[type="radio"]');
            
            const handleSelection = () => {
                // Update the radio button state
                radio.checked = true;
                
                // Store the answer
                userAnswers[currentQuestion] = index;
                
                // Update visual feedback
                options.forEach(opt => {
                    opt.classList.remove('border-indigo-500', 'bg-indigo-50');
                    opt.querySelector('span').classList.remove('text-indigo-700', 'font-medium');
                });
                option.classList.add('border-indigo-500', 'bg-indigo-50');
                option.querySelector('span').classList.add('text-indigo-700', 'font-medium');
                
                // Enable next button if not last question
                if (currentQuestion < questions.length - 1) {
                    nextBtn.disabled = false;
                }
                
                updateProgress();
            };
            
            // Add click events to both the label and the radio button
            option.addEventListener('click', handleSelection);
            radio.addEventListener('change', handleSelection);
        });

        // Update progress and button states
        updateProgress();
    }

    // Navigation event listeners
    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            displayQuestion();
            updateProgress();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (userAnswers[currentQuestion] !== null && currentQuestion < questions.length - 1) {
            currentQuestion++;
            displayQuestion();
            nextBtn.disabled = true; // Disable next button until an answer is selected
        }
    });

    // Modal functionality
    loginBtn.addEventListener('click', () => {
        loginModal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', () => {
        loginModal.classList.add('hidden');
    });

    // Close modal when clicking outside
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.add('hidden');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
            prevBtn.click();
        } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
            nextBtn.click();
        }
    });

    // Initialize the quiz
    displayQuestion();
    updateProgress();
});
