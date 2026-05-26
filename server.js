const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * [핵심 로직] 고기모야 복합 질문 처리 엔진 (Multi-Intent Engine)
 */
async function getBeefAnswer(question) {
    if (!question) return "질문을 입력해주세요.";

    const originalQ = question.trim();
    const q = originalQ.replace(/\s+/g, ''); // 공백 제거 비교용
    
    // 1. 기본 데이터 로드
    const [namesRows] = await db.query('SELECT * FROM gogimoya.BEEFCUTS_NAMES');
    const [usesRows] = await db.query('SELECT * FROM gogimoya.BEEFCUTS_USES');
    const [introRows] = await db.query('SELECT * FROM gogimoya.BEEFCUTS_INTRO');

    const allCountries = Object.keys(namesRows[0]).filter(k => k !== '한국');
    const standardNames = namesRows.map(r => r['한국']);

    const langMap = {
        "영어": ["미국", "영국", "호주", "남아프리카공화국"],
        "일본어": ["일본"],
        "중국어": ["중국"],
        "베트남어": ["베트남"],
        "이탈리아어": ["이탈리아"],
        "프랑스어": ["프랑스"],
        "독일어": ["독일", "오스트리아"],
        "스페인어": ["스페인", "멕시코", "아르헨티나", "콜롬비아", "페루", "칠레"],
        "포르투갈어": ["포르투갈", "브라질"]
    };

    let answers = []; // 복합 답변을 담을 배열

    // --- [의도 1: 다국어 번역 체크] ---
    const isTranslationReq = q.includes("어") || q.includes("이름") || q.includes("명칭") || q.includes("불러") || allCountries.some(c => q.includes(c));
    if (isTranslationReq) {
        const foundCuts = standardNames.filter(name => q.includes(name));
        if (foundCuts.length === 1) {
            const standardName = foundCuts[0];
            const targetRow = namesRows.find(r => r['한국'] === standardName);
            let targetCountries = [];
            
            for (const lang of Object.keys(langMap)) {
                if (q.includes(lang) || q.includes(lang.replace("어", ""))) {
                    targetCountries = langMap[lang];
                    break;
                }
            }
            if (targetCountries.length === 0) {
                const mentionedCountry = allCountries.find(c => q.includes(c));
                if (mentionedCountry) targetCountries = [mentionedCountry];
            }

            if (targetCountries.length > 0) {
                let transText = `🌐 **${standardName}**의 요청하신 다국어 명칭입니다.\n`;
                targetCountries.forEach(c => {
                    if (targetRow[c]) transText += `- **${c}**: ${targetRow[c]}\n`;
                });
                answers.push(transText);
            }
        }
    }

    // --- [의도 2: 부위 상세 설명 체크] ---
    // '알려줘', '설명', '뭐야' 등의 키워드가 있거나, 단순히 부위명만 언급된 경우
    const targetIntro = introRows.find(row => q.includes(row['부위명'].replace(/\s+/g, '')));
    if (targetIntro) {
        const introText = `🥩 **${targetIntro['부위명']}**에 대해 알려드릴게요.\n- **분류**: ${targetIntro['대분할']}\n- **설명**: ${targetIntro['소개']}`;
        answers.push(introText);
    }

    // --- [의도 3: 요리 추천 체크] ---
    const useKeywordMap = {
        "빠른구이": ["빠른 구이"], "느린구이": ["느린 구이"], "스테이크": ["빠른 구이"],
        "구이": ["빠른 구이", "느린 구이"], "불고기": ["볶음"], "볶음": ["볶음"],
        "국": ["국&전골"], "전골": ["국&전골"], "찌개": ["국&전골"],
        "찜": ["찜&조림"], "조림": ["찜&조림"], "수육": ["수육"], "육회": ["육회"]
    };
    const isSoupSearch = (originalQ.includes(" 국 ") || originalQ.endsWith("국") || originalQ.includes("국거리") || originalQ.includes("전골")) && !originalQ.includes("미국");
    let foundUseKey = null;
    for (const key of Object.keys(useKeywordMap)) {
        if (q.includes(key)) {
            if (key === "국" && !isSoupSearch) continue;
            foundUseKey = key;
            break;
        }
    }
    if (foundUseKey) {
        const targetCols = useKeywordMap[foundUseKey];
        let useText = `🍳 **${foundUseKey}** 요리에 적합한 추천 부위입니다.\n`;
        let foundAny = false;
        for (const col of targetCols) {
            const cuts = usesRows.map(row => row[col]).filter(val => val);
            if (cuts.length > 0) {
                useText += `- **[${col}]**: ${cuts.join(', ')}\n`;
                foundAny = true;
            }
        }
        if (foundAny) answers.push(useText);
    }

    // --- [결과 조합 및 예외 처리] ---
    if (answers.length > 0) {
        return answers.join('\n\n---\n\n'); // 각 답변을 구분선으로 연결
    }

    // 모호성 처리 (답변을 하나도 못 찾았을 때만 수행하거나, 특정 키워드 발견 시)
    const keywords = ["등심", "사태", "갈비", "안심", "양지", "설도"];
    const foundAmbiguousKey = keywords.find(k => q.includes(k));
    if (foundAmbiguousKey) {
        const related = introRows.map(r => r['부위명']).filter(name => name.includes(foundAmbiguousKey));
        return `🧐 **'${foundAmbiguousKey}'** 관련 부위가 여러 개 검색되었습니다. 더 정확한 부위명을 말씀해주시면 상세히 알려드릴게요!\n- **관련 부위**: ${related.join(', ')}`;
    }

    return "죄송합니다. 정확한 답변을 찾지 못했습니다.\n\n💡 **복합 질문도 가능합니다!**\n- '안창살 설명해주고 스페인어로 뭔지도 알려줘'\n- '스테이크용 부위 추천이랑 꽃등심 설명해줘'";
}

// --- [라우터 설정] ---
app.get('/', (req, res) => {
    res.render('index', { title: '🥩 고기모야(Gogimoya) AI Q&A 서비스' });
});

app.post('/api/ask', async (req, res) => {
    const { question } = req.body;
    try {
        const answer = await getBeefAnswer(question);
        res.json({ answer });
    } catch (err) {
        console.error('Q&A 처리 오류:', err);
        res.status(500).json({ answer: '서버 내부 오류로 답변을 생성할 수 없습니다.' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 고기모야 Q&A 서버 가동: http://localhost:${PORT}`);
});
