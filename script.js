document.addEventListener('DOMContentLoaded', () => {
    // --- Lead Generation Logic ---
    const handleFormSubmit = async (formId, emailId) => {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById(emailId);
            const email = emailInput.value;
            const responseDiv = document.getElementById('form-response');
            
            const submitBtn = form.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'SAVING...';
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://baget.ai/api/leads", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        companyId: "1ead56e2-81fa-42dc-8ed5-7c51887b1b98",
                        email: email,
                        name: "Founder Landing Lead"
                    })
                });

                if (response.ok) {
                    form.classList.add('hidden');
                    if (responseDiv) {
                        responseDiv.classList.remove('hidden');
                        responseDiv.innerText = `THANK YOU. ${email.toUpperCase()} HAS BEEN ADDED TO THE VAULT.`;
                    } else {
                        alert('THANK YOU. YOUR LEGACY IS WAITING.');
                    }
                } else {
                    throw new Error('API Error');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong. Please try again.');
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    };

    handleFormSubmit('lead-form', 'email');
    handleFormSubmit('footer-lead-form', 'footer-email');

    // --- Heirloom Scanner Demo Logic ---
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('file-input');
    const previewImg = document.getElementById('preview-img');
    const scanBtn = document.getElementById('scan-btn');
    const resetBtn = document.getElementById('reset-btn');
    const scannerLine = document.getElementById('scanner-line');
    const resultPlaceholder = document.getElementById('result-placeholder');
    const resultContent = document.getElementById('result-content');
    const recipeTitle = document.getElementById('recipe-title');
    const recipeIngredients = document.getElementById('recipe-ingredients');

    // Default "Real" Data for Simulation
    const sampleData = {
        title: "LEMON DRIZZLE CAKE",
        ingredients: [
            "4 large eggs, at room temp",
            "225g unsalted butter, softened",
            "225g caster sugar",
            "225g self-raising flour",
            "Zest of 2 large lemons",
            "1 old jam jar of milk (approx 50ml)"
        ]
    };

    // Trigger file input
    uploadZone.addEventListener('click', () => {
        if (!uploadZone.classList.contains('has-image')) {
            fileInput.click();
        }
    });

    // Handle file selection
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                previewImg.src = event.target.result;
                uploadZone.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle Scanning Simulation
    scanBtn.addEventListener('click', () => {
        // Disable UI
        scanBtn.disabled = true;
        scanBtn.innerText = "PROCESSING...";
        scannerLine.classList.remove('hidden');
        resultPlaceholder.innerText = "ANALYZING HANDWRITING...";
        resultPlaceholder.style.opacity = "1";
        resultContent.classList.add('hidden');

        // Step 1: Simulated "Visual Signature" detection
        setTimeout(() => {
            resultPlaceholder.innerText = "DETECTING TEXT METADATA...";
        }, 800);

        // Step 2: Simulated Transcription
        setTimeout(() => {
            resultPlaceholder.innerText = "TRANSCRIBING CURSIVE...";
        }, 1600);

        // Final step: Reveal Result
        setTimeout(() => {
            scannerLine.classList.add('hidden');
            resultPlaceholder.classList.add('hidden');
            resultContent.classList.remove('hidden');
            
            scanBtn.classList.add('hidden');
            resetBtn.classList.remove('hidden');
            
            // Note: In a real app, this would be the actual AI output
            // For demo, we use the sample data
        }, 3000);
    });

    // Reset Demo
    resetBtn.addEventListener('click', () => {
        uploadZone.classList.remove('has-image');
        previewImg.src = "images/overhead-shot-of-an-aged-stained-yellow.png";
        fileInput.value = "";
        
        resultContent.classList.add('hidden');
        resultPlaceholder.classList.remove('hidden');
        resultPlaceholder.innerText = "AWAITING SCAN...";
        resultPlaceholder.style.opacity = "0.3";
        
        scanBtn.classList.remove('hidden');
        scanBtn.disabled = false;
        scanBtn.innerText = "SCAN HANDWRITING";
        resetBtn.classList.add('hidden');
    });

    // Simple drag and drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = "var(--accent)";
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.style.borderColor = "var(--accent-light)";
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = "var(--accent-light)";
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                previewImg.src = event.target.result;
                uploadZone.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        }
    });
});
