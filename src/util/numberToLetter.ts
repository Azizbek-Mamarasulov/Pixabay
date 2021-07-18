export const numberToLetter = (x: number) => {
    let i = x.toString();
    const length = i.length;
    switch (true) {
        case (length > 6):
            i = Math.round(x / 1000000) + 'M';
            break;
        case (length > 3):
            i = Math.round(x / 1000) + 'K';
            break;
    }
    return i;
}