export const toBeOrNotToBe = () => Math.random() >= 0.5;

export const pickRandomCount = (arr: { length: number }) => {
    return Math.floor(Math.random() * arr.length);
}

export const pickRandom = <T>(arr: readonly T[]) => {
    return arr[pickRandomCount(arr)];
}

export const pickSubset = <T>(arr: readonly T[], min = 1): T[] => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    const count = min + Math.floor(Math.random() * (arr.length - min + 1));
    return shuffled.slice(0, count);
}

export const pickWeighted = <T extends { weight?: number }>(arr: readonly T[]): T => {
    const total = arr.reduce((sum, item) => sum + (item.weight ?? 1), 0);
    let r = Math.random() * total;
    for (const item of arr) {
        r -= item.weight ?? 1;
        if (r <= 0) return item;
    }
    return arr[arr.length - 1];
}