// Elementos do DOM
const openModalBtn = document.getElementById('openModal');
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

// Abrir modal
openModalBtn.addEventListener('click', openModal);

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
    console.log('Modal de Upload de Imagens carregado com sucesso!');
});

