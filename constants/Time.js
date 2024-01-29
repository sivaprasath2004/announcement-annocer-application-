const Time=()=>{
const currentDate = new Date();
const year = currentDate.getFullYear();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const month = monthNames[currentDate.getMonth()];
const day = currentDate.getDate();
let hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12 || 12;
const formattedDateTime = `${hours}:${minutes} ${ampm}  ${day}-${month}-${year}`;
console.log("Current date and time:", formattedDateTime);
return formattedDateTime
}
export default Time