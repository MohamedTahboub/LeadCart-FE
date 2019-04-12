export const generateColor = name => {
    const randomWithSeed = (number) => {
        const r = ((Math.sin(number) * 10000) - Math.floor((Math.sin(number) * 10000))) * 1000
        return 210 > r
            ?
            r > 170
                ? r : randomWithSeed(++number)
            : randomWithSeed(++number)
    }

    const generateHexOutOfTwoCharacters = (AB) => {
        const [A, B] = AB.split('');
        return (A.charCodeAt(0) * 100 + (B || '2').charCodeAt(0) * 120) + 40
    }

    const genrateRandomColor = name =>
        randomWithSeed(generateHexOutOfTwoCharacters(name))
            .toString(16)
            .substring(0, 4)
            .replace('.', '')
            .toUpperCase();

    return '#' + genrateRandomColor(name)
}