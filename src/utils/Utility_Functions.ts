
export function formatDate(inputDate: string) {
    const [year, month, date] = inputDate.split('-');
    return `${date}/${month}/${year}`;
}