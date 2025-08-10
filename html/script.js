// Script para funcionalidades básicas da galeria

document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidade para limpar a barra de pesquisa
    const searchInput = document.querySelector('.search-bar input');
    const clearButton = document.querySelector('.clear-button');
    
    if (clearButton && searchInput) {
        clearButton.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
        });
    }
    
    // Funcionalidade para os filtros de categoria
    const filters = document.querySelectorAll('.filter');
    
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove a classe ativa de todos os filtros
            filters.forEach(f => f.classList.remove('active'));
            
            // Adiciona a classe ativa ao filtro clicado
            this.classList.add('active');
            
            // Aqui poderia ser implementada a lógica de filtragem real
            // Por enquanto é apenas visual
        });
    });
    
    // Adiciona classe ativa ao filtro "Todos" por padrão
    if (filters.length > 0) {
        filters[0].classList.add('active');
    }
});
// Elementos do DOM

const modalOverlay = document.getElementById('modalOverlay');
const exitPerfilBtn = document.getElementById('exitPerfil');
const exitHomeBtn = document.getElementById('exitHome');
const cancelBtn = document.getElementById('cancelBtn');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const removeImageBtn = document.getElementById('removeImage');
const descriptionBtn = document.getElementById('descriptionBtn');
const permissionsBtn = document.getElementById('permissionsBtn');
const publishBtn = document.getElementById('publishBtn');
const addBtn = document.getElementById('addBtn');

// Modais secundários
const descriptionModal = document.getElementById('descriptionModal');
const permissionsModal = document.getElementById('permissionsModal');
const cancelDescriptionBtn = document.getElementById('cancelDescription');
const saveDescriptionBtn = document.getElementById('saveDescription');
const cancelPermissionsBtn = document.getElementById('cancelPermissions');
const savePermissionsBtn = document.getElementById('savePermissions');
const descriptionText = document.getElementById('descriptionText');

// Variáveis de estado
let currentImage = null;
let currentDescription = '';
let currentPermission = 'public';

// Função para abrir o modal
function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Função para fechar o modal
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetModal();
}

// Função para resetar o modal
function resetModal() {
    currentImage = null;
    currentDescription = '';
    currentPermission = 'public';
    imagePreview.style.display = 'none';
    uploadArea.style.display = 'block';
    descriptionText.value = '';
    
    // Reset radio buttons
    const radioButtons = document.querySelectorAll('input[name="permission"]');
    radioButtons.forEach(radio => {
        radio.checked = radio.value === 'public';
    });
}

// Função para processar arquivo selecionado
function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        currentImage = e.target.result;
        previewImg.src = currentImage;
        uploadArea.style.display = 'none';
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// Função para mostrar notificação
function showNotification(message, type = 'success') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 3000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Event Listeners



// Fechar modal
exitPerfilBtn.addEventListener('click', closeModal);
exitHomeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// Fechar modal clicando no overlay
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Upload de arquivo
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
});

// Drag and Drop
uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

// Remover imagem
removeImageBtn.addEventListener('click', function() {
    currentImage = null;
    imagePreview.style.display = 'none';
    uploadArea.style.display = 'block';
    fileInput.value = '';
});

// Botão adicionar (mesmo comportamento do upload)
addBtn.addEventListener('click', () => {
    fileInput.click();
});

// Modal de descrição
descriptionBtn.addEventListener('click', function() {
    descriptionModal.classList.add('active');
    descriptionText.value = currentDescription;
    descriptionText.focus();
});

cancelDescriptionBtn.addEventListener('click', function() {
    descriptionModal.classList.remove('active');
});

saveDescriptionBtn.addEventListener('click', function() {
    currentDescription = descriptionText.value.trim();
    descriptionModal.classList.remove('active');
    
    if (currentDescription) {
        showNotification('Descrição salva com sucesso!');
        descriptionBtn.style.background = 'rgba(76, 175, 80, 0.8)';
        descriptionBtn.textContent = 'DESCRIÇÃO ✓';
    } else {
        descriptionBtn.style.background = 'rgba(169, 105, 189, 0.8)';
        descriptionBtn.textContent = 'DESCRIÇÃO';
    }
});

// Fechar modal de descrição clicando no overlay
descriptionModal.addEventListener('click', function(e) {
    if (e.target === descriptionModal) {
        descriptionModal.classList.remove('active');
    }
});

// Modal de permissões
permissionsBtn.addEventListener('click', function() {
    permissionsModal.classList.add('active');
});

cancelPermissionsBtn.addEventListener('click', function() {
    permissionsModal.classList.remove('active');
});

savePermissionsBtn.addEventListener('click', function() {
    const selectedPermission = document.querySelector('input[name="permission"]:checked');
    if (selectedPermission) {
        currentPermission = selectedPermission.value;
        permissionsModal.classList.remove('active');
        
        // Atualizar visual do botão
        let permissionText = '';
        switch(currentPermission) {
            case 'public':
                permissionText = 'PÚBLICO';
                break;
            case 'friends':
                permissionText = 'AMIGOS';
                break;
            case 'private':
                permissionText = 'PRIVADO';
                break;
        }
        
        showNotification(`Permissão definida como: ${permissionText}`);
        permissionsBtn.style.background = 'rgba(76, 175, 80, 0.8)';
        permissionsBtn.textContent = `PERMISSÕES ✓`;
    }
});

// Fechar modal de permissões clicando no overlay
permissionsModal.addEventListener('click', function(e) {
    if (e.target === permissionsModal) {
        permissionsModal.classList.remove('active');
    }
});

// Publicar
publishBtn.addEventListener('click', function() {
    if (!currentImage) {
        showNotification('Por favor, selecione uma imagem antes de publicar.', 'error');
        return;
    }
    
    // Simular processo de publicação
    publishBtn.textContent = 'PUBLICANDO...';
    publishBtn.disabled = true;
    publishBtn.style.background = 'rgba(255, 193, 7, 0.8)';
    
    setTimeout(() => {
        // Dados da publicação
        const postData = {
            image: currentImage,
            description: currentDescription,
            permission: currentPermission,
            timestamp: new Date().toISOString()
        };
        
        console.log('Dados da publicação:', postData);
        
        showNotification('Imagem publicada com sucesso!');
        
        // Reset do botão
        publishBtn.textContent = 'PUBLICAR';
        publishBtn.disabled = false;
        publishBtn.style.background = 'rgba(0, 0, 0, 0.8)';
        
        // Fechar modal após publicação
        setTimeout(() => {
            closeModal();
        }, 1500);
        
    }, 2000);
});

// Teclas de atalho
document.addEventListener('keydown', function(e) {
    // ESC para fechar modais
    if (e.key === 'Escape') {
        if (descriptionModal.classList.contains('active')) {
            descriptionModal.classList.remove('active');
        } else if (permissionsModal.classList.contains('active')) {
            permissionsModal.classList.remove('active');
        } else if (modalOverlay.classList.contains('active')) {
            closeModal();
        }
    }
    
    // Enter para salvar nos modais secundários
    if (e.key === 'Enter') {
        if (descriptionModal.classList.contains('active')) {
            saveDescriptionBtn.click();
        } else if (permissionsModal.classList.contains('active')) {
            savePermissionsBtn.click();
        }
    }
});

// Adicionar estilos para animações das notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log("Modal de Upload de Imagens carregado com sucesso!");
    openModal();
});






// Chat functionality
document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Avatar images mapping
    const avatarImages = {
        'Avatar 1': 'avatar1.png',
        'Lucas': 'avatar3.png',
        'Ana': 'avatar2.png',
        'Pedro': 'avatar5.png',
        'Maria': 'avatar4.png'
    };

    // Send message function
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return;

        // Create user message
        const userMessage = createMessage(messageText, true);
        chatMessages.appendChild(userMessage);

        // Clear input
        messageInput.value = '';

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate typing indicator
        setTimeout(() => {
            const typingIndicator = createTypingIndicator();
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Remove typing indicator and add response after delay
            setTimeout(() => {
                chatMessages.removeChild(typingIndicator);
                
                const randomResponse = autoResponses[Math.floor(Math.random() * autoResponses.length)];
                const botMessage = createMessage(randomResponse, false);
                chatMessages.appendChild(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1500);
        }, 500);
    }

    // Create message element
    function createMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'message-right' : 'message-left'}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        const avatarImg = document.createElement('img');
        avatarImg.className = 'avatar-img';
        avatarImg.src = isUser ? avatarImages['Lucas'] : avatarImages['Avatar 1'];
        avatarImg.alt = isUser ? 'Lucas' : 'Avatar 1';
        avatar.appendChild(avatarImg);

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';

        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = text;

        bubble.appendChild(messageText);

        if (isUser) {
            messageDiv.appendChild(bubble);
            messageDiv.appendChild(avatar);
            
            const sender = document.createElement('span');
            sender.className = 'message-sender';
            sender.textContent = 'Lucas';
            messageDiv.appendChild(sender);
        } else {
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(bubble);
        }

        return messageDiv;
    }

    // Create typing indicator
    function createTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message message-left typing-indicator';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        const avatarImg = document.createElement('img');
        avatarImg.className = 'avatar-img';
        avatarImg.src = avatarImages['Avatar 1'];
        avatarImg.alt = 'Avatar 1';
        avatar.appendChild(avatarImg);

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';

        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.innerHTML = '<span class="typing-dots">●●●</span>';

        bubble.appendChild(messageText);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(bubble);

        return messageDiv;
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);

    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 600) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Conversation switching
    const conversationItems = document.querySelectorAll('.conversation-item');
    conversationItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            conversationItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update chat header
            const name = this.querySelector('.conversation-name').textContent;
            const avatarImg = this.querySelector('.avatar-img');
            
            document.querySelector('.chat-title').textContent = name;
            const chatAvatarImg = document.querySelector('.chat-avatar-large .avatar-img');
            if (chatAvatarImg) {
                chatAvatarImg.src = avatarImg.src;
                chatAvatarImg.alt = name;
            } else {
                // Create avatar image if it doesn't exist
                const newAvatarImg = document.createElement('img');
                newAvatarImg.className = 'avatar-img';
                newAvatarImg.src = avatarImg.src;
                newAvatarImg.alt = name;
                document.querySelector('.chat-avatar-large').appendChild(newAvatarImg);
            }
            
            // Clear messages and add welcome message
            chatMessages.innerHTML = '';
            const welcomeMessage = createMessage(`Olá! Esta é uma conversa com ${name}. Como posso ajudar?`, false);
            chatMessages.appendChild(welcomeMessage);
        });
    });

    // Search functionality - updated for new structure
    const searchInput = document.querySelector('.search-input');
    const searchClose = document.querySelector('.search-close');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        conversationItems.forEach(item => {
            const name = item.querySelector('.conversation-name').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    searchClose.addEventListener('click', function() {
        searchInput.value = '';
        conversationItems.forEach(item => {
            item.style.display = 'flex';
        });
        searchInput.focus();
    });

    // Login button interaction
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', function() {
        // Simulate login action
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });

    // Add some initial animation
    setTimeout(() => {
        const messages = document.querySelectorAll('.message');
        messages.forEach((message, index) => {
            message.style.opacity = '0';
            message.style.transform = 'translateY(10px)';
            setTimeout(() => {
                message.style.transition = 'all 0.3s ease';
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }, 100);

    // Header logo animation on load
    setTimeout(() => {
        const logoIcon = document.querySelector('.logo-icon');
        logoIcon.style.transform = 'rotate(360deg)';
        logoIcon.style.transition = 'transform 1s ease';
        setTimeout(() => {
            logoIcon.style.transform = 'rotate(0deg)';
        }, 1000);
    }, 500);
});

// Add CSS for typing indicator animation
const style = document.createElement('style');
style.textContent = `
    .typing-indicator .message-bubble {
        background: rgba(255, 255, 255, 0.1) !important;
    }
    
    .typing-dots {
        display: inline-block;
        animation: typingAnimation 1.5s infinite;
    }
    
    @keyframes typingAnimation {
        0%, 60%, 100% {
            opacity: 0.3;
        }
        30% {
            opacity: 1;
        }
    }
    
    .typing-dots::before {
        content: '●';
        animation: typingDot1 1.5s infinite;
    }
    
    .typing-dots::after {
        content: '●●';
        animation: typingDot2 1.5s infinite;
    }
    
    @keyframes typingDot1 {
        0%, 20%, 100% { opacity: 0.3; }
        10% { opacity: 1; }
    }
    
    @keyframes typingDot2 {
        0%, 40%, 100% { opacity: 0.3; }
        20%, 30% { opacity: 1; }
    }

    /* Additional header enhancements */
    .logo-icon {
        transition: transform 0.3s ease;
    }
    
    .logo:hover .logo-icon {
        transform: scale(1.1);
    }
    
    .search-wrapper:focus-within .search-input {
        transform: scale(1.02);
    }
`;
document.head.appendChild(style);

