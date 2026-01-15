document.addEventListener('DOMContentLoaded', () => {
    // Tab switching logic (simulation)
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Hover effects and micro-interactions
    const learningCards = document.querySelectorAll('.learning-card:not(.empty-add)');
    learningCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = '#3b82f6';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '#e2e8f0';
        });
    });

    // Simulation of "Add New Learning"
    const addCard = document.querySelector('.empty-add');
    if (addCard) {
        addCard.addEventListener('click', () => {
            alert('This would open a modal to capture a new insight for the repository.');
        });
    }

    // Header actions simulation
    const exportBtn = document.querySelector('.btn-secondary');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            console.log('Exporting data...');
            exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> EXPORTING...';
            setTimeout(() => {
                exportBtn.innerHTML = '<i class="fas fa-check"></i> EXPORTED';
                setTimeout(() => {
                    exportBtn.innerHTML = '<i class="fas fa-upload"></i> EXPORT';
                }, 2000);
            }, 1500);
        });
    }
});
