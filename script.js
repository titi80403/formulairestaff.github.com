// Webhook URL (remplace cette URL par ton propre Webhook Discord)
const webhookURL = 'https://discord.com/api/webhooks/your-webhook-url';

// Fonction pour récupérer l'IP de l'utilisateur
async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'IP:', error);
        return 'Inconnu';  // Si une erreur se produit, retourne "Inconnu"
    }
}

// Fonction pour envoyer les données au Webhook Discord
async function sendToDiscord(data) {
    const payload = {
        username: "Staff Form Logger",
        embeds: [
            {
                title: "Nouveau Formulaire Soumis",
                description: "Voici les informations soumises via le formulaire.",
                color: 0x3498db,
                fields: [
                    { name: "Nom", value: data.name },
                    { name: "Discord", value: data.discord },
                    { name: "Âge", value: data.age },
                    { name: "Motivations", value: data.motivations },
                    { name: "Défauts", value: data.defauts },
                    { name: "Qualités", value: data.qualites },
                    { name: "Connaissances", value: data.connaissances },
                    { name: "Adresse IP", value: data.ip }
                ],
                footer: {
                    text: "Formulaire Staff"
                }
            }
        ]
    };

    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        console.log('Données envoyées à Discord:', result);
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données:', error);
    }
}

// Gestion de la soumission du formulaire
document.getElementById('staffForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Récupération des données du formulaire
    const name = document.getElementById('name').value;
    const discord = document.getElementById('discord').value;
    const age = document.getElementById('age').value;
    const motivations = document.getElementById('motivations').value;
    const defauts = document.getElementById('defauts').value;
    const qualites = document.getElementById('qualites').value;
    const connaissances = document.getElementById('connaissances').value;

    // Récupérer l'IP de l'utilisateur
    const ip = await getUserIP();

    // Préparer les données
    const formData = {
        name,
        discord,
        age,
        motivations,
        defauts,
        qualites,
        connaissances,
        ip
    };

    // Envoi des données au Webhook Discord
    await sendToDiscord(formData);

    // Affichage de l'IP dans le formulaire
    document.getElementById('ipDisplay').innerText = ip;
});
