import { useTranslation } from "react-i18next";
import { DailyCheckPointItemProps } from "../components/types/dailyCheckPointTypes";

// Hàm lấy ngày trong tuần từ chuỗi ngày (ISO format)
export const getDayOfWeek = (dateString: string, t: ReturnType<typeof useTranslation>["t"]): string => {
    const days = [t("sunday"), t("monday"), t("tuesday"), t("wednesday"), t("thursday"), t("friday"), t("saturday")];
    // Chuyển đổi từ UTC sang giờ local
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    return days[localDate.getDay()];
};

// Chuyển đổi danh sách từ API sang kiểu dữ liệu mong muốn
export const convertItemsToDailyCheckpointItems = (apiData: any[], t: ReturnType<typeof useTranslation>["t"]): DailyCheckPointItemProps[] => {
    const today = new Date(); // Lấy ngày hiện tại theo giờ local

    return apiData.map((item) => {
        const checkInDateUTC = new Date(item.checkInDate);
        const checkInDateLocal = new Date(checkInDateUTC.getTime() + checkInDateUTC.getTimezoneOffset() * 60000);

        let dayStatus: "Past" | "Today" | "Future";

        // So sánh ngày với today theo local time
        if (checkInDateLocal.toDateString() === today.toDateString()) {
            dayStatus = "Today";
        } else if (checkInDateLocal < today) {
            dayStatus = "Past";
        } else {
            dayStatus = "Future";
        }

        return {
            id: item.id,
            date: getDayOfWeek(item.checkInDate, t),
            dayStatus,
            coinValue: item.coinValue,
            diamondValue: item.diamondValue,
            status: item.status as "Checked" | "Unchecked",
        };
    });
};