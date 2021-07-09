const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const getRandomMultiplier = () => {
    return Math.random() > 0.5 ? 1 : -1;
}

export { getRandomInt, getRandomMultiplier };