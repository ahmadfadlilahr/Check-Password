// Password Generator Functionality
class PasswordGenerator {
    constructor() {
        this.characters = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        const lengthSlider = document.getElementById('length');
        const lengthValue = document.getElementById('lengthValue');
        const generateBtn = document.getElementById('generateBtn');
        const copyBtn = document.getElementById('copyBtn');
        
        // Update length display
        lengthSlider.addEventListener('input', (e) => {
            lengthValue.textContent = e.target.value;
        });
        
        // Generate password
        generateBtn.addEventListener('click', () => {
            this.generatePassword();
        });
        
        // Copy password
        copyBtn.addEventListener('click', () => {
            this.copyPassword();
        });
    }
    
    generatePassword() {
        const length = parseInt(document.getElementById('length').value);
        const includeUppercase = document.getElementById('uppercase').checked;
        const includeLowercase = document.getElementById('lowercase').checked;
        const includeNumbers = document.getElementById('numbers').checked;
        const includeSymbols = document.getElementById('symbols').checked;
        
        let characterSet = '';
        
        if (includeUppercase) characterSet += this.characters.uppercase;
        if (includeLowercase) characterSet += this.characters.lowercase;
        if (includeNumbers) characterSet += this.characters.numbers;
        if (includeSymbols) characterSet += this.characters.symbols;
        
        if (characterSet === '') {
            alert('Pilih minimal satu jenis karakter!');
            return;
        }
        
        let password = '';
        
        // Ensure at least one character from each selected type
        if (includeUppercase) password += this.getRandomChar(this.characters.uppercase);
        if (includeLowercase) password += this.getRandomChar(this.characters.lowercase);
        if (includeNumbers) password += this.getRandomChar(this.characters.numbers);
        if (includeSymbols) password += this.getRandomChar(this.characters.symbols);
        
        // Fill the rest randomly
        for (let i = password.length; i < length; i++) {
            password += this.getRandomChar(characterSet);
        }
        
        // Shuffle the password
        password = this.shuffleString(password);
        
        document.getElementById('generatedPassword').value = password;
    }
    
    getRandomChar(str) {
        return str.charAt(Math.floor(Math.random() * str.length));
    }
    
    shuffleString(str) {
        return str.split('').sort(() => Math.random() - 0.5).join('');
    }
    
    async copyPassword() {
        const passwordField = document.getElementById('generatedPassword');
        const copyBtn = document.getElementById('copyBtn');
        
        if (passwordField.value === '') {
            alert('Generate password terlebih dahulu!');
            return;
        }
        
        try {
            await navigator.clipboard.writeText(passwordField.value);
            
            // Visual feedback
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
            
        } catch (err) {
            // Fallback for older browsers
            passwordField.select();
            document.execCommand('copy');
            alert('Password berhasil disalin!');
        }
    }
}

// Password Checker Functionality
class PasswordChecker {
    constructor() {
        this.initEventListeners();
    }
    
    initEventListeners() {
        const passwordInput = document.getElementById('passwordCheck');
        const toggleBtn = document.getElementById('togglePassword');
        
        passwordInput.addEventListener('input', (e) => {
            this.checkPassword(e.target.value);
        });
        
        toggleBtn.addEventListener('click', () => {
            this.togglePasswordVisibility();
        });
    }
    
    checkPassword(password) {
        const criteria = this.evaluateCriteria(password);
        const strength = this.calculateStrength(criteria);
        
        this.updateCriteriaDisplay(criteria);
        this.updateStrengthMeter(strength);
    }
    
    evaluateCriteria(password) {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            numbers: /\d/.test(password),
            symbols: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)
        };
    }
    
    calculateStrength(criteria) {
        const password = document.getElementById('passwordCheck').value;
        let score = 0;
        let strengthLevel = '';
        
        // Basic criteria scoring
        if (criteria.length) score += 1;
        if (criteria.uppercase) score += 1;
        if (criteria.lowercase) score += 1;
        if (criteria.numbers) score += 1;
        if (criteria.symbols) score += 1;
        
        // Length bonus
        if (password.length >= 12) score += 1;
        if (password.length >= 16) score += 1;
        
        // Determine strength level
        if (score <= 2) {
            strengthLevel = 'very-weak';
        } else if (score <= 3) {
            strengthLevel = 'weak';
        } else if (score <= 4) {
            strengthLevel = 'medium';
        } else if (score <= 5) {
            strengthLevel = 'strong';
        } else {
            strengthLevel = 'very-strong';
        }
        
        return {
            score: score,
            maxScore: 7,
            level: strengthLevel,
            percentage: (score / 7) * 100
        };
    }
    
    updateCriteriaDisplay(criteria) {
        const criteriaElements = {
            length: document.getElementById('lengthCriterion'),
            uppercase: document.getElementById('uppercaseCriterion'),
            lowercase: document.getElementById('lowercaseCriterion'),
            numbers: document.getElementById('numberCriterion'),
            symbols: document.getElementById('symbolCriterion')
        };
        
        Object.keys(criteria).forEach(key => {
            const element = criteriaElements[key];
            const isValid = criteria[key];
            
            if (isValid) {
                element.classList.add('valid');
            } else {
                element.classList.remove('valid');
            }
        });
    }
    
    updateStrengthMeter(strength) {
        const strengthFill = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        
        // Update progress bar
        strengthFill.style.width = `${strength.percentage}%`;
        strengthFill.className = `strength-fill ${strength.level}`;
        
        // Update text
        const strengthLabels = {
            'very-weak': 'Sangat Lemah',
            'weak': 'Lemah',
            'medium': 'Sedang',
            'strong': 'Kuat',
            'very-strong': 'Sangat Kuat'
        };
        
        if (document.getElementById('passwordCheck').value === '') {
            strengthText.textContent = 'Masukkan password';
            strengthText.className = 'strength-text';
            strengthFill.style.width = '0%';
        } else {
            strengthText.textContent = strengthLabels[strength.level];
            strengthText.className = `strength-text text-${strength.level}`;
        }
    }
    
    togglePasswordVisibility() {
        const passwordInput = document.getElementById('passwordCheck');
        const toggleBtn = document.getElementById('togglePassword');
        const icon = toggleBtn.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            passwordInput.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }
}

// Smooth Scrolling for Navigation
class Navigation {
    constructor() {
        this.initSmoothScrolling();
    }
    
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 100; // Account for fixed header
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Utility Functions
class Utilities {
    static showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });
        
        // Set background color based on type
        const colors = {
            success: '#48bb78',
            error: '#f56565',
            warning: '#ed8936',
            info: '#5a67d8'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    static validateInput(input, rules) {
        const errors = [];
        
        if (rules.required && !input.trim()) {
            errors.push('Field ini wajib diisi');
        }
        
        if (rules.minLength && input.length < rules.minLength) {
            errors.push(`Minimal ${rules.minLength} karakter`);
        }
        
        if (rules.maxLength && input.length > rules.maxLength) {
            errors.push(`Maksimal ${rules.maxLength} karakter`);
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

// Common Password Patterns (for additional security checking)
class SecurityPatterns {
    static commonPasswords = [
        'password', '123456', 'password123', 'admin', 'qwerty',
        'letmein', 'welcome', 'monkey', '1234567890', 'abc123',
        'password1', '12345678', 'sunshine', 'iloveyou', 'princess'
    ];
    
    static keyboardPatterns = [
        'qwerty', 'asdf', 'zxcv', '1234', 'abcd',
        'qwertyuiop', 'asdfghj', 'zxcvbnm'
    ];
    
    static isCommonPassword(password) {
        return this.commonPasswords.includes(password.toLowerCase());
    }
    
    static hasKeyboardPattern(password) {
        const lowerPassword = password.toLowerCase();
        return this.keyboardPatterns.some(pattern => 
            lowerPassword.includes(pattern)
        );
    }
    
    static hasRepeatingChars(password) {
        const regex = /(.)\1{2,}/;
        return regex.test(password);
    }
    
    static hasSequentialChars(password) {
        for (let i = 0; i < password.length - 2; i++) {
            const char1 = password.charCodeAt(i);
            const char2 = password.charCodeAt(i + 1);
            const char3 = password.charCodeAt(i + 2);
            
            if (char2 === char1 + 1 && char3 === char2 + 1) {
                return true;
            }
        }
        return false;
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    new PasswordGenerator();
    new PasswordChecker();
    new Navigation();
    
    // Add some interactive enhancements
    addInteractiveEnhancements();
    
    console.log('🔐 Tools Keamanan initialized successfully!');
});

function addInteractiveEnhancements() {
    // Add fade-in animation to cards on scroll
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
    
    // Observe all cards
    document.querySelectorAll('.card, .doc-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            from {
                opacity: 1;
                transform: scale(0);
            }
            to {
                opacity: 0;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// Export for potential future use
window.SecurityTools = {
    PasswordGenerator,
    PasswordChecker,
    Navigation,
    Utilities,
    SecurityPatterns
};
