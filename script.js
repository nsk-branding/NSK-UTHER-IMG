const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const categoryButtons = document.querySelectorAll('.category-btn');
const searchInput = document.getElementById('search');

// Cargar las imágenes desde el JSON
fetch('imagenes.json')
    .then(response => response.json())
    .then(data => {
        let imagenes = data.imagenes;
        renderGallery(imagenes);
    });

// Función para renderizar la galería
function renderGallery(imagenes) {
    gallery.innerHTML = ''; // Limpiar galería
    imagenes.forEach(image => {
        const imageElement = document.createElement('div');
        imageElement.classList.add('gallery-item');
        imageElement.innerHTML = `
            <img src="${image.url}" alt="${image.nombre}" onclick="openModal('${image.url}')">
            <input type="text" value="${image.url}" readonly onclick="this.select()">
        `;
        gallery.appendChild(imageElement);
    });
}

// Función para abrir la imagen en modal
function openModal(imageUrl) {
    modal.style.display = 'flex';
    modalImage.src = imageUrl;
}

// Función para cerrar el modal
function closeModal() {
    modal.style.display = 'none';
}

// Filtrar imágenes por categoría
categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        const selectedCategory = this.getAttribute('data-category');
        fetch('imagenes.json')
            .then(response => response.json())
            .then(data => {
                const filteredImages = selectedCategory === 'all' ? data.imagenes : data.imagenes.filter(img => img.categoria.toLowerCase() === selectedCategory.toLowerCase());
                renderGallery(filteredImages);
            });
    });
});

// Buscar imágenes por nombre
searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    fetch('imagenes.json')
        .then(response => response.json())
        .then(data => {
            const filteredImages = data.imagenes.filter(img => img.nombre.toLowerCase().includes(query));
            renderGallery(filteredImages);
        });
});
