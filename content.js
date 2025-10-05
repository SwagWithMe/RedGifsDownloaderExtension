function addDownloadButtonAndAd() {
    const previews = document.querySelectorAll('.GifPreview');
    console.log(`Найдено GifPreview: ${previews.length}`);
    
    previews.forEach(preview => {
        if (preview.querySelector('.rg-download-btn')) {
            console.log('Кнопка уже добавлена для этого GifPreview');
        } else {
            const img = preview.querySelector('img.Player-Poster');
            const metaInfo = preview.querySelector('.GifPreview-MetaInfo');
            
            if (img && metaInfo) {
                console.log(`Найден img.Player-Poster с src: ${img.getAttribute('src')}`);
                
                const downloadButton = document.createElement('button');
                downloadButton.textContent = 'Скачать';
                downloadButton.className = 'rg-download-btn';
                
                downloadButton.addEventListener('click', () => {
                    downloadButton.disabled = true;
                    downloadButton.textContent = 'Открытие...';
                    console.log('Нажата кнопка Скачать');
                    
                    try {
                        const src = img.getAttribute('src');
                        const videoUrl = src.replace('-mobile.jpg', '.mp4');
                        console.log(`Открывается новая вкладка: ${videoUrl}`);
                        
                        window.open(videoUrl, '_blank');
                        
                        downloadButton.textContent = 'Скачать';
                        downloadButton.disabled = false;
                    } catch (error) {
                        console.error(`Ошибка при открытии: ${error.message}`);
                        alert('Не удалось открыть видео. Проверьте консоль для деталей.');
                        downloadButton.textContent = 'Скачать';
                        downloadButton.disabled = false;
                    }
                });
                
                metaInfo.insertBefore(downloadButton, metaInfo.firstChild);
                console.log('Кнопка добавлена в GifPreview-MetaInfo');
            } else {
                if (!img) console.log('img.Player-Poster не найден в GifPreview');
                if (!metaInfo) console.log('GifPreview-MetaInfo не найден в GifPreview');
            }
        }

        if (preview.querySelector('.rg-telegram-ad')) {
            return;
        }

        const metaInfo = preview.querySelector('.GifPreview-MetaInfo');
        if (metaInfo) {
            const telegramAd = document.createElement('a');
            telegramAd.textContent = 'Присоединяйтесь к нашему Telegram!';
            telegramAd.className = 'rg-telegram-ad';
            telegramAd.href = 'https://t.me/lostsoulsfamily';
            telegramAd.target = '_blank';
            telegramAd.rel = 'noopener noreferrer';
            
            metaInfo.appendChild(telegramAd);
            console.log('Реклама Telegram добавлена в GifPreview-MetaInfo');
        } else {
            console.log('GifPreview-MetaInfo не найден для добавления рекламы');
        }
    });
}

const interval = setInterval(() => {
    addDownloadButtonAndAd();
    const hasButtons = document.querySelectorAll('.rg-download-btn').length > 0;
    const hasAds = document.querySelectorAll('.rg-telegram-ad').length > 0;
    if (hasButtons && hasAds) {
        console.log('Кнопки добавлена, останавливаем интервал');
        clearInterval(interval);
    }
}, 500);

const observer = new MutationObserver(() => {
    console.log('Обнаружены изменения в DOM, запускаем addDownloadButtonAndAd');
    addDownloadButtonAndAd();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Первоначальный запуск
console.log('Скрипт запущен');
addDownloadButtonAndAd();
