export default class Utilities {
    static milsecondToHour = (millisec) => (millisec / (1000 * 60 * 60)).toFixed(2);

    static hourToTime = (hours) => {
        if (!hours)
            return 0;
        const hour = Math.trunc(hours);
        const minute = Math.trunc((hours - hour) * 60);
        const second = Math.round((hours * 60 - minute) * 60);
        return `${hour > 0 ? `:${hour}` : ""}${minute}:${second < 10 ? `0${second}` : second}`;
    }

    static hourToMilsecond = (hours) => hours ? hours * 60 * 60 * 1000 : 0;
}