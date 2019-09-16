import $ from 'jquery';

export class Data {
  constructor (output){
    this.output = output;
    this.doctorName = null;
    this.specialty = null;
    this.bio = null;
    this.name = null;
    this.website = null;
    this.acceptNew = null;
    this.officeAddress = null;
    this.phoneNumber = null;
    // this.languages = null;
  }

  // Update class properties with JSON data
  getListBySymptom (){
    const doctorList = this.output.data;
    if(doctorList.length === 0) {
      throw new Error ("Sorry, your search returned no results.");
    } else {
      // Function to append result to html
      const renderInfo = (text) => {
        return $("#doctor-info").append(text);
      };
      // Doctor's name, specialty and biography
      for(let i = 0; i < doctorList.length; i++) {
        // Render info only if the doctor's office is in Seattle
        if(doctorList[i].practices[0].visit_address.state.includes("WA") === true) {
          // Doctor's info
          for(let j = 0; j < (doctorList[i].practices).length; j++){
            const doctorProfile = doctorList[i].profile;
            const listPractice = doctorList[i].practices[j];
            const firstName = doctorProfile.first_name;
            const lastName = doctorProfile.last_name;
            const title = doctorProfile.title;
            // Update class value
            this.doctorName = `${firstName} ${lastName}, ${title}`;
            this.specialty = doctorList[i].specialties[0].actor;
            this.bio = doctorProfile.bio;
            this.name = listPractice.name;
            this.website = listPractice.website;
            this.acceptNew = listPractice.accepts_new_patients; // boolean
            this.officeAddress = `${listPractice.visit_address.street}, ${listPractice.visit_address.city}, ${listPractice.visit_address.state} ${listPractice.visit_address.zip}`;
            this.phoneNumber = listPractice.phones[0].number;

            // Render the current value
            renderInfo(`<p id="doctor-name">${this.doctorName}</p>`);
            renderInfo(`<p>Specialty: ${this.specialty}</p>`);
            renderInfo(`<p>Biography: ${this.bio}</p>`);
            this.acceptNew ? renderInfo(`<p>Accept New Patients: Yes</p>`) : renderInfo(`<p>Accept New Patients: No</p>`);
            renderInfo(`<p>Office Address: ${this.officeAddress}</p>`);
            renderInfo(`<p>TEL: ${this.phoneNumber}</p><hr>`);
            break;
          }
        }
      }
    }  
  }
}