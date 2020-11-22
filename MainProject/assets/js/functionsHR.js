var modal1 = document.getElementById('int_Timing_Modal');
var modal2 = document.getElementById('modify_Timing_Modal');
var modal3 = document.getElementById('letter_Modal');
var modal4 = document.getElementById('Employee_Modal');
var modal5 = document.getElementById('view_request_Modal');
var modal6 = document.getElementById('report_Modal');
var span = document.getElementsByClassName('close');

// Anas Usman
// hides popup
span[0].onclick = function() {
  document.getElementById('error1').classList.remove('show');
  document.getElementById('error1').classList.add('hide');
  modal1.style.display = 'none';
};

// hides popup
span[1].onclick = function() {
  document.getElementById('error2').classList.remove('show');
  document.getElementById('error2').classList.add('hide');
  modal2.style.display = 'none';
};

// hides popup
span[2].onclick = function() {
  document.getElementById('error3').classList.remove('show');
  document.getElementById('error3').classList.add('hide');
  modal3.style.display = 'none';
};

// hides popup
span[3].onclick = function() {
  document.getElementById('error4').classList.remove('show');
  document.getElementById('error4').classList.add('hide');
  modal4.style.display = 'none';
};

// hides popup
span[4].onclick = function() {
  modal5.style.display = 'none';
};

// hides popup
span[5].onclick = function() {
  modal6.style.display = 'none';
};

// hides popup
async function btn_No() {
  document.getElementById('clarification').style.display = 'none';
}

// hides message
var fade_out = function() {
  document.getElementById('message').classList.remove('show');
  document.getElementById('message').classList.add('hide');
};

// hides popups
window.onclick = function(event) {
  if (
    event.target == modal1 ||
    event.target == modal2 ||
    event.target == modal3 ||
    event.target == modal4 ||
    event.target == modal5 ||
    event.target == modal6
  ) {
    modal1.style.display = 'none';
    modal2.style.display = 'none';
    modal3.style.display = 'none';
    modal4.style.display = 'none';
    modal5.style.display = 'none';
    modal6.style.display = 'none';
    document.getElementById('error1').classList.remove('show');
    document.getElementById('error1').classList.add('hide');
    document.getElementById('error2').classList.remove('show');
    document.getElementById('error2').classList.add('hide');
    document.getElementById('error3').classList.remove('show');
    document.getElementById('error3').classList.add('hide');
    document.getElementById('error4').classList.remove('show');
    document.getElementById('error4').classList.add('hide');
  }
};

// hides popup
async function closeReportView() {
  modal6.style.display = 'none';
}

// hides popup
async function closeRequestView() {
  modal5.style.display = 'none';
}

// displays popup
async function sendLetterbtn() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('chosen_candidates_table');
  post_id = table.rows[row].id;
  localStorage.setItem('post_id', post_id);
  console.log(modal3);
  modal3.style.display = 'block';
}

// displays popup
async function makeEmployeebtn() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('job_offers_table');
  job_id = table.rows[row].id;
  localStorage.setItem('job_id', job_id);
  console.log(modal4);
  modal4.style.display = 'block';
}

// displays page for shortlisting
async function ShortlistCandidatesbtn() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('open_posts_table');
  post_id = table.rows[row].id;
  localStorage.setItem('postID', post_id);
  document.location = 'HRShortlisting.html';
}

// displays dashboard
async function goBackbtn() {
  document.location = 'HR.html';
}

// Anas Usman
// loads interviewers and candidates in dropdown to modify interview timing
async function modifyInterviewbtn() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('interview_table');
  int_id = table.rows[row].id;
  localStorage.setItem('int_id', int_id);

  const response = await fetch('http://localhost:3000/HR/getInterviewers', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  int = response.int;
  console.log(response);
  modal2.style.display = 'block';
  var dropdown = document.getElementById('int_IntM');
  dropdown.innerHTML = null;
  for (var i = 0; i < int.length; i++) {
    var op = document.createElement('option');
    op.value = int[i].id;
    op.innerHTML = int[i].name;
    dropdown.appendChild(op);
  }

  const response2 = await fetch('http://localhost:3000/HR/getPosts2', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  posts = response2.posts;
  console.log(response);
  var dropdown = document.getElementById('int_CanM');
  dropdown.innerHTML = null;
  for (var i = 0; i < posts.length; i++) {
    var op = document.createElement('option');
    op.value = posts[i].id;
    op.innerHTML = posts[i].name;
    dropdown.appendChild(op);
  }

  const response3 = await fetch('http://localhost:3000/HR/getInterview', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: int_id })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
  console.log(response3);
  document.getElementById('int_CanM').value = response3.post_id;
  document.getElementById('int_IntM').value = response3.interviewer;
  document.getElementById('int_DateM').value = response3.date.substring(0, 10);
  document.getElementById('int_TimeM').value = response3.time;
}

// Anas Usman
// loads interviewres in drop down to enter new interview timing
async function enterInterviewTimingsbtn() {
  const response = await fetch('http://localhost:3000/HR/getInterviewers', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  int = response.int;
  console.log(response);
  modal1.style.display = 'block';
  var dropdown = document.getElementById('int_Int');
  dropdown.innerHTML = null;
  for (var i = 0; i < int.length; i++) {
    var op = document.createElement('option');
    op.value = int[i].id;
    op.innerHTML = int[i].name;
    dropdown.appendChild(op);
  }

  const response2 = await fetch('http://localhost:3000/HR/getPosts', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  posts = response2.posts;
  console.log(response);
  var dropdown = document.getElementById('int_Can');
  dropdown.innerHTML = null;
  for (var i = 0; i < posts.length; i++) {
    var op = document.createElement('option');
    op.value = posts[i].id;
    op.innerHTML = posts[i].name;
    dropdown.appendChild(op);
  }
}

// Fawad Omer
// displays approved requests
async function GetApprovedRequests() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');
  document.getElementById('alert2').classList.remove('show');
  document.getElementById('alert2').classList.add('hide');
  document.getElementById('alert3').classList.remove('show');
  document.getElementById('alert3').classList.add('hide');
  document.getElementById('alert4').classList.remove('show');
  document.getElementById('alert4').classList.add('hide');
  document.getElementById('alert5').classList.remove('show');
  document.getElementById('alert5').classList.add('hide');
  const response = await fetch('http://localhost:3000/HR/getApprovedRequests', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  console.log(response);
  req1 = response.requests;
  var table = document.getElementById('app_req_table');
  table.innerHTML = '';
  var header = document.createElement('tr');
  var head1 = document.createElement('th');
  head1.innerText = '#';
  var head2 = document.createElement('th');
  head2.innerText = 'Rank';
  header.appendChild(head1);
  header.appendChild(head2);
  table.appendChild(header);

  if (response.msg == 'successful') {
    for (var i = 0; i < req1.length; i++) {
      var row = document.createElement('tr');
      row.id = req1[i].req_id;
      var col1 = document.createElement('td');
      col1.innerText = i + 1;
      var col2 = document.createElement('td');
      col2.innerText = req1[i].rank;

      var col3 = document.createElement('td');
      col3.appendChild(createButtonHR('View'));
      var col4 = document.createElement('td');
      col4.appendChild(createButtonHR('Upload Post'));

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

// Fawad Omer
// displays posted requests
async function GetOpenPosts() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');
  document.getElementById('alert2').classList.remove('show');
  document.getElementById('alert2').classList.add('hide');
  document.getElementById('alert3').classList.remove('show');
  document.getElementById('alert3').classList.add('hide');
  document.getElementById('alert4').classList.remove('show');
  document.getElementById('alert4').classList.add('hide');
  document.getElementById('alert5').classList.remove('show');
  document.getElementById('alert5').classList.add('hide');
  const response = await fetch('http://localhost:3000/HR/getOpenPosts', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  console.log(response);

  req1 = response.requests;
  var table = document.getElementById('open_posts_table');
  table.innerHTML = '';
  var header = document.createElement('tr');
  var head1 = document.createElement('th');
  head1.innerText = '#';
  var head2 = document.createElement('th');
  head2.innerText = 'Rank';
  header.appendChild(head1);
  header.appendChild(head2);
  table.appendChild(header);

  if (response.msg == 'successful') {
    for (var i = 0; i < req1.length; i++) {
      var row = document.createElement('tr');
      row.id = req1[i].req_id;
      var col1 = document.createElement('td');
      col1.innerText = i + 1;
      var col2 = document.createElement('td');
      col2.innerText = req1[i].rank;

      var col3 = document.createElement('td');
      col3.appendChild(createButtonHR('Close Vacancy'));
      var col4 = document.createElement('td');
      col4.appendChild(createButtonHR('Shortlist Candidates'));
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

// Fawad Omer
// displays interviews
async function GetInterviews() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');
  document.getElementById('alert2').classList.remove('show');
  document.getElementById('alert2').classList.add('hide');
  document.getElementById('alert3').classList.remove('show');
  document.getElementById('alert3').classList.add('hide');
  document.getElementById('alert4').classList.remove('show');
  document.getElementById('alert4').classList.add('hide');
  document.getElementById('alert5').classList.remove('show');
  document.getElementById('alert5').classList.add('hide');
  const response = await fetch('http://localhost:3000/HR/getInterviews', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  console.log(response);

  req1 = response.interviews;
  var table = document.getElementById('interview_table');
  //
  table.innerHTML = '';
  var header = document.createElement('tr');
  var head1 = document.createElement('th');
  head1.innerText = '#';
  var head2 = document.createElement('th');
  head2.innerText = 'Date';
  var head3 = document.createElement('th');
  head3.innerText = 'Time';
  var head4 = document.createElement('th');
  head4.innerText = 'Candidate';
  var head5 = document.createElement('th');
  head5.innerText = 'Interviewer';
  header.appendChild(head1);
  header.appendChild(head2);
  header.appendChild(head3);
  header.appendChild(head4);
  header.appendChild(head5);
  table.appendChild(header);
  if (response.msg == 'successful') {
    for (var i = 0; i < req1.length; i++) {
      var row = document.createElement('tr');
      row.id = req1[i].int_id;
      var col1 = document.createElement('td');
      col1.innerText = i + 1;
      var col2 = document.createElement('td');
      col2.innerText = req1[i].date.substring(0, 10);
      var col3 = document.createElement('td');
      col3.innerText = req1[i].time;
      var col4 = document.createElement('td');
      col4.innerText = req1[i].can_name;
      var col5 = document.createElement('td');
      col5.innerText = req1[i].emp_name;
      var col6 = document.createElement('td');
      col6.appendChild(createButtonHR('Modify'));
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      row.appendChild(col5);
      row.appendChild(col6);
      table.appendChild(row);
    }
  } else {
    document.getElementById('alert2').classList.remove('hide');
    document.getElementById('alert2').classList.add('show');
  }
}

// Fawad Omer
// displays chosen candidates
async function getChosenCandidates() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');
  document.getElementById('alert2').classList.remove('show');
  document.getElementById('alert2').classList.add('hide');
  document.getElementById('alert3').classList.remove('show');
  document.getElementById('alert3').classList.add('hide');
  document.getElementById('alert4').classList.remove('show');
  document.getElementById('alert4').classList.add('hide');
  document.getElementById('alert5').classList.remove('show');
  document.getElementById('alert5').classList.add('hide');
  const response = await fetch('http://localhost:3000/HR/getChosenCandidates', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  console.log(response);
  req1 = response.posts;
  var table = document.getElementById('chosen_candidates_table');
  //
  table.innerHTML = '';
  var header = document.createElement('tr');
  var head1 = document.createElement('th');
  head1.innerText = '#';
  var head2 = document.createElement('th');
  head2.innerText = 'Rank';
  var head3 = document.createElement('th');
  head3.innerText = 'Candidate';
  header.appendChild(head1);
  header.appendChild(head2);
  header.appendChild(head3);
  table.appendChild(header);
  if (response.msg == 'successful') {
    for (var i = 0; i < req1.length; i++) {
      var row = document.createElement('tr');
      row.id = req1[i].post_id;
      var col1 = document.createElement('td');
      col1.innerText = i + 1;
      var col2 = document.createElement('td');
      col2.innerText = req1[i].rank;
      var col3 = document.createElement('td');
      col3.innerText = req1[i].can_name;
      var col4 = document.createElement('td');
      col4.appendChild(createButtonHR('Send Letter'));
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

// Fawad Omer
// creates buttons
function createButtonHR(text) {
  var button = document.createElement('button');
  button.innerHTML = text;
  button.className = 'btn btn-primary mr-4 pull-right';
  button.type = 'button';
  if (text == 'Upload Post') {
    button.onclick = AddApprovedRequest;
  } else if (text == 'Modify') {
    button.onclick = modifyInterviewbtn;
  } else if (text == 'Close Vacancy') {
    button.onclick = CloseVacancy;
  } else if (text == 'Shortlist Candidates') {
    button.onclick = ShortlistCandidatesbtn;
  } else if (text == 'Send Letter') {
    button.onclick = sendLetterbtn;
  } else if (text == 'Make Employee') {
    button.onclick = makeEmployeebtn;
  } else if (text === 'View') {
    button.onclick = viewRequest;
  } else if (text == 'Shortlist') {
    button.onclick = ShortList;
  } else if (text === 'View CV') {
    button.onclick = viewCV;
  }
  return button;
}

// Fawad Omer
// posts an approved request
async function AddApprovedRequest() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('app_req_table');
  post_id = table.rows[row].id;
  console.log(post_id);
  const response = await fetch('http://localhost:3000/HR/AddApprovedRequest', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: post_id })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
  await GetApprovedRequests();
  document.getElementById('message').innerHTML = 'Request has been posted';
  document.getElementById('message').classList.remove('hide');
  document.getElementById('message').classList.add('show');
  setTimeout(fade_out, 5000);
  console.log(response);
}

// Fawad Omer
// close vacancy
async function CloseVacancy() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('open_posts_table');
  post_id = table.rows[row].id;
  console.log(post_id);
  const response = await fetch('http://localhost:3000/HR/CloseVacancy', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: post_id })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
  await GetOpenPosts();
  document.getElementById('message').innerHTML = 'Vacancy has been closed';
  document.getElementById('message').classList.remove('hide');
  document.getElementById('message').classList.add('show');
  setTimeout(fade_out, 5000);
  console.log(response);
}

// Anas Usman
// send offer letter to candidate
async function sendLetter() {
  var sal = document.getElementById('int_sal').value;
  var date = document.getElementById('int_DateL').value;
  var post_id = localStorage.getItem('post_id');

  if (sal == '' || date == '') {
    document.getElementById('error3').classList.remove('hide');
    document.getElementById('error3').classList.add('show');
  } else {
    const response = await fetch('http://localhost:3000/HR/sendLetter', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: post_id,
        salary: sal,
        date: date
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data;
      });
    await getChosenCandidates();
    document.getElementById('message').innerHTML = 'Letter has been sent';
    document.getElementById('message').classList.remove('hide');
    document.getElementById('message').classList.add('show');
    setTimeout(fade_out, 5000);
    document.getElementById('error3').classList.remove('show');
    document.getElementById('error3').classList.add('hide');
    modal3.style.display = 'none';
    console.log(response);
  }
}

// Anas Usman
// schedule interview timing
async function enterInterviewTimings() {
  var post = document.getElementById('int_Can').value;
  var emp = document.getElementById('int_Int').value;
  var date = document.getElementById('int_Date').value;
  var time = document.getElementById('int_Time').value;

  if (date == '' || time == '') {
    document.getElementById('error1').classList.remove('hide');
    document.getElementById('error1').classList.add('show');
  } else {
    const response = await fetch(
      'http://localhost:3000/HR/enterInterviewTimings',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          post: post,
          emp: emp,
          date: date,
          time: time
        })
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data;
      });
    document.getElementById('error1').classList.remove('show');
    document.getElementById('error1').classList.add('hide');
    modal1.style.display = 'none';
    await GetInterviews();
    document.getElementById('message').innerHTML = 'Interview has been added';
    document.getElementById('message').classList.remove('hide');
    document.getElementById('message').classList.add('show');
    setTimeout(fade_out, 5000);
    console.log(response);
  }
}

// Anas Usman
// modify interview timing
async function modifyInterviewTiming() {
  var post = document.getElementById('int_CanM').value;
  var emp = document.getElementById('int_IntM').value;
  var date = document.getElementById('int_DateM').value;
  var time = document.getElementById('int_TimeM').value;
  var int_id = localStorage.getItem('int_id');

  if (date == '' || time == '') {
    document.getElementById('error2').classList.remove('hide');
    document.getElementById('error2').classList.add('show');
  } else {
    const response = await fetch(
      'http://localhost:3000/HR/modifyInterviewTiming',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          int_id: int_id,
          post: post,
          emp: emp,
          date: date,
          time: time
        })
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data;
      });
    document.getElementById('error2').classList.remove('show');
    document.getElementById('error2').classList.add('hide');
    modal2.style.display = 'none';
    await GetInterviews();
    document.getElementById('message').innerHTML =
      'Interview has been modified';
    document.getElementById('message').classList.remove('hide');
    document.getElementById('message').classList.add('show');
    setTimeout(fade_out, 5000);
    console.log(response);
  }
}

// Wasif Ibrahim
// adds candidate manually
async function addCandidates() {
  console.log('I am inside addCandidates');

  var vacancy = document.getElementById('vacancy').value;
  var Full_Name = document.getElementById('Full_Name').value;
  var Email = document.getElementById('Email').value;
  console.log(Full_Name);
  var Fathers_Name = document.getElementById('Fathers_Name').value;
  var CNIC = document.getElementById('CNIC').value;
  var D_O_B_ = document.getElementById('D_O_B_').value;
  var ele = document.getElementsByName('Gender');
  var Gender;

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      Gender = ele[i].value;
    }
  }
  console.log(Gender);

  var Marital_Status = document.getElementById('maritalStatus').value;
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
  var Experience = document.getElementById('Experience').value;

  if (
    vacancy == '' ||
    Full_Name == '' ||
    Fathers_Name == '' ||
    CNIC == '' ||
    D_O_B_ == '' ||
    Gender == '' ||
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
      'Please fill the require fields';
  } else {
    const response = await fetch('http://localhost:3000/candidate/checkEmail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: Email
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        return data;
      });
    if (response.check === 'emailTaken') {
      document.getElementById('error').classList.remove('hide');
      document.getElementById('error').classList.add('show');
      document.getElementById('error').innerHTML =
        'This email is taken, use another';
    } else if (CNIC.length != 13 || Home.length != 11 || Mobile.length != 11) {
      document.getElementById('error').classList.remove('hide');
      document.getElementById('error').classList.add('show');
      document.getElementById('error').innerHTML =
        'Please enter valid CNIC, phone numbers';
    } else {
      const response = await fetch('http://localhost:3000/HR/addCandidate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vacancy,
          Full_Name,
          Email,
          Fathers_Name,
          CNIC,
          D_O_B_,
          Gender,
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
          Experience
        })
      });

      console.log(response);
      document.location = 'HR.html';
      document.getElementById('message').innerHTML = 'Candidate has been added';
      document.getElementById('message').classList.remove('hide');
      document.getElementById('message').classList.add('show');
      setTimeout(fade_out, 5000);
    }
  }
}

// Anas Usman
// displays candidates who accepted job offers
async function getAcceptedOffers() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');
  document.getElementById('alert2').classList.remove('show');
  document.getElementById('alert2').classList.add('hide');
  document.getElementById('alert3').classList.remove('show');
  document.getElementById('alert3').classList.add('hide');
  document.getElementById('alert4').classList.remove('show');
  document.getElementById('alert4').classList.add('hide');
  document.getElementById('alert5').classList.remove('show');
  document.getElementById('alert5').classList.add('hide');
  const response = await fetch('http://localhost:3000/HR/getAcceptedOffers', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  console.log(response);
  offers = response.offers;
  var table = document.getElementById('job_offers_table');
  table.innerHTML = '';
  var header = document.createElement('tr');
  var head1 = document.createElement('th');
  head1.innerText = '#';
  var head2 = document.createElement('th');
  head2.innerText = 'Rank';
  var head3 = document.createElement('th');
  head3.innerText = 'Candidate';
  header.appendChild(head1);
  header.appendChild(head2);
  header.appendChild(head3);
  table.appendChild(header);
  if (response.msg == 'successful') {
    for (var i = 0; i < offers.length; i++) {
      var row = document.createElement('tr');
      row.id = offers[i].job_id;
      var col1 = document.createElement('td');
      col1.innerText = i + 1;
      var col2 = document.createElement('td');
      col2.innerText = offers[i].rank;
      var col3 = document.createElement('td');
      col3.innerText = offers[i].can_name;
      var col4 = document.createElement('td');
      col4.appendChild(createButtonHR('Make Employee'));
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      table.appendChild(row);
    }
  } else {
    document.getElementById('alert5').classList.remove('hide');
    document.getElementById('alert5').classList.add('show');
  }
}

// Anas Usman
// makes candidate an employee
async function makeEmployee() {
  job_id = localStorage.getItem('job_id');
  email = document.getElementById('emp_email').value;
  pass = document.getElementById('emp_pass').value;
  type = document.getElementById('emp_type').value;

  if (email == '' || pass == '' || type == '') {
    document.getElementById('error4').classList.remove('hide');
    document.getElementById('error4').classList.add('show');
  } else {
    console.log(job_id);
    const response = await fetch('http://localhost:3000/HR/makeEmployee', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: job_id,
        email: email,
        pass: pass,
        type: type
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data;
      });
    document.getElementById('error4').classList.remove('show');
    document.getElementById('error4').classList.add('hide');
    modal4.style.display = 'none';
    await getAcceptedOffers();
    document.getElementById('message').innerHTML =
      'Candidate has been employed';
    document.getElementById('message').classList.remove('hide');
    document.getElementById('message').classList.add('show');
    setTimeout(fade_out, 5000);
    console.log(response);
  }
}

// Anas Usman
// displays report
async function viewReports() {
  modal6.style.display = 'block';

  const response = await fetch(
    'http://localhost:3000/employee/getApplications',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
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

  applications = response.applications;
  var table = document.getElementById('application_table');
  table.innerHTML = '';
  var header = document.createElement('tr');
  var head2 = document.createElement('th');
  head2.innerText = 'Rank';
  var head3 = document.createElement('th');
  head3.innerText = 'Applications';
  header.appendChild(head2);
  header.appendChild(head3);
  table.appendChild(header);

  if (response.msg == 'successful') {
    for (var i = 0; i < applications.length; i++) {
      var row = document.createElement('tr');
      var col2 = document.createElement('td');
      col2.innerText = applications[i].rank;
      var col3 = document.createElement('td');
      col3.innerText = applications[i].count;
      row.appendChild(col2);
      row.appendChild(col3);
      table.appendChild(row);
    }
  }

  const response1 = await fetch('http://localhost:3000/employee/getDates', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  console.log(response1);
  dates = response1.dates;

  var table = document.getElementById('dates_table');
  table.innerHTML = '';
  var header = document.createElement('tr');
  var head1 = document.createElement('th');
  head1.innerText = 'Rank';
  var head2 = document.createElement('th');
  head2.innerText = 'Expected Joining date';
  var head3 = document.createElement('th');
  head3.innerText = 'Actual Joining date';
  header.appendChild(head1);
  header.appendChild(head2);
  header.appendChild(head3);
  table.appendChild(header);

  if (response1.msg == 'successful') {
    for (var i = 0; i < dates.length; i++) {
      var row = document.createElement('tr');
      var col1 = document.createElement('td');
      col1.innerText = dates[i].rank;
      var col2 = document.createElement('td');
      col2.innerText = dates[i].expected_date.substring(0, 10);
      var col3 = document.createElement('td');
      col3.innerText = dates[i].joining_date.substring(0, 10);
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      table.appendChild(row);
    }
  }

  const response2 = await fetch(
    'http://localhost:3000/employee/getRequestCount',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  console.log(response2);

  requests = response2.requests;
  var table = document.getElementById('count_table');
  table.innerHTML = '';
  var header = document.createElement('tr');
  var head2 = document.createElement('th');
  head2.innerText = 'Type of request';
  var head3 = document.createElement('th');
  head3.innerText = 'Count';
  header.appendChild(head2);
  header.appendChild(head3);
  table.appendChild(header);

  if (response2.msg == 'successful') {
    for (var i = 0; i < requests.length; i++) {
      var row = document.createElement('tr');
      var col2 = document.createElement('td');
      col2.innerText = requests[i].type;
      var col3 = document.createElement('td');
      col3.innerText = requests[i].count;
      row.appendChild(col2);
      row.appendChild(col3);
      table.appendChild(row);
    }
  }
}

// Anas Usman
// displays request contents
async function viewRequest() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('app_req_table');
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

// Anas Usman
// loades posted requests in drop down to add candidate
async function getpostedRequests() {
  const response = await fetch('http://localhost:3000/HR/getOpenPosts', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
  console.log(response);

  var dropdown = document.getElementById('vacancy');
  dropdown.innerHTML = null;
  req = response.requests;
  for (var i = 0; i < req.length; i++) {
    var op = document.createElement('option');
    op.value = req[i].req_id;
    op.innerHTML = req[i].rank;
    dropdown.appendChild(op);
  }
}

// Wasif Ibrahim
// displays candidates who applied for a job
async function ShortListCandidates() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');

  let post_id = localStorage.getItem('postID');

  const response = await fetch('http://localhost:3000/HR/shortListCandidates', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: post_id })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });

  console.log(response);

  req = response.requests;
  console.log(req);
  var table = document.getElementById('shortListCandidates');
  table.innerHTML = null;
  var header = document.createElement('tr');
  var head1 = document.createElement('th');
  head1.innerText = '#';
  var head2 = document.createElement('th');
  head2.innerText = 'Candidates';
  header.appendChild(head1);
  header.appendChild(head2);
  table.appendChild(header);

  if (response.msg == 'successful') {
    for (var i = 0; i < req.length; i++) {
      var row = document.createElement('tr');
      row.id = req[i].id;
      console.log(req[i].Full_Name);
      console.log(req[i].id);
      var col1 = document.createElement('td');
      col1.innerText = i + 1;
      var col2 = document.createElement('td');
      col2.innerText = req[i].Full_Name;
      var col3 = document.createElement('td');
      col3.appendChild(createButtonHR('View CV'));
      var col4 = document.createElement('td');
      col3.appendChild(createButtonHR('Shortlist'));
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
// shortlists a candidate
async function ShortList() {
  console.log('I am inside ShortList');

  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('shortListCandidates');
  post_id = table.rows[row].id;
  console.log(post_id);

  const response = await fetch('http://localhost:3000/HR/ShortList', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: post_id })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
  await ShortListCandidates();
  document.getElementById('message').innerHTML =
    'Candidate has been shortlisted';
  document.getElementById('message').classList.remove('hide');
  document.getElementById('message').classList.add('show');
  setTimeout(fade_out, 5000);
  console.log(response);
}

// Wasif Ibrahim
// filters candidates
async function filterCandidates() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');

  console.log('I am inside filterCandidates');

  let post_id = localStorage.getItem('postID');

  let cgpa = document.getElementById('cgpa').value;
  let experience = document.getElementById('experience').value;
  let university = document.getElementById('university').value;

  if (cgpa == '' && experience == '' && university == '') {
    ShortListCandidates();
  } else {
    console.log(university);

    const response = await fetch('http://localhost:3000/HR/filterCandidate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cgpa: cgpa,
        experience: experience,
        university: university,
        id: post_id
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data;
      });
    console.log(response);
    req = response.requests;
    console.log(req);
    var table = document.getElementById('shortListCandidates');
    table.innerHTML = null;
    var header = document.createElement('tr');
    var head1 = document.createElement('th');
    head1.innerText = '#';
    var head2 = document.createElement('th');
    head2.innerText = 'Candidates';
    header.appendChild(head1);
    header.appendChild(head2);
    table.appendChild(header);

    if (response.msg == 'successful') {
      for (var i = 0; i < req.length; i++) {
        var row = document.createElement('tr');
        row.id = req[i].id;
        console.log(req[i].Full_Name);
        console.log(req[i].id);
        var col1 = document.createElement('td');
        col1.innerText = i + 1;
        var col2 = document.createElement('td');
        col2.innerText = req[i].Full_Name;
        var col3 = document.createElement('td');
        col3.appendChild(createButtonHR('View'));
        var col4 = document.createElement('td');
        col3.appendChild(createButtonHR('Shortlist'));
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
}

// Anas Usman
// displays CV contents
async function viewCV() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('shortListCandidates');
  post_id = table.rows[row].id;
  console.log(post_id);
  const response = await fetch('http://localhost:3000/teamLead/viewCV', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: post_id })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
  if (response.msg == 'successful') {
    console.log(response.CV.data);
    var arrayBufferView = new Uint8Array(response.CV.data);
    var blob = new Blob([arrayBufferView], { type: 'application/pdf' });
    var url = URL.createObjectURL(blob);
    window.open(url, '', 'width=800,height=500');
  }
}
