import $ from 'jquery';

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
    // this.languages = null;
  }

  // Update class properties with JSON data
  getData (){
    const doctorList = this.output.data;
    if(doctorList.length == 0) {
      throw new Error ("Sorry, your search returned no results.");
    } else {
      // Function to append result to html
      const renderInfo = (text) => {
        return $("#doctor-info").append(text);
      };
      // Doctor's name, specialty and biography
      for(let i = 0; i < doctorList.length; i++) {
        // Render info only if the doctor's office is in Seattle
        if(doctorList[i].practices[0].visit_address.city.includes("Seattle") === true) {
          this.doctorName = `${doctorList[i].profile.first_name} ${doctorList[i].profile.middle_name} ${doctorList[i].profile.last_name} ${doctorList[i].profile.title}`;
          this.specialty = doctorList[i].specialties[0].actor;
          this.bio = doctorList[i].profile.bio;
          renderInfo(`<p id="doctor-name">${this.doctorName}</p>`);
          renderInfo(`<p>Specialty: ${this.specialty}</p>`);
          renderInfo(`<p>Biography: ${this.bio}</p>`);
          
          // Doctor's office info
          for(let j = 0; j < (doctorList[i].practices).length; j++){
            const listPractice = doctorList[i].practices[j];
            this.acceptNew = listPractice.accepts_new_patients; // boolean
            this.officeName = listPractice.name;
            this.website = listPractice.website;
            this.officeAddress = `${listPractice.visit_address.street}, ${listPractice.visit_address.city}, ${listPractice.visit_address.state} ${listPractice.visit_address.zip}`;
            this.phoneNumber = listPractice.phones[0].number;
            this.acceptNew ? renderInfo(`<p>Accept New Patients: Yes</p>`) : renderInfo(`<p>Accept New Patients: No</p>`);
            renderInfo(`<p>Website: <a href=${this.website}>${this.officeName}</a></p>`);
            renderInfo(`<p>Address: ${this.officeAddress}</p>`);
            renderInfo(`<p>TEL: ${this.phoneNumber}</p><hr>`);
            break;
          }
        }
      }
    }  
  }
}