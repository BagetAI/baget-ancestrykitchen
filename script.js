document.addEventListener('DOMContentLoaded', () => {
    const handleFormSubmit = async (formId, emailId) => {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById(emailId).value;
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
});