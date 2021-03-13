export const permuteWord = (str: string, idx: number) => {
    idx = Math.round(idx);
    return [
        str.slice(0, idx) ?? "",
        str[idx + 1] ?? "",
        str[idx] ?? "",
        str.slice(idx + 2) ?? ""
    ].join("");
}