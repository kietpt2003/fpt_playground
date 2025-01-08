export function formatDate(date: Date, locale: string): string {
    return new Intl.DateTimeFormat(locale, {
        weekday: 'long', // Hiển thị thứ
        year: 'numeric', // Hiển thị năm
        month: 'long',   // Hiển thị tên tháng
        day: '2-digit',  // Hiển thị ngày
    }).format(date);
}