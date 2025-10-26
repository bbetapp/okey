// ************************************************************
// archive-handler.js كود جلب البيانات الى سجل الالعاب
// ************************************************************

// ✅ هذا هو الرابط الذي يوفر البيانات بصيغة CSV
const GAME_ARCHIVE_CSV_URL = 'https://docs.google.com/spreadsheets/d/1sDu4k2zN8dQco6Sn_h1LSY04W53zyi-jOmc4QvXCv9I/export?format=csv&gid=410361398';

// ************************************************************
// 1. دالة تحليل CSV للمباريات (parseArchiveCSV)
// ************************************************************
function parseArchiveCSV(text) {
    const rows = text.split('\n').map(row => row.trim()).filter(row => row.length > 0);
    if (rows.length < 2) return []; 
    
    // تجاهل صف الرؤوس
    const dataRows = rows.slice(1);
    
    // استخدام طريقة معالجة متسقة لضمان جلب الأعمدة الفارغة
    return dataRows.map(row => {
        const columns = [];
        let inQuote = false;
        let currentCell = '';
        
        for (let i = 0; i < row.length; i++) {
            const char = row[i];
            
            if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                // دفع الخلية بعد إزالة الاقتباسات والمسافات
                columns.push(currentCell.trim().replace(/^"|"$/g, '').trim());
                currentCell = '';
            } else {
                currentCell += char;
            }
        }
        // إضافة الخلية الأخيرة
        columns.push(currentCell.trim().replace(/^"|"$/g, '').trim());
        
        return columns;
    });
}

// ************************************************************
// 2. دالة عرض بطاقة المباراة (renderArchiveCard) - مُعدَّلة
// ************************************************************
function renderArchiveCard(data) {
    // ربط الأعمدة حسب الترتيب (A:0 حتى T:19)
    const [date, time, day, winner1, winner2, winnerScore, 
           okeyNormal_W, okeyDouble_W, okeyDoubleD_W, tens_W, cheat_W, 
           totalRounds, 
           loser1, loser2, loserScore, 
           okeyNormal_L, okeyDouble_L, okeyDoubleD_L, tens_L, cheat_L] = data;

    const archiveListContainer = document.getElementById('archive-list-container');
    if (!archiveListContainer) return;

    const winnerNames = winner1 + (winner2 ? `<br>${winner2}` : '');
    const loserNames = loser1 + (loser2 ? `<br>${loser2}` : '');
    
    const displayLoserScore = loserScore || '؟'; // يعرض القيمة كما هي، أو '؟' إذا كانت فارغة تماماً

    // *********************************************
    // بناء أيقونات إحصائيات الفائز (Winner Stats Icons)
    // *********************************************
    const winnerStats = [];
    if (okeyNormal_W && parseInt(okeyNormal_W) > 0) winnerStats.push(`+${okeyNormal_W} 💎`); // أوكي عادي
    if (okeyDouble_W && parseInt(okeyDouble_W) > 0) winnerStats.push(`+${okeyDouble_W} 🔥`); // أوكي دبل
    if (okeyDoubleD_W && parseInt(okeyDoubleD_W) > 0) winnerStats.push(`+${okeyDoubleD_W} 👑`); // أوكي دبلين (رمز مختلف)
    if (tens_W && parseInt(tens_W) > 0) winnerStats.push(`+${tens_W} 🎯`); // عشرات
    if (cheat_W && parseInt(cheat_W) > 0) winnerStats.push(`+${cheat_W} 💣`); // غش/ملك

    // ✅ التعديل الرئيسي لتقسيم الإحصائيات إلى سطرين (3 فوق، الباقي تحت)
    const topLineStats_W = winnerStats.slice(0, 3).join(' '); // أول 3 عناصر
    const bottomLineStats_W = winnerStats.slice(3).join(' '); // الباقي
    
    // إنشاء HTML باستخدام وسمي .stats-line
    const winnerStatsHTML = `
        <div class="stats-icons">
            <div class="stats-line top-line">${topLineStats_W}</div>
            <div class="stats-line bottom-line">${bottomLineStats_W}</div>
        </div>`;

    // *********************************************
    // بناء أيقونات إحصائيات الخاسر (Loser Stats Icons)
    // *********************************************
    const loserStats = [];
    if (okeyNormal_L && parseInt(okeyNormal_L) > 0) loserStats.push(`+${okeyNormal_L} 💎`);
    if (okeyDouble_L && parseInt(okeyDouble_L) > 0) loserStats.push(`+${okeyDouble_L} 🔥`);
    if (okeyDoubleD_L && parseInt(okeyDoubleD_L) > 0) loserStats.push(`+${okeyDoubleD_L} 👑`);
    if (tens_L && parseInt(tens_L) > 0) loserStats.push(`+${tens_L} 🎯`);
    if (cheat_L && parseInt(cheat_L) > 0) loserStats.push(`+${cheat_L} 💣`);
    
    // ✅ التعديل الرئيسي لتقسيم الإحصائيات إلى سطرين (3 فوق، الباقي تحت)
    const topLineStats_L = loserStats.slice(0, 3).join(' '); // أول 3 عناصر
    const bottomLineStats_L = loserStats.slice(3).join(' '); // الباقي
    
    // إنشاء HTML باستخدام وسمي .stats-line
    const loserStatsHTML = `
        <div class="stats-icons">
            <div class="stats-line top-line">${topLineStats_L}</div>
            <div class="stats-line bottom-line">${bottomLineStats_L}</div>
        </div>`;


    const card = document.createElement('div');

    card.innerHTML = `
        <div class="card-header-bar">
            <div class="header-rounds">
                <span class="total-rounds-count">${totalRounds || '؟'}</span>
                <span class="material-symbols-outlined refresh-icon">refresh</span>
            </div>
            <span class="header-time">${time || '??:??'}</span>
            <div class="header-date-day">
                <span class="day-name">${day || 'اليوم'}</span>
                <span class="date-number">${date || 'تاريخ غير معروف'}</span>
                <span class="material-symbols-outlined calendar-icon">calendar_month</span>
            </div>
        </div>

        <div class="card-score-body">
            
            <div class="team-section winner-section">
                ${winnerStatsHTML}
                <span class="team-players">${winnerNames}</span>
                <span class="team-score trophy-score">${winnerScore || '?'} <span class="material-symbols-outlined trophy-icon">trophy</span></span>
            </div>
            
            <div class="team-section loser-section">
                ${loserStatsHTML}
                <span class="team-players">${loserNames}</span>
                <span class="team-score skull-score">${displayLoserScore} <span class="material-symbols-outlined skull-icon">skull</span></span>
            </div>
        </div>
    `;

    archiveListContainer.appendChild(card);
}
// ************************************************************
// 3. دالة جلب وعرض سجل الألعاب (loadGameArchive)
// ************************************************************
async function loadGameArchive() {
    // 💡 التحقق من وجود عناصر DOM
    const archiveListContainer = document.getElementById('archive-list-container');
    const archiveLoadingMessage = document.getElementById('archive-loading-message');
    
    if (!archiveListContainer || !archiveLoadingMessage) {
        // إذا لم يتم العثور على العناصر، لن يتم تنفيذ الدالة. 
        return;
    }
    
    archiveListContainer.innerHTML = '';
    archiveLoadingMessage.classList.remove('hidden');

    try {
        const response = await fetch(GAME_ARCHIVE_CSV_URL);
        if (!response.ok) throw new Error('فشل جلب الأرشيف: ' + response.statusText);
        
        const csvText = await response.text();
        const gamesData = parseArchiveCSV(csvText); 

        archiveLoadingMessage.classList.add('hidden');
        
        if (gamesData.length === 0) {
            archiveListContainer.innerHTML = '<p class="loading-message">لا توجد مباريات مسجلة حالياً.</p>';
            return;
        }
        
        // عرض البطاقات بالترتيب العكسي (الأحدث أولاً)
        gamesData.reverse().forEach(renderArchiveCard); 

    } catch (error) {
        archiveLoadingMessage.classList.add('hidden');
        archiveListContainer.innerHTML = '<p class="loading-message" style="color: var(--red-error);">❌ فشل تحميل الأرشيف. قد تكون هناك مشكلة في رابط الملف.</p>';
    }
}