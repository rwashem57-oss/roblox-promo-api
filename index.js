const express = require('express');
const app = express();
app.use(express.json()); 

// قائمة الأكواد التجريبية (WELCOME2026 يعطي 500 كوينز)
let promoCodes = {
    "WELCOME2026": { reward: "Coins", amount: 500, isUsed: false },
    "FREE_SWORD": { reward: "Weapon", name: "ClassicSword", isUsed: false }
};

// استقبال الطلب من روبلوكس
app.post('/verify-code', (req, res) => {
    const { userId, username, code } = req.body;

    console.log(`اللاعب ${username} يحاول تفعيل الكود: ${code}`);

    if (!promoCodes[code]) {
        return res.json({ status: "invalid", message: "هذا الكود غير صحيح!" });
    }

    const codeData = promoCodes[code];

    if (codeData.isUsed) {
        return res.json({ status: "invalid", message: "هذا الكود مستخدم من قبل!" });
    }

    codeData.isUsed = true; 
    
    return res.json({
        status: "valid",
        reward: codeData.reward,
        amount: codeData.amount || 1,
        name: codeData.name || ""
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`السيرفر شغال تمام`));
