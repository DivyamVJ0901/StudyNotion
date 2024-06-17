export const formatDate = (dateString) => {
    
    const options = {year : "numeric" , month : "long" , day : "numeric"}
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString("en-US", options)
    
    // Calculation of hour and minutes
    const hour = date.getHours()
    const minutes = date.getMinutes()

    // Calculation of AM or PM
    const period = hour >= 12 ? "PM" : "AM"

    // Here padStart(2 , "0") is a method that ensures that length of 
    // minutes should be atleast 2 , if not then place 0 in starting 
    // till we reach our desired length which is 2 in this problem
    const formattedTime = `${hour % 12} : ${minutes.toString().padStart(2 , "0")} ${period}`

    // returning the date
    return `${formattedDate} | ${formattedTime}`
}