var modal1 = document.getElementById('generate_request_Modal');
var modal2 = document.getElementById('view_request_Modal');
var modal3 = document.getElementById('modify_request_Modal');
var modal4 = document.getElementById('request_modification_Modal');
var modal5 = document.getElementById('evaluation_modal');
var modal6 = document.getElementById('report_Modal');
var btn1 = document.getElementById('generate_request_popup');
var btn2 = document.getElementsByClassName('modify_request_popup');
var span = document.getElementsByClassName('close');

// Anas Usman
// hides popup
async function closeRequestView() {
  modal2.style.display = 'none';
}

// hides popup
async function closeEvaluationView() {
  modal5.style.display = 'none';
}

// hides popup
async function closeReportView() {
  modal6.style.display = 'none';
}

// hides popup
span[0].onclick = function() {
  document.getElementById('error1').classList.remove('show');
  document.getElementById('error1').classList.add('hide');
  modal1.style.display = 'none';
};

// hides popup
span[1].onclick = function() {
  modal2.style.display = 'none';
};

// hides popup
span[2].onclick = function() {
  document.getElementById('error2').classList.remove('show');
  document.getElementById('error2').classList.add('hide');
  modal3.style.display = 'none';
};

// hides popup
span[3].onclick = function() {
  document.getElementById('error3').classList.remove('show');
  document.getElementById('error3').classList.add('hide');
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

// displays popup
async function requestmodificationpopup() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('req_table_M');
  req_id = table.rows[row].id;
  localStorage.setItem('req_id', req_id);
  document.getElementById('request_modification_Modal').style.display = 'block';
}

// displays popup
async function rejectRequestbtn() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('req_table_M');
  req_id = table.rows[row].id;
  localStorage.setItem('req_id', req_id);
  document.getElementById('clarification').style.display = 'block';
  document.getElementById('btn_yes').onclick = rejectRequest;
}

async function rejectCandidateMbtn() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('selected_table');
  post_id = table.rows[row].id;
  localStorage.setItem('post_id', post_id);
  document.getElementById('clarification').style.display = 'block';
  document.getElementById('btn_yes').onclick = rejectCandidateM;
}

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
  }
};

// hides messages
var fade_out = function() {
  document.getElementById('message').classList.remove('show');
  document.getElementById('message').classList.add('hide');
};

// Anas Usman
// loads departments in dropdown
btn1.onclick = async function() {
  const response = await fetch(
    'http://localhost:3000/employee/getDepartments',
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
  dep = response.dep;
  console.log(response);
  modal1.style.display = 'block';
  var dropdown = document.getElementById('depTL');
  dropdown.innerHTML = null;
  for (var i = 0; i < dep.length; i++) {
    var op = document.createElement('option');
    op.value = dep[i].id;
    op.innerHTML = dep[i].name;
    dropdown.appendChild(op);
  }
};

// Anas Usman
// loads previous fields of the request
async function btnM_ModifyRequest() {
  const response = await fetch(
    'http://localhost:3000/employee/getDepartments',
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
  dep = response.dep;
  console.log(response);
  var dropdown = document.getElementById('depTLM');
  dropdown.innerHTML = null;
  for (var i = 0; i < dep.length; i++) {
    var op = document.createElement('option');
    op.value = dep[i].id;
    op.innerHTML = dep[i].name;
    dropdown.appendChild(op);
  }

  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('req_table_M');
  req_id = table.rows[row].id;
  localStorage.setItem('req_id', req_id);
  console.log(req_id);
  const response1 = await fetch('http://localhost:3000/teamLead/viewRequest', {
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
  console.log(response1);
  modal3.style.display = 'block';
  var req = response1.req[0];
  document.getElementById('depTLM').value = req.dept_ID;
  document.getElementById('domTLM').value = req.Domain;
  document.getElementById('subTLM').value = req.Sub_Domain;
  document.getElementById('expTLM').value = req.Experience;
  document.getElementById('vacTLM').value = req.Vacancies;
  document.getElementById('posTLM').value = req.Job_Position;
  document.getElementById('ejdTLM').value = req.Expected_Joining_Date.substring(
    0,
    10
  );
  document.getElementById('desTLM').value = req.Description;
}

// Anas Usman
// displays unapproved requests
async function getUnapprovedRequests() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');
  document.getElementById('alert2').classList.remove('show');
  document.getElementById('alert2').classList.add('hide');
  document.getElementById('alert3').classList.remove('show');
  document.getElementById('alert3').classList.add('hide');
  document.getElementById('alert4').classList.remove('show');
  document.getElementById('alert4').classList.add('hide');

  const response = await fetch(
    'http://localhost:3000/management/getUnapprovedRequests',
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
      return data;
    });
  console.log(response);

  req = response.requests;
  var table = document.getElementById('req_table_M');
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
      col3.appendChild(createButton('View'));
      var col4 = document.createElement('td');
      col4.appendChild(createButton('Approve'));
      var col5 = document.createElement('td');
      col5.appendChild(createButton('Reject'));
      var col6 = document.createElement('td');
      col6.appendChild(createButton('Modify'));
      var col7 = document.createElement('td');
      col7.appendChild(createButton('Request Modification'));
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      row.appendChild(col5);
      row.appendChild(col6);
      row.appendChild(col7);
      table.appendChild(row);
    }
  } else {
    document.getElementById('alert1').classList.remove('hide');
    document.getElementById('alert1').classList.add('show');
  }
}

// Anas Usman
// creates buttons
function createButton(text) {
  var button = document.createElement('button');
  button.innerHTML = text;
  button.type = 'button';
  if (text == 'Approve') {
    button.onclick = approveRequest;
    button.className = 'btn btn-primary pull-right';
  } else if (text == 'Reject') {
    button.onclick = rejectRequestbtn;
    button.className = 'btn btn-primary pull-right';
  } else if (text == 'View') {
    button.onclick = viewRequest;
    button.className = 'view_request_popup btn btn-primary pull-right';
  } else if (text == 'Modify') {
    button.onclick = btnM_ModifyRequest;
    button.className = 'modify_request_popup btn btn-primary pull-right';
  } else if (text == 'Request Modification') {
    button.onclick = requestmodificationpopup;
    button.className = 'btn btn-primary pull-right';
  }
  return button;
}

// Anas Usman
// displays contents of a request
async function viewRequest() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('req_table_M');
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
// rejects a request
async function rejectRequest() {
  document.getElementById('clarification').style.display = 'none';

  req_id = localStorage.getItem('req_id');
  console.log(req_id);
  const response = await fetch(
    'http://localhost:3000/management/rejectRequest',
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
      return data;
    });
  await getUnapprovedRequests();
  document.getElementById('message').innerHTML = 'Request has been rejected';
  document.getElementById('message').classList.remove('hide');
  document.getElementById('message').classList.add('show');
  setTimeout(fade_out, 5000);
  console.log(response);
}

// Anas Usman
// approves a request
async function approveRequest() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('req_table_M');
  req_id = table.rows[row].id;
  console.log(req_id);
  const response = await fetch(
    'http://localhost:3000/management/approveRequest',
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
      return data;
    });
  await getUnapprovedRequests();
  document.getElementById('message').innerHTML = 'Request has been approved';
  document.getElementById('message').classList.remove('hide');
  document.getElementById('message').classList.add('show');
  setTimeout(fade_out, 5000);
  console.log(response);
}

// Anas Usman
// sends a notification to teamlead for modification
async function requestModification() {
  var req_id = localStorage.getItem('req_id');
  var detail = document.getElementById('req_mod').value;
  var emp_id = localStorage.getItem('id');

  if (detail == '') {
    document.getElementById('error3').classList.remove('hide');
    document.getElementById('error3').classList.add('show');
  } else {
    console.log(detail);
    const response = await fetch(
      'http://localhost:3000/management/requestModification',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emp_id: emp_id,
          req_id: req_id,
          detail: detail
        })
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data;
      });
    document.getElementById('error3').classList.remove('show');
    document.getElementById('error3').classList.add('hide');
    document.getElementById('request_modification_Modal').style.display =
      'none';
    document.getElementById('message').innerHTML =
      'Modification request has been sent';
    document.getElementById('message').classList.remove('hide');
    document.getElementById('message').classList.add('show');
    setTimeout(fade_out, 5000);
    console.log(response);
  }
}

// Anas Usman
// displayes candidates selected by Interviewer
async function getSelectedCandidates() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');
  document.getElementById('alert2').classList.remove('show');
  document.getElementById('alert2').classList.add('hide');
  document.getElementById('alert3').classList.remove('show');
  document.getElementById('alert3').classList.add('hide');
  document.getElementById('alert4').classList.remove('show');
  document.getElementById('alert4').classList.add('hide');
  const response = await fetch(
    'http://localhost:3000/management/getSelectedCandidates',
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
      return data;
    });
  console.log(response);

  can = response.candidates;
  var table = document.getElementById('selected_table');
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
    for (var i = 0; i < can.length; i++) {
      var row = document.createElement('tr');
      row.id = can[i].post_id;
      var col1 = document.createElement('td');
      col1.innerText = i + 1;
      var col2 = document.createElement('td');
      col2.innerText = can[i].rank;
      var col3 = document.createElement('td');
      col3.innerText = can[i].name;

      var col4 = document.createElement('td');
      col4.appendChild(createButtonM('View'));
      var col5 = document.createElement('td');
      col5.appendChild(createButtonM('Choose'));
      var col6 = document.createElement('td');
      col6.appendChild(createButtonM('Reject'));
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      row.appendChild(col5);
      row.appendChild(col6);
      table.appendChild(row);
    }
  } else {
    document.getElementById('alert3').classList.remove('hide');
    document.getElementById('alert3').classList.add('show');
  }
}

// Anas Usman
// creates buttons
function createButtonM(text) {
  var button = document.createElement('button');
  button.innerHTML = text;
  button.style = 'width: 120px;';
  button.className = 'btn btn-primary pull-right';
  button.type = 'button';
  if (text == 'View') {
    button.onclick = viewEvaluation;
  } else if (text == 'Choose') {
    button.onclick = chooseCandidate;
  } else if (text == 'Reject') {
    button.onclick = rejectCandidateMbtn;
  }
  return button;
}

// Anas Usman
// choses candidate for a job position
async function chooseCandidate() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('selected_table');
  post_id = table.rows[row].id;
  console.log(post_id);
  const response = await fetch(
    'http://localhost:3000/management/chooseCandidate',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: post_id })
    }
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
  await getSelectedCandidates();
  document.getElementById('message').innerHTML = 'Candidate has been chosen';
  document.getElementById('message').classList.remove('hide');
  document.getElementById('message').classList.add('show');
  setTimeout(fade_out, 5000);
  console.log(response);
}

// Anas Usman
// rejects candidate
async function rejectCandidateM() {
  document.getElementById('clarification').style.display = 'none';

  post_id = localStorage.getItem('post_id');
  console.log(post_id);
  const response = await fetch(
    'http://localhost:3000/management/rejectCandidate',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: post_id })
    }
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
  await getSelectedCandidates();
  document.getElementById('message').innerHTML = 'Candidate has been rejected';
  document.getElementById('message').classList.remove('hide');
  document.getElementById('message').classList.add('show');
  setTimeout(fade_out, 5000);
  console.log(response);
}

// Anas Usman
// displays evaluation
async function viewEvaluation() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('selected_table');
  post_id = table.rows[row].id;

  console.log(post_id);
  const response = await fetch(
    'http://localhost:3000/management/viewEvaluation',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: post_id })
    }
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
  console.log(response);

  document.getElementById('evaluation_modal').style.display = 'block';
  var eval = response.evaluation[0];
  document.getElementById('eval1').value = eval.educational_background;
  document.getElementById('eval2').value = eval.Past_work_experience;
  document.getElementById('eval3').value = eval.technical_qualification;
  document.getElementById('eval4').value = eval.Leadership_ability;
  document.getElementById('eval5').value = eval.customer_service_skills;
  document.getElementById('eval6').value = eval.communication_skills;
  document.getElementById('eval7').value = eval.candidate_enthusiasm;
  document.getElementById('eval8').value = eval.comments;
}

// Anas Usman
// displays notifications from chosen candidates
async function getChosenCandidates() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');
  document.getElementById('alert2').classList.remove('show');
  document.getElementById('alert2').classList.add('hide');
  document.getElementById('alert3').classList.remove('show');
  document.getElementById('alert3').classList.add('hide');
  document.getElementById('alert4').classList.remove('show');
  document.getElementById('alert4').classList.add('hide');

  var emp_id = localStorage.getItem('id');
  const response = await fetch(
    'http://localhost:3000/management/getChosenCandidates',
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
      return data;
    });
  console.log(response);

  not = response.notifications;
  var table = document.getElementById('req_mod_table');
  table.innerHTML = null;
  var header = document.createElement('tr');
  var head1 = document.createElement('th');
  head1.innerText = '#';
  var head2 = document.createElement('th');
  head2.innerText = 'Notification';
  header.appendChild(head1);
  header.appendChild(head2);
  table.appendChild(header);

  if (response.msg == 'successful') {
    for (var i = 0; i < not.length; i++) {
      var row = document.createElement('tr');
      row.id = not[i].id;
      var col1 = document.createElement('td');
      col1.innerText = i + 1;
      var col2 = document.createElement('td');
      col2.innerText = not[i].detail;
      var col3 = document.createElement('td');
      var button = document.createElement('button');
      button.innerHTML = 'Remove';
      button.style = 'width: 120px;';
      button.className = 'btn btn-primary mr-4 pull-right';
      button.type = 'button';
      button.onclick = removeNotificationM;
      col3.appendChild(button);
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      table.appendChild(row);
    }
  } else {
    document.getElementById('alert4').classList.remove('hide');
    document.getElementById('alert4').classList.add('show');
  }
}

// Anas Usman
// removes notification
async function removeNotificationM() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('req_mod_table');
  not_id = table.rows[row].id;
  console.log(not_id);
  const response = await fetch(
    'http://localhost:3000/teamLead/removeNotification',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: not_id })
    }
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
  await getChosenCandidates();
  console.log(response);
}

// Anas Usman
// displays reports
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
