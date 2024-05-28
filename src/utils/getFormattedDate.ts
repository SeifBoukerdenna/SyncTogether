import moment from 'moment';

const getFormattedDate = (dateString: string) => {
    const date = moment(dateString, 'YYYY/MM/DD');
    const dayOfWeek = date.format('dddd');
    const month = date.format('MMMM');
    const dayOfMonth = date.format('Do');

    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}`;

    return formattedDate;
};

export default getFormattedDate;
