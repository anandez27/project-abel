// Function to handle page navigation
function nextPage(pageNum) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
        page.style.opacity = '0';
    });

    // Show target page
    const targetPage = document.getElementById(`page-${pageNum}`);
    if (targetPage) {
        targetPage.style.display = 'flex';
        // Small delay to trigger transition
        setTimeout(() => {
            targetPage.style.opacity = '1';
        }, 50);
    }
}

// Variables for dodge button
let dodgeCount = 0;
const maxDodges = 3;

// Function to handle dodge button
function dodgeButton(button) {
    if (dodgeCount < maxDodges) {
        dodgeCount++;
        
        // Calculate safe boundaries for button movement
        const windowWidth = window.innerWidth - button.offsetWidth;
        const windowHeight = window.innerHeight - button.offsetHeight;
        
        // Random position within viewport
        const randomX = Math.random() * windowWidth;
        const randomY = Math.random() * windowHeight;
        
        button.style.position = 'fixed';
        button.style.left = randomX + 'px';
        button.style.top = randomY + 'px';
    } else {
        showAnswer(false);
    }
}

// Function to handle answer selection
function showAnswer(accepted) {
    const content = document.getElementById('answer-content');
    if (accepted) {
        content.innerHTML = `
            <div class="text-box">
                <h1>YEEE! ❤️</h1>
                <p>oke makaseh ya mar. lanjut ke wa ni jk yaa!</p>
                <button class="btn btn-next mt-3" onclick="sendWhatsApp()">Kirim Pesan WhatsApp ❤️</button>
            </div>
        `;
        createHearts();
    } else {
        content.innerHTML = `
            <div class="text-box">
                <h1>hahaha selamat kamu kenak PRANK...</h1>
                <p>SERIUS NUU😂🤣...
                sorii yaa</p>
            </div>
        `;
    }
    nextPage(6);
}

// Function to create floating hearts
function createHearts() {
    const createHeart = () => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 5000);
    };
    
    // Create hearts every 300ms
    setInterval(createHeart, 300);
}

// Function to send WhatsApp message
function sendWhatsApp() {
    // Replace with your phone number (remove any + or leading 0)
    const phoneNumber = '6285668908972';
    const message = encodeURIComponent('mauu! ❤️');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Add to your existing JavaScript file
function createFloatingElements() {
    // Create container if it doesn't exist
    let container = document.querySelector('.floating-elements');
    if (!container) {
        container = document.createElement('div');
        container.className = 'floating-elements';
        document.body.appendChild(container);
    }

    const elements = ['❤️', '✨', '💝', '💖', '💕'];
    
    setInterval(() => {
        const element = document.createElement('div');
        element.className = 'float-item';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + 'vw';
        element.style.fontSize = (Math.random() * 20 + 20) + 'px';
        element.style.animationDuration = (Math.random() * 3 + 5) + 's';
        container.appendChild(element);
        
        // Remove element after animation
        setTimeout(() => element.remove(), 8000);
    }, 300);
}

// Call function when DOM is ready
document.addEventListener('DOMContentLoaded', createFloatingElements);

// Add error notification function
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.className = `notification ${isError ? 'error' : 'success'}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => notification.remove(), 3000);
}

// Update music handling
document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('toggleMusic');
    
    // Add click event to start music
    document.addEventListener('click', function startMusic() {
        music.play().then(() => {
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            showNotification('Musik dimulai! 🎵');
        }).catch(err => {
            showNotification('Tidak dapat memutar musik: ' + err.message, true);
            console.error('Music autoplay failed:', err);
        });
        document.removeEventListener('click', startMusic);
    });

    // Update music toggle
    musicBtn.addEventListener('click', function() {
        try {
            if (music.paused) {
                music.play().then(() => {
                    musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                    showNotification('Musik dimulai! 🎵');
                }).catch(err => {
                    throw err;
                });
            } else {
                music.pause();
                musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                showNotification('Musik dihentikan ⏸️');
            }
        } catch (err) {
            showNotification('Error pada musik: ' + err.message, true);
            console.error('Music toggle failed:', err);
        }
    });

    // Hide loading screen
    window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loading-screen');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    });
});
