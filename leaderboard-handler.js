// ************************************************************
// leaderboard-handler.js كود لجلب بيانات الى لوحة الصدارة
// ************************************************************

// 💡 رابط جدول بيانات لوحة الصدارة الجديد (Sheet4)
const LEADERBOARD_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMFOTBCPvSFrvWjx6_XHfr2exNawMJkcwtLEUQgHCFDFoqscd-NK4AW6V9opbMS-KzTrDr6crUn9_Q/pub?gid=922918227&single=true&output=csv';

// ************************************************************
// 1. دالة تحليل CSV للمباريات (يمكن إعادة استخدامها)
// ************************************************************
function parseLeaderboardCSV(text) {
    const rows = text.split('\n').map(row => row.trim()).filter(row => row.length > 0);
    if (rows.length < 2) return []; 
    
    // إزالة الصف الأول (رؤوس الأعمدة)
    const dataRows = rows.slice(1);
    
    return dataRows.map(row => {
        const columns = [];
        let inQuote = false;
        let currentCell = '';
        
        for (let i = 0; i < row.length; i++) {
            const char = row[i];
            
            if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                columns.push(currentCell.trim().replace(/^"|"$/g, '').trim());
                currentCell = '';
            } else {
                currentCell += char;
            }
        }
        columns.push(currentCell.trim().replace(/^"|"$/g, '').trim());
        
        return columns;
    }).filter(row => row[0] && row[0].length > 0); // تصفية الصفوف الفارغة (العمود A)
}


// ************************************************************
// 2. دالة عرض بطاقة اللاعب في لوحة الصدارة (renderLeaderboardCard) - مُعدَّلة لسطرين من الإحصائيات
// ************************************************************
function renderLeaderboardCard(data, index) {
    // ربط الأعمدة: [0: اسم اللاعب، ...، 6: Win، 7: Lose، 8: Played، 9: Points]
    const [rawName, okeyNormal, okeyDouble, okeyDoubleD, tens, cheat, win, lose, played, points] = data; // 💡 تم تغيير name إلى rawName

    const container = document.getElementById('leaderboard-list');
    if (!container) return;

    const rank = index + 1;
    const rankDisplay = `#${rank.toString().padStart(2, '0')}`;
    
    // 💡 المنطق الجديد لجعل الاسم إجباريًا سطرين
    const nameParts = rawName.trim().split(' ');
    let nameDisplay;
    
    if (nameParts.length > 1) {
        // نأخذ الكلمة الأولى ونترك الباقي في السطر الثاني مفصولاً بـ <br>
        const firstName = nameParts[0];
        const restOfName = nameParts.slice(1).join(' ');
        nameDisplay = `${firstName}<br>${restOfName}`; // 💡 الإضافة الإجبارية لفاصل السطر
    } else {
        // إذا كان كلمة واحدة فقط، نعرضها كما هي
        nameDisplay = rawName;
    }
    // نهاية المنطق الجديد

    
    // --- السطر الأول: الأوكي والعشرة ---
    const topStats = [];
// ... (بقية منطق الإحصائيات لم يتغير)
    if (parseInt(okeyDoubleD) > 0) topStats.push(`👑+${okeyDoubleD}`); // دبلين
    if (parseInt(okeyDouble) > 0) topStats.push(`🔥+${okeyDouble}`);   // دبل
    if (parseInt(okeyNormal) > 0) topStats.push(`💎+${okeyNormal}`);   // عادي
    if (parseInt(tens) > 0) topStats.push(`🎯+${tens}`);             // عشرة
    
    const topStatsHTML = topStats.join(' '); 
    
    // --- السطر الثاني: الغش وإحصائيات اللعب ---
    const bottomStats = [];
    if (parseInt(cheat) > 0) bottomStats.push(`💣+${cheat}`); // غش (عقوبات)
    
    const winCount = parseInt(win) || 0;
    const loseCount = parseInt(lose) || 0;
    const playedCount = parseInt(played) || 0;

    // إضافة الفوز والخسارة واللعب
    bottomStats.push(`🏆${winCount}`);  // فاز
    bottomStats.push(`💀${loseCount}`); // خسر
    bottomStats.push(`🎴${playedCount}`); // لعب

    const bottomStatsHTML = bottomStats.join(' ');
    
    
    const card = document.createElement('li');
    card.classList.add('leaderboard-entry');
    
    // إعادة استخدام الألوان التي تفضلها (أخضر وداكن)
    card.style.backgroundColor = 'var(--green-success)'; 
    card.style.color = 'var(--dark-bg)';
    
    card.innerHTML = `
        <div class="card-column rank-column">
            <span class="column-title">الترتيب</span>
            <span class="rank-number">${rankDisplay}</span>
        </div>
        
        <div class="card-column player-column">
            <span class="column-title">اللاعب</span>
            <span class="player-name">${nameDisplay}</span> </div>
        
        <div class="card-column achievements-two-lines">
            <span class="column-title">الإنجازات / الأداء</span>
            <div class="achievements-row top-achievements-row">
                ${topStatsHTML || '—'}
            </div>
            <div class="achievements-row bottom-achievements-row">
                ${bottomStatsHTML || '—'}
            </div>
        </div>
        
        <div class="card-column points-column">
            <span class="column-title">النقاط</span>
            <span class="points-number">${points || '0'}</span>
        </div>
    `;

    container.appendChild(card);
}

// ************************************************************
// 3. دالة جلب وعرض لوحة الصدارة (loadLeaderboardData)
// ************************************************************
async function loadLeaderboardData() {
    const container = document.getElementById('leaderboard-list');
    if (!container) return;
    
    container.innerHTML = '<li class="loading-message" style="margin-top: 20px; text-align: center;">جاري تحميل لوحة الصدارة...</li>';

    try {
        const response = await fetch(LEADERBOARD_CSV_URL);
        if (!response.ok) throw new Error('فشل جلب لوحة الصدارة: ' + response.statusText);
        
        const csvText = await response.text();
        const playersData = parseLeaderboardCSV(csvText); 

        // 💡 الفرز حسب النقاط (العمود رقم 9) تنازلياً
        playersData.sort((a, b) => {
            const pointsA = parseInt(a[9]) || 0;
            const pointsB = parseInt(b[9]) || 0;
            return pointsB - pointsA;
        });

        container.innerHTML = '';
        
        if (playersData.length === 0 || (playersData.length === 1 && !playersData[0][0])) {
            container.innerHTML = '<li class="empty-message" style="margin-top: 20px; text-align: center;">لا توجد إحصائيات مسجلة لعرض لوحة الصدارة.</li>';
            return;
        }
        
        // عرض أول 100 لاعب فقط (لتجنب البطء)
        playersData.slice(0, 100).forEach(renderLeaderboardCard); 

    } catch (error) {
        console.error('Leaderboard Load Error:', error);
        container.innerHTML = '<li class="loading-message" style="color: var(--red-error); margin-top: 20px; text-align: center;">❌ فشل تحميل لوحة الصدارة.</li>';
    }
}

// 💡 جعل الدالة متاحة عالمياً لـ script.js
window.loadLeaderboardData = loadLeaderboardData;