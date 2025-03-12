const fs = require("fs");
const path = require("path");

const gradlePropertiesPath = path.join(__dirname, "../android/gradle.properties");

const removeToken = () => {
    if (fs.existsSync(gradlePropertiesPath)) {
        const content = fs.readFileSync(gradlePropertiesPath, "utf8");
        const newContent = content
            .split("\n")
            .filter((line) => !line.startsWith("MAPBOX_DOWNLOADS_TOKEN"))
            .join("\n");
        fs.writeFileSync(gradlePropertiesPath, newContent, "utf8");
        console.log("Removed MAPBOX_DOWNLOADS_TOKEN from gradle.properties");
    } else {
        console.log("gradle.properties not found");
    }
};

removeToken();