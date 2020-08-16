import { AsyncStorage } from "react-native";

export default class Utilities {
    // Convert milisecond to hour (round to 2 decimal places)
    static milsecondToHour = (millisec) => (millisec / (1000 * 60 * 60)).toFixed(2);

    // Convert hour to time format (hour:minute:second)
    static hourToTime = (hours) => {
        if (!hours)
            return 0;
        const hour = Math.trunc(hours);
        const minute = Math.trunc((hours - hour) * 60);
        const second = Math.round(((hours - hour) * 60 - minute) * 60);
        return `${hour > 0 ? `${hour}:` : ""}${hour > 0 && minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
    }

    // Convert second to milisecond
    static secondToMilsecond = (second) => second ? second * 1000 : 0;

    // Convert milisecond to second 
    static milsecondToSecond = (millisec) => millisec ? millisec / 1000 : 0;

    // Get Youtube Video ID from embed Youtube link
    static getYoutubeVideoIdFromUrl = (url) => {
        const splits = url.split("https://youtube.com/embed/");
        return splits[1];
    }

    // Round float to 2 decimal places
    static roundFloat = (number) => Number.parseFloat(number).toFixed(2);
}