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

            // Check for slug in URL
            const urlParams = new URLSearchParams(window.location.search);
            const slug = urlParams.get('prototype');
            if (slug) {
                const proto = prototypes.find(p => p.slug === slug);
                if (proto) {
                    openViewer(proto);
                }
            }
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
        // Construct path: prototypes/{id}/{file} or default to index.html
        const fileName = proto.file || 'index.html';
        prototypeFrame.src = `prototypes/${proto.id}/${fileName}`;
        viewerModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Update URL
        if (proto.slug) {
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('prototype', proto.slug);
            window.history.pushState({ path: newUrl.href }, '', newUrl.href);
        }
    }

    function closeViewer() {
        viewerModal.classList.add('hidden');
        prototypeFrame.src = ''; // Clear iframe to stop execution
        document.body.style.overflow = '';

        // Clear URL param
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete('prototype');
        window.history.pushState({ path: newUrl.href }, '', newUrl.href);
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
