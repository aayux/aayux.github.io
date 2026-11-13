async function loadNews() {
    const container = document.getElementById('news-content');

    try {
        const response = await fetch('content/news.html', { cache: 'no-cache' });
        if (!response.ok) {
            throw new Error(`Unable to load news: ${response.status}`);
        }
        container.innerHTML = await response.text();
        const dateFormat = new Intl.DateTimeFormat('en-US', {
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC'
        });
        container.querySelectorAll('time[datetime]').forEach((time) => {
            const value = time.getAttribute('datetime');
            if (/^\d{4}-(0[1-9]|1[0-2])(?:-\d{2})?$/.test(value)) {
                const date = new Date(`${value.slice(0, 7)}-01T00:00:00Z`);
                time.textContent = dateFormat.format(date);
            }
        });
    } catch (error) {
        console.error(error);
    }
}

loadNews();
