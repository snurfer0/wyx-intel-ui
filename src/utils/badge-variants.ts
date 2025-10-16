import type { EntityType, Priority } from '@/types';

export function getPriorityVariant(
    priority: Priority,
): 'default' | 'secondary' | 'destructive' {
    // Priority is 1-10, where 10 is highest
    if (priority >= 8) {
        return 'destructive'; // High priority (8-10)
    } else if (priority >= 5) {
        return 'default'; // Medium priority (5-7)
    } else {
        return 'secondary'; // Low priority (1-4)
    }
}

export function getEntityTypeVariant(
    entityType: EntityType,
): 'default' | 'secondary' | 'outline' {
    switch (entityType) {
        case 'token':
            return 'default';
        case 'author':
            return 'secondary';
        case 'narrative':
            return 'outline';
        case 'post':
            return 'default';
    }
}
