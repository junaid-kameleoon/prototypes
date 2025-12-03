document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const viewerModal = document.getElementById('viewer-modal');
    const viewerTitle = document.getElementById('viewer-title');
    const prototypeFrame = document.getElementById('prototype-frame');
    const closeViewerBtn = document.getElementById('close-viewer');

    // Fetch prototypes
    fetch('prototypes.json')
        .then(response => response.json())
        .then(prototypes => {
            renderGallery(prototypes);
        })
        .catch(error => {
            console.error('Error loading prototypes:', error);
            galleryGrid.innerHTML = '<p class="error">Failed to load prototypes.</p>';
        });

    function renderGallery(prototypes) {
        galleryGrid.innerHTML = '';
        
        if (prototypes.length === 0) {
            galleryGrid.innerHTML = '<p class="empty-state">No prototypes found. Add one to get started!</p>';
            return;
        }

        prototypes.forEach(proto => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => openViewer(proto);

            card.innerHTML = `
                <div class="card-preview">
                    ${proto.icon || '📱'}
                </div>
                <div class="card-content">
                    <h3 class="card-title">${proto.title}</h3>
                    <p class="card-desc">${proto.description}</p>
                </div>
            `;
            galleryGrid.appendChild(card);
        });
    }

    function openViewer(proto) {
        viewerTitle.textContent = proto.title;
        // Construct path: prototypes/{id}/index.html
        prototypeFrame.src = `prototypes/${proto.id}/index.html`;
        viewerModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeViewer() {
        viewerModal.classList.add('hidden');
        prototypeFrame.src = ''; // Clear iframe to stop execution
        document.body.style.overflow = '';
    }

    closeViewerBtn.addEventListener('click', closeViewer);

    // Close on click outside
    viewerModal.addEventListener('click', (e) => {
        if (e.target === viewerModal) {
            closeViewer();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !viewerModal.classList.contains('hidden')) {
            closeViewer();
        }
    });
});
