export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function apiFetch(path, options = {}) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const response = await fetch(`${API_BASE}${normalizedPath}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        ...options,
    });

    if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`API error ${response.status}: ${text}`);
    }

    return response.json();
}