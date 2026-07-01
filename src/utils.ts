export const toBeOrNotToBe = () => Math.random() >= 0.5;

export const pickRandom = <T>(arr: readonly T[]) => {
    return arr[Math.floor(Math.random() * arr.length)]!;
}