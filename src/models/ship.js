export function Ship(length, vertical) {
    if (typeof length !== 'number' || length <= 0 || !Number.isInteger(length)) {
        throw new Error('Ship length must be a positive integer');
    }

    let hits = 0;
    const isVertical = vertical ?? false;

    return {
        get hits() { return hits; },
        get isVertical() { return isVertical; },
        getLength() { return length; },
        isSunk() { return hits === length; },
        hit() { hits++; }
    }
}
