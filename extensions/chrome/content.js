function injectButton() {
  const headActions = document.querySelector('.pagehead-actions');
  if (headActions && !document.getElementById('innofusion-index-btn')) {
    const li = document.createElement('li');
    li.innerHTML = `
      <button id="innofusion-index-btn" class="btn btn-sm btn-primary" style="background: linear-gradient(135deg, #6366f1, #a855f7); color: white; border: none; border-radius: 6px; padding: 4px 12px; font-weight: 600; display: flex; align-items: center; gap: 6px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><path d="m13 2-2 10h8L7 22l2-10H1L13 2z"/></svg>
        Index with CodebaseGPT
      </button>
    `;
    headActions.prepend(li);

    document.getElementById('innofusion-index-btn').addEventListener('click', () => {
      const githubUrl = window.location.href;
      chrome.runtime.sendMessage({ action: "indexRepo", githubUrl }, (response) => {
        if (response.success) {
          alert("Indexing started! You can check the progress in the CodebaseGPT dashboard.");
        } else {
          alert("Error: " + response.error);
        }
      });
    });
  }
}

// Observe for page changes (GitHub uses pushState)
const observer = new MutationObserver(() => {
  if (window.location.hostname === 'github.com' && window.location.pathname.split('/').length >= 3) {
    injectButton();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// Initial injection
if (window.location.hostname === 'github.com' && window.location.pathname.split('/').length >= 3) {
  injectButton();
}
