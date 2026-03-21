document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const repoNameDiv = document.getElementById('repo-name');
  const indexBtn = document.getElementById('index-now');
  
  if (tab.url.includes('github.com')) {
    const parts = new URL(tab.url).pathname.split('/');
    if (parts.length >= 3) {
      const owner = parts[1];
      const repo = parts[2];
      repoNameDiv.textContent = `${owner}/${repo}`;
    } else {
      repoNameDiv.textContent = "Not a repository";
      indexBtn.disabled = true;
      indexBtn.style.opacity = '0.5';
    }
  } else {
    repoNameDiv.textContent = "Not on GitHub";
    indexBtn.disabled = true;
    indexBtn.style.opacity = '0.5';
  }

  indexBtn.addEventListener('click', () => {
    indexBtn.disabled = true;
    indexBtn.textContent = "Indexing...";
    chrome.runtime.sendMessage({ action: "indexRepo", githubUrl: tab.url }, (response) => {
      if (response.success) {
        indexBtn.textContent = "Started!";
        setTimeout(() => {
          indexBtn.disabled = false;
          indexBtn.textContent = "Index Repo";
        }, 2000);
      } else {
        alert("Error: " + response.error);
        indexBtn.disabled = false;
        indexBtn.textContent = "Index Repo";
      }
    });
  });

  document.getElementById('open-dashboard').addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:5173/dashboard' }); // Assuming local dev for now
  });

  document.getElementById('open-chat').addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:5173/chat' });
  });
});
