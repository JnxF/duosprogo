export default function shuffle<T>(array: T[]) {
    for (let i = array.length - 1; 0 < i; --i) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}