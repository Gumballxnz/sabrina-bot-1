const { default: makeWASocket, useMultiFileAuthState, delay, DisconnectReason, fetchLatestBaileysVersion, Browsers } = require('@whiskeysockets/baileys');
const fs = require('fs');
const pino = require('pino');

async function pair() {
    console.log('Iniciando script de pareamento...');

    // Ensure database directory exists
    if (!fs.existsSync('./database')) {
        fs.mkdirSync('./database');
    }

    // Path deduced from obfuscated code analysis
    const { state, saveCreds } = await useMultiFileAuthState('./database/qr-code');
    const { version } = await fetchLatestBaileysVersion();

    console.log(`Usando versão do Baileys: ${version}`);

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        browser: Browsers.ubuntu('Chrome'), // More authentic browser signature
        generateHighQualityLinkPreview: true,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexão fechada. Reconectando:', shouldReconnect);
            if (shouldReconnect) {
                setTimeout(pair, 2000);
            } else {
                console.log('Desconectado. Por favor, apague a pasta database/qr-code e tente novamente.');
            }
        } else if (connection === 'open') {
            console.log('Conexão aberta com sucesso!');
            console.log('As credenciais foram salvas em database/qr-code.');
            console.log('Agora você pode iniciar o bot normalmente com ./start.sh');
            process.exit(0);
        }
    });

    // Pairing Code Logic
    const phoneNumber = "258833753241";

    await delay(3000);

    if (!sock.authState.creds.registered) {
        console.log(`Solicitando código de pareamento para: ${phoneNumber}`);
        try {
            const code = await sock.requestPairingCode(phoneNumber);
            const formattedCode = code?.match(/.{1,4}/g)?.join('-') || code;
            console.log('\n==================================================');
            console.log(`   SEU CÓDIGO DE PAREAMENTO: ${formattedCode}`);
            console.log('==================================================\n');
            console.log('Dica: Abra o WhatsApp > Aparelhos Conectados > Conectar um aparelho > Conectar com número de telefone.');
        } catch (err) {
            console.error('Erro ao solicitar código:', err);
        }
    } else {
        console.log('Sessão já registrada. Aguardando conexão...');
    }
}

pair().catch(err => console.error('Erro fatal:', err));
