import { useTranslation } from 'react-i18next';
import { User } from '../constants/entities/User';

// Hàm lấy dữ liệu bất đồng bộ
export const getDialogues = (t: ReturnType<typeof useTranslation>["t"], user: User) => {
    const boyDialogues: string[] = [
        t("boy-dialogue1"),
        t("dialogue2"),
        t("dialogue3"),
        t("dialogue4"),
        t("dialogue5"),
        t("dialogue6"),
        t("dialogue7"),
        t("dialogue8"),
        t("dialogue9"),
        t("dialogue10"),
        t("dialogue11"),
        t("dialogue12"),
        t("dialogue13"),
    ];

    const girlDialogues: string[] = [
        t("girl-dialogue1"),
        t("dialogue2"),
        t("dialogue3"),
        t("dialogue4"),
        t("dialogue5"),
        t("dialogue6"),
        t("dialogue7"),
        t("dialogue8"),
        t("dialogue9"),
        t("dialogue10"),
        t("dialogue11"),
        t("dialogue12"),
        t("dialogue13"),
    ];

    return user.gender === "Female" ? girlDialogues : boyDialogues;
};