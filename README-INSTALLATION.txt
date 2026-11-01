FINVERO — PROJET VERCEL PRÊT À DÉPLOYER

Fichiers :
- index.html : site vitrine (sans compte client, sans espace client, sans Supabase)
- api/telegram.js : fonction serveur Vercel qui envoie les demandes vers Telegram
- vercel.json : configuration Vercel

CONFIGURATION TELEGRAM
Le token du bot et le Chat ID 8067934399 sont intégrés dans api/telegram.js, comme demandé.

SÉCURITÉ IMPORTANTE
Le token a déjà été communiqué dans une conversation. Il doit être considéré comme exposé.
En outre, il est présent dans le fichier serveur : ne rendez PAS le dépôt GitHub public.
La bonne pratique reste de révoquer ce token via @BotFather et d'utiliser un nouveau token
stocké dans les variables d'environnement Vercel (TELEGRAM_BOT_TOKEN et TELEGRAM_CHAT_ID).

DÉPLOIEMENT
1. Téléversez le CONTENU de ce dossier à la racine du dépôt GitHub.
2. Importez le dépôt dans Vercel.
3. Framework Preset : Other. Build Command : laisser vide. Output Directory : laisser vide.
4. Déployez. Vercel détectera automatiquement api/telegram.js comme fonction serveur.
5. Dans Telegram, ouvrez @FuhrerscheinFinveroCapital_bot et envoyez /start au bot.
6. Testez le formulaire sur le site déployé.

Ne téléversez pas telegram-send.php : PHP n'est pas utilisé sur cette version Vercel.
