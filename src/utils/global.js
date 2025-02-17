export function capitalize(string) {
    if (typeof string !== "string") return;

    return string
    .split('-')
    .map(word =>
        word.charAt(0).toUpperCase() + word.substring(1)
    )
    .join(' ');
}