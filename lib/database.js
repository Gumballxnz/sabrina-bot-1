const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../database/groups.json');

// Ensure DB initialization
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '{"_init": true}', 'utf8');
}

// CACHE SYSTEM
let cache = null;

const loadDatabase = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        cache = JSON.parse(data);
    } catch (e) {
        console.error('Erro ao ler DB:', e);
        cache = {};
    }
};

// Initial Load
loadDatabase();

const saveDatabase = () => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(cache, null, 2), 'utf8');
    } catch (e) {
        console.error('Erro ao salvar DB:', e);
    }
};

const getGroup = (jid) => {
    if (!cache) loadDatabase();
    if (!cache[jid]) {
        // Don't save empty groups immediately to reduce IO, only return empty obj
        return {};
    }
    return cache[jid];
};

const updateGroup = (jid, key, value) => {
    if (!cache) loadDatabase();
    if (!cache[jid]) cache[jid] = {};

    // Only save if value actually changed
    if (cache[jid][key] !== value) {
        cache[jid][key] = value;
        saveDatabase();
    }
    return cache[jid];
};

const toggleGroup = (jid, key) => {
    if (!cache) loadDatabase();
    if (!cache[jid]) cache[jid] = {};

    const currentValue = cache[jid][key] || false;
    const newValue = !currentValue;
    cache[jid][key] = newValue;
    saveDatabase();
    return newValue;
};

// Reload command (optional, for manual refresh)
const reload = () => {
    loadDatabase();
    return "Banco de dados recarregado.";
}

module.exports = { getGroup, updateGroup, toggleGroup, reload };
