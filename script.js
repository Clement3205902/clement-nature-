// Nature AI Website JavaScript

// Smooth scrolling for navigation
function scrollToExplore() {
    document.getElementById('explore').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Add smooth scrolling to all navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize the website
    generateNewFact();
    generateNewQuiz();
    addCategoryInteractions();
    addScrollAnimations();
});

// Category card interactions
function addCategoryInteractions() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showCategoryInfo(category);
        });
    });
}

function showCategoryInfo(category) {
    const categoryInfo = {
        plants: {
            title: "Plants & Flora",
            description: "Discover the incredible world of plants! From towering redwoods to tiny mosses, plants are the foundation of life on Earth. They produce oxygen, provide food, and create habitats for countless species.",
            facts: [
                "There are over 390,000 known plant species on Earth",
                "Plants produce 330 billion tons of oxygen annually",
                "The largest living organism is a fungus in Oregon covering 2,385 acres"
            ]
        },
        animals: {
            title: "Wildlife & Fauna", 
            description: "Explore the amazing diversity of animal life! From microscopic tardigrades to massive blue whales, animals have adapted to every environment on our planet.",
            facts: [
                "Scientists estimate there are 8.7 million animal species",
                "Octopuses have three hearts and blue blood",
                "A group of flamingos is called a 'flamboyance'"
            ]
        },
        ecosystems: {
            title: "Ecosystems",
            description: "Learn about the intricate web of life that connects all living things. Ecosystems are complex networks where every organism plays a vital role.",
            facts: [
                "Rainforests cover only 6% of Earth but contain 50% of all species",
                "Coral reefs support 25% of all marine life",
                "A single tree can be home to over 1,000 species"
            ]
        },
        conservation: {
            title: "Conservation",
            description: "Discover how we can protect our planet's incredible biodiversity. Conservation efforts are crucial for maintaining healthy ecosystems for future generations.",
            facts: [
                "Protected areas cover 15% of Earth's land surface",
                "One species goes extinct every 20 minutes",
                "Rewilding can restore ecosystems and increase biodiversity"
            ]
        }
    };

    const info = categoryInfo[category];
    if (info) {
        alert(`${info.title}\n\n${info.description}\n\nDid you know?\n• ${info.facts.join('\n• ')}`);
    }
}

// AI Nature Identification (Simulated)
function identifyNature() {
    const description = document.getElementById('natureDescription').value;
    const resultsDiv = document.getElementById('aiResults');
    
    if (!description.trim()) {
        alert('Please describe what you see in nature!');
        return;
    }

    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = '<div class="loading">🔍 AI is analyzing your description...</div>';

    // Simulate AI processing time
    setTimeout(() => {
        const identification = generateIdentification(description);
        resultsDiv.innerHTML = identification;
    }, 2000);
}

function generateIdentification(description) {
    const keywords = description.toLowerCase();
    let result = {
        species: "Unknown Species",
        confidence: 85,
        description: "Based on your description, this appears to be a fascinating natural specimen!",
        facts: ["This is a wonderful example of nature's diversity!"]
    };

    // Simple keyword-based identification simulation
    if (keywords.includes('flower') || keywords.includes('petal') || keywords.includes('bloom')) {
        result = {
            species: "Flowering Plant (Angiosperms)",
            confidence: 92,
            description: "This appears to be a flowering plant, one of the most diverse groups in the plant kingdom.",
            facts: [
                "Flowering plants make up about 90% of all plant species",
                "They evolved around 140 million years ago",
                "Flowers are specialized reproductive structures"
            ]
        };
    } else if (keywords.includes('bird') || keywords.includes('wing') || keywords.includes('feather')) {
        result = {
            species: "Avian Species (Bird)",
            confidence: 88,
            description: "This is likely a bird, part of the incredibly diverse class Aves.",
            facts: [
                "There are over 10,000 bird species worldwide",
                "Birds are descendants of dinosaurs",
                "Some birds can migrate thousands of miles"
            ]
        };
    } else if (keywords.includes('tree') || keywords.includes('trunk') || keywords.includes('bark')) {
        result = {
            species: "Tree Species",
            confidence: 90,
            description: "This appears to be a tree, one of nature's most important organisms.",
            facts: [
                "Trees can live for thousands of years",
                "A mature tree produces enough oxygen for 2 people per day",
                "Trees communicate through underground fungal networks"
            ]
        };
    } else if (keywords.includes('butterfly') || keywords.includes('moth') || keywords.includes('colorful')) {
        result = {
            species: "Lepidoptera (Butterfly/Moth)",
            confidence: 87,
            description: "This looks like a member of Lepidoptera, the order containing butterflies and moths.",
            facts: [
                "There are over 180,000 species of Lepidoptera",
                "Butterfly wings are actually transparent",
                "They taste with their feet and smell with their antennae"
            ]
        };
    }

    return `
        <div style="background: linear-gradient(135deg, #e8f5e8, #f1f8e9); padding: 1.5rem; border-radius: 15px; border-left: 5px solid #4caf50;">
            <h3 style="color: #2e7d32; margin-bottom: 1rem;">🔍 AI Identification Result</h3>
            <div style="margin-bottom: 1rem;">
                <strong>Species:</strong> ${result.species}<br>
                <strong>Confidence:</strong> ${result.confidence}%<br>
            </div>
            <p style="margin-bottom: 1rem; color: #555;">${result.description}</p>
            <div style="background: white; padding: 1rem; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <h4 style="color: #2e7d32; margin-bottom: 0.5rem;">Interesting Facts:</h4>
                <ul style="color: #666; padding-left: 1.5rem;">
                    ${result.facts.map(fact => `<li>${fact}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Image upload handling
document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const uploadArea = document.getElementById('uploadArea');
        uploadArea.innerHTML = `
            <div class="upload-content">
                <div class="upload-icon">✅</div>
                <p>Image uploaded: ${file.name}</p>
                <p style="font-size: 0.9rem; color: #666;">Click "Identify with AI" to analyze this image!</p>
            </div>
        `;
        
        // Simulate image analysis
        setTimeout(() => {
            const resultsDiv = document.getElementById('aiResults');
            resultsDiv.style.display = 'block';
            resultsDiv.innerHTML = `
                <div style="background: linear-gradient(135deg, #e3f2fd, #f1f8e9); padding: 1.5rem; border-radius: 15px; border-left: 5px solid #2196f3;">
                    <h3 style="color: #1976d2; margin-bottom: 1rem;">📸 Image Analysis Result</h3>
                    <p>🔍 Analyzing uploaded image...</p>
                    <div style="margin-top: 1rem; padding: 1rem; background: white; border-radius: 10px;">
                        <strong>Detected Elements:</strong>
                        <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
                            <li>Natural textures and patterns</li>
                            <li>Organic shapes and forms</li>
                            <li>Natural color palette</li>
                        </ul>
                        <p style="margin-top: 1rem; color: #666; font-style: italic;">
                            For more detailed analysis, try describing what you see in the text area!
                        </p>
                    </div>
                </div>
            `;
        }, 1500);
    }
});

// Nature facts generator
const natureFacts = [
    "Octopuses have three hearts, nine brains, and blue blood!",
    "Honey never spoils - archaeologists have found 3000-year-old honey that's still edible.",
    "A group of pandas is called an 'embarrassment'.",
    "Trees can communicate with each other through underground fungal networks called mycorrhizae.",
    "Dolphins have names for each other - they use unique whistle signatures.",
    "Butterflies taste with their feet and smell with their antennae.",
    "A single cloud can weigh more than a million pounds!",
    "Sharks are older than trees - they've existed for over 400 million years.",
    "Wombat poop is cube-shaped to prevent it from rolling away on slopes.",
    "Some mushrooms glow in the dark to attract insects for spore dispersal.",
    "Hummingbirds are the only birds that can fly backwards.",
    "A group of jellyfish is called a 'smack'.",
    "Bananas are berries, but strawberries aren't!",
    "Sea otters hold hands while sleeping to prevent drifting apart.",
    "Venus flytraps can count - they only close after detecting two trigger hair touches.",
    "Polar bear skin is actually black, and their fur is transparent!",
    "A shrimp's heart is in its head.",
    "Elephants are afraid of bees and will avoid areas with beehives.",
    "Some bamboo species can grow up to 35 inches in a single day!",
    "Male seahorses are the ones who get pregnant and give birth."
];

function generateNewFact() {
    const factElement = document.getElementById('natureFact');
    const randomFact = natureFacts[Math.floor(Math.random() * natureFacts.length)];
    
    factElement.style.opacity = '0';
    setTimeout(() => {
        factElement.textContent = randomFact;
        factElement.style.opacity = '1';
    }, 300);
}

// Nature quiz generator
const quizQuestions = [
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correct: 1,
        explanation: "The Blue Whale can reach lengths of up to 100 feet and weigh up to 200 tons!"
    },
    {
        question: "Which plant produces the largest flower in the world?",
        options: ["Sunflower", "Corpse Flower", "Rafflesia", "Giant Water Lily"],
        correct: 2,
        explanation: "Rafflesia can grow up to 3 feet across and can weigh up to 15 pounds!"
    },
    {
        question: "How many chambers does a bird's heart have?",
        options: ["2", "3", "4", "5"],
        correct: 2,
        explanation: "Birds have 4-chambered hearts, just like mammals, which allows for efficient oxygen circulation."
    },
    {
        question: "What percentage of Earth's oxygen is produced by the ocean?",
        options: ["20%", "50%", "70%", "90%"],
        correct: 2,
        explanation: "The ocean produces about 70% of Earth's oxygen, mainly from phytoplankton!"
    },
    {
        question: "Which animal has the most powerful bite in the world?",
        options: ["Great White Shark", "Crocodile", "Hippo", "T-Rex (extinct)"],
        correct: 1,
        explanation: "Saltwater crocodiles have a bite force of up to 3,700 pounds per square inch!"
    }
];

let currentQuiz = null;

function generateNewQuiz() {
    const quizContainer = document.getElementById('quizContent');
    currentQuiz = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    
    quizContainer.innerHTML = `
        <p id="quizQuestion"><strong>${currentQuiz.question}</strong></p>
        <div class="quiz-options" id="quizOptions">
            ${currentQuiz.options.map((option, index) => 
                `<div class="quiz-option" onclick="selectQuizOption(${index})">${option}</div>`
            ).join('')}
        </div>
        <div id="quizResult" style="margin-top: 1rem; display: none;"></div>
    `;
}

function selectQuizOption(selectedIndex) {
    const options = document.querySelectorAll('.quiz-option');
    const resultDiv = document.getElementById('quizResult');
    
    // Disable all options
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === currentQuiz.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex) {
            option.classList.add('incorrect');
        }
    });
    
    // Show result
    const isCorrect = selectedIndex === currentQuiz.correct;
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div style="padding: 1rem; background: ${isCorrect ? '#c8e6c9' : '#ffcdd2'}; border-radius: 10px; border-left: 5px solid ${isCorrect ? '#4caf50' : '#f44336'};">
            <strong>${isCorrect ? '🎉 Correct!' : '❌ Not quite right!'}</strong>
            <p style="margin-top: 0.5rem;">${currentQuiz.explanation}</p>
        </div>
    `;
}

// Scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.category-card, .fact-card, .quiz-card');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const nature_animation = document.querySelector('.nature-animation');
    
    if (hero && nature_animation) {
        nature_animation.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 100);
    }
});