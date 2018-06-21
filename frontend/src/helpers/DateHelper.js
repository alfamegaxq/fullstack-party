export default class DateHelper {
    static getDatesDiff(date) {
        const now = new Date();
        const created = new Date(date);
        const timeDiff = Math.abs(created.getTime() - now.getTime());

        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
}
