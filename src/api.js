// method to call doctors list by symptom search
export const searchDoctorBySymptom = keyword => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    const url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${keyword}&location=wa-seattle&skip=0&limit=10&user_key=${process.env.apiKey}`;
    request.onload = function() {
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

// method to call doctors list by Doctor's name
export const searchDoctorByName = name => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    const url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=wa-seattle&skip=0&limit=10&user_key=${process.env.apiKey}`;
    request.onload = function() {
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