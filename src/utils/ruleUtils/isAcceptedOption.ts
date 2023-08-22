export function isAcceptedOption(options: string[], value: string | undefined): boolean {
    if (!value) return false;
    return options.includes(value);
}
