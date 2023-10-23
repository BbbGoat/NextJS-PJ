import dayjs from "dayjs";

export function formatTime(time, format = 'YYYY.MM.DD') {
    return dayjs(time).format(format)
}