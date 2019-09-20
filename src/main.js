import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import * as api from './api';
import * as parse from './parse';

const clearResult = () => {
  if($("#doctor-info").children().length > 0 ) {
    $("#doctor-info").children().remove();
  } else {
    return;
  }
};

// Function to append result to html
const renderInfo = result => {
  $("#doctor-info").append(result);
  $("#doctor-info").append(`<p id="doctor-name">${result.doctorName}</p>`);
  $("#doctor-info").append(`<p>Specialty: ${result.specialty}</p>`);
  $("#doctor-info").append(`<p>Biography: ${result.bio}</p>`);
  result.acceptNew ? $("#doctor-info").append(`<p>Accept New Patients: Yes</p>`) : $("#doctor-info").append(`<p>Accept New Patients: No</p>`);
  if(result.website !== undefined) {
    $("#doctor-info").append(`<a href=${result.website}><p>${result.name}</p></a>`);
  }
  $("#doctor-info").append(`<p>Office Address: ${result.officeAddress}</p>`);
  $("#doctor-info").append(`<p id='tel'>TEL: ${result.phoneNumber}</p><hr>`);
};

const processSearch = (searchFunc, inputElem, event) => {
  event.preventDefault();
  clearResult();
  const userSymptomSearch = inputElem.val();
  const formattedInput = userSymptomSearch.replace(/\s+/g, '-').toLowerCase();
  const promise = searchFunc(formattedInput);
  if(formattedInput == "") {
    $("#doctor-info").prepend(`<p>Please enter something to see a doctor list.</p>`);
  } else {
    promise.then(function(response) {
      const body = JSON.parse(response);
      const results = parse.getDoctorList(body);
      results.forEach(result => {
        renderInfo(result);
      });
    }, function(error) {
      console.log(error);
    });
  }
  $("input").val("");
  $("#result").show();
}; 

// Call APi and show the proper result to user
$(document).ready(function(){
  $("#search-symptom").submit(function(event){
    processSearch(api.searchDoctorBySymptom, $("#symptom-input"), event);
  });

  $("#search-name").submit(function(event){
    processSearch(api.searchDoctorByName, $("#name-input"), event);
  });
});
