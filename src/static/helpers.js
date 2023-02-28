import months from './dates';

export function defaultDateFormat(){
    const date = new Date();
    let formatDate = date.toDateString();
    formatDate = formatDate.split(' ');
    const resultDate = `${formatDate[3]}-${months[formatDate[1]]}-${formatDate[2]}`;
    return resultDate;
};

export function formatTime(time){
    time = time.split(' ');
    let ampm = 'am';
    let readableTime = time[4];
    const hour = readableTime.substring(0, 2)
    if (hour === '00') {
        readableTime = `12${readableTime.substring(2)}`;
    } else if (hour === '12') {
        ampm = 'pm';
    } else if (+hour > 12){
        readableTime = `${+hour - 12}${readableTime.substring(2)}`;
        ampm = 'pm';
    }
    const formatted = `${time[0]}, ${time[1]} ${time[2]}, ${time[3]} ${readableTime} ${ampm}`;
    return formatted;
};