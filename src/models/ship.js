export function Ship(length) {
    if (typeof length !== 'number' || length <= 0 || !Number.isInteger(length)) {
        throw new Error('Ship length must be a positive integer');
    }

    let hits = 0;

    return {
        get hits() { return hits; },
        getLength() { return length; },
        isSunk() { return hits === length; },
        hit() { hits++; }
    }
}
