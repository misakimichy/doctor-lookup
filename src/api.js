// API call happens here in a class names DoctorSearch
export class DoctorSearch {
  // method to call doctors list by symptom search
  searchDoctorBySymptom(keyword) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      const url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${keyword}&location=wa-seattle&skip=0&limit=10&user_key=${process.env.apiKey}`;
      request.onload = () => {
        if(this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}