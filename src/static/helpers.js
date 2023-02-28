import months from './dates';

export function defaultDateFormat(){
    const date = new Date();
    let formatDate = date.toDateString();
    formatDate = formatDate.split(' ');
    const resultDate = `${formatDate[3]}-${months[formatDate[1]]}-${formatDate[2]}`;
    return resultDate;
};