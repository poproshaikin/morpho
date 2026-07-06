export const toBeOrNotToBe = () => Math.random() >= 0.5;

export const pickRandomCount = <T>(arr: readonly T[]) => {
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