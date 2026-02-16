# 🤖 Sabrina Bot (Open Source)

Este é um projeto de bot para WhatsApp desenvolvido em Node.js usando a biblioteca `@whiskeysockets/baileys`. 
O projeto foi totalmente limpo e reestruturado para ser fácil de configurar e usar.

## 🚀 Funcionalidades Principais
*   **Menus:** Interativos com emojis (Texto puro, leve e rápido).
*   **Administração:** Comandos completos de gestão de grupo (ban, promote, demote, antilink, etc).
*   **Downloads:** TikTok, Instagram, Facebook, YouTube (Play).
*   **IA:** Integração básica com GPT.
*   **Stickers:** Criação de figurinhas estáticas e animadas.
*   **Diversão:** Jogos, brincadeiras e interações.

---

## 🛠️ Instalação

### Pré-requisitos
*   [Node.js](https://nodejs.org/) (Versão 16 ou superior recomendada)
*   [Git](https://git-scm.com/)
*   FFmpeg (para figurinhas e áudios - *Opcional mas recomendado*)

### Passo a Passo (Windows/Linux/Termux)

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Gumballxnz/sabrina-bot-1.git
    cd sabrina-bot-1
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # Instale o pino se der erro:
    npm install pino
    ```

3.  **Configuração do Dono:**
    Abra o arquivo `settings/settings.json` e edite:
    ```json
    {
      "prefix": "#",
      "NomeDoBot": "Sabrina Bot",
      "NickDono": "SEU NOME",
      "numerodono": "5511999999999", 
      "apikey": "SUA_APIKEY_AQUI" 
    }
    ```
    *Nota: `numerodono` deve ser apenas números (ex: código do país + ddd + número).*

4.  **Inicie o Bot:**
    ```bash
    npm start
    ```

5.  **Conexão:**
    *   O terminal pedirá para escolher entre **QR Code** ou **Pairing Code**.
    *   Siga as instruções na tela para conectar seu WhatsApp.

---

## ☁️ Hospedagem (Exemplos)

### Termux (Android)
```bash
pkg update && pkg upgrade
pkg install nodejs git ffmpeg
git clone https://github.com/Gumballxnz/sabrina-bot-1.git
cd sabrina-bot-1
npm install
npm start
```

### Heroku / Render / Railway
O projeto contém um `Procfile` e `start.sh` prontos para deploy.
1.  Suba o código para seu GitHub (privado ou público).
2.  Conecte o repositório no serviço de hospedagem.
3.  Comando de start: `sh start.sh`.

---

## ❓ Perguntas Frequentes

**1. O Bot tem foto no menu?**
Atualmente **NÃO**. O menu padrão é enviado como TEXTO para garantir carregamento rápido e evitar bugs de upload em conexões lentas. Você pode alterar isso no arquivo `index.js` caso queira enviar uma imagem (`sock.sendMessage(..., { image: ... })`).

**2. Como mudar os menus?**
Edite o arquivo `settings/dados/menus.js`. Lá estão todos os textos dos menus.

**3. Onde ficam os dados (grupos, usuários)?**
Na pasta `database/`. Recomenda-se fazer backup regular dessa pasta.

---

## 🤝 Créditos
*   **Criador Original:** Sabrina Conteudos
*   **Reestruturação Open Source:** [Gumballxnz](https://github.com/Gumballxnz)
