import { useTranslation } from "react-i18next";

export function formatLikesNumber(num: number, t: ReturnType<typeof useTranslation>["t"]): string {
    if (num >= 1_000_000) {
        // Nếu là hàng triệu
        return `${Math.floor(num / 1_000_000)}${t("format-million")}+`;
    } else if (num >= 1_000) {
        // Nếu là hàng nghìn
        return `${Math.floor(num / 1_000)}${t("format-thousand")}+`;
    }
    return num.toString(); // Nếu nhỏ hơn 1 nghìn thì giữ nguyên
}

export function formatNumber(num: number, t: ReturnType<typeof useTranslation>["t"]): string {
    if (num >= 1_000_000) {
        // Nếu là hàng triệu
        return `${Math.floor(num / 1_000_000)}${t("format-million")}`;
    } else if (num >= 1_000) {
        // Nếu là hàng nghìn
        return `${Math.floor(num / 1_000)}${t("format-thousand")}`;
    }
    return num.toString(); // Nếu nhỏ hơn 1 nghìn thì giữ nguyên
}
