var modal1 = document.getElementById('view_request_Modal');
var span = document.getElementsByClassName('close');

// Anas Usman
// hides popup
span[0].onclick = function() {
  modal1.style.display = 'none';
};

// hides popup
async function closeRequestView() {
  modal1.style.display = 'none';
}

// hides popup
window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = 'none';
  }
};

// displays update profile page
async function updateProfile_btn() {
  document.location = 'updateProfile.html';
}

// hides message
var fade_out = function() {
  document.getElementById('message').classList.remove('show');
  document.getElementById('message').classList.add('hide');
};

// displays error
function loginResponse() {
  document.getElementById('error').classList.remove('hide');
  document.getElementById('error').classList.add('show');
}

// displays error
function loginResponse2() {
  document.getElementById('error').classList.remove('hide');
  document.getElementById('error').classList.add('show');
  document.getElementById('error').innerHTML =
    'Please fill the required fields';
}

// displays error
function loginResponse3() {
  document.getElementById('error').classList.remove('hide');
  document.getElementById('error').classList.add('show');
  document.getElementById('error').innerHTML =
    'Please enter valid CNIC and phone numbers';
}

// displays error
function emailTakenResponse() {
  document.getElementById('error').classList.remove('hide');
  document.getElementById('error').classList.add('show');
  document.getElementById('error').innerHTML =
    'This email is taken. Try another';
}

// displays error
function passwordError() {
  document.getElementById('error').classList.remove('hide');
  document.getElementById('error').classList.add('show');
  document.getElementById('error').innerHTML = 'Passwords do not match';
}

// Wasif Ibrahim
// stores data during registration
async function storeData() {
  console.log('I am inside storeData');

  var fullName = document.getElementById('fullName').value;
  var Fathers_Name = document.getElementById('Fathers_Name').value;
  var CNIC = document.getElementById('CNIC').value;
  var date = document.getElementById('D_O_B_').value;
  if (document.getElementById('male').checked) {
    var gender = 'Male';
  } else if (document.getElementById('female').checked) {
    var gender = 'Female';
  }
  console.log(gender);
  var Marital_Status = document.getElementById('marital_status').value;
  console.log(Marital_Status);

  var Current_Address = document.getElementById('Current_Address').value;
  var Permanent_Address = document.getElementById('Permanent_Address').value;
  var Home = document.getElementById('Home').value;
  var Mobile = document.getElementById('Mobile').value;

  var Degree = document.getElementById('Degree').value;
  var Duration_of_Degree = document.getElementById('Duration_of_Degree').value;
  var Institute = document.getElementById('Institute').value;
  var CGPA = document.getElementById('CGPA').value;

  var Job_ID = document.getElementById('Job_ID').value;
  var companyName = document.getElementById('companyName').value;
  var jobDuration = document.getElementById('jobDuration').value;

  if (
    fullName == '' ||
    Fathers_Name == '' ||
    CNIC == '' ||
    date == '' ||
    gender == '' ||
    Marital_Status == '' ||
    Current_Address == '' ||
    Permanent_Address == '' ||
    Home == '' ||
    Mobile == '' ||
    Degree == '' ||
    Duration_of_Degree == '' ||
    Institute == '' ||
    CGPA == ''
  ) {
    loginResponse2();
  } else if (CNIC.length != 13 || Home.length != 11 || Mobile.length != 11) {
    loginResponse3();
  } else {
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('Fathers_Name', Fathers_Name);
    localStorage.setItem('CNIC', CNIC);
    localStorage.setItem('D_O_B_', date);
    localStorage.setItem('gender', gender);
    localStorage.setItem('MaritalStatus', Marital_Status);
    localStorage.setItem('Current_Address', Current_Address);
    localStorage.setItem('Permanent_Address', Permanent_Address);
    localStorage.setItem('Home', Home);
    localStorage.setItem('Mobile', Mobile);
    localStorage.setItem('Degree', Degree);
    localStorage.setItem('Duration_of_Degree', Duration_of_Degree);
    localStorage.setItem('Institute', Institute);
    localStorage.setItem('CGPA', CGPA);
    localStorage.setItem('Job_ID', Job_ID);
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('jobDuration', jobDuration);
    document.location = 'candidateSignup.html';
  }
}

// Wasif Ibrahim
// logs in candidate
async function candidateLogin() {
  console.log('I am here');
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  const response = await fetch('http://localhost:3000/candidate/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  console.log(response.type);
  if (response.type === 'invalid') {
    loginResponse();
  } else {
    console.log(response.id);
    localStorage.setItem('id', response.id);
    document.location = 'Candidate-home.html';
  }
}

// Wasif Ibrahim
// displays data for modification
async function placeUserData() {
  let candidateID = localStorage.getItem('id');
  const response = await fetch('http://localhost:3000/candidate/getProfile', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: candidateID })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
  console.log(response);

  var can = response.candidate;

  document.getElementById('Full_Name').value = can.Full_Name;
  document.getElementById('Fathers_Name').value = can.Fathers_Name;
  document.getElementById('CNIC').value = can.CNIC;
  document.getElementById('D_O_B_').value = can.D_O_B_.substring(0, 10);
  if ((can.Gender = 'male')) {
    document.getElementById('male').checked = true;
  } else {
    document.getElementById('female').checked = true;
  }
  document.getElementById('maritalStatus').value = can.Marital_Status;
  document.getElementById('Current_Address').value = can.Current_Address;
  document.getElementById('Permanent_Address').value = can.Permanent_Address;
  document.getElementById('Home').value = can.Home;
  document.getElementById('Mobile').value = can.Mobile;
  document.getElementById('Degree').value = can.Degree;
  document.getElementById('Duration_of_Degree').value = can.Duration_of_Degree;
  document.getElementById('Institute').value = can.Institute;
  document.getElementById('CGPA').value = can.CGPA;
  document.getElementById('Job_ID').value = can.Job_ID;
  document.getElementById('companyName').value = can.companyName;
  document.getElementById('jobDuration').value = can.Experience;
}

// Wasif Ibrahim
// uploads CV
// CV truncates during upload
async function uploadCandidateCV() {
  var file;
  var fileToLoad = document.getElementById('fileid').files[0];

  var fileReader = new FileReader();
  fileReader.onload = async function(fileLoadedEvent) {
    var textFromFileLoaded = fileLoadedEvent.target.result;
    file = textFromFileLoaded.toString('base64');

    const blob = new Blob([file], { type: 'application/pdf' });
    let candidateID = localStorage.getItem('id');

    const response = await fetch('http://localhost:3000/candidate/uploadCV', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ candidateID, file: blob })
    });
    document.getElementById('message').innerHTML = 'CV has been uploaded';
    document.getElementById('message').classList.remove('hide');
    document.getElementById('message').classList.add('show');
    setTimeout(fade_out, 5000);
  };
  fileReader.readAsText(fileToLoad);
}

// Wasif Ibrahim
// signs up candidate
async function candidateSignup() {
  console.log('I am here');
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;

  if (email == '' || password == '' || confirmPassword == '') {
    loginResponse();
  } else {
    var fullName = localStorage.getItem('fullName');
    var Fathers_Name = localStorage.getItem('Fathers_Name');
    var CNIC = localStorage.getItem('CNIC');
    var date = localStorage.getItem('D_O_B_');
    var gender = localStorage.getItem('gender');
    var Marital_Status = localStorage.getItem('MaritalStatus');

    var Current_Address = localStorage.getItem('Current_Address');
    var Permanent_Address = localStorage.getItem('Permanent_Address');
    var Home = localStorage.getItem('Home');
    var Mobile = localStorage.getItem('Mobile');

    var Degree = localStorage.getItem('Degree');
    var Duration_of_Degree = localStorage.getItem('Duration_of_Degree');
    var Institute = localStorage.getItem('Institute');
    var CGPA = localStorage.getItem('CGPA');

    var Job_ID = localStorage.getItem('Job_ID');
    var companyName = localStorage.getItem('companyName');
    var jobDuration = localStorage.getItem('jobDuration');

    const response = await fetch('http://localhost:3000/candidate/checkEmail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        return data;
      });
    if (response.check === 'emailTaken') {
      emailTakenResponse();
    } else if (password !== confirmPassword) {
      passwordError();
    } else {
      const response = await fetch('http://localhost:3000/candidate/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
          Fathers_Name,
          CNIC,
          date,
          gender,
          Marital_Status,
          Current_Address,
          Permanent_Address,
          Home,
          Mobile,
          Degree,
          Duration_of_Degree,
          Institute,
          CGPA,
          Job_ID,
          companyName,
          jobDuration
        })
      });
      document.location = 'candidate.html';
    }
  }
}

// Wasif Ibrahim
// updates profile
async function updateUserProfile() {
  console.log('I am inside updateUserProfile');

  let candidateID = localStorage.getItem('id');

  var fullName = document.getElementById('Full_Name').value;
  var Fathers_Name = document.getElementById('Fathers_Name').value;
  var CNIC = document.getElementById('CNIC').value;
  var date = document.getElementById('D_O_B_').value;
  if (document.getElementById('male').checked) {
    var gender = 'Male';
  } else if (document.getElementById('female').checked) {
    var gender = 'Female';
  }
  var Marital_Status = document.getElementById('maritalStatus').value;
  var Current_Address = document.getElementById('Current_Address').value;
  var Permanent_Address = document.getElementById('Permanent_Address').value;
  var Home = document.getElementById('Home').value;
  var Mobile = document.getElementById('Mobile').value;

  var Degree = document.getElementById('Degree').value;
  var Duration_of_Degree = document.getElementById('Duration_of_Degree').value;
  var Institute = document.getElementById('Institute').value;
  var CGPA = document.getElementById('CGPA').value;

  var Job_ID = document.getElementById('Job_ID').value;
  var companyName = document.getElementById('companyName').value;
  var jobDuration = document.getElementById('jobDuration').value;

  if (
    fullName == '' ||
    Fathers_Name == '' ||
    CNIC == '' ||
    date == '' ||
    gender == '' ||
    Marital_Status == '' ||
    Current_Address == '' ||
    Permanent_Address == '' ||
    Home == '' ||
    Mobile == '' ||
    Degree == '' ||
    Duration_of_Degree == '' ||
    Institute == '' ||
    CGPA == ''
  ) {
    document.getElementById('error').classList.remove('hide');
    document.getElementById('error').classList.add('show');
    document.getElementById('error').innerHTML =
      'Please fill the required fields';
  } else if (CNIC.length != 13 || Home.length != 11 || Mobile.length != 11) {
    document.getElementById('error').classList.remove('hide');
    document.getElementById('error').classList.add('show');
    document.getElementById('error').innerHTML =
      'Please enter valid CNIC and Phone numbers';
  } else {
    const response = await fetch(
      'http://localhost:3000/candidate/updateUserProfile',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          candidateID,
          fullName,
          Fathers_Name,
          CNIC,
          date,
          gender,
          Marital_Status,
          Current_Address,
          Permanent_Address,
          Home,
          Mobile,
          Degree,
          Duration_of_Degree,
          Institute,
          CGPA,
          Job_ID,
          companyName,
          jobDuration
        })
      }
    );
    document.location = 'Candidate-home.html';
    document.getElementById('message').innerHTML = 'Profile has been updated';
    document.getElementById('message').classList.remove('hide');
    document.getElementById('message').classList.add('show');
    setTimeout(fade_out, 5000);
  }
}

// Wasif Ibrahim
// creates buttons
function creatButton(text) {
  var button = document.createElement('button');
  button.innerHTML = text;
  button.style = 'width: 120px;';
  button.className = 'btn btn-primary mr-4 pull-right';
  button.type = 'button';
  if (text == 'Apply') {
    button.onclick = applyVacancy;
  } else if (text == 'View') {
    button.onclick = viewRequest;
  } else if (text == 'Remove') {
    button.onclick = removeNotification;
  } else if (text == 'Accept') {
    button.onclick = acceptJobOffer;
  } else if (text == 'Reject') {
    button.onclick = rejectJobOffer;
  }
  return button;
}

// Wasif Ibrahim
// displays request contents
async function viewRequest() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('vac');
  req_id = table.rows[row].id;
  console.log(req_id);
  const response = await fetch('http://localhost:3000/teamLead/viewRequest', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: req_id })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
  console.log(response);
  var modal = document.getElementById('view_request_Modal');
  modal.style.display = 'block';
  var req = response.req[0];
  document.getElementById('depTLV').value = req.Name;
  document.getElementById('domTLV').value = req.Domain;
  document.getElementById('subTLV').value = req.Sub_Domain;
  document.getElementById('expTLV').value = req.Experience;
  document.getElementById('vacTLV').value = req.Vacancies;
  document.getElementById('posTLV').value = req.Job_Position;
  document.getElementById('ejdTLV').value = req.Expected_Joining_Date.substring(
    0,
    10
  );
  document.getElementById('desTLV').value = req.Description;
}

// Wasif Ibrahim
// removes notification
async function removeNotification() {
  console.log('I am inside removeNotification');
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('noti');
  req_id = table.rows[row].id;
  console.log(req_id);
  const response = await fetch(
    'http://localhost:3000/candidate/removeNotification',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: req_id })
    }
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  await GetNotifications();
  console.log(response);
}

// Wasif Ibrahim
// applies for a vacancy
async function applyVacancy() {
  canID = localStorage.getItem('id');
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('vac');
  vac_id = table.rows[row].id;
  console.log(vac_id);
  const response = await fetch('http://localhost:3000/candidate/applyVacancy', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: vac_id, candidateID: canID })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  await GetVacancies();
  console.log(response);
  document.getElementById('message').innerHTML =
    'You have successfully applied';
  document.getElementById('message').classList.remove('hide');
  document.getElementById('message').classList.add('show');
  setTimeout(fade_out, 5000);
}

// Wasif Ibrahim
// displays vacancies
async function GetVacancies() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');
  document.getElementById('alert2').classList.remove('show');
  document.getElementById('alert2').classList.add('hide');
  document.getElementById('alert3').classList.remove('show');
  document.getElementById('alert3').classList.add('hide');
  document.getElementById('alert4').classList.remove('show');
  document.getElementById('alert4').classList.add('hide');
  var candidateID = localStorage.getItem('id');
  console.log(candidateID);
  const response = await fetch('http://localhost:3000/candidate/getVacancies', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: candidateID })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  console.log(response);

  req = response.requests;
  var table = document.getElementById('vac');
  table.innerHTML = null;
  var header = document.createElement('tr');
  var head1 = document.createElement('th');
  head1.innerText = '#';
  var head2 = document.createElement('th');
  head2.innerText = 'Rank';
  header.appendChild(head1);
  header.appendChild(head2);
  table.appendChild(header);

  if (response.msg == 'successful') {
    for (var i = 0; i < req.length; i++) {
      var row = document.createElement('tr');
      row.id = req[i].id;
      var col1 = document.createElement('td');
      col1.innerText = i + 1;
      var col2 = document.createElement('td');
      col2.innerText = req[i].rank;
      var col3 = document.createElement('td');
      col3.appendChild(creatButton('View'));
      var col4 = document.createElement('td');
      col3.appendChild(creatButton('Apply'));
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      table.appendChild(row);
    }
  } else {
    document.getElementById('alert1').classList.remove('hide');
    document.getElementById('alert1').classList.add('show');
  }
}

// Wasif Ibrahim
// displays notifications
async function GetNotifications() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');
  document.getElementById('alert2').classList.remove('show');
  document.getElementById('alert2').classList.add('hide');
  document.getElementById('alert3').classList.remove('show');
  document.getElementById('alert3').classList.add('hide');
  document.getElementById('alert4').classList.remove('show');
  document.getElementById('alert4').classList.add('hide');
  var candidateID = localStorage.getItem('id');
  console.log(candidateID);
  const response = await fetch(
    'http://localhost:3000/candidate/getNotifications',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: candidateID })
    }
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  console.log(response);

  req = response.requests;
  var table = document.getElementById('noti');
  table.innerHTML = null;
  var header = document.createElement('tr');
  var head1 = document.createElement('th');
  head1.innerText = '#';
  var head2 = document.createElement('th');
  head2.innerText = 'Notifications';
  header.appendChild(head1);
  header.appendChild(head2);
  table.appendChild(header);

  if (response.msg == 'successful') {
    for (var i = 0; i < req.length; i++) {
      var row = document.createElement('tr');
      row.id = req[i].id;
      var col1 = document.createElement('td');
      col1.innerText = i + 1;
      var col2 = document.createElement('td');
      col2.innerText = req[i].detail;

      var col3 = document.createElement('td');
      col3.appendChild(creatButton('Remove'));
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      table.appendChild(row);
    }
  } else {
    document.getElementById('alert2').classList.remove('hide');
    document.getElementById('alert2').classList.add('show');
  }
}

// Wasif Ibrahim
// displays job offers
async function GetJobOffers() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');
  document.getElementById('alert2').classList.remove('show');
  document.getElementById('alert2').classList.add('hide');
  document.getElementById('alert3').classList.remove('show');
  document.getElementById('alert3').classList.add('hide');
  document.getElementById('alert4').classList.remove('show');
  document.getElementById('alert4').classList.add('hide');
  console.log('I am inside GetJobOffers');
  var candidateID = localStorage.getItem('id');
  console.log(candidateID);

  const response = await fetch('http://localhost:3000/candidate/getJobOffers', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: candidateID })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  console.log(response);

  req = response.requests;
  var table = document.getElementById('joboffer');
  table.innerHTML = null;
  var header = document.createElement('tr');
  var head1 = document.createElement('th');
  head1.innerText = '#';
  var head2 = document.createElement('th');
  head2.innerText = 'Offer';
  header.appendChild(head1);
  header.appendChild(head2);
  table.appendChild(header);

  if (response.msg == 'successful') {
    for (var i = 0; i < req.length; i++) {
      var row = document.createElement('tr');
      row.id = req[i].job_ID;
      var col1 = document.createElement('td');
      col1.innerText = i + 1;
      var col2 = document.createElement('td');
      col2.innerText =
        'You are requested to start working as ' +
        req[i].Job_Position +
        ' on ' +
        req[i].Joining_Date.substring(0, 10) +
        ' date on  a salary of ' +
        req[i].Salary +
        ' Rupees';

      var col3 = document.createElement('td');
      col3.appendChild(creatButton('Accept'));
      var col4 = document.createElement('td');
      col4.appendChild(creatButton('Reject'));
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      table.appendChild(row);
    }
  } else {
    document.getElementById('alert4').classList.remove('hide');
    document.getElementById('alert4').classList.add('show');
  }
}

// Wasif Ibrahim
// displays interview timing
async function GetInterviewTimings() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');
  document.getElementById('alert2').classList.remove('show');
  document.getElementById('alert2').classList.add('hide');
  document.getElementById('alert3').classList.remove('show');
  document.getElementById('alert3').classList.add('hide');
  document.getElementById('alert4').classList.remove('show');
  document.getElementById('alert4').classList.add('hide');
  console.log('I am inside GetInterviewTimings');
  var candidateID = localStorage.getItem('id');
  console.log(candidateID);

  const response = await fetch(
    'http://localhost:3000/candidate/getInterviewTimings',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: candidateID })
    }
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  console.log(response);

  req = response.requests;
  var table = document.getElementById('interview');
  table.innerHTML = null;
  var header = document.createElement('tr');
  var head1 = document.createElement('th');
  head1.innerText = '#';
  var head2 = document.createElement('th');
  head2.innerText = 'Rank';
  var head3 = document.createElement('th');
  head3.innerText = 'Date';
  var head4 = document.createElement('th');
  head4.innerText = 'Time';
  header.appendChild(head1);
  header.appendChild(head2);
  header.appendChild(head3);
  header.appendChild(head4);
  table.appendChild(header);

  if (response.msg == 'successful') {
    for (var i = 0; i < req.length; i++) {
      var row = document.createElement('tr');
      row.id = req[i].id;
      var col1 = document.createElement('td');
      col1.innerText = i + 1;
      var col2 = document.createElement('td');
      col2.innerText = req[i].Job_Position;
      var col3 = document.createElement('td');
      col3.innerText = req[i].Date.substring(0, 10);
      var col4 = document.createElement('td');
      col4.innerText = req[i].Time;
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      table.appendChild(row);
    }
  } else {
    document.getElementById('alert3').classList.remove('hide');
    document.getElementById('alert3').classList.add('show');
  }
}

// Wasif Ibrahim
// accepts job offer
async function acceptJobOffer() {
  canID = localStorage.getItem('id');
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('joboffer');
  joboffer_id = table.rows[row].id;
  console.log(joboffer_id);

  const response = await fetch(
    'http://localhost:3000/candidate/acceptJobOffer',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: joboffer_id })
    }
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  await GetJobOffers();
  console.log(response);
  document.getElementById('message').innerHTML =
    'You have successfully accepted the offer';
  document.getElementById('message').classList.remove('hide');
  document.getElementById('message').classList.add('show');
  setTimeout(fade_out, 5000);
}

// Wasif Ibrahim
// rejects job offer
async function rejectJobOffer() {
  canID = localStorage.getItem('id');
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('joboffer');
  joboffer_id = table.rows[row].id;
  console.log(joboffer_id);

  const response = await fetch(
    'http://localhost:3000/candidate/rejectJobOffer',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: joboffer_id })
    }
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  await GetJobOffers();
  console.log(response);
  document.getElementById('message').innerHTML = 'You have rejected the offer';
  document.getElementById('message').classList.remove('hide');
  document.getElementById('message').classList.add('show');
  setTimeout(fade_out, 5000);
}

// Anas Usman
// removes CV
async function removeCV() {
  canID = localStorage.getItem('id');

  const response = await fetch('http://localhost:3000/candidate/removeCV', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: canID })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  console.log(response);
  document.getElementById('message').innerHTML =
    'You have successfully removed CV';
  document.getElementById('message').classList.remove('hide');
  document.getElementById('message').classList.add('show');
  setTimeout(fade_out, 5000);
}
