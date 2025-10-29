// ************************************************************
// 1.0. القسم الرئيسي: التهيئة، الثوابت، والمتغيرات العامة
// ************************************************************

document.addEventListener('DOMContentLoaded', () => {

    // ************************************************************
    // 1.1. الثوابت الخارجية (Google Sheet URLs)
    // ************************************************************
    const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMFOTBCPvSFrvWjx6_XHfr2exNawMJkcwtLEUQgHCFDFoqscd-NK4AW6V9opbMS-KzTrDr6crUn9_Q/pub?gid=0&single=true&output=csv';
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx3c8ChxVCTrTLRrA5ciFsyrHKuz9uZDDDPOOVI3o99JGygYO1IJs7cRyBgM0ade7du/exec'; 
    const APPS_SCRIPT_STATS_URL = 'https://script.google.com/macros/s/AKfycbw01IVwRyPCvgt88DvxG0T6pbivPFnT68cKVVEw3DY5jOOoKE5BES5e_A7x2c1r6TxI/exec';
    const DEFAULT_IMAGE_PATH = '👤'; 

    // ************************************************************
    // 1.2. تحديد عناصر DOM الرئيسية (UI Elements)
    // ************************************************************
    // عناصر الشاشات
    const homeScreen = document.getElementById('home-screen');
    const playersScreen = document.getElementById('players-screen');
    const scoreScreen = document.getElementById('score-screen');
    const historyScreen = document.getElementById('history-screen');
    const winScreen = document.getElementById('win-screen'); 
    const gameArchiveScreen = document.getElementById('game-archive-screen'); 
    const settingsScreen = document.getElementById('settings-screen'); 
    
    // عناصر التحكم بالبداية واختيار اللاعبين
    const gameTypeSelection = document.getElementById('game-type-selection'); 
    const modeSelectionArea = document.getElementById('mode-selection-area'); 
    const teamGameButton = document.getElementById('team-game-button');
    const soloGameTypeButton = document.getElementById('solo-game-type-button'); 
    const startSelectedModeButton = document.getElementById('start-selected-mode-button'); 
    const playerSelectionArea = document.getElementById('player-selection-area');
    const team1Player1Select = document.getElementById('team1-player1-select');
    const team1Player2Select = document.getElementById('team1-player2-select');
    const team2Player1Select = document.getElementById('team2-player1-select');
    const team2Player2Select = document.getElementById('team2-player2-select');
    const playerSelects = document.querySelectorAll('.player-select');
    const playerSelectionError = document.getElementById('player-selection-error');
    
    // عناصر شاشة النقاط والتحكم
    const cancelGameButton = document.getElementById('cancel-game-button');
    const resetAllButton = document.getElementById('reset-button');
    const addScoresButton = document.getElementById('add-scores-button');
    const roundsList = document.getElementById('rounds-list');
    const scoreInputLoser = document.getElementById('score-input-loser'); 
    const winTypeButtons = document.querySelectorAll('.win-type-button'); 
    const multiplierDisplay = document.getElementById('multiplier-display'); 
    const teamTotalCards = document.querySelectorAll('.team-total-card');
    const addTenButtons = document.querySelectorAll('.add-ten-quick-button'); 
    const winIconsOurs = document.getElementById('win-icons-ours');
    const winIconsTheirs = document.getElementById('win-icons-theirs');
    const labelTeamTheirs = document.getElementById('label-team-theirs');
    const labelTeamOurs = document.getElementById('label-team-ours');
    const historyTheirsLabel = document.getElementById('history-theirs-label');
    const historyOursLabel = document.getElementById('history-ours-label');

    // عناصر العقوبة السريعة (Modal)
    const quickPenaltyButton = document.getElementById('quick-penalty-button');
    const penaltyModal = document.getElementById('penalty-modal');
    const closePenaltyModalButton = document.getElementById('close-penalty-modal');
    const penaltyTeamSelect = document.getElementById('penalty-team-select');
    const penaltyPlayerGroup = document.getElementById('penalty-player-group');
    const penaltyPlayerSelect = document.getElementById('penalty-player-select');
    const applyPenaltyButton = document.getElementById('apply-penalty-button');
    
    // عناصر اختيار الفائز بالنقاط (Modal)
    const playerWinModal = document.getElementById('player-win-modal');
    const closePlayerWinModalButton = document.getElementById('close-player-win-modal');
    const winModalTitle = document.getElementById('win-modal-title');
    const winModalTeamName = document.getElementById('win-modal-team-name');
    const winModalPoints = document.getElementById('win-modal-points');
    const winPlayerSelect = document.getElementById('win-player-select');
    const confirmScorePlayerButton = document.getElementById('confirm-score-player-button');
    const modalTeamKey = document.getElementById('modal-team-key');
    const modalRoundType = document.getElementById('modal-round-type');
    const modalBaseScore = document.getElementById('modal-base-score');
    
    // عناصر شريط التنقل
    const bottomNavBar = document.getElementById('bottom-nav-bar');
    const homeNavBar = document.getElementById('home-nav-bar');
    const navButtons = document.querySelectorAll('.bottom-nav-bar .nav-button'); 
    const navScoresButton = document.getElementById('nav-scores');
    const navHistoryButton = document.getElementById('nav-history');
    const navHomeHistory = document.getElementById('nav-home-history'); 
    const navPlayers = document.getElementById('nav-players'); 
    const topNavHomeSettings = document.getElementById('top-nav-home-settings'); 
    const navHomeMain = document.getElementById('nav-home-main');
    const historyBackButton = document.getElementById('history-back-button');
    const clearHistoryButton = document.getElementById('clear-history-button');
    const archiveBackButton = document.getElementById('archive-back-button');
    const settingsBackButton = document.getElementById('settings-back-button');

    // عناصر شاشة الفوز
    const winnerNamesDisplay = document.getElementById('winner-names');
    const winStatsContainer = document.querySelector('.win-stats');
    const winScreenNewGameButton = document.getElementById('win-screen-new-game');
    const winScreenReviewButton = document.getElementById('win-screen-review');
    const modeButtons = document.querySelectorAll('.mode-button'); 
    // ... (ضمن القسم 1.2. تحديد عناصر DOM الرئيسية)
    
    // عناصر شاشة الأرشيف (Archive Screen) 💡 جديد
    const archiveListContainer = document.getElementById('archive-list-container'); 
    const archiveLoadingMessage = document.getElementById('archive-loading-message'); 
    
    // ... (باقي العناصر)
    // عناصر شاشة اللاعبين
    
    const playersBackButton = document.getElementById('players-back-button');
    const addPlayerButtonFull = document.getElementById('add-player-button-full');
    const addPlayerFormArea = document.getElementById('add-player-form-area');
    const newPlayerNameInput1 = document.getElementById('new-player-name1');
    const newPlayerNameInput2 = document.getElementById('new-player-name2');
    const newPlayerIconInput = document.getElementById('new-player-icon-input'); 
    const selectedIconPreview = document.getElementById('selected-icon-preview'); 
    const previewIconSpan = document.getElementById('preview-icon'); 
    const saveNewPlayerButton = document.getElementById('save-new-player');
    const playersListContainer = document.getElementById('players-list');
    const leaderboardButton = document.getElementById('leaderboard-button'); 
    const playersListButton = document.getElementById('players-list-button');
    const playerManagementArea = document.getElementById('player-management-area'); 
    const leaderboardArea = document.getElementById('leaderboard-area');             
    const leaderboardListContainer = document.getElementById('leaderboard-list');

    // ************************************************************
    // 1.3. المتغيرات العامة لحالة اللعبة
    // ************************************************************
    let roundCounter = 0;
    let roundsLogData = []; 
    let currentWinnerTeam = 'ours'; 
    let currentWinMultiplier = 1; 
    let currentWinnerScore = 20; 
    let currentMode = 'target-score'; 
    let modeLimit = 200;              
    let currentGameType = 'team';     
    let currentPlayers = []; 
    let selectedIcon = DEFAULT_IMAGE_PATH; 

    // ************************************************************
    // 1.4. تعريف الفرق وحالة الإنجازات
    // ************************************************************
    const teams = {
        theirs: { 
            scoreDisplay: document.getElementById('score-team-theirs'), 
            totalScore: 0, 
            label: '',
            opponent: 'ours',
            normalWins: 0, 
            doubleWins: 0, 
            doubleDoubleWins: 0, 
            tenPointsCount: 0,
            penaltyCount: 0
        },
        ours: { 
            scoreDisplay: document.getElementById('score-team-ours'), 
            totalScore: 0, 
            label: '',
            opponent: 'theirs',
            normalWins: 0, 
            doubleWins: 0, 
            doubleDoubleWins: 0, 
            tenPointsCount: 0,
            penaltyCount: 0
        }
    };

    // ************************************************************
    // 1.5. دالة تنسيق النقاط المساعدة
    // ************************************************************
    const formatScore = (score) => {
        if (score >= 0) {
            return `${score}+`;
        } else {
            return `${Math.abs(score)}-`; 
        }
    };

// ------------------------------------------------------------
// نهاية الجزء الأول
// ------------------------------------------------------------
// ************************************************************
// 2.0. القسم الثاني: المنطق الأساسي، معالجة النقاط، والسجل
// ************************************************************

    // ************************************************************
    // 2.1. وظائف تحديث حالة الواجهة
    // ************************************************************
    
    // ************************************************************
    // 2.1.1. دالة تحديث حالة الإدخال والأزرار (updateInputAndButtonState)
    // ************************************************************
    function updateInputAndButtonState() {
        const isWinnerSelected = document.querySelector('.team-total-card.winner-active');
        const loserValue = scoreInputLoser.value.trim();
        const isLoserScoreValid = loserValue !== '' && parseInt(loserValue) > 0;

        if (isWinnerSelected) {
            scoreInputLoser.removeAttribute('disabled');
            scoreInputLoser.setAttribute('placeholder', '0'); 
        } else {
            scoreInputLoser.setAttribute('disabled', 'disabled');
            scoreInputLoser.value = ''; 
            scoreInputLoser.setAttribute('placeholder', 'نقاط المهزوم'); 
        }

        if (isWinnerSelected && isLoserScoreValid) {
            addScoresButton.removeAttribute('disabled');
        } else {
            addScoresButton.setAttribute('disabled', 'disabled');
        }
    }
    
    // ************************************************************
    // 2.1.2. دالة تحديث أيقونات الإنجازات (updateAchievementIcons)
    // ************************************************************
    function updateAchievementIcons() {
        const formatIcon = (count, icon) => {
            if (count > 0) {
                return `<span class="achievement-count">${count}</span>${icon}`;
            }
            return '';
        };

        const buildIcons = (teamKey) => {
            const team = teams[teamKey];
            let iconsArray = [];
            
            if (team.penaltyCount > 0) {
                 iconsArray.push(formatIcon(team.penaltyCount, '💣')); 
            }
            
            iconsArray.push(formatIcon(team.doubleDoubleWins, '👑')); 
            iconsArray.push(formatIcon(team.doubleWins, '🔥'));      
            iconsArray.push(formatIcon(team.normalWins, '💎'));       
            iconsArray.push(formatIcon(team.tenPointsCount, '🎯'));  
            
            return iconsArray.filter(i => i !== '').join(' ');
        };

        if (winIconsOurs) winIconsOurs.innerHTML = buildIcons('ours');
        if (winIconsTheirs) winIconsTheirs.innerHTML = buildIcons('theirs');
    }
    
    // ************************************************************
    // 2.2. وظائف إدارة السجل (History)
    // ************************************************************

  // ************************************************************
// 2.2.1. دالة استقبال سجل الجولات (reRenderHistory)
// ************************************************************
function reRenderHistory() {
    roundsList.innerHTML = '';
    
    // 🛑 1. عكس أسماء الفرق في رأس السجل (Header)
    // نحن نعكسها بحيث: مربع Theirs (اليسار) يأخذ اسم الفريق Ours، ومربع Ours (اليمين) يأخذ اسم الفريق Theirs.
    if (historyTheirsLabel) {
        historyTheirsLabel.textContent = teams.ours.label.replace(/<br>/g, ' و '); // اليسار = الفريق الثاني
    }
    if (historyOursLabel) { 
        historyOursLabel.textContent = teams.theirs.label.replace(/<br>/g, ' و '); // اليمين = الفريق الأول
    }
    
    if (!roundsLogData || roundsLogData.length === 0) {
        roundsList.innerHTML = '<li class="empty-message">لا يوجد سجل لفات حالي.</li>';
        return;
    }

    [...roundsLogData].reverse().forEach(roundData => { 
        
        let isSeparateTen = roundData.roundType === 'ten';
        let isPenalty = roundData.roundType === 'penalty'; 
        let isRound = roundData.roundType === 'round';
        
        const listItem = document.createElement('li');
        listItem.classList.add('round-entry');

        let centerContent = '';
        if (isSeparateTen) {
            const playerName = roundData.winType.replace('ten_separate_by_', ''); 
            centerContent = `<span class="ten-point-marker">🎯</span> ${playerName}`; 
            listItem.classList.add('ten-only-round');
        } else if (isPenalty) { 
            const penalizedPlayer = roundData.winType.replace('penalty_for_', '');
            centerContent = `<span class="penalty-marker">💣</span> ${penalizedPlayer}`; 
            listItem.classList.add('penalty-round');
        } else if (isRound) {
            const parts = roundData.winType.split('_by_');
            const type = parts[0]; 
            const winnerName = parts.length > 1 ? parts[1] : null; 
            
            let icon = '';
            if (type === 'double-double') icon = '👑';
            else if (type === 'double') icon = '🔥';
            else icon = '💎';
            
            centerContent = `
                <span class="round-number-text">#${roundData.roundNumber}</span> 
                <span class="round-winner-info">${icon} ${winnerName || ''}</span>
            `;
            listItem.classList.add('normal-round');
        } else {
            centerContent = `<span class="round-number-text">#${roundData.roundNumber || 'خاصة'}</span>`;
        }
        
        // 🛑 2. عكس أماكن عرض النقاط (Scores)
        const scoreForLeftColumn = roundData.theirs; // اليسار يأخذ نقاط 'theirs' (الفريق الأول)
const scoreForRightColumn = roundData.ours; // اليمين يأخذ نقاط 'ours' (الفريق الثاني)
        listItem.innerHTML = `
            <span class="score-theirs ${scoreForLeftColumn > 0 ? 'positive-score' : scoreForLeftColumn < 0 ? 'negative-score' : ''}">
                ${formatScore(scoreForLeftColumn)}
            </span>
            
            <span class="round-details">${centerContent}</span>
            
            <span class="score-ours ${scoreForRightColumn > 0 ? 'positive-score' : scoreForRightColumn < 0 ? 'negative-score' : ''}">
                ${formatScore(scoreForRightColumn)}
            </span>
            
            <button class="delete-round-button" onclick="deleteRound(${roundData.id})">
                <span class="material-symbols-outlined">delete</span>
            </button>
        `;
        
        roundsList.appendChild(listItem);
    });
}
    // ************************************************************
    // 2.2.2. دالة إضافة جولة للسجل (appendRoundToHistory)
    // ************************************************************
    function appendRoundToHistory(theirsScore, oursScore, winType) {
        let isSeparateTen = winType.startsWith('ten_separate');
        let isPenalty = winType.startsWith('penalty_for_');
        
        if (!isSeparateTen && !isPenalty) {
            if (typeof roundCounter !== 'undefined') {
                roundCounter++;
            } else {
                console.error("roundCounter is not defined! Rounds may be misnumbered.");
            }
        }

        const roundData = {
            id: Date.now() + Math.random(), 
            theirs: theirsScore,
            ours: oursScore,
            roundType: isPenalty ? 'penalty' : (isSeparateTen ? 'ten' : 'round'),
            roundNumber: isSeparateTen || isPenalty ? null : roundCounter,
            winType: winType
        };
        
        if (typeof roundsLogData !== 'undefined') {
            roundsLogData.push(roundData);
            reRenderHistory();
        } else {
            console.error("roundsLogData is not defined! Cannot save round.");
        }
    }
    
    // ************************************************************
    // 2.2.3. دالة حذف جولة من السجل (deleteRound)
    // ************************************************************
    function deleteRound(idToDelete) {
        const roundIndex = roundsLogData.findIndex(r => r.id === idToDelete);
        
        if (roundIndex === -1) return;
        
        const roundData = roundsLogData[roundIndex];
        
        let confirmationMessage = '';
        if (roundData.roundType === 'round') {
             const type = roundData.winType.split('_by_')[0];
             const winner = roundData.winType.split('_by_')[1] || 'الفريق';
             confirmationMessage = `هل أنت متأكد من حذف جولة ${type} رقم ${roundData.roundNumber} للفائز ${winner}؟`;
        } else if (roundData.roundType === 'ten') {
             const winner = roundData.winType.split('_by_')[1] || 'الفريق';
             confirmationMessage = `هل أنت متأكد من حذف العشرة (+10) التي جلبها ${winner}؟`;
        } else if (roundData.roundType === 'penalty') {
             const penalized = roundData.winType.replace('penalty_for_', '');
             confirmationMessage = `هل أنت متأكد من حذف عقوبة (-40) على اللاعب ${penalized}؟`;
        } else {
             confirmationMessage = `هل أنت متأكد من حذف الحركة رقم ${roundData.roundNumber || 'خاصة'}: ${roundData.theirs} - ${roundData.ours}؟`;
        }

        if (!confirm(confirmationMessage)) {
            return;
        }

        teams.theirs.totalScore -= roundData.theirs;
        teams.ours.totalScore -= roundData.ours;
        
        teams.theirs.scoreDisplay.textContent = formatScore(teams.theirs.totalScore); 
        teams.ours.scoreDisplay.textContent = formatScore(teams.ours.totalScore); 
        
        // إعادة حساب عدادات الإنجازات
        if (roundData.roundType === 'round') {
            const winnerTeamKey = roundData.theirs > roundData.ours ? 'theirs' : 'ours';
            const winnerTeam = teams[winnerTeamKey];
            const loserScoreAbs = Math.abs(roundData.theirs < 0 ? roundData.theirs : roundData.ours);

            const type = roundData.winType.split('_by_')[0];

            if (type === 'double-double') {
                winnerTeam.doubleDoubleWins--;
            } else if (type === 'double') {
                winnerTeam.doubleWins--;
            } else {
                winnerTeam.normalWins--;
            }
            if (loserScoreAbs === 10) {
                 winnerTeam.tenPointsCount--;
            }
        } else if (roundData.roundType === 'ten') {
             const winnerTeamKey = roundData.theirs > roundData.ours ? 'theirs' : 'ours';
             teams[winnerTeamKey].tenPointsCount--;
        } else if (roundData.roundType === 'penalty') {
             const penalizedTeamKey = roundData.theirs < 0 ? 'theirs' : 'ours';
             teams[penalizedTeamKey].penaltyCount--;
        }
        
        roundsLogData.splice(roundIndex, 1);
        
        let roundCount = 0;
        roundsLogData.forEach(r => {
            if (r.roundType === 'round') {
                r.roundNumber = ++roundCount;
            }
        });
        roundCounter = roundCount;

        updateAchievementIcons();
        reRenderHistory();
    }
    
    // ************************************************************
    // 2.3. وظائف معالجة النقاط والإنجازات
    // ************************************************************

    // ************************************************************
    // 2.3.1. دالة تسجيل العقوبة (applyQuickPenalty)
    // ************************************************************
    function applyQuickPenalty() {
        const targetTeamKey = penaltyTeamSelect.value;
        const penalizedPlayerName = penaltyPlayerSelect.value;

        if (!targetTeamKey || !penalizedPlayerName) {
            alert('يجب اختيار الفريق واللاعب لتسجيل العقوبة.');
            return;
        }

        const penaltyScore = -40;

        teams[targetTeamKey].totalScore += penaltyScore;
        teams[targetTeamKey].scoreDisplay.textContent = formatScore(teams[targetTeamKey].totalScore);
        
        teams[targetTeamKey].penaltyCount++;

        let scoreTheirs = targetTeamKey === 'theirs' ? penaltyScore : 0;
        let scoreOurs = targetTeamKey === 'ours' ? penaltyScore : 0;
        
        const roundData = {
            id: Date.now() + Math.random(), 
            theirs: scoreTheirs,
            ours: scoreOurs,
            roundType: 'penalty',
            roundNumber: null,
            winType: `penalty_for_${penalizedPlayerName}`
        };
        roundsLogData.push(roundData);

        reRenderHistory();
        updateAchievementIcons();
        
        penaltyModal.classList.add('hidden');
        
        checkGameOver();
    }
    
    // ************************************************************
    // 2.3.2. دالة تأكيد تسجيل النقاط بعد اختيار الفائز (confirmScore)
    // ************************************************************
    function confirmScore() {
        const winnerPlayerName = winPlayerSelect.value;
        const winnerTeamKey = modalTeamKey.value;
        const pointsType = modalRoundType.value;
        const baseLoserScore = parseInt(modalBaseScore.value);

        if (!winnerPlayerName) {
            alert('الرجاء اختيار اللاعب الفائز أولاً.');
            return;
        }
        
        playerWinModal.classList.add('hidden');

        // منطق تسجيل +10 فقط
        if (pointsType === 'ten') {
            teams[winnerTeamKey].totalScore += 10;
            teams[winnerTeamKey].scoreDisplay.textContent = formatScore(teams[winnerTeamKey].totalScore); 
            
            teams[winnerTeamKey].tenPointsCount++;
            updateAchievementIcons();
            
            let scoreTheirs = winnerTeamKey === 'theirs' ? 10 : 0;
            let scoreOurs = winnerTeamKey === 'ours' ? 10 : 0;
            
            appendRoundToHistory(scoreTheirs, scoreOurs, `ten_separate_by_${winnerPlayerName}`);
            
            checkGameOver();
            return;
        } 
        
        // منطق تسجيل الجولة العادية/الدبل
        const loserTeamKey = teams[winnerTeamKey].opponent; 
        const currentWinType = pointsType; 
        
        const finalLoserScore = -(baseLoserScore * currentWinMultiplier);
        const finalWinnerScore = currentWinnerScore; 

        let scoreTheirs = 0;
        let scoreOurs = 0;

        if (winnerTeamKey === 'theirs') {
            scoreTheirs = finalWinnerScore; 
            scoreOurs = finalLoserScore;    
        } else { 
            scoreTheirs = finalLoserScore;  
            scoreOurs = finalWinnerScore;   
        }
        
        teams.theirs.totalScore += scoreTheirs;
        teams.theirs.scoreDisplay.textContent = formatScore(teams.theirs.totalScore); 
        
        teams.ours.totalScore += scoreOurs;
        teams.ours.scoreDisplay.textContent = formatScore(teams.ours.totalScore); 

        const winnerTeam = teams[winnerTeamKey];
        if (currentWinType === 'double-double') {
            winnerTeam.doubleDoubleWins++;
        } else if (currentWinType === 'double') {
            winnerTeam.doubleWins++;
        } else {
            winnerTeam.normalWins++;
        }

        if (baseLoserScore === 10) {
             winnerTeam.tenPointsCount++;
        }

        appendRoundToHistory(scoreTheirs, scoreOurs, `${currentWinType}_by_${winnerPlayerName}`);
        
        scoreInputLoser.value = '';
        resetTeamSelection();
        updateAchievementIcons(); 

        checkGameOver();
    }
    
    // ************************************************************
    // 2.3.3. دالة إضافة النقاط (addScores)
    // ************************************************************
    function addScores() {
        const loserValueInput = scoreInputLoser.value.trim();
        
        if (loserValueInput === '' || parseInt(loserValueInput) === 0) {
            alert('الرجاء إدخال نقاط الخاسر الأساسية (رقم أكبر من صفر).');
            return;
        }

        if (!document.querySelector('.team-total-card.winner-active')) {
             alert('الرجاء تحديد الفريق الفائز/الخاسر أولاً بالنقر على إحدى البطاقتين.');
             return;
        }
        
        const baseLoserScore = parseInt(loserValueInput);
        const winnerTeamKey = currentWinnerTeam; 
        const currentWinType = document.querySelector('.win-type-button.active').getAttribute('data-win-type');

        showPlayerWinModal(winnerTeamKey, currentWinType, baseLoserScore);
    }
    
    // ************************************************************
    // 2.3.4. دالة إعادة تعيين اختيار الفرق (resetTeamSelection)
    // ************************************************************
    function resetTeamSelection() {
        teamTotalCards.forEach(card => {
            card.classList.remove('winner-active', 'loser-active');
        });

        const winTypeButtonsContainer = document.querySelector('.win-type-buttons');
        if (winTypeButtonsContainer) {
            winTypeButtonsContainer.classList.remove('visible');
        }

        document.querySelectorAll('.win-type-overlay').forEach(overlay => {
            overlay.classList.remove('show'); 
        });

        if (multiplierDisplay) {
            multiplierDisplay.textContent = 'X1';
        }
        
        updateInputAndButtonState();
    }

    // ************************************************************
    // 2.3.5. دالة إعادة تعيين النتائج والإنجازات (resetCurrentScores)
    // ************************************************************
    function resetCurrentScores() {
        teams.theirs.totalScore = 0;
        teams.ours.totalScore = 0;
        teams.theirs.scoreDisplay.textContent = formatScore(0);
        teams.ours.scoreDisplay.textContent = formatScore(0);
        
        teams.theirs.normalWins = teams.theirs.doubleWins = teams.theirs.doubleDoubleWins = teams.theirs.tenPointsCount = teams.theirs.penaltyCount = 0;
        teams.ours.normalWins = teams.ours.doubleWins = teams.ours.doubleDoubleWins = teams.ours.tenPointsCount = teams.ours.penaltyCount = 0;
        
        roundsLogData = []; 
        roundCounter = 0;
        reRenderHistory(); 

        scoreInputLoser.value = '';
        winTypeButtons.forEach(btn => btn.classList.remove('active'));
        const defaultWinButton = document.getElementById('win-20');
        if (defaultWinButton) defaultWinButton.classList.add('active');
        currentWinMultiplier = 1;
        currentWinnerScore = 20;
        
        resetTeamSelection(); 
        updateAchievementIcons();
        updateInputAndButtonState();
    }

    // ************************************************************
    // 2.4. دالة فحص نهاية اللعبة (checkGameOver)
    // ************************************************************
    function checkGameOver() {
        let isGameOver = false;
        let winnerTeamKey = null;
        
        const targetScore = modeLimit; 
        const targetLoss = -modeLimit; 

        const teamOurs = teams.ours;
        const teamTheirs = teams.theirs;

        if (currentMode === 'target-score' && targetScore > 0) {
            
            if (teamOurs.totalScore >= targetScore) {
                isGameOver = true; winnerTeamKey = 'ours'; 
            } else if (teamTheirs.totalScore >= targetScore) {
                isGameOver = true; winnerTeamKey = 'theirs';
            }
            else if (teamOurs.totalScore <= targetLoss) {
                isGameOver = true; winnerTeamKey = 'theirs'; 
                alert(`⛔️ لقد وصل ${teamOurs.label.replace(/<br>/g, ' و ')} إلى ${targetLoss} نقاط!`);
            } else if (teamTheirs.totalScore <= targetLoss) {
                isGameOver = true; winnerTeamKey = 'ours'; 
                alert(`⛔️ لقد وصل ${teamTheirs.label.replace(/<br>/g, ' و ')} إلى ${targetLoss} نقاط!`);
            }
        } 
        else if (currentMode === 'fixed-rounds' && modeLimit > 0) {
            const completedRounds = roundsLogData.filter(r => r.roundType === 'round').length;
            
            if (completedRounds >= modeLimit) {
                isGameOver = true;
                
                if (teamOurs.totalScore > teamTheirs.totalScore) {
                    winnerTeamKey = 'ours';
                } else if (teamTheirs.totalScore > teamOurs.totalScore) {
                    winnerTeamKey = 'theirs';
                } else {
                    alert(`انتهت ${modeLimit} دورات بتعادل! النقاط: ${teamOurs.totalScore} مقابل ${teamTheirs.totalScore}`);
                    return; 
                }
            }
        }
        
        if (isGameOver) {
            showWinScreen(winnerTeamKey, teamOurs.totalScore, teamTheirs.totalScore);
        }
    }

// ------------------------------------------------------------
// نهاية الجزء الثاني
// ------------------------------------------------------------
// ************************************************************
// 3.0. القسم الثالث: إدارة الواجهة، الشاشات، واللاعبين (Handlers)
// ************************************************************

    // ************************************************************
    // 3.1. وظائف التحكم بالشاشات (Navigation)
    // ************************************************************
    
    // ************************************************************
    // 3.1.1. دالة ضبط وضع اللعبة (setGameMode)
    // ************************************************************
    function setGameMode(mode, limit) {
        currentMode = mode;
        modeLimit = parseInt(limit);
        
        modeButtons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.mode-button[data-mode="${mode}"][data-limit="${limit}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        
        checkPlayerSelectionValidity();
    }

 // ************************************************************
// 3.1.2. دالة عرض الشاشة (showScreen) - النسخة النظيفة
// ************************************************************
function showScreen(targetScreenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    
    const targetScreen = document.getElementById(targetScreenId);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
    }
    
    bottomNavBar.classList.add('hidden'); 
    homeNavBar.classList.add('hidden');   

    navButtons.forEach(button => button.classList.remove('active'));
    
    // 💡 التحكم برؤية زر الإعدادات (topNavHomeSettings)
    if (topNavHomeSettings) {
        if (targetScreenId === 'home-screen') {
            topNavHomeSettings.classList.remove('hidden'); // إظهار الزر في الشاشة الرئيسية
        } else {
            topNavHomeSettings.classList.add('hidden'); // إخفاء الزر في الشاشات الأخرى
        }
    }
    
    const isHomeScreenBar = (
        targetScreenId === 'home-screen' || 
        targetScreenId === 'players-screen' || 
        targetScreenId === 'game-archive-screen' ||
        targetScreenId === 'settings-screen'
    );
    
    const isGameScreenBar = (
        targetScreenId === 'score-screen' || 
        targetScreenId === 'history-screen' 
    );
    
    if (isHomeScreenBar) {
        homeNavBar.classList.remove('hidden');
        
        // 💡 إضافة استدعاء دالة الأرشيف هنا
        if (targetScreenId === 'game-archive-screen' && typeof loadGameArchive === 'function') {
            loadGameArchive();
        }
        
    } else if (isGameScreenBar) {
        bottomNavBar.classList.remove('hidden'); 
        
        let baseId = targetScreenId.split('-')[0]; 
        if (baseId === 'score') baseId += 's'; 
        
        const activeNavButton = document.getElementById('nav-' + baseId);
        if (activeNavButton) {
            activeNavButton.classList.add('active'); 
        }
    }
    
    if (targetScreenId === 'history-screen' && clearHistoryButton) {
        clearHistoryButton.style.display = 'block'; 
    } else if (clearHistoryButton) {
        clearHistoryButton.style.display = 'none';
    }
}

    // ************************************************************
// 3.1.3. دالة الانتقال لشاشة النقاط (navigateToScoreScreen)
// ************************************************************
function navigateToScoreScreen() {
    // 1. جلب الأسماء المختارة من قوائم الاختيار في شاشة البداية
    const t1p1 = team1Player1Select.value;
    const t1p2 = team1Player2Select.value;
    const t2p1 = team2Player1Select.value;
    const t2p2 = team2Player2Select.value;
    
    // 2. تجميع الأسماء
    const team1Name = t1p1 + (t1p2 ? `<br>${t1p2}` : ''); // أسماء الفريق الأول
    const team2Name = t2p1 + (t2p2 ? `<br>${t2p2}` : ''); // أسماء الفريق الثاني

    // 3. حفظ الأسماء في متغيرات حالة اللعبة (Teams Object)
    // Ours (اليمين) = الفريق الأول المختار (team1Name)
    // Theirs (اليسار) = الفريق الثاني المختار (team2Name)
    
    teams.ours.label = team1Name;   // ✅ الصحيح: اسم الفريق الأول في 'ours'
    teams.theirs.label = team2Name; // ✅ الصحيح: اسم الفريق الثاني في 'theirs'
    
    // 4. عرض الأسماء في عناصر HTML الفعلية (مطابقة مع الحالة الداخلية)
    // labelTeamTheirs: يعرض اسم الفريق الثاني في مربع THEIRS (اليسار)
    labelTeamTheirs.innerHTML = team2Name; 
    
    // labelTeamOurs: يعرض اسم الفريق الأول في مربع OURS (اليمين)
    labelTeamOurs.innerHTML = team1Name;
    
    showScreen('score-screen');
}

// ************************************************************
// 3.1.4. دالة الانتقال للشاشة الرئيسية (navigateToHomeScreen) - النسخة النظيفة
// ************************************************************
function navigateToHomeScreen() {
    gameTypeSelection.classList.remove('hidden');
    modeSelectionArea.classList.add('hidden');
    playerSelectionArea.classList.add('hidden');
    showScreen('home-screen'); 
}
    // ************************************************************
    // 3.1.5. دالة الانتقال لشاشة اللاعبين (navigateToPlayersScreen)
    // ************************************************************
    function navigateToPlayersScreen() {
        showScreen('players-screen');
        importPlayersFromSheet(); 
        renderPlayersList();
        addPlayerFormArea.classList.add('hidden');
    }

// ************************************************************
// 3.1.6. دالة عرض وضع اللعب (showModeSelection) - النسخة النظيفة
// ************************************************************
function showModeSelection(type) {
    currentGameType = type; 
    
    if (currentGameType === 'solo') {
         alert('لعبة فردي قيد التطوير حالياً، يرجى اختيار لعبة فريق.');
         return; 
    }

    gameTypeSelection.classList.add('hidden');
    modeSelectionArea.classList.remove('hidden');
    playerSelectionArea.classList.remove('hidden'); 
    
    setGameMode(currentMode, modeLimit); 
}
    // ************************************************************
// 3.1.7. دالة عرض شاشة الفوز (showWinScreen) - مُعدَّلة للعناوين والعمودين
// ************************************************************
function showWinScreen(winnerTeamKey, scoreOurs, scoreTheirs) {
    const winnerTeam = teams[winnerTeamKey];
    const loserTeam = teams[winnerTeam.opponent];

    winnerNamesDisplay.innerHTML = winnerTeam.label.replace(/<br>/g, ' و '); 
    
    const winnerStatsContent = document.getElementById('winner-stats-content');
    const loserStatsContent = document.getElementById('loser-stats-content');
    
    winnerStatsContent.innerHTML = ''; 
    loserStatsContent.innerHTML = ''; 

    const achievementsOrder = [
        { type: 'doubleDoubleWins', icon: '👑', label: 'دبلين' },
        { type: 'doubleWins', icon: '🔥', label: ' دبل' },
        { type: 'normalWins', icon: '💎', label: 'أوكي ' },
        { type: 'tenPointsCount', icon: '🎯', label: 'عشرة' },
    ];
    
    // 💡 الدالة المساعدة لليسار: تُغلّف الأيقونة والنص ليتم دفعها إلى اليسار في CSS
    const createLeftContent = (iconHtml, label) => 
        `<span class="win-stat-left-column">
             ${iconHtml} ${label}
         </span>`;
         
    // إحصائيات الفائز
    let winnerTotalScore = document.createElement('p');
    const totalScoreIconWinner = `<span class="win-stat-icon" style="color: var(--green-success, #4CAF50);">💯</span>`;
    winnerTotalScore.innerHTML = `
        ${createLeftContent(totalScoreIconWinner, 'النتيجة')}
        <span class="win-stat-count">${winnerTeam.totalScore}</span>
    `;
    winnerStatsContent.appendChild(winnerTotalScore);

    achievementsOrder.forEach(achievement => {
        const count = winnerTeam[achievement.type];
        if (count > 0) {
            const p = document.createElement('p');
            const iconHtml = `<span class="win-stat-icon">${achievement.icon}</span>`;
            p.innerHTML = `
                ${createLeftContent(iconHtml, achievement.label)}
                <span class="win-stat-count">${count}</span>
            `;
            winnerStatsContent.appendChild(p);
        }
    });

    const winnerPenaltyCount = winnerTeam.penaltyCount;
    if (winnerPenaltyCount > 0) {
        const pPenalty = document.createElement('p');
        const penaltyIconHtml = `<span class="win-stat-icon" style="color: var(--red-error, #F44336);">💣</span>`;
        pPenalty.innerHTML = `
            ${createLeftContent(penaltyIconHtml, 'غش')}
            <span class="win-stat-count">${winnerPenaltyCount}</span>
        `;
        winnerStatsContent.appendChild(pPenalty);
    }
    
    // ------------------------------------------------------------
    // 🟢 (جديد) إضافة عنوان إحصائيات الخاسر (يحتوي على اسم اللاعبين)
    const loserTitle = document.createElement('h3');
    loserTitle.className = 'stats-section-title loser-title';
    const loserLabel = loserTeam.label.replace(/<br>/g, ' و ');
    loserTitle.innerHTML = `الخاسر: ${loserLabel}`; 
    loserStatsContent.appendChild(loserTitle);
    // ------------------------------------------------------------

    // إحصائيات الخاسر
    let loserTotalScore = document.createElement('p');
    const totalScoreIconLoser = `<span class="win-stat-icon" style="color: var(--red-error, #D32F2F);">📉</span>`;
    loserTotalScore.innerHTML = `
        ${createLeftContent(totalScoreIconLoser, 'النتيجة')}
        <span class="win-stat-count">${loserTeam.totalScore}</span>
    `;
    loserStatsContent.appendChild(loserTotalScore);
    
    achievementsOrder.forEach(achievement => {
        const count = loserTeam[achievement.type];
        if (count > 0) {
            const p = document.createElement('p');
            const iconHtml = `<span class="win-stat-icon">${achievement.icon}</span>`;
            p.innerHTML = `
                ${createLeftContent(iconHtml, achievement.label)}
                <span class="win-stat-count">${count}</span>
            `;
            loserStatsContent.appendChild(p);
        }
    });

    const loserPenaltyCount = loserTeam.penaltyCount;
    if (loserPenaltyCount > 0) {
        const pPenalty = document.createElement('p');
        const penaltyIconHtml = `<span class="win-stat-icon" style="color: #000;">💣</span>`;
        pPenalty.innerHTML = `
            ${createLeftContent(penaltyIconHtml, 'غش')}
            <span class="win-stat-count">${loserPenaltyCount}</span>
        `;
        loserStatsContent.appendChild(pPenalty);
    }

    const totalRounds = roundsLogData.filter(r => r.roundType === 'round').length;
    if (totalRounds > 0) {
        // إحصائية اللفات للفائز
        const pRoundsWinner = document.createElement('p');
        const roundsIconHtml = `<span class="win-stat-icon">🔄</span>`;
        pRoundsWinner.innerHTML = `
            ${createLeftContent(roundsIconHtml, ' اللفات')}
            <span class="win-stat-count">${totalRounds}</span>
        `;
        winnerStatsContent.appendChild(pRoundsWinner);
        
        // إحصائية اللفات للخاسر
        const pRoundsLoser = document.createElement('p');
        pRoundsLoser.innerHTML = `
            ${createLeftContent(roundsIconHtml, ' اللفات')}
            <span class="win-stat-count">${totalRounds}</span>
        `;
        loserStatsContent.appendChild(pRoundsLoser);
    }

    if (typeof exportStatsToSheet === 'function') {
        exportStatsToSheet(winnerTeam, loserTeam, roundsLogData);
    } else {
        console.warn("exportStatsToSheet function not found. Skipping export.");
    }
    
    showScreen('win-screen');
    
    addScoresButton.setAttribute('disabled', 'disabled'); 
    scoreInputLoser.setAttribute('disabled', 'disabled');
}
    
    // ************************************************************
    // 3.1.8. دالة إعادة اللعبة بالكامل (resetGame)
    // ************************************************************
    function resetGame() {
        resetCurrentScores(); 
        navigateToHomeScreen();
    }
    // ... (3.1.8. دالة إعادة اللعبة بالكامل موجودة سابقاً)
    
// ************************************************************
// 3.1.9. دالة التبديل بين شاشات اللاعبين (switchPlayerScreen) 💡 مُعدَّلة بقوة
// ************************************************************
function switchPlayerScreen(target) {
    
    // 💡 التعديل الحاسم: تنظيف شريط العنوان في شاشة اللاعبين/لوحة الصدارة بقوة
const headerTitle = document.querySelector('#players-screen .header-title');
    if (headerTitle) {
        headerTitle.textContent = ''; 
        headerTitle.innerHTML = ''; 
    }
    
    // إزالة حالة التفعيل من جميع الأزرار
    if (leaderboardButton) leaderboardButton.classList.remove('active-tab');
    if (playersListButton) playersListButton.classList.remove('active-tab');

    // إخفاء جميع الأقسام
    if (playerManagementArea) playerManagementArea.classList.add('hidden');
    if (leaderboardArea) leaderboardArea.classList.add('hidden');

    if (target === 'players') {
        if (playersListButton) playersListButton.classList.add('active-tab');
        if (playerManagementArea) playerManagementArea.classList.remove('hidden');
        renderPlayersList(); 
    } else if (target === 'leaderboard') {
        if (leaderboardButton) leaderboardButton.classList.add('active-tab');
        if (leaderboardArea) leaderboardArea.classList.remove('hidden');
        loadLeaderboardData(); 
    }
}
    
    // ************************************************************
    // 3.2. وظائف إدارة اللاعبين (Players Management)
    // ************************************************************
    
    // ************************************************************
    // 3.2.1. دالة إضافة لاعب جديد (addNewPlayer)
    // ************************************************************
    async function addNewPlayer() {
        const firstName = newPlayerNameInput1.value.trim();
        const lastName = newPlayerNameInput2.value.trim();
        const playerIcon = newPlayerIconInput.value.trim() || DEFAULT_IMAGE_PATH;
        
        if (firstName === '') {
            alert('الرجاء إدخال الاسم الأول على الأقل.');
            return;
        }
        
        const fullName = firstName + (lastName ? ' ' + lastName : '');
        
        if (currentPlayers.some(p => p.name === fullName)) {
            alert('هذا الاسم موجود بالفعل في القائمة.');
            return;
        }
        
        const iconToUse = playerIcon;

        const formData = new FormData();
        formData.append('name1', firstName);
        formData.append('name2', lastName);
        formData.append('image', iconToUse);

        try {
            saveNewPlayerButton.textContent = 'جاري الإضافة...';
            saveNewPlayerButton.disabled = true;

            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                body: formData
            });

            const resultText = await response.text();
            let result;
            try {
                result = JSON.parse(resultText);
            } catch (e) {
                alert(`فشل الإرسال: ${resultText}. تحقق من رابط النشر في Apps Script.`);
                return;
            }

            if (result.status === 'success') {
                alert('✅ تم إضافة اللاعب بنجاح إلى القائمة المركزية!');

                newPlayerNameInput1.value = '';
                newPlayerNameInput2.value = '';
                newPlayerIconInput.value = '';
                
                previewIconSpan.textContent = DEFAULT_IMAGE_PATH; 
                selectedIcon = DEFAULT_IMAGE_PATH;
                
                addPlayerFormArea.classList.add('hidden');
                
                navigateToPlayersScreen();
            } else {
                 alert(`❌ خطأ في Apps Script: ${result.message}`);
            }

        } catch (error) {
            console.error('Network or script error:', error);
            alert('❌ فشل الاتصال بخادم الحفظ المركزي. تحقق من الرابط والاتصال.');
        } finally {
            saveNewPlayerButton.textContent = 'إضافة وحفظ';
            saveNewPlayerButton.disabled = false;
        }
    }
    
  // ************************************************************
// 3.2.2. دالة عرض قائمة اللاعبين (renderPlayersList)
// ************************************************************
function renderPlayersList() {
    playersListContainer.innerHTML = '';
    if (currentPlayers.length === 0) {
        playersListContainer.innerHTML = '<li style="text-align: center; color: var(--gray-inactive); margin-top: 20px;">لا يوجد لاعبون مضافون بعد.</li>';
        return;
    }

    currentPlayers.forEach(player => {
        const listItem = document.createElement('li');
        listItem.classList.add('player-entry');

        // تم حذف عنصر <button class="action-button delete-player-button">
        listItem.innerHTML = `
            <div class="player-info">
                <span class="player-icon-display emoji-icon">
                    ${player.icon} 
                </span>
                <span class="player-name" data-player-name="${player.name}">${player.name}</span>
            </div>
        `;
        
        // تم حذف مستمع الحدث الخاص بزر الحذف أيضاً.
        
        playersListContainer.appendChild(listItem);
    });
}
    // ************************************************************
    // 3.2.3. دالة ملء قوائم الاختيار (populatePlayerSelects)
    // ************************************************************
    function populatePlayerSelects() {
        const selects = [team1Player1Select, team1Player2Select, team2Player1Select, team2Player2Select];
        
        selects.forEach(select => {
            const currentValue = select.value;
            select.innerHTML = '<option value="">اختر اللاعب</option>';
            
            currentPlayers.forEach(player => {
                const option = document.createElement('option');
                option.value = player.name;
                option.textContent = `${player.icon} ${player.name}`; 
                option.setAttribute('data-icon', player.icon);
                select.appendChild(option);
            });
            
            if (currentValue && currentPlayers.some(p => p.name === currentValue)) {
                select.value = currentValue;
            }
        });
        
        checkPlayerSelectionValidity();
    }
    
    // ************************************************************
    // 3.2.4. دالة التحقق من صلاحية اختيار اللاعبين (checkPlayerSelectionValidity)
    // ************************************************************
    function checkPlayerSelectionValidity() {
        const t1p1 = team1Player1Select.value;
        const t1p2 = team1Player2Select.value;
        const t2p1 = team2Player1Select.value;
        const t2p2 = team2Player2Select.value;

        const isMinPlayersSelected = t1p1 && t2p1;

        const selectedNames = [t1p1, t1p2, t2p1, t2p2].filter(n => n !== '');
        const uniqueNames = new Set(selectedNames);
        const hasDuplicates = uniqueNames.size !== selectedNames.length;
        
        let isValid = isMinPlayersSelected && !hasDuplicates;

        if (isValid) {
            startSelectedModeButton.removeAttribute('disabled');
            playerSelectionError.classList.add('hidden');
        } else {
            startSelectedModeButton.setAttribute('disabled', 'disabled');
            
            if (isMinPlayersSelected) {
                playerSelectionError.textContent = 'الرجاء اختيار لاعبين مختلفين تماماً.';
            } else {
                playerSelectionError.textContent = 'الرجاء التأكد من اختيار لاعب واحد على الأقل لكل فريق.';
            }
            playerSelectionError.classList.remove('hidden');
        }
        
        return isValid;
    }
    
    // ************************************************************
    // 3.2.5. دالة تحليل CSV للمستخدمين (parseCSV)
    // ************************************************************
    function parseCSV(text) {
        const rows = text.split('\n').map(row => row.trim()).filter(row => row.length > 0);
        if (rows.length < 2) return []; 
        const dataRows = rows.slice(1);
        
        return dataRows.map(row => {
            const columns = row.match(/(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^,]*))(?:,|$)/g)
                             .map(col => col.replace(/,$/, '').replace(/^\"(.*)\"\"$/, '$1').trim());
            return columns.slice(0, 3);
        });
    }

    // ************************************************************
    // 3.2.6. دالة جلب اللاعبين من Sheet (importPlayersFromSheet)
    // ************************************************************
    async function importPlayersFromSheet() {
        try {
            const response = await fetch(GOOGLE_SHEET_CSV_URL);
            if (!response.ok) throw new Error('فشل جلب البيانات: ' + response.statusText);
            
            const csvText = await response.text();
            const rawData = parseCSV(csvText); 

            currentPlayers = [];

            const playersToProcess = [];
            
            rawData.forEach(row => {
                const name1 = row[0]?.trim(); 
                const name2 = row[1]?.trim(); 
                const image = row[2]?.trim(); 
                
                const fullName = name1 + (name2 ? ' ' + name2 : '');
                
                if (fullName.trim()) {
                    playersToProcess.push({ name: fullName, icon: image });
                }
            });
            
            playersToProcess.forEach(player => {
                const icon = (player.icon && player.icon.length > 0 && player.icon.toLowerCase() !== 'n/a' ? player.icon : DEFAULT_IMAGE_PATH); 
                
                if (!currentPlayers.some(p => p.name === player.name)) {
                    currentPlayers.push({
                        id: Date.now() + Math.random(), 
                        name: player.name,
                        icon: icon
                    });
                }
            });

            populatePlayerSelects();
            renderPlayersList();

        } catch (error) {
            console.error('Import Error (Auto):', error);
        }
    }

    // الجزء الرابع
    // ************************************************************
    // 3.3. وظائف شاشة العقوبة (Penalty Modal)
    // ************************************************************
    // ************************************************************

    // ************************************************************
    // ************************************************************
    // 3.3.1. دالة تهيئة شاشة العقوبة (setupPenaltyModal)
    // ************************************************************
    function setupPenaltyModal() {
        penaltyTeamSelect.innerHTML = `
            <option value="">-- اختر الفريق --</option>
            <option value="ours">${teams.ours.label.replace(/<br>/g, ' و ')}</option>
            <option value="theirs">${teams.theirs.label.replace(/<br>/g, ' و ')}</option>
        `;
        penaltyPlayerSelect.innerHTML = '<option value="">-- اختر اللاعب --</option>';
        penaltyPlayerGroup.classList.add('hidden');
        penaltyPlayerSelect.setAttribute('disabled', 'disabled');
        applyPenaltyButton.setAttribute('disabled', 'disabled');
    }

    // ************************************************************
    // 3.3.2. دالة ملء قوائم اختيار اللاعبين في العقوبة (populatePenaltySelects)
    // ************************************************************
    function populatePenaltySelects(teamKey) {
        const playerSelect = penaltyPlayerSelect;
        playerSelect.innerHTML = '<option value="">-- اختر اللاعب --</option>';

        if (teamKey === 'ours' || teamKey === 'theirs') {
            const t1p1 = team1Player1Select.value;
            const t1p2 = team1Player2Select.value;
            const t2p1 = team2Player1Select.value;
            const t2p2 = team2Player2Select.value;

            let players;
            if (teamKey === 'ours') {
                players = [t1p1, t1p2].filter(p => p); 
            } else { 
                players = [t2p1, t2p2].filter(p => p);
            }
            
            const allPlayers = currentPlayers;
            
            players.forEach(playerName => {
                const playerInfo = allPlayers.find(p => p.name === playerName);
                const icon = playerInfo ? playerInfo.icon : DEFAULT_IMAGE_PATH;

                const option = document.createElement('option');
                option.value = playerName;
                option.textContent = `${icon} ${playerName}`; 
                playerSelect.appendChild(option);
            });
            
            penaltyPlayerGroup.classList.remove('hidden');
            playerSelect.removeAttribute('disabled');

        } else {
            penaltyPlayerGroup.classList.add('hidden');
            playerSelect.setAttribute('disabled', 'disabled');
        }
        
        checkPenaltyButtonState();
    }
    
    // ************************************************************
    // 3.3.3. دالة تحديث حالة زر تطبيق العقوبة (checkPenaltyButtonState)
    // ************************************************************
    function checkPenaltyButtonState() {
        const teamSelected = penaltyTeamSelect.value;
        const playerSelected = penaltyPlayerSelect.value;

        if (teamSelected && playerSelected) {
            applyPenaltyButton.removeAttribute('disabled');
        } else {
            applyPenaltyButton.setAttribute('disabled', 'disabled');
        }
    }
    
    // ************************************************************
    // 3.4. وظائف شاشة اختيار الفائز (Win Player Modal)
    // ************************************************************
    
    // ************************************************************
    // 3.4.1. دالة عرض شاشة اختيار اللاعب الفائز (showPlayerWinModal)
    // ************************************************************
    function showPlayerWinModal(teamKey, pointsType, baseLoserScore = 0) {
        const isTenPoints = pointsType === 'ten';
        
        let points = isTenPoints ? 10 : currentWinnerScore; 
        let teamName = teams[teamKey].label.replace(/<br>/g, ' و ');
        
        let typeText;
        if (isTenPoints) {
            typeText = 'الـ 10';
        } else {
            const activeWinButton = document.querySelector('.win-type-button.active');
            typeText = activeWinButton ? `${activeWinButton.textContent.split(' ')[0]} ${points}` : `${points}`;
        }
        
        winModalTitle.textContent = isTenPoints ? 'تسجيل 10+ (🎯)' : 'تسجيل جولة (💎🔥👑)';
        winModalTeamName.textContent = teamName;
        winModalPoints.textContent = points;
        
        modalTeamKey.value = teamKey;
        modalRoundType.value = pointsType; 
        modalBaseScore.value = baseLoserScore; 

        winPlayerSelect.innerHTML = '<option value="">-- اختر اللاعب --</option>';
        
        const t1p1 = team1Player1Select.value;
        const t1p2 = team1Player2Select.value;
        const t2p1 = team2Player1Select.value;
        const t2p2 = team2Player2Select.value;

        let players;
        if (teamKey === 'ours') {
            players = [t1p1, t1p2].filter(p => p); 
        } else { 
            players = [t2p1, t2p2].filter(p => p);
        }
        
        const allPlayers = currentPlayers;
        
        players.forEach(playerName => {
            const playerInfo = allPlayers.find(p => p.name === playerName);
            const icon = playerInfo ? playerInfo.icon : DEFAULT_IMAGE_PATH;

            const option = document.createElement('option');
            option.value = playerName;
            option.textContent = `${icon} ${playerName}`; 
            winPlayerSelect.appendChild(option);
        });
        
        confirmScorePlayerButton.setAttribute('disabled', 'disabled');
        playerWinModal.classList.remove('hidden');
    }
    
// ************************************************************
// 3.5. دالة إرسال سجل الألعاب (Sheet2)
// ************************************************************
async function exportStatsToSheet(winnerTeam, loserTeam, roundsLogData) {
    
    const now = new Date();
    const dayStr = now.toLocaleDateString('ar-SA', { weekday: 'long' });
    
    const getPlayerNames = (team) => {
        const cleanedLabel = team.label ? team.label.replace(/<br>/g, ' و ') : '';
        const names = cleanedLabel.split(' و ').map(name => name.trim()).filter(name => name);
        
        return {
            name1: names[0] || '',
            name2: names[1] || ''
        };
    };

    const winnerNames = getPlayerNames(winnerTeam);
    const loserNames = getPlayerNames(loserTeam);
    const totalRounds = roundsLogData.filter(r => r.roundType === 'round').length;
    
    const formData = new URLSearchParams();

    // البيانات العامة لسجل الألعاب (Sheet2)
    formData.append('day', dayStr);
    formData.append('totalRounds', totalRounds);

    // بيانات الفائز المجمعة (لـ Sheet2)
    formData.append('winnerName1', winnerNames.name1); 
    formData.append('winnerName2', winnerNames.name2);
    formData.append('winnerScore', winnerTeam.totalScore);        
    formData.append('winnerOkNormal', winnerTeam.normalWins || 0); 
    formData.append('winnerOkDouble', winnerTeam.doubleWins || 0); 
    formData.append('winnerOkDD', winnerTeam.doubleDoubleWins || 0); 
    formData.append('winnerTens', winnerTeam.tenPointsCount || 0); 
    formData.append('winnerCheats', winnerTeam.penaltyCount || 0); 

    // بيانات الخاسر المجمعة (لـ Sheet2)
    formData.append('loserName1', loserNames.name1); 
    formData.append('loserName2', loserNames.name2); 
    formData.append('loserScore', loserTeam.totalScore);        
    formData.append('loserOkNormal', loserTeam.normalWins || 0); 
    formData.append('loserOkDouble', loserTeam.doubleWins || 0); 
    formData.append('loserOkDD', loserTeam.doubleDoubleWins || 0); 
    formData.append('loserTens', loserTeam.tenPointsCount || 0); 
    formData.append('loserCheats', loserTeam.penaltyCount || 0); 

    try {
        console.log('Sending game archive data (Sheet2)...');
        // 💡 يجب التأكد أن هذا المتغير (APPS_SCRIPT_STATS_URL) يحوي رابط Apps Script الذي يكتب فقط في Sheet2
        await fetch(APPS_SCRIPT_STATS_URL, { 
            method: 'POST',
            mode: 'no-cors', 
            body: formData, 
        });

        console.log('✅ Archive data SENT successfully to Sheet2.'); 
        
    } catch (error) {
        console.error('❌ Network/Fetch Error during archive submission:', error);
    }
}
// ************************************************************
// 3.5.1. دالة إرسال إحصائيات اللاعبين (تكتب في Sheet3)
// ************************************************************
async function exportLeaderboardStats(winnerTeam, loserTeam) {
    
    // ملاحظة: هذه الدالة تفترض أن كائن الفريق (winnerTeam/loserTeam)
    // يحتوي على خاصية 'players' التي تخزن الإحصائيات الفردية.
    const getPlayersInOrder = (team) => {
        const playerKeys = Object.keys(team.players || {});
        return playerKeys.map(key => team.players[key]);
    };
    
    const formData = new URLSearchParams();
    
    // 💡 مفتاح توجيه (يجب أن يفهمه Apps Script لتوجيه البيانات لـ Sheet3)
    formData.append('targetSheet', 'LeaderboardStats'); 
    
    // ------------------------------------------------------------
    // 🟢 إرسال الإحصائيات على مستوى اللاعب
    // ------------------------------------------------------------

    // 1. بيانات الفائزين (اللاعب 1 واللاعب 2)
    const winnerPlayers = getPlayersInOrder(winnerTeam);
    winnerPlayers.forEach((player, index) => {
        const pNum = index + 1; 
        formData.append(`WName${pNum}`, player.name || '');
        formData.append(`WOkNormal${pNum}`, player.normalWins || 0); 
        formData.append(`WOkDouble${pNum}`, player.doubleWins || 0); 
        formData.append(`WOkDD${pNum}`, player.doubleDoubleWins || 0); 
        formData.append(`WTens${pNum}`, player.tenPointsCount || 0); 
        formData.append(`WCheats${pNum}`, player.penaltyCount || 0); 
        formData.append(`WScore${pNum}`, winnerTeam.totalScore || 0); // لإضافة نتيجة المباراة النهائية
    });


    // 2. بيانات الخاسرين (اللاعب 1 واللاعب 2)
    const loserPlayers = getPlayersInOrder(loserTeam);
    loserPlayers.forEach((player, index) => {
        const pNum = index + 1;
        formData.append(`LName${pNum}`, player.name || '');
        formData.append(`LOkNormal${pNum}`, player.normalWins || 0); 
        formData.append(`LOkDouble${pNum}`, player.doubleWins || 0); 
        formData.append(`LOkDD${pNum}`, player.doubleDoubleWins || 0); 
        formData.append(`LTens${pNum}`, player.tenPointsCount || 0); 
        formData.append(`LCheats${pNum}`, player.penaltyCount || 0); 
        formData.append(`LScore${pNum}`, loserTeam.totalScore || 0); // لإضافة نتيجة المباراة النهائية
    });
    
    try {
        console.log('Sending individual leaderboard stats (Sheet3)...');
        await fetch(APPS_SCRIPT_STATS_URL, { 
            method: 'POST',
            mode: 'no-cors', 
            body: formData, 
        });
        console.log('✅ Leaderboard data SENT successfully to Sheet3.'); 
    } catch (error) {
        console.error('❌ Network/Fetch Error during leaderboard submission:', error);
    }
}
   // ************************************************************
// 4.0. القسم الرابع: ربط الأحداث (Event Listeners)
// ************************************************************

// ------------------------------------------------------------
// 4.1. ربط أحداث شاشة البداية والاختيار
// ------------------------------------------------------------

teamGameButton.addEventListener('click', () => showModeSelection('team'));
soloGameTypeButton.addEventListener('click', () => showModeSelection('solo')); 
startSelectedModeButton.addEventListener('click', () => {
    if (checkPlayerSelectionValidity()) {
        navigateToScoreScreen();
    }
});

modeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const mode = e.currentTarget.getAttribute('data-mode');
        const limit = e.currentTarget.getAttribute('data-limit');
        setGameMode(mode, limit);
    });
});

playerSelects.forEach(select => {
    select.addEventListener('change', checkPlayerSelectionValidity);
});

// ------------------------------------------------------------
// 4.2. ربط أحداث شاشة النقاط والتحكم
// ------------------------------------------------------------

teamTotalCards.forEach(card => {
    card.addEventListener('click', function(e) {
        const clickedTeamKey = e.currentTarget.getAttribute('data-team-key');
        const opponentTeamKey = teams[clickedTeamKey].opponent;

        teamTotalCards.forEach(c => c.classList.remove('winner-active', 'loser-active'));

        e.currentTarget.classList.add('winner-active');
        document.querySelector(`.team-total-card[data-team-key="${opponentTeamKey}"]`).classList.add('loser-active');

        currentWinnerTeam = clickedTeamKey;
        
        document.querySelector('.win-type-buttons').classList.add('visible');
        
        // عرض نوع الفوز الحالي في الـ Overlay
        document.querySelectorAll('.win-type-overlay').forEach(overlay => overlay.classList.remove('show'));
        const activeWinButton = document.querySelector('.win-type-button.active');
        if (activeWinButton) {
            const overlay = e.currentTarget.querySelector('.win-type-overlay');
            overlay.textContent = activeWinButton.textContent.split(' ')[0];
            overlay.classList.add('show');
        }
        
        updateInputAndButtonState();
    });
});

winTypeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        winTypeButtons.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        const winType = e.currentTarget.getAttribute('data-win-type');
        
        if (winType === 'normal') {
            currentWinMultiplier = 1; currentWinnerScore = 20; multiplierDisplay.textContent = 'X1';
        } else if (winType === 'double') {
            currentWinMultiplier = 2; currentWinnerScore = 40; multiplierDisplay.textContent = 'X2';
        } else if (winType === 'double-double') {
            currentWinMultiplier = 4; currentWinnerScore = 80; multiplierDisplay.textContent = 'X4';
        }
        
        const winnerCard = document.querySelector('.team-total-card.winner-active');
        if (winnerCard) {
            const overlay = winnerCard.querySelector('.win-type-overlay');
            overlay.textContent = e.currentTarget.textContent.split(' ')[0];
            overlay.classList.add('show');
        }
        
        updateInputAndButtonState();
    });
});

scoreInputLoser.addEventListener('input', updateInputAndButtonState);
addScoresButton.addEventListener('click', addScores);

resetAllButton.addEventListener('click', () => {
    if (confirm('هل أنت متأكد من مسح جميع النقاط والسجل؟ ستبقى في شاشة اللعب.')) {
        resetCurrentScores();
    }
});

cancelGameButton.addEventListener('click', () => {
    if (confirm('هل أنت متأكد من إنهاء اللعبة الحالية؟ سيتم مسح جميع النقاط والسجل والعودة للصفحة الرئيسية!')) {
        resetGame(); 
    }
});

addTenButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const winnerTeamKey = e.currentTarget.getAttribute('data-team-key');
        showPlayerWinModal(winnerTeamKey, 'ten', 0);
    });
});

// ------------------------------------------------------------
// 4.3. ربط أحداث المودال (Penalty & Win Player)
// ------------------------------------------------------------

quickPenaltyButton.addEventListener('click', () => {
    setupPenaltyModal(); // يهيئ القائمة لاختيار الفريق
    penaltyModal.classList.remove('hidden');
});

closePenaltyModalButton.addEventListener('click', () => penaltyModal.classList.add('hidden'));

penaltyTeamSelect.addEventListener('change', (e) => {
    const selectedTeam = e.target.value;
    populatePenaltySelects(selectedTeam); // يملأ قائمة اللاعبين بناءً على الفريق
    checkPenaltyButtonState();
});

penaltyPlayerSelect.addEventListener('change', checkPenaltyButtonState);
applyPenaltyButton.addEventListener('click', applyQuickPenalty);

// أحداث الـ Modal لاختيار اللاعب الفائز بالجولة/العشرة
closePlayerWinModalButton.addEventListener('click', () => playerWinModal.classList.add('hidden'));

winPlayerSelect.addEventListener('change', () => {
    if (winPlayerSelect.value) {
        confirmScorePlayerButton.removeAttribute('disabled');
    } else {
        confirmScorePlayerButton.setAttribute('disabled', 'disabled');
    }
});
confirmScorePlayerButton.addEventListener('click', confirmScore);


// ************************************************************
// 4.4. ربط أحداث التنقل (النسخة المنظمة)
// ************************************************************

// 1. أزرار شريط النقاط والتحكم (Score Screen Nav)
navScoresButton.addEventListener('click', () => showScreen('score-screen'));
navHistoryButton.addEventListener('click', () => {
    showScreen('history-screen');
    reRenderHistory(); 
});

// 2. أزرار شريط التنقل السفلي (Bottom Nav Bar)
navHomeMain.addEventListener('click', navigateToHomeScreen); // ✅ زر الرئيسية
navPlayers.addEventListener('click', () => { // ✅ زر اللاعبين/لوحة الصدارة
    navigateToPlayersScreen();
    switchPlayerScreen('leaderboard'); 
});
navHomeHistory.addEventListener('click', () => { // ✅ زر الأرشيف/سجل الألعاب (الأسفل)
    showScreen('game-archive-screen'); 
}); 

// 3. أزرار التبديل وشريط العنوان العلوي (Tabs & Top Nav)

// 3.1 أزرار شاشة اللاعبين/لوحة الصدارة (Tabs)
if (playersListButton) {
    playersListButton.addEventListener('click', () => switchPlayerScreen('players'));
}
if (leaderboardButton) {
    leaderboardButton.addEventListener('click', () => switchPlayerScreen('leaderboard'));
}

// 3.2 أزرار الإعدادات (Top Right)
topNavHomeSettings.addEventListener('click', () => showScreen('settings-screen')); 


// 4. زر الاعدادات (sitting Buttons)
settingsBackButton.addEventListener('click', navigateToHomeScreen);

// 5. أزرار شاشة الفوز
winScreenNewGameButton.addEventListener('click', resetGame);
winScreenReviewButton.addEventListener('click', () => {
    showScreen('history-screen');
    reRenderHistory();
});

// ------------------------------------------------------------
// 4.5. ربط أحداث شاشة اللاعبين
// ------------------------------------------------------------

addPlayerButtonFull.addEventListener('click', () => {
    addPlayerFormArea.classList.toggle('hidden');
    if (!addPlayerFormArea.classList.contains('hidden')) {
        newPlayerNameInput1.focus();
        newPlayerIconInput.value = selectedIcon === DEFAULT_IMAGE_PATH ? '' : selectedIcon; 
        previewIconSpan.textContent = selectedIcon;
    }
});

newPlayerIconInput.addEventListener('input', function(e) {
    let value = e.target.value.trim();
    if (value.length > 2) {
        value = value.substring(0, 2); 
        e.target.value = value;
    }
    previewIconSpan.textContent = value || DEFAULT_IMAGE_PATH;
    selectedIcon = value || DEFAULT_IMAGE_PATH;
});

saveNewPlayerButton.addEventListener('click', addNewPlayer);

// ------------------------------------------------------------
// 4.6. التهيئة النهائية
// ------------------------------------------------------------

// 1. عرض الشاشة الافتتاحية
navigateToHomeScreen(); 

// 2. جلب اللاعبين عند التحميل
importPlayersFromSheet();

// 3. ضبط وضع الفوز الافتراضي
const defaultWinButton = document.getElementById('win-20');
if (defaultWinButton) defaultWinButton.classList.add('active');

// 4. تحديث حالة الإدخال الأولي
updateInputAndButtonState();

// 5. جعل دالة deleteRound متاحة عالميًا لزر onclick في السجل
window.deleteRound = deleteRound; 

}); // نهاية DOMContentLoaded
