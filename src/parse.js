export class Data {
  constructor (output){
    this.output = output;
    this.doctorName = null;
    this.specialty = null;
    this.bio = null;
    this.officeName = null;
    this.website = null;
    this.acceptNew = null;
    this.officeAddress = null;
    this.phoneNumber = null;
    this.languages = null;
  }

  // Update class properties with JSON data
  parseData (){
    const doctorList = this.output.data;
    if(doctorList.length === 0) {
      throw new Error ("Sorry, there is no doctor meets your search.");
    } else {
      // Doctor's name, specialty and biography
      for(let i = 0; i < doctorList.length; i++) {
        this.doctorName = `${doctorList[i].profile.first_name} ${doctorList[i].profile.middle_name} ${doctorList[i].profile.last_name} ${doctorList[i].profile.title}`;
        this.specialty = doctorList[i].specialties.actor;
        this.bio = doctorList[i].profile.bio;
        // doctor's office info
        for(let j = 0; j < (doctorList[i].practices).length; j++){
          const listPractice = doctorList[i].practice[j];
          this.officeName = listPractice.name;
          this.website = listPractice.website;
          this.acceptNew = listPractice.accepts_new_patients; // boolean
          this.officeAddress = `${listPractice.visit_address.street}, ${listPractice.visit_address.city}, ${listPractice.visit_address.state} ${listPractice.visit_address.zip}`;
          this.phoneNumber = listPractice.phones[0].number;
          this.languages = listPractice.languages[0].number;
          break;
        }
      }
    }
  }
}