// AI Study Buddy - JavaScript

// Global variables
let currentTopicsLearned = 0;
let currentQuestionsAnswered = 0;
let currentStudyTime = 0;
let recentTopics = [];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    setupEventListeners();
    addScrollAnimations();
});

// Smooth scrolling
function scrollToExplainer() {
    document.getElementById('explainer').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Tab switching functionality
function switchTab(tabName) {
    // Remove active class from all tabs and panels
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    
    // Add active class to selected tab and panel
    event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
}

// Set topic from tags
function setTopic(topic) {
    document.getElementById('topicInput').value = topic;
}

// Main AI explanation function
async function generateExplanation() {
    const activeTab = document.querySelector('.tab-panel.active').id;
    let content = '';
    let topic = '';
    
    // Get content based on active tab
    if (activeTab === 'text-tab') {
        content = document.getElementById('contentInput').value.trim();
        if (!content) {
            alert('Please enter some text or notes to explain!');
            return;
        }
        topic = 'Study Material';
    } else if (activeTab === 'topic-tab') {
        topic = document.getElementById('topicInput').value.trim();
        if (!topic) {
            alert('Please enter a topic you need help with!');
            return;
        }
        content = topic;
    } else if (activeTab === 'file-tab') {
        const files = document.querySelectorAll('.file-item');
        if (files.length === 0) {
            alert('Please upload a file first!');
            return;
        }
        content = 'Uploaded files content';
        topic = 'File Content';
    }
    
    const difficultyLevel = document.getElementById('difficultyLevel').value;
    
    // Show loading state
    const btn = document.querySelector('.explain-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    
    btn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    
    // Simulate AI processing time
    setTimeout(() => {
        const explanation = generateAIExplanation(content, topic, difficultyLevel);
        displayExplanation(explanation, topic);
        
        // Update progress
        currentTopicsLearned++;
        addRecentTopic(topic);
        updateProgress();
        
        // Reset button
        btn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }, 2000);
}

// AI explanation generator (simulated)
function generateAIExplanation(content, topic, level) {
    const explanations = {
        'calculus': {
            beginner: {
                overview: "Calculus is like a super-powered math tool that helps us understand how things change and add up areas under curves.",
                steps: [
                    {
                        title: "What is Calculus?",
                        content: "Think of calculus like a magnifying glass for math. It helps us see how things change (derivatives) and how to add up infinite tiny pieces (integrals).",
                        analogy: "Imagine you're watching a car drive by. Calculus helps you figure out exactly how fast it's going at any moment (derivative) and how far it traveled total (integral)."
                    },
                    {
                        title: "Two Main Parts",
                        content: "Calculus has two main tools: derivatives (rates of change) and integrals (adding up areas).",
                        analogy: "It's like having a speedometer (derivative) and an odometer (integral) for math functions!"
                    },
                    {
                        title: "Why It's Useful",
                        content: "Calculus helps us solve real-world problems like predicting population growth, optimizing business profits, or calculating the path of a rocket.",
                        analogy: "Think of calculus as the GPS of mathematics - it helps us find the best routes and predict where we're going!"
                    }
                ]
            }
        },
        'organic chemistry': {
            beginner: {
                overview: "Organic chemistry is the study of carbon-based molecules - basically the chemistry of life! It's like learning the LEGO blocks that make up all living things.",
                steps: [
                    {
                        title: "What Makes It 'Organic'?",
                        content: "Organic chemistry focuses on compounds that contain carbon. Carbon is special because it can form four bonds, making it like a universal connector.",
                        analogy: "Think of carbon atoms like super-flexible LEGO pieces that can connect in almost any direction, allowing you to build incredibly complex structures!"
                    },
                    {
                        title: "Basic Building Blocks",
                        content: "The simplest organic compounds are hydrocarbons - just carbon and hydrogen atoms connected together in chains or rings.",
                        analogy: "Imagine a chain of people holding hands - that's like a carbon chain with hydrogen atoms as their free hands waving around!"
                    },
                    {
                        title: "Why It Matters",
                        content: "Everything alive - proteins, DNA, fats, sugars - are organic compounds. Understanding them helps us make medicines, plastics, and understand life itself.",
                        analogy: "It's like learning the alphabet before reading books - once you know organic chemistry, you can 'read' how life works at the molecular level!"
                    }
                ]
            }
        },
        'physics': {
            beginner: {
                overview: "Physics is the study of how everything in the universe works - from tiny atoms to massive stars. It's like being a detective for the natural world!",
                steps: [
                    {
                        title: "What is Physics?",
                        content: "Physics tries to explain how and why things move, why objects fall, how electricity works, and what light is made of.",
                        analogy: "Think of physics as the ultimate 'how stuff works' guide for everything around you!"
                    },
                    {
                        title: "The Big Ideas",
                        content: "Physics has a few key concepts: forces (pushes and pulls), energy (the ability to do work), and matter (stuff that has mass).",
                        analogy: "It's like learning the rules of a video game - once you know about forces, energy, and matter, you can predict what will happen in almost any situation!"
                    },
                    {
                        title: "Why Study It?",
                        content: "Physics helps us build computers, smartphones, medical equipment, and even understand climate change. It's the foundation for all other sciences.",
                        analogy: "Physics is like the foundation of a house - everything else in science is built on top of these basic physical principles!"
                    }
                ]
            }
        }
    };
    
    // Get explanation for the topic or generate a generic one
    let explanation = explanations[topic.toLowerCase()]?.[level];
    
    if (!explanation) {
        // Generate generic explanation based on content
        explanation = generateGenericExplanation(content, topic, level);
    }
    
    return explanation;
}

function generateGenericExplanation(content, topic, level) {
    const levelDescriptions = {
        'beginner': 'like you\'re 5 years old',
        'elementary': 'using simple words and examples',
        'middle': 'with clear explanations and some detail',
        'high': 'with proper terminology but clear explanations'
    };
    
    // Analyze content for key concepts
    const concepts = extractKeyConcepts(content);
    const steps = generateStepsFromConcepts(concepts, level);
    
    return {
        overview: `Let me explain ${topic} ${levelDescriptions[level]}. This topic involves ${concepts.length} main concepts that build on each other.`,
        steps: steps
    };
}

function extractKeyConcepts(content) {
    // Simple keyword extraction (in a real app, this would use NLP)
    const words = content.toLowerCase().split(/\s+/);
    const keywords = [];
    
    // Science/Math keywords
    const scienceKeywords = ['equation', 'formula', 'theory', 'hypothesis', 'experiment', 'variable', 'function', 'derivative', 'integral', 'atom', 'molecule', 'cell', 'DNA', 'protein', 'reaction', 'force', 'energy', 'velocity', 'acceleration'];
    
    scienceKeywords.forEach(keyword => {
        if (words.includes(keyword)) {
            keywords.push(keyword);
        }
    });
    
    // If no specific keywords found, extract first few important-looking words
    if (keywords.length === 0) {
        const importantWords = words.filter(word => word.length > 4 && !['this', 'that', 'with', 'from', 'they', 'have', 'been', 'were', 'will'].includes(word));
        keywords.push(...importantWords.slice(0, 3));
    }
    
    return keywords.slice(0, 5); // Limit to 5 concepts
}

function generateStepsFromConcepts(concepts, level) {
    const steps = [];
    
    concepts.forEach((concept, index) => {
        const analogies = {
            'equation': 'like a recipe that tells you exactly how to mix ingredients',
            'atom': 'like incredibly tiny LEGO blocks that everything is made of',
            'cell': 'like tiny factories that do all the work in living things',
            'force': 'like invisible hands that push and pull objects around',
            'energy': 'like the "juice" that makes things happen',
            'function': 'like a magic machine that takes a number in and spits a new number out'
        };
        
        steps.push({
            title: `Understanding ${concept.charAt(0).toUpperCase() + concept.slice(1)}`,
            content: `Let's break down what "${concept}" means and why it's important in this context. ${getConceptExplanation(concept, level)}`,
            analogy: analogies[concept] || `Think of ${concept} as a key building block in understanding this topic.`
        });
    });
    
    // Always add a summary step
    steps.push({
        title: "Putting It All Together",
        content: "Now that we understand each piece, let's see how they work together to create the bigger picture.",
        analogy: "It's like assembling a puzzle - each concept is a piece that fits together to show the complete image!"
    });
    
    return steps;
}

function getConceptExplanation(concept, level) {
    const explanations = {
        'equation': {
            'beginner': 'An equation is like a balance scale - both sides must be equal.',
            'elementary': 'Equations show relationships between numbers and help us solve problems.',
            'middle': 'Equations are mathematical statements that show two expressions are equal.',
            'high': 'Equations represent mathematical relationships and can be manipulated to solve for unknown variables.'
        },
        'atom': {
            'beginner': 'Atoms are the tiniest pieces that make up everything around you.',
            'elementary': 'Atoms are like building blocks - they combine to make all the materials we see.',
            'middle': 'Atoms are the basic units of matter, consisting of protons, neutrons, and electrons.',
            'high': 'Atoms are the fundamental units of chemical elements, with distinct properties based on their atomic structure.'
        }
    };
    
    return explanations[concept]?.[level] || `This is an important concept that relates to the main topic.`;
}

function displayExplanation(explanation, topic) {
    const resultDiv = document.getElementById('explanationResult');
    
    let html = `
        <div class="explanation-card">
            <h3>🎯 ${topic} - Explained Simply</h3>
            <p>${explanation.overview}</p>
        </div>
        <div class="step-by-step">
            <h3>📝 Step-by-Step Breakdown</h3>
    `;
    
    explanation.steps.forEach((step, index) => {
        html += `
            <div class="step">
                <div class="step-number">${index + 1}</div>
                <div class="step-title">${step.title}</div>
                <div class="step-content">${step.content}</div>
                ${step.analogy ? `
                    <div class="analogy-box">
                        <h4>🔗 Real-World Connection:</h4>
                        <p>${step.analogy}</p>
                    </div>
                ` : ''}
            </div>
        `;
    });
    
    html += `
        </div>
        <div style="text-align: center; margin-top: 2rem;">
            <button class="cta-button" onclick="generateQuiz('${topic}')">📝 Test My Understanding</button>
            <button class="cta-button" onclick="generateStudyPlan('${topic}')" style="margin-left: 1rem;">📚 Create Study Plan</button>
        </div>
    `;
    
    resultDiv.innerHTML = html;
    resultDiv.style.display = 'block';
    
    // Scroll to results
    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// File upload handling
function setupEventListeners() {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('fileUploadArea');
    
    // File upload
    fileInput.addEventListener('change', handleFileUpload);
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.backgroundColor = 'rgba(102, 126, 234, 0.02)';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.backgroundColor = 'rgba(102, 126, 234, 0.02)';
        const files = e.dataTransfer.files;
        handleFiles(files);
    });
    
    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
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
}

function handleFileUpload(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    const uploadedFilesDiv = document.getElementById('uploadedFiles');
    uploadedFilesDiv.innerHTML = '';
    uploadedFilesDiv.style.display = 'block';
    
    Array.from(files).forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const icon = getFileIcon(file.type);
        const size = formatFileSize(file.size);
        
        fileItem.innerHTML = `
            <div class="file-icon">${icon}</div>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-size">${size}</div>
            </div>
        `;
        
        uploadedFilesDiv.appendChild(fileItem);
    });
}

function getFileIcon(fileType) {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('text')) return '📝';
    if (fileType.includes('word')) return '📘';
    return '📁';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Study tools functionality
function openTool(toolType) {
    const modal = document.getElementById('toolModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    const tools = {
        'breakdown': {
            title: '🧩 Concept Breakdown',
            content: generateBreakdownTool()
        },
        'connections': {
            title: '🔗 Connection Map',
            content: generateConnectionsTool()
        },
        'analogies': {
            title: '💡 Analogy Maker',
            content: generateAnalogiesT

()
        },
        'quiz': {
            title: '📝 Practice Quiz',
            content: generateQuizTool()
        },
        'plan': {
            title: '🎯 Study Plan',
            content: generateStudyPlanTool()
        },
        'terms': {
            title: '🔍 Key Terms',
            content: generateKeyTermsTool()
        }
    };
    
    const tool = tools[toolType];
    modalTitle.textContent = tool.title;
    modalBody.innerHTML = tool.content;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('toolModal').style.display = 'none';
}

function generateBreakdownTool() {
    return `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h4>Break down any complex topic into simple parts</h4>
            <input type="text" id="breakdownTopic" placeholder="Enter a topic to break down..." style="width: 100%; padding: 1rem; margin: 1rem 0; border: 2px solid #e2e8f0; border-radius: 8px;">
            <button onclick="performBreakdown()" style="background: #667eea; color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer;">Break It Down</button>
        </div>
        <div id="breakdownResult"></div>
    `;
}

function generateConnectionsTool() {
    return `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h4>Discover how different concepts connect</h4>
            <input type="text" id="connectionTopic" placeholder="Enter main topic..." style="width: 100%; padding: 1rem; margin: 1rem 0; border: 2px solid #e2e8f0; border-radius: 8px;">
            <button onclick="showConnections()" style="background: #667eea; color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer;">Show Connections</button>
        </div>
        <div id="connectionResult"></div>
    `;
}

function generateAnalogiesI() {
    return `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h4>Find perfect analogies to understand concepts</h4>
            <input type="text" id="analogyTopic" placeholder="What concept needs an analogy?" style="width: 100%; padding: 1rem; margin: 1rem 0; border: 2px solid #e2e8f0; border-radius: 8px;">
            <button onclick="generateAnalogyV2()" style="background: #667eea; color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer;">Create Analogy</button>
        </div>
        <div id="analogyResult"></div>
    `;
}

function generateQuizTool() {
    return `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h4>Test your understanding with custom questions</h4>
            <input type="text" id="quizTopic" placeholder="What topic should I quiz you on?" style="width: 100%; padding: 1rem; margin: 1rem 0; border: 2px solid #e2e8f0; border-radius: 8px;">
            <select id="quizDifficulty" style="padding: 0.8rem; margin: 0.5rem; border: 2px solid #e2e8f0; border-radius: 8px;">
                <option value="easy">Easy (3 questions)</option>
                <option value="medium">Medium (5 questions)</option>
                <option value="hard">Hard (7 questions)</option>
            </select>
            <br>
            <button onclick="createCustomQuiz()" style="background: #667eea; color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer;">Create Quiz</button>
        </div>
        <div id="quizResult"></div>
    `;
}

function generateStudyPlanTool() {
    return `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h4>Get a personalized learning roadmap</h4>
            <input type="text" id="planTopic" placeholder="What subject do you want to master?" style="width: 100%; padding: 1rem; margin: 1rem 0; border: 2px solid #e2e8f0; border-radius: 8px;">
            <select id="timeframe" style="padding: 0.8rem; margin: 0.5rem; border: 2px solid #e2e8f0; border-radius: 8px;">
                <option value="1week">1 Week</option>
                <option value="2weeks">2 Weeks</option>
                <option value="1month">1 Month</option>
                <option value="3months">3 Months</option>
            </select>
            <br>
            <button onclick="createStudyPlan()" style="background: #667eea; color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer;">Create Plan</button>
        </div>
        <div id="studyPlanResult"></div>
    `;
}

function generateKeyTermsTool() {
    return `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h4>Extract and define important vocabulary</h4>
            <textarea id="termsText" placeholder="Paste your text here and I'll find the key terms..." rows="6" style="width: 100%; padding: 1rem; margin: 1rem 0; border: 2px solid #e2e8f0; border-radius: 8px;"></textarea>
            <button onclick="extractKeyTerms()" style="background: #667eea; color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer;">Find Key Terms</button>
        </div>
        <div id="keyTermsResult"></div>
    `;
}

// Tool functions
function performBreakdown() {
    const topic = document.getElementById('breakdownTopic').value;
    if (!topic) return;
    
    const result = document.getElementById('breakdownResult');
    result.innerHTML = `
        <div style="background: #f8f9ff; padding: 1.5rem; border-radius: 10px; border-left: 4px solid #667eea;">
            <h4>${topic} - Broken Down</h4>
            <div style="margin-top: 1rem;">
                <div style="background: white; padding: 1rem; margin: 0.5rem 0; border-radius: 8px; border-left: 3px solid #ff6b6b;">
                    <strong>Foundation Level:</strong> The basic building blocks you need to understand first
                </div>
                <div style="background: white; padding: 1rem; margin: 0.5rem 0; border-radius: 8px; border-left: 3px solid #feca57;">
                    <strong>Intermediate Level:</strong> Concepts that build on the foundation
                </div>
                <div style="background: white; padding: 1rem; margin: 0.5rem 0; border-radius: 8px; border-left: 3px solid #48ca61;">
                    <strong>Advanced Level:</strong> Complex applications and connections
                </div>
            </div>
        </div>
    `;
    
    currentQuestionsAnswered++;
    updateProgress();
}

function showConnections() {
    const topic = document.getElementById('connectionTopic').value;
    if (!topic) return;
    
    const result = document.getElementById('connectionResult');
    result.innerHTML = `
        <div style="background: #f8f9ff; padding: 1.5rem; border-radius: 10px; border-left: 4px solid #667eea;">
            <h4>How ${topic} Connects to Other Ideas</h4>
            <div style="display: grid; gap: 1rem; margin-top: 1rem;">
                <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <strong>🔗 Related Concepts:</strong> Similar ideas that share common principles
                </div>
                <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <strong>🎯 Applications:</strong> Where this concept is used in real life
                </div>
                <div style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <strong>🔄 Dependencies:</strong> What you need to know first
                </div>
            </div>
        </div>
    `;
}

function generateAnalogyV2() {
    const topic = document.getElementById('analogyTopic').value;
    if (!topic) return;
    
    const analogies = {
        'photosynthesis': 'like a kitchen where plants cook their own food using sunlight as energy',
        'DNA': 'like a recipe book that tells your body how to build and maintain itself',
        'gravity': 'like an invisible magnet that pulls everything toward the center of Earth',
        'electricity': 'like water flowing through pipes, but with electric charge instead of water'
    };
    
    const analogy = analogies[topic.toLowerCase()] || `like a ${getRandomAnalogy()} that helps explain how this concept works`;
    
    const result = document.getElementById('analogyResult');
    result.innerHTML = `
        <div style="background: linear-gradient(135deg, #feca57 0%, #ff9ff3 100%); padding: 2rem; border-radius: 15px; color: #333;">
            <h4>🔗 Perfect Analogy for "${topic}"</h4>
            <p style="font-size: 1.1rem; margin-top: 1rem; line-height: 1.7;">
                Think of <strong>${topic}</strong> ${analogy}.
            </p>
            <div style="background: white; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                <strong>Why this analogy works:</strong> It helps you visualize the concept using something familiar from everyday life!
            </div>
        </div>
    `;
}

function getRandomAnalogy() {
    const analogies = ['factory', 'library', 'highway system', 'orchestra', 'garden', 'computer network'];
    return analogies[Math.floor(Math.random() * analogies.length)];
}

function createCustomQuiz() {
    const topic = document.getElementById('quizTopic').value;
    const difficulty = document.getElementById('quizDifficulty').value;
    
    if (!topic) return;
    
    const questions = generateQuizQuestions(topic, difficulty);
    const result = document.getElementById('quizResult');
    
    let html = `
        <div style="background: #f8f9ff; padding: 1.5rem; border-radius: 10px;">
            <h4>📝 Quiz: ${topic}</h4>
            <div id="quizQuestions">
    `;
    
    questions.forEach((q, index) => {
        html += `
            <div style="background: white; padding: 1.5rem; margin: 1rem 0; border-radius: 8px; border-left: 4px solid #667eea;">
                <h5>Question ${index + 1}: ${q.question}</h5>
                <div style="margin-top: 1rem;">
                    ${q.options.map((option, optIndex) => `
                        <label style="display: block; margin: 0.5rem 0; cursor: pointer;">
                            <input type="radio" name="q${index}" value="${optIndex}" style="margin-right: 0.5rem;">
                            ${option}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
            <button onclick="checkQuizAnswers()" style="background: #48ca61; color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer; margin-top: 1rem;">Check Answers</button>
            <div id="quizResults" style="margin-top: 1rem;"></div>
        </div>
    `;
    
    result.innerHTML = html;
    currentQuestionsAnswered += questions.length;
    updateProgress();
}

function generateQuizQuestions(topic, difficulty) {
    const questionCounts = { easy: 3, medium: 5, hard: 7 };
    const count = questionCounts[difficulty];
    
    const questions = [];
    for (let i = 0; i < count; i++) {
        questions.push({
            question: `What is a key concept related to ${topic}?`,
            options: [
                "Option A - Basic understanding",
                "Option B - Intermediate concept", 
                "Option C - Advanced application",
                "Option D - Related idea"
            ],
            correct: Math.floor(Math.random() * 4)
        });
    }
    
    return questions;
}

function createStudyPlan() {
    const topic = document.getElementById('planTopic').value;
    const timeframe = document.getElementById('timeframe').value;
    
    if (!topic) return;
    
    const plans = {
        '1week': ['Day 1-2: Basics', 'Day 3-4: Core concepts', 'Day 5-6: Practice', 'Day 7: Review'],
        '2weeks': ['Week 1: Foundations', 'Week 2: Applications and practice'],
        '1month': ['Week 1: Basics', 'Week 2: Intermediate', 'Week 3: Advanced', 'Week 4: Mastery'],
        '3months': ['Month 1: Foundation', 'Month 2: Application', 'Month 3: Mastery & Projects']
    };
    
    const result = document.getElementById('studyPlanResult');
    result.innerHTML = `
        <div style="background: #f8f9ff; padding: 1.5rem; border-radius: 10px;">
            <h4>🎯 ${topic} Study Plan (${timeframe.replace(/(\d+)/, '$1 ').replace(/([a-z])([A-Z])/, '$1 $2')})</h4>
            <div style="margin-top: 1rem;">
                ${plans[timeframe].map((phase, index) => `
                    <div style="background: white; padding: 1rem; margin: 0.5rem 0; border-radius: 8px; border-left: 4px solid #667eea;">
                        <strong>Phase ${index + 1}:</strong> ${phase}
                    </div>
                `).join('')}
            </div>
            <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                <strong>💡 Pro Tip:</strong> Spend 15-20 minutes daily on active practice rather than just reading!
            </div>
        </div>
    `;
}

function extractKeyTerms() {
    const text = document.getElementById('termsText').value;
    if (!text) return;
    
    const words = text.split(/\s+/);
    const keyTerms = words.filter(word => word.length > 6).slice(0, 8);
    
    const result = document.getElementById('keyTermsResult');
    result.innerHTML = `
        <div style="background: #f8f9ff; padding: 1.5rem; border-radius: 10px;">
            <h4>🔍 Key Terms Found</h4>
            <div style="display: grid; gap: 1rem; margin-top: 1rem;">
                ${keyTerms.map(term => `
                    <div style="background: white; padding: 1rem; border-radius: 8px; border-left: 4px solid #667eea;">
                        <strong>${term}</strong>
                        <p style="margin-top: 0.5rem; color: #666;">Important concept that appears in your text</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Progress tracking
function updateProgress() {
    document.getElementById('topicsLearned').textContent = currentTopicsLearned;
    document.getElementById('questionsAnswered').textContent = currentQuestionsAnswered;
    document.getElementById('studyTime').textContent = Math.floor(currentStudyTime) + 'h';
    
    // Save to localStorage
    saveProgress();
}

function addRecentTopic(topic) {
    recentTopics.unshift({
        name: topic,
        date: new Date().toLocaleDateString()
    });
    
    // Keep only last 10 topics
    recentTopics = recentTopics.slice(0, 10);
    
    updateRecentTopicsList();
}

function updateRecentTopicsList() {
    const listDiv = document.getElementById('recentTopicsList');
    
    if (recentTopics.length === 0) {
        listDiv.innerHTML = '<div class="empty-state"><p>Start learning to see your recent topics here!</p></div>';
        return;
    }
    
    listDiv.innerHTML = recentTopics.map(topic => `
        <div class="topic-item">
            <div class="topic-name">${topic.name}</div>
            <div class="topic-date">${topic.date}</div>
        </div>
    `).join('');
}

function saveProgress() {
    const progress = {
        topicsLearned: currentTopicsLearned,
        questionsAnswered: currentQuestionsAnswered,
        studyTime: currentStudyTime,
        recentTopics: recentTopics
    };
    
    localStorage.setItem('aiStudyBuddyProgress', JSON.stringify(progress));
}

function loadProgress() {
    const saved = localStorage.getItem('aiStudyBuddyProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        currentTopicsLearned = progress.topicsLearned || 0;
        currentQuestionsAnswered = progress.questionsAnswered || 0;
        currentStudyTime = progress.studyTime || 0;
        recentTopics = progress.recentTopics || [];
        
        updateProgress();
        updateRecentTopicsList();
    }
}

// Animation helpers
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

    const animateElements = document.querySelectorAll('.tool-card, .stat-card');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Utility functions for quiz generation
function generateQuiz(topic) {
    openTool('quiz');
    setTimeout(() => {
        document.getElementById('quizTopic').value = topic;
        createCustomQuiz();
    }, 500);
}

function generateStudyPlan(topic) {
    openTool('plan');
    setTimeout(() => {
        document.getElementById('planTopic').value = topic;
        createStudyPlan();
    }, 500);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('toolModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Update study time periodically
setInterval(() => {
    currentStudyTime += 0.1; // Add 6 minutes every hour (for demo purposes)
    updateProgress();
}, 60000); // Update every minute