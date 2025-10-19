export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
        return `${diffMins}m ago`;
    } else if (diffHours < 24) {
        return `${diffHours}h ago`;
    } else if (diffDays < 30) {
        return `${diffDays}d ago`;
    } else {
        return date.toLocaleDateString();
    }
}

export function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatTimeseriesDate(
    timestamp: string,
    granularity: 'hourly' | 'daily' | 'monthly',
): string {
    if (granularity === 'hourly') {
        const [datePart, timePart] = timestamp.split(' ');
        const date = new Date(datePart);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        return `${day} ${month} ${timePart}`;
    }

    if (granularity === 'monthly') {
        const date = new Date(timestamp);
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${month} ${year}`;
    }

    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    return `${day} ${month}`;
}
