/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}
/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__Link')

const LinkAction = () =>{
    const navMenu = document.getElementById('nav-menu')

    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', LinkAction))
/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('blur-header')
                        : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollup = () => {
    const scrollUp = document.getElementById('scroll-up')

    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')    
}

window.addEventListener('scroll', scrollup)

// Destination data for each place
const destinations = {
  Gangtok: {
    image: "assets/img/home-photo-1.jpg",
    info: "Gangtok, the capital of Sikkim, is known for its scenic beauty, monasteries, and breathtaking views of the Kanchenjunga range."
  },
  Lachung: {
    image: "assets/img/home-photo-2.jpg",
    info: "Lachung is a mountain village located in North Sikkim, famous for its waterfalls, apple orchards, and the gateway to Yumthang Valley."
  },
  Pelling: {
    image: "assets/img/home-photo-3.jpg",
    info: "Pelling is a beautiful hill station in West Sikkim, offering panoramic views of the Himalayas and sites like Pemayangtse Monastery."
  },
  Namchi: {
    image: "assets/img/home-photo-4.jpg",
    info: "Namchi, located in South Sikkim, is known for the famous Siddhesvara Dham and the towering statue of Guru Padmasambhava."
  }
};

// Get modal elements
const destinationModal = document.getElementById("destinationModal");
const closeDestination = document.getElementById("closeDestination");
const destinationTitle = document.getElementById("destinationTitle");
const destinationImage = document.getElementById("destinationImage");
const destinationInfo = document.getElementById("destinationInfo");
const destinationField = document.getElementById("destinationField");

// Add click listeners to each destination card
document.querySelectorAll(".home__card").forEach(card => {
  card.addEventListener("click", () => {
    const place = card.querySelector(".home__card-title").textContent.trim();
    const data = destinations[place];

    if (data) {
      destinationTitle.textContent = `Book Your Journey to ${place}`;
      destinationImage.src = data.image;
      destinationInfo.textContent = data.info;
      destinationField.value = place;

      destinationModal.style.display = "block";
    }
  });
});

// Close modal on X click or outside click
closeDestination.onclick = () => destinationModal.style.display = "none";
window.onclick = (event) => {
  if (event.target === destinationModal) {
    destinationModal.style.display = "none";
  }
};

// Modal open for all buttons/images
const modal = document.getElementById('modal');
const openButtons = document.querySelectorAll('.button, .explore__image, .join__button');
const closeButton = document.querySelector('.close-button');

openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'block';
    });
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form submission via Formspree
const journeyForm = document.getElementById('journeyForm');

if (journeyForm) {
    journeyForm.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent page refresh
        const formData = new FormData(journeyForm);

        fetch(journeyForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Form submitted successfully!');
                journeyForm.reset();
                modal.style.display = 'none'; // close modal
            } else {
                alert('There was a problem submitting the form.');
            }
        })
        .catch(error => {
            alert('There was a problem submitting the form.');
        });
    });
}

// maps //
function initMap() {
    const sikkim = { lat: 27.5333, lng: 88.5122 };

    const map = new google.maps.Map(document.getElementById("map-container"), {
        zoom: 8,
        center: sikkim,
    });

    const locations = [
        { position: { lat: 27.3389, lng: 88.6065 }, title: "Gangtok" },
        { position: { lat: 27.7020, lng: 88.6175 }, title: "Lachung" },
        { position: { lat: 27.2929, lng: 88.2734 }, title: "Pelling" },
        { position: { lat: 27.1892, lng: 88.4068 }, title: "Namchi" }
    ];

    locations.forEach(loc => {
        const marker = new google.maps.Marker({
            position: loc.position,
            map: map,
            title: loc.title
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${loc.title}</h3>`
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });
}
//Implement Speech Recognition (JavaScript)://

const startBtn = document.getElementById('voice-assistant-btn');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Set your language
    recognition.interimResults = false; // Only get final results

    startBtn.addEventListener('click', () => {
        recognition.start();
        startBtn.innerHTML = '<i class="ri-mic-fill"></i> Listening...';
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        startBtn.innerHTML = '<i class="ri-mic-line"></i> Speak';
        handleVoiceCommand(transcript); // Function to process the command
    };

    recognition.onend = () => {
        startBtn.innerHTML = '<i class="ri-mic-line"></i> Speak';
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        startBtn.innerHTML = '<i class="ri-mic-line"></i> Speak';
        speakResponse("Sorry, I didn't catch that. Please try again.");
    };
} else {
    // Fallback for unsupported browsers
    startBtn.style.display = 'none';
    console.log("Web Speech API not supported.");
}

//Implement Speech Synthesis (Text-to-Speech)://

function speakResponse(text) {
    const synth = window.speechSynthesis;
    if (synth) {
        const utterance = new SpeechSynthesisUtterance(text);
        // You can customize properties here, e.g., voice, rate, pitch
        synth.speak(utterance);
    }
}

//Process Commands (Natural Language Processing - NLP)://

function handleVoiceCommand(command) {
    let response = "I'm sorry, I don't know how to do that yet.";

    if (command.includes('hello') || command.includes('hi')) {
        response = "Hello! I am your Sikkim travel assistant. How can I help you explore today?";
    } else if (command.includes('show') && (command.includes('popular') || command.includes('places'))) {
        document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
        response = "Scrolling to the popular places section for you. Enjoy the beauty of Tholung and Dzongri Treks!";
    } else if (command.includes('go to') && command.includes('about')) {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        response = "Here is the About Sikkim section. Learn more about your destination.";
    } else if (command.includes('book') || command.includes('start journey')) {
        // Trigger your modal (assuming you have a function to open it)
        // Example: document.getElementById('modal').style.display = 'block';
        response = "Let's start your journey! I've opened the booking form for you.";
    } else if (command.includes('find') && command.includes('map')) {
        document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
        response = "Showing you the Explore Locations on Map section.";
    }

    speakResponse(response);
}

