const express = require('express');
const cors = require('cors'); // ضفنا هذا السطر عشان الـ CORS
const app = express();

app.use(cors()); // تفعيل الاتصال من المواقع الخارجية مثل CodePen
app.use(express.json());

// مصفوفة مؤقتة لحفظ الأكواد
let promoCodes = {};

// استقبال الكود من CodePen وحفظه
app.post('/create-code', (req, res) => {
  const { code, reward, amount } = req.body;
  if (!code || !amount) {
    return res.status(400).json({ error: "بيانات ناقصة" });
  }
  
  promoCodes[code.toUpperCase()] = { reward, amount };
  console.log(`🆕 كود جديد جاهز: ${code.toUpperCase()}`);
  res.sendStatus(200);
});

// تحقق روبلوكس من الكود
app.get('/check-code', (req, res) => {
  const typedCode = req.query.code ? req.query.code.toUpperCase() : "";
  if (promoCodes[typedCode]) {
    res.json({ valid: true, reward: promoCodes[typedCode].reward, amount: promoCodes[typedCode].amount });
  } else {
    res.json({ valid: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 السيرفر شغال على منفذ ${PORT}`));
