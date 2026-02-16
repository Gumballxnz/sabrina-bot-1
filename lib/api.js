const axios = require('axios');

const API_KEY = '4d6gXWNS';
const BASE_URL = 'https://linker.devgui.dev';

async function fetchJson(url, options = {}) {
    try {
        const response = await axios.get(url, { headers: options.headers });
        return response.data;
    } catch (e) {
        throw new Error(`API Error: ${e.message}`);
    }
}

async function ytPlay(query) {
    // Deprecated in favor of ytdl-core in new_index.js, but kept for fallback
    return null;
}

async function getBuffer(url, options = {}) {
    try {
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Requests': 1
            },
            ...options,
            responseType: 'arraybuffer'
        });
        return res.data;
    } catch (err) {
        return err;
    }
}

module.exports = { ytPlay, fetchJson, getBuffer, API_KEY, BASE_URL };
