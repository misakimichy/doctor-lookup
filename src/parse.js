import $ from 'jquery';

export class Data {
  constructor (output){
    this.output = output;
    this.middleName = null;
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
  // Function to append result to html
  renderInfo(text) {
    return $("#doctor-info").append(text);
  }

  // Update class properties with JSON data
  getDoctorList (){
    const doctorList = this.output.data;
    if(doctorList.length === 0) {
      $("#result").append(`<p>Sorry, your search returned no results.</p>`);
    } else {
      // Loop through the output.data (doctorList)
      for(let i = 0; i < doctorList.length; i++) {
        // Render info only if the doctor's office is in WA
        if(doctorList[i].practices[0].visit_address.state.includes("WA") === true) {
          // Doctor's info
          for(let j = 0; j < (doctorList[i].practices).length; j++) {
            const doctorProfile = doctorList[i].profile;
            const listPractice = doctorList[i].practices[j];
            const firstName = doctorProfile.first_name;
            if(doctorProfile.middle_name !== "") {
              this.middleName = doctorProfile.middle_name;
            }
            const lastName = doctorProfile.last_name;
            const title = doctorProfile.title;
            // Update class value
            this.doctorName = (this.middleName !== undefined) ? `${firstName} ${this.middleName} ${lastName}, ${title}` : `${firstName} ${lastName}, ${title}`;
            this.specialty = doctorList[i].specialties[0].actor;
            this.bio = doctorProfile.bio;
            this.name = listPractice.name;
            this.website = listPractice.website;
            this.acceptNew = listPractice.accepts_new_patients; // boolean
            this.officeAddress = `${listPractice.visit_address.street}, ${listPractice.visit_address.city}, ${listPractice.visit_address.state} ${listPractice.visit_address.zip}`;
            this.phoneNumber = listPractice.phones[0].number;

            // Render the current value
            this.renderInfo(`<p id="doctor-name">${this.doctorName}</p>`);
            this.renderInfo(`<p>Specialty: ${this.specialty}</p>`);
            this.renderInfo(`<p>Biography: ${this.bio}</p>`);
            this.acceptNew ? this.renderInfo(`<p>Accept New Patients: Yes</p>`) : this.renderInfo(`<p>Accept New Patients: No</p>`);
            if(this.website != undefined) {
              this.renderInfo(`<a href=${this.website}><p>${this.name}</p></a>`);
            }
            this.renderInfo(`<p>Office Address: ${this.officeAddress}</p>`);
            this.renderInfo(`<p id='tel'>TEL: ${this.phoneNumber}</p><hr>`);
            break;
          }
        }
      }
    }  
  }
}