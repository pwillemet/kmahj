import { GroupType } from '../../../core';
export function isClassicHandPattern(groups) {
    return groups.length === 5
        && groups.filter(g => g.type === GroupType.DOUBLE).length === 1
        && groups.every(g => g.type !== GroupType.SPECIAL);
}
export function isChiiToitsuHandPattern(groups) {
    return groups.length === 7
        && groups.every(g => g.type === GroupType.DOUBLE);
}
