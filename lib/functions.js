const { proto } = require('@whiskeysockets/baileys');

const normalizeJid = (jid) => {
	if (!jid) return null;
	return jid.split('@')[0].split(':')[0];
};

const getGroupAdmins = (participants) => {
	let admins = [];
	for (let i of participants) {
		i.admin === "superadmin" ? admins.push(i.id) : i.admin === "admin" ? admins.push(i.id) : '';
	}
	return admins || [];
};

const isGroupAdmins = (admins, sender) => {
	if (!sender) return false;
	const senderNorm = normalizeJid(sender);
	return admins.some(a => normalizeJid(a) === senderNorm);
}

const isBotGroupAdmins = (admins, botJid, botLid) => {
	const jidNorm = normalizeJid(botJid);
	const lidNorm = normalizeJid(botLid);

	return admins.some(a => {
		const adminNorm = normalizeJid(a);
		return adminNorm === jidNorm || (lidNorm && adminNorm === lidNorm);
	});
}

module.exports = { getGroupAdmins, isGroupAdmins, isBotGroupAdmins };
