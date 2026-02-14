// let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", 'Fri', "Sat", "Sun"]

// export const getDay=(timestamp)=>{
//     let date =new Date(timestamp)

//     return `${date.getDate()} ${months[date.getMonth()]}`
// }

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

export const getDay = (timestamp) => {
    let date = new Date(timestamp);
    let dayNum = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${dayNum} ${month} ${year}`;
};

export const getFullDay =(timestamp)=>{
    let date =new Date(timestamp);

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}
