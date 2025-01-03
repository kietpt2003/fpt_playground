import { FunctionItemProps } from "./functionItemTypes";
import { IntroduceFunctionProps } from "./introduceFunctionTypes";

export interface SliderContentItem extends IntroduceFunctionProps {
    id: number; // ID của mục, dạng số
}

export interface FeatureComponentProps {
    sliderContents: SliderContentItem[];
    featureTitle: string,
    functionItems: FunctionItemProps[];
    changePosition?: boolean;
    isGuideline: boolean;
}