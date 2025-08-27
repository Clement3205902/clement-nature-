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

// Nature quiz generator - 100 Questions
const quizQuestions = [
    // ANIMALS - Mammals
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correct: 1,
        explanation: "The Blue Whale can reach lengths of up to 100 feet and weigh up to 200 tons!"
    },
    {
        question: "Which animal has the most powerful bite in the world?",
        options: ["Great White Shark", "Crocodile", "Hippo", "T-Rex (extinct)"],
        correct: 1,
        explanation: "Saltwater crocodiles have a bite force of up to 3,700 pounds per square inch!"
    },
    {
        question: "How long can a dolphin hold its breath underwater?",
        options: ["5 minutes", "15 minutes", "30 minutes", "1 hour"],
        correct: 1,
        explanation: "Dolphins can typically hold their breath for 8-15 minutes, though some can go longer!"
    },
    {
        question: "What is a group of lions called?",
        options: ["Pack", "Herd", "Pride", "Flock"],
        correct: 2,
        explanation: "A group of lions is called a pride, typically consisting of related females and their cubs."
    },
    {
        question: "Which mammal is known to have fingerprints almost identical to humans?",
        options: ["Chimpanzee", "Koala", "Gorilla", "Orangutan"],
        correct: 1,
        explanation: "Koalas have fingerprints so similar to humans that they can confuse crime scene investigators!"
    },
    
    // ANIMALS - Birds
    {
        question: "How many chambers does a bird's heart have?",
        options: ["2", "3", "4", "5"],
        correct: 2,
        explanation: "Birds have 4-chambered hearts, just like mammals, which allows for efficient oxygen circulation."
    },
    {
        question: "Which bird can fly backwards?",
        options: ["Eagle", "Hummingbird", "Owl", "Falcon"],
        correct: 1,
        explanation: "Hummingbirds are the only birds that can fly backwards, sideways, and even upside down!"
    },
    {
        question: "What is the fastest bird in a dive?",
        options: ["Golden Eagle", "Peregrine Falcon", "Gyrfalcon", "Saker Falcon"],
        correct: 1,
        explanation: "The Peregrine Falcon can reach speeds of over 240 mph during hunting dives!"
    },
    {
        question: "Which bird has the largest wingspan?",
        options: ["Albatross", "Condor", "Eagle", "Pelican"],
        correct: 0,
        explanation: "The Wandering Albatross has the largest wingspan of any bird, reaching up to 11 feet!"
    },
    {
        question: "How many species of penguins exist?",
        options: ["12", "15", "18", "21"],
        correct: 2,
        explanation: "There are 18 species of penguins, from the tiny Little Blue Penguin to the massive Emperor Penguin!"
    },
    
    // ANIMALS - Marine Life
    {
        question: "How many hearts does an octopus have?",
        options: ["1", "2", "3", "4"],
        correct: 2,
        explanation: "Octopuses have three hearts - two pump blood to the gills, one pumps to the rest of the body!"
    },
    {
        question: "What color is a polar bear's skin?",
        options: ["White", "Pink", "Black", "Gray"],
        correct: 2,
        explanation: "Polar bear skin is actually black to absorb heat from the sun. Their fur is transparent!"
    },
    {
        question: "How long can a sea turtle hold its breath?",
        options: ["30 minutes", "2 hours", "5 hours", "10 hours"],
        correct: 2,
        explanation: "Sea turtles can hold their breath for up to 5 hours underwater!"
    },
    {
        question: "What is the largest fish in the ocean?",
        options: ["Great White Shark", "Whale Shark", "Manta Ray", "Tuna"],
        correct: 1,
        explanation: "The Whale Shark can grow up to 40 feet long and is a gentle filter feeder!"
    },
    {
        question: "How many arms does a starfish typically have?",
        options: ["4", "5", "6", "8"],
        correct: 1,
        explanation: "Most starfish have 5 arms, though some species can have up to 40 arms!"
    },
    
    // ANIMALS - Insects & Arachnids
    {
        question: "How many legs does a spider have?",
        options: ["6", "8", "10", "12"],
        correct: 1,
        explanation: "All spiders have 8 legs - this is what distinguishes them from insects, which have 6 legs!"
    },
    {
        question: "What is the strongest insect relative to its body weight?",
        options: ["Ant", "Beetle", "Bee", "Grasshopper"],
        correct: 1,
        explanation: "Dung beetles can pull objects 1,000 times their own body weight!"
    },
    {
        question: "How do bees communicate the location of flowers?",
        options: ["Buzzing sounds", "Pheromones", "Dancing", "Color changes"],
        correct: 2,
        explanation: "Bees perform a 'waggle dance' to communicate direction and distance to flower patches!"
    },
    {
        question: "What percentage of animal species are insects?",
        options: ["50%", "60%", "75%", "80%"],
        correct: 3,
        explanation: "About 80% of all animal species are insects - they're incredibly diverse!"
    },
    {
        question: "How many times can a dragonfly beat its wings per second?",
        options: ["20", "30", "40", "50"],
        correct: 1,
        explanation: "Dragonflies beat their wings about 30 times per second and can fly in all directions!"
    },
    
    // PLANTS - Trees & Forests
    {
        question: "Which plant produces the largest flower in the world?",
        options: ["Sunflower", "Corpse Flower", "Rafflesia", "Giant Water Lily"],
        correct: 2,
        explanation: "Rafflesia can grow up to 3 feet across and can weigh up to 15 pounds!"
    },
    {
        question: "What is the tallest tree species in the world?",
        options: ["Giant Sequoia", "Coast Redwood", "Douglas Fir", "Eucalyptus"],
        correct: 1,
        explanation: "Coast Redwoods can grow over 380 feet tall - the tallest trees on Earth!"
    },
    {
        question: "How old can a bristlecone pine tree live?",
        options: ["500 years", "1,000 years", "2,000 years", "5,000 years"],
        correct: 3,
        explanation: "Some bristlecone pines are over 5,000 years old - among the oldest living organisms!"
    },
    {
        question: "What process do plants use to make food from sunlight?",
        options: ["Respiration", "Photosynthesis", "Transpiration", "Germination"],
        correct: 1,
        explanation: "Photosynthesis converts sunlight, water, and CO2 into glucose and oxygen!"
    },
    {
        question: "Which tree produces the world's largest seed?",
        options: ["Coconut Palm", "Coco de Mer", "Avocado", "Mango"],
        correct: 1,
        explanation: "The Coco de Mer palm produces seeds that can weigh up to 40 pounds!"
    },
    
    // PLANTS - Flowers & Garden
    {
        question: "What is the most popular flower in the world?",
        options: ["Rose", "Tulip", "Sunflower", "Daisy"],
        correct: 0,
        explanation: "Roses are considered the most popular flowers worldwide, symbolizing love and beauty!"
    },
    {
        question: "Which flower follows the sun's movement across the sky?",
        options: ["Rose", "Tulip", "Sunflower", "Daisy"],
        correct: 2,
        explanation: "Young sunflowers exhibit heliotropism, turning to follow the sun throughout the day!"
    },
    {
        question: "What is the national flower of Japan?",
        options: ["Cherry Blossom", "Chrysanthemum", "Lotus", "Iris"],
        correct: 0,
        explanation: "Cherry blossoms (sakura) are Japan's unofficial national flower and symbol of spring!"
    },
    {
        question: "Which plant is known as the 'sensitive plant'?",
        options: ["Venus Flytrap", "Mimosa", "Touch-me-not", "Sundew"],
        correct: 1,
        explanation: "Mimosa pudica closes its leaves when touched, earning the name 'sensitive plant'!"
    },
    {
        question: "What makes carrots orange?",
        options: ["Chlorophyll", "Beta-carotene", "Anthocyanins", "Xanthophyll"],
        correct: 1,
        explanation: "Beta-carotene gives carrots their orange color and is converted to vitamin A in our bodies!"
    },
    
    // ECOSYSTEMS - Rainforests
    {
        question: "What percentage of Earth's land do rainforests cover?",
        options: ["2%", "6%", "10%", "15%"],
        correct: 1,
        explanation: "Rainforests cover only 6% of Earth's land surface but contain 50% of all species!"
    },
    {
        question: "Which rainforest is known as the 'lungs of the Earth'?",
        options: ["Congo Basin", "Amazon", "Southeast Asian", "Temperate Rainforest"],
        correct: 1,
        explanation: "The Amazon rainforest produces about 20% of the world's oxygen!"
    },
    {
        question: "How many layers does a rainforest typically have?",
        options: ["2", "3", "4", "5"],
        correct: 2,
        explanation: "Rainforests have 4 layers: emergent, canopy, understory, and forest floor!"
    },
    {
        question: "What percentage of medicines come from rainforest plants?",
        options: ["15%", "25%", "35%", "45%"],
        correct: 1,
        explanation: "About 25% of modern medicines are derived from rainforest plants!"
    },
    {
        question: "How much rainforest is lost every minute?",
        options: ["10 acres", "20 acres", "40 acres", "60 acres"],
        correct: 2,
        explanation: "Approximately 40 acres of rainforest are lost every minute due to deforestation!"
    },
    
    // ECOSYSTEMS - Oceans
    {
        question: "What percentage of Earth's oxygen is produced by the ocean?",
        options: ["20%", "50%", "70%", "90%"],
        correct: 2,
        explanation: "The ocean produces about 70% of Earth's oxygen, mainly from phytoplankton!"
    },
    {
        question: "What percentage of the ocean has been explored?",
        options: ["5%", "20%", "35%", "50%"],
        correct: 0,
        explanation: "Less than 5% of the ocean has been explored - we know more about Mars!"
    },
    {
        question: "What is the deepest part of the ocean?",
        options: ["Puerto Rico Trench", "Java Trench", "Mariana Trench", "Peru-Chile Trench"],
        correct: 2,
        explanation: "The Mariana Trench reaches depths of nearly 36,000 feet!"
    },
    {
        question: "How much of marine life depends on coral reefs?",
        options: ["15%", "25%", "35%", "45%"],
        correct: 1,
        explanation: "About 25% of all marine species depend on coral reefs for shelter and food!"
    },
    {
        question: "What causes ocean tides?",
        options: ["Wind", "Earth's rotation", "Moon's gravity", "Ocean currents"],
        correct: 2,
        explanation: "The Moon's gravitational pull is the primary cause of ocean tides!"
    },
    
    // ECOSYSTEMS - Desert & Arctic
    {
        question: "What is the largest hot desert in the world?",
        options: ["Sahara", "Arabian", "Kalahari", "Gobi"],
        correct: 0,
        explanation: "The Sahara Desert covers about 3.6 million square miles across North Africa!"
    },
    {
        question: "How do cacti store water?",
        options: ["In their roots", "In their stems", "In their spines", "In their flowers"],
        correct: 1,
        explanation: "Cacti store water in their thick, fleshy stems to survive in arid conditions!"
    },
    {
        question: "What percentage of Earth's fresh water is frozen in ice?",
        options: ["50%", "60%", "70%", "80%"],
        correct: 2,
        explanation: "About 70% of Earth's fresh water is locked in ice caps and glaciers!"
    },
    {
        question: "Which animal is considered the 'polar bear of the south'?",
        options: ["Penguin", "Seal", "Whale", "Arctic Fox"],
        correct: 0,
        explanation: "Penguins are often called the polar bears of the south, though they live in opposite hemispheres!"
    },
    {
        question: "What adaptation helps desert animals conserve water?",
        options: ["Large ears", "Thick fur", "Concentrated urine", "Webbed feet"],
        correct: 2,
        explanation: "Many desert animals produce highly concentrated urine to conserve water!"
    },
    
    // CONSERVATION & ENVIRONMENT
    {
        question: "What does 'biodiversity' mean?",
        options: ["Different ecosystems", "Variety of life", "Animal behavior", "Plant growth"],
        correct: 1,
        explanation: "Biodiversity refers to the variety of life in all its forms and interactions!"
    },
    {
        question: "What is the main cause of species extinction today?",
        options: ["Climate change", "Habitat loss", "Pollution", "Overhunting"],
        correct: 1,
        explanation: "Habitat destruction is the leading cause of species extinction worldwide!"
    },
    {
        question: "How many species become extinct every day?",
        options: ["10-50", "50-100", "100-200", "200-500"],
        correct: 2,
        explanation: "Scientists estimate 100-200 species go extinct every day due to human activities!"
    },
    {
        question: "What percentage of Earth's land is protected as reserves?",
        options: ["8%", "15%", "23%", "30%"],
        correct: 1,
        explanation: "About 15% of Earth's land surface is protected, but more is needed for conservation!"
    },
    {
        question: "What is rewilding?",
        options: ["Hunting ban", "Restoring ecosystems", "Animal training", "Seed collection"],
        correct: 1,
        explanation: "Rewilding involves restoring natural ecosystems and reintroducing native species!"
    },
    
    // CLIMATE & WEATHER
    {
        question: "What gas makes up most of Earth's atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
        correct: 1,
        explanation: "Nitrogen makes up about 78% of Earth's atmosphere!"
    },
    {
        question: "What causes the greenhouse effect?",
        options: ["Solar radiation", "Trapped heat gases", "Ocean currents", "Wind patterns"],
        correct: 1,
        explanation: "Greenhouse gases trap heat in the atmosphere, warming the planet!"
    },
    {
        question: "Which tree removes the most CO2 from the atmosphere?",
        options: ["Oak", "Pine", "Eucalyptus", "It varies"],
        correct: 3,
        explanation: "Different trees absorb different amounts of CO2 depending on age, species, and environment!"
    },
    {
        question: "What is the water cycle's first step?",
        options: ["Condensation", "Precipitation", "Evaporation", "Collection"],
        correct: 2,
        explanation: "Evaporation is when water changes from liquid to vapor, starting the water cycle!"
    },
    {
        question: "What percentage of Earth's water is fresh water?",
        options: ["1%", "3%", "7%", "12%"],
        correct: 1,
        explanation: "Only about 3% of Earth's water is fresh water, and most of that is frozen!"
    },
    
    // UNIQUE NATURE FACTS
    {
        question: "Which animal never stops growing teeth?",
        options: ["Elephant", "Shark", "Crocodile", "Beaver"],
        correct: 1,
        explanation: "Sharks continuously grow and shed teeth throughout their lives!"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Diamond", "Quartz", "Granite", "Iron"],
        correct: 0,
        explanation: "Diamond is the hardest natural substance, rating 10 on the Mohs scale!"
    },
    {
        question: "Which animal can survive in space?",
        options: ["Cockroach", "Tardigrade", "Scorpion", "Ant"],
        correct: 1,
        explanation: "Tardigrades (water bears) can survive the vacuum of space and extreme radiation!"
    },
    {
        question: "What is the most venomous creature in the world?",
        options: ["King Cobra", "Blue-ringed Octopus", "Box Jellyfish", "Poison Dart Frog"],
        correct: 2,
        explanation: "The Box Jellyfish has enough venom to kill 60 adult humans!"
    },
    {
        question: "Which plant can live for over 1,000 years?",
        options: ["Baobab Tree", "Redwood", "Oak", "All of the above"],
        correct: 3,
        explanation: "Many tree species including baobabs, redwoods, and oaks can live over 1,000 years!"
    },
    
    // ANIMAL BEHAVIOR
    {
        question: "Why do flamingos stand on one leg?",
        options: ["To look taller", "To conserve heat", "Better balance", "To rest"],
        correct: 1,
        explanation: "Flamingos stand on one leg to reduce heat loss through their legs!"
    },
    {
        question: "How do elephants show affection?",
        options: ["Trunk touching", "Trumpeting", "Ear flapping", "All of the above"],
        correct: 3,
        explanation: "Elephants show affection through trunk touching, vocalizations, and body language!"
    },
    {
        question: "What do pandas spend most of their time doing?",
        options: ["Sleeping", "Eating", "Playing", "Climbing"],
        correct: 1,
        explanation: "Pandas spend 12-16 hours a day eating bamboo due to its low nutritional value!"
    },
    {
        question: "How do wolves communicate over long distances?",
        options: ["Barking", "Howling", "Growling", "Whimpering"],
        correct: 1,
        explanation: "Wolf howls can be heard up to 6 miles away and help coordinate pack activities!"
    },
    {
        question: "Why do cats purr?",
        options: ["Only when happy", "To communicate", "To heal", "Both B and C"],
        correct: 3,
        explanation: "Cats purr to communicate and the vibrations may help heal bones and reduce pain!"
    },
    
    // PLANT ADAPTATIONS
    {
        question: "How do Venus flytraps digest insects?",
        options: ["Chewing", "Acid", "Enzymes", "Bacteria"],
        correct: 2,
        explanation: "Venus flytraps use digestive enzymes to break down trapped insects!"
    },
    {
        question: "Why are some leaves red or purple?",
        options: ["Disease", "Age", "Protection", "Temperature"],
        correct: 2,
        explanation: "Red and purple pigments protect leaves from sun damage and cold!"
    },
    {
        question: "How do seeds know which way is up?",
        options: ["Light detection", "Gravity", "Moisture", "Temperature"],
        correct: 1,
        explanation: "Plants sense gravity through gravitropism to grow roots down and shoots up!"
    },
    {
        question: "What makes plants green?",
        options: ["Chlorophyll", "Water", "Sunlight", "Nutrients"],
        correct: 0,
        explanation: "Chlorophyll is the green pigment that captures light energy for photosynthesis!"
    },
    {
        question: "How do plants breathe at night?",
        options: ["They don't", "Through roots", "Cellular respiration", "Stored oxygen"],
        correct: 2,
        explanation: "Plants use cellular respiration at night, consuming oxygen and releasing CO2!"
    },
    
    // EXTREME ENVIRONMENTS
    {
        question: "Which organism can survive the highest temperatures?",
        options: ["Tardigrade", "Thermophile bacteria", "Desert ant", "Camel"],
        correct: 1,
        explanation: "Some thermophile bacteria can survive temperatures above 250°F (121°C)!"
    },
    {
        question: "What lives in the deepest parts of the ocean?",
        options: ["Giant squid", "Anglerfish", "Tube worms", "All of the above"],
        correct: 3,
        explanation: "Many specialized creatures live in the deep ocean's extreme conditions!"
    },
    {
        question: "How do animals survive in Antarctica?",
        options: ["Thick fur", "Antifreeze proteins", "Hibernation", "All of the above"],
        correct: 3,
        explanation: "Antarctic animals use various adaptations including insulation, antifreeze, and hibernation!"
    },
    {
        question: "Which plant survives in the most acidic conditions?",
        options: ["Moss", "Lichen", "Algae", "Ferns"],
        correct: 1,
        explanation: "Some lichens can survive in extremely acidic environments like volcanic areas!"
    },
    {
        question: "What is the driest place on Earth?",
        options: ["Death Valley", "Sahara Desert", "Atacama Desert", "Antarctic Desert"],
        correct: 2,
        explanation: "Chile's Atacama Desert is the driest non-polar desert, with areas receiving no rainfall!"
    },
    
    // SYMBIOSIS & RELATIONSHIPS
    {
        question: "What is the relationship between clownfish and sea anemones?",
        options: ["Parasitism", "Commensalism", "Mutualism", "Competition"],
        correct: 2,
        explanation: "Clownfish and anemones have a mutualistic relationship - both benefit!"
    },
    {
        question: "How do mycorrhizal fungi help plants?",
        options: ["Provide nutrients", "Protect from pests", "Store water", "All of the above"],
        correct: 3,
        explanation: "Mycorrhizal fungi form beneficial partnerships with plant roots, providing multiple benefits!"
    },
    {
        question: "What do cleaner fish do?",
        options: ["Clean coral", "Eat parasites", "Filter water", "Build nests"],
        correct: 1,
        explanation: "Cleaner fish remove parasites and dead skin from other fish in a mutualistic relationship!"
    },
    {
        question: "Why do flowers have bright colors?",
        options: ["Protection", "Temperature control", "Attract pollinators", "Show health"],
        correct: 2,
        explanation: "Bright flower colors attract pollinators like bees, butterflies, and hummingbirds!"
    },
    {
        question: "What is pollination?",
        options: ["Flower opening", "Seed dispersal", "Pollen transfer", "Fruit formation"],
        correct: 2,
        explanation: "Pollination is the transfer of pollen from male to female parts of flowers!"
    },
    
    // MIGRATION & MOVEMENT
    {
        question: "Which animal makes the longest migration?",
        options: ["Wildebeest", "Arctic Tern", "Monarch Butterfly", "Gray Whale"],
        correct: 1,
        explanation: "Arctic Terns migrate about 44,000 miles annually from Arctic to Antarctic and back!"
    },
    {
        question: "How do birds navigate during migration?",
        options: ["Magnetic fields", "Stars", "Landmarks", "All of the above"],
        correct: 3,
        explanation: "Birds use multiple navigation methods including magnetic fields, celestial cues, and landmarks!"
    },
    {
        question: "Why do monarch butterflies migrate?",
        options: ["Find food", "Escape cold", "Breed", "All of the above"],
        correct: 3,
        explanation: "Monarchs migrate to escape cold weather, find food, and reach breeding grounds!"
    },
    {
        question: "How do salmon find their birth river?",
        options: ["Memory", "Smell", "Magnetic fields", "Current patterns"],
        correct: 1,
        explanation: "Salmon use their incredible sense of smell to find their natal streams!"
    },
    {
        question: "Which whale travels the farthest?",
        options: ["Blue Whale", "Humpback Whale", "Gray Whale", "Sperm Whale"],
        correct: 2,
        explanation: "Gray whales make a round trip of about 12,000 miles between feeding and breeding areas!"
    },
    
    // FINAL QUESTIONS - GENERAL NATURE
    {
        question: "What is the most abundant gas in a healthy soil?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Water vapor"],
        correct: 0,
        explanation: "Healthy soil contains about 20% oxygen, crucial for root respiration and soil organisms!"
    },
    {
        question: "Which sense do most nocturnal animals rely on?",
        options: ["Sight", "Hearing", "Smell", "Touch"],
        correct: 1,
        explanation: "Most nocturnal animals have enhanced hearing to navigate and hunt in darkness!"
    },
    {
        question: "What is the primary role of decomposers in ecosystems?",
        options: ["Eat plants", "Hunt prey", "Recycle nutrients", "Produce oxygen"],
        correct: 2,
        explanation: "Decomposers break down dead organisms and return nutrients to the ecosystem!"
    },
    {
        question: "How many kingdoms of life are there?",
        options: ["3", "5", "6", "8"],
        correct: 2,
        explanation: "Most scientists recognize 6 kingdoms: Animals, Plants, Fungi, Protists, Archaea, and Bacteria!"
    },
    {
        question: "What connects all life on Earth?",
        options: ["DNA", "Water", "Carbon", "All of the above"],
        correct: 3,
        explanation: "All life shares DNA, requires water, and is carbon-based - we're all connected!"
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