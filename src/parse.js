export const parseData = output => {
  const doctorList = output.data;
  if(doctorList.length === 0) {
    throw new Error ("Sorry, there is no doctor meets your search.");
  } else {
    for(let i = 0; i < doctorList.length; i++) {
      let doctorName = `${doctorList[i].profile.first_name} ${doctorList[i].profile.middle_name} ${doctorList[i].profile.last_name} ${doctorList[i].profile.title}`; 
      
      // doctor's office info

    }
  }
};