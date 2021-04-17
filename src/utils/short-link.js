import AppConfigs from "@/configs/app.configs.json";

export default async function (longLink) {
    const response = await fetch('https://api.rebrandly.com/v1/links', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': AppConfigs.rebrandlyApiKey,
            'workspace': AppConfigs.rebrandlyWorkspace,
        },
        body: JSON.stringify({ 
            "destination": longLink, 
            "domain": { "fullName": "rebrand.ly" } 
        })
    });
    return response.json();
}