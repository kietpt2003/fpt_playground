import { sliderMax } from "../constants/slider";

const getVolumeIcon = (value: number) => {
    if (value === 0) return 'volume-mute'; // Giá trị bằng 0
    if (value <= sliderMax / 3) return 'volume-low'; // Giá trị từ 0 đến 1/3 của sliderMax
    if (value <= (2 * sliderMax) / 3) return 'volume-medium'; // Giá trị từ 1/3 đến 2/3 của sliderMax
    return 'volume-high'; // Giá trị lớn hơn 2/3 của sliderMax
};

export default getVolumeIcon;