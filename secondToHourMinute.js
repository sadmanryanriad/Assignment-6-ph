function secondToHourMinute(second){
    let hour = parseInt(second/3600);
    second = second%3600;
    minute = parseInt(second / 60);
    return `${hour}hrs ${minute} min ago`;
}

console.log(secondToHourMinute(16278));