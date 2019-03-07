export const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

/**
 * @param {number} length - The length of the key to generate
 * @returns A random key for the current case
 */
export const createCaseKey = (length = 6) => {
    const POSSIBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let i = 0;
    let caseKey = '';
    while (i < length) {
        let randomInt = Math.floor(Math.random() * POSSIBLE_CHARS.length);
        caseKey += POSSIBLE_CHARS[randomInt];
        i++;
    }

    return caseKey;
}