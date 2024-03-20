export const extractNumberFromText = (text: string): number | null => {
    const match = text.match(/\d+/);
    if (match) {
        return parseInt(match[0]);
    }
    return null;

};