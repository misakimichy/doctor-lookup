export class SearchResult {
  constructor (){
    this.middleName = null;
    this.doctorName = null;
    this.specialty = null;
    this.bio = null;
    this.name = null;
    this.website = null;
    this.acceptNew = null;
    this.officeAddress = null;
    this.phoneNumber = null;
  }
}

// Update class properties with JSON data
export const getDoctorList = (apiResponseBody) => {
  const doctorList = apiResponseBody.data;
  let results = [];
  
  // Loop through every doctor
  for(let i = 0; i < doctorList.length; i++) {
    // Render info only if the doctor's office is in WA
    if(doctorList[i].practices[0].visit_address.state.includes("WA")) {

      // Make SearchResult for each doctor
      let result = new SearchResult();

      // Set result properties from the profile attribute
      const doctorProfile = doctorList[i].profile;
      const firstName = doctorProfile.first_name;
      if(doctorProfile.middle_name !== "") {
        result.middleName = doctorProfile.middle_name;
      }
      const lastName = doctorProfile.last_name;
      const title = doctorProfile.title;
      result.doctorName = (result.middleName !== undefined) ? `${firstName} ${result.middleName} ${lastName}, ${title}` : `${firstName} ${lastName}, ${title}`;
      result.bio = doctorProfile.bio;
      result.specialty = doctorList[i].specialties[0].actor;
      results.push(result);

      // Loop through every practice
      for(let j = 0; j < (doctorList[i].practices).length; j++) {
        // Create result object from doctor
        const listPractice = doctorList[i].practices[j];
        result.name = listPractice.name;
        result.website = listPractice.website;
        result.acceptNew = listPractice.accepts_new_patients; // boolean
        result.officeAddress = `${listPractice.visit_address.street}, ${listPractice.visit_address.city}, ${listPractice.visit_address.state} ${listPractice.visit_address.zip}`;
        result.phoneNumber = listPractice.phones[0].number;
      }
    }
  }
  return results;
};