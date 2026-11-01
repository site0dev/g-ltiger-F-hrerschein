FINVERO — DEUTSCHE VERSION FÜR VERCEL

Projektdateien
- index.html: Website ausschließlich auf Deutsch.
- api/telegram.js: Vercel-Serverfunktion zur sicheren Übermittlung des Kontaktformulars an Telegram.
- vercel.json: Vercel-Konfiguration.

TELEGRAM-KONFIGURATION IN VERCEL
Öffnen Sie Project > Settings > Environment Variables und legen Sie für Production diese Variablen an:
1. TELEGRAM_BOT_TOKEN = aktueller Bot-Token von @BotFather.
2. TELEGRAM_CHAT_ID = 8067934399 (oder die tatsächlich gewünschte Chat-ID).

WICHTIG
Der Bot-Token gehört ausschließlich in die geheime Vercel-Umgebungsvariable TELEGRAM_BOT_TOKEN. Speichern Sie ihn nicht in GitHub, index.html oder anderen öffentlich zugänglichen Dateien. Da der zuvor verwendete Token in einem Chat offengelegt wurde, sollte er nach Abschluss der Tests bei @BotFather widerrufen und durch einen neuen Token ersetzt werden.

BOT VORBEREITEN
1. Öffnen Sie den Bot in Telegram und senden Sie /start.
2. Prüfen Sie, ob beide Variablen in Vercel für Production gespeichert sind.
3. Starten Sie nach Änderungen an den Umgebungsvariablen ein neues Deployment.

DEPLOYMENT
Laden Sie den Inhalt dieses Projektordners in das Stammverzeichnis des mit Vercel verbundenen GitHub-Repositories hoch. Vercel erkennt api/telegram.js automatisch. Verwenden Sie als Framework Preset „Other“. Das Formular sendet eine POST-Anfrage an /api/telegram.

TEST UND FEHLERDIAGNOSE
Senden Sie über die veröffentlichte Website eine Testnachricht. Eine Erfolgsmeldung wird nur angezeigt, wenn die Telegram-API die Nachricht bestätigt. Bei Fehlern prüfen Sie Vercel > Deployments > neuestes Deployment > Functions/Logs. Geben Sie den Bot-Token niemals weiter und veröffentlichen Sie keine Screenshots mit sichtbarem Token.
