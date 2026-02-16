const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');

async function start() {
    console.log('Iniciando script de debug...');

    // Use the same session path
    const { state, saveCreds } = await useMultiFileAuthState('./database/qr-code');
    const { version } = await fetchLatestBaileysVersion();

    console.log(`Versão Baileys: ${version}`);

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: 'info' }), // Enable info logging to see incoming msgs
        mobile: false,
        browser: ['Sabrina Bot', 'Chrome', '1.0.0'],
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            console.log('Conexão fechada:', lastDisconnect.error);
        } else if (connection === 'open') {
            console.log('CONEXÃO BEM SUCEDIDA! O bot está pronto.');
        }
    });

    sock.ev.on('messages.upsert', async m => {
        console.log('MENSAGEM RECEBIDA:');
        console.log(JSON.stringify(m, null, 2));

        if (m.type === 'notify') {
            for (const msg of m.messages) {
                if (!msg.key.fromMe) {
                    console.log('Texto:', msg.message?.conversation || msg.message?.extendedTextMessage?.text);
                    console.log('De:', msg.key.remoteJid);

                    // Auto-reply test
                    if (msg.message?.conversation === '#menu') {
                        await sock.sendMessage(msg.key.remoteJid, { text: 'Bot está funcionando! O comando #menu foi recebido.' });
                    }
                }
            }
        }
    });
}

start();
