const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function fetchHealthScore() {
    const res = await fetch(`${API_BASE_URL}/health-score`);
    if (!res.ok) throw new Error('Failed to fetch health score');
    return res.json();
}

export async function fetchSystemStatus() {
    const res = await fetch(`${API_BASE_URL}/system-status`);
    if (!res.ok) throw new Error('Failed to fetch system status');
    return res.json();
}

export async function fetchQuickStats() {
    const res = await fetch(`${API_BASE_URL}/quick-stats`);
    if (!res.ok) throw new Error('Failed to fetch quick stats');
    return res.json();
}

export async function fetchBots() {
    const res = await fetch(`${API_BASE_URL}/bots`);
    if (!res.ok) throw new Error('Failed to fetch bots');
    return res.json();
}

export async function toggleBot(botId: string) {
    const res = await fetch(`${API_BASE_URL}/bots/${botId}/toggle`, {
        method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to toggle bot');
    return res.json();
}

export async function fetchScanners() {
    const res = await fetch(`${API_BASE_URL}/scanners`);
    if (!res.ok) throw new Error('Failed to fetch scanners');
    return res.json();
}

export async function toggleScanner(scannerId: string) {
    const res = await fetch(`${API_BASE_URL}/scanners/${scannerId}/toggle`, {
        method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to toggle scanner');
    return res.json();
}
