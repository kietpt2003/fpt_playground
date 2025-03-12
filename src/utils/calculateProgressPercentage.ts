export function calculateProgressPercentage(currentLevel: number, totalLevels: number) {
    if (currentLevel < 1 || totalLevels < 1) {
        throw new Error("currentLevel and totalLevels must be greater than 0");
    }
    if (currentLevel > totalLevels) {
        throw new Error("currentLevel cannot be greater than totalLevels");
    }
    return Math.floor((currentLevel / totalLevels) * 100); // Làm tròn về số tự nhiên
}