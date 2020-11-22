var modal1 = document.getElementById('generate_request_Modal');
var modal2 = document.getElementById('modify_request_Modal');
var modal3 = document.getElementById('view_request_Modal');
var btn1 = document.getElementById('generate_request_popup');
var btn2 = document.getElementsByClassName('modify_request_popup');
var span = document.getElementsByClassName('close');

// Anas Usman
// hides popup
span[0].onclick = function() {
  modal1.style.display = 'none';
};

// hides popup
span[2].onclick = function() {
  modal2.style.display = 'none';
};

// hides popup
span[1].onclick = function() {
  modal3.style.display = 'none';
};

// hides popup
async function closeRequestView() {
  modal3.style.display = 'none';
}

// hides popup
async function btn_No() {
  document.getElementById('clarification').style.display = 'none';
}

// hides popups
window.onclick = function(event) {
  if (
    event.target == modal1 ||
    event.target == modal2 ||
    event.target == modal3
  ) {
    modal1.style.display = 'none';
    modal2.style.display = 'none';
    modal3.style.display = 'none';
  }
};

// hides message
var fade_out = function() {
  document.getElementById('message').classList.remove('show');
  document.getElementById('message').classList.add('hide');
};

// displays popup
async function removeRequestbtn() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('req_table');
  req_id = table.rows[row].id;
  localStorage.setItem('req_id', req_id);
  document.getElementById('clarification').style.display = 'block';
  document.getElementById('btn_yes').onclick = removeRequest;
}

// displays popup
async function rejectCandidatebtn() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('shortlist_table_TL');
  post_id = table.rows[row].id;
  localStorage.setItem('post_id', post_id);
  document.getElementById('clarification').style.display = 'block';
  document.getElementById('btn_yes').onclick = rejectCandidate;
}

// Anas Usman
// displays error
function loginResponse() {
  document.getElementById('error').classList.remove('hide');
  document.getElementById('error').classList.add('show');
}

// Anas Usman
// loads departments in the dropdown
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
// loads departments in the dropdown contents of request
async function btnModifyRequest() {
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
  var table = document.getElementById('req_table');
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
  modal2.style.display = 'block';
  var req = response1.req[0];
  document.getElementById('depTLM').value = req.Dept_no;
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
// signs in an employee
async function employeeSignin() {
  var email = document.getElementById('email').value;
  var pass = document.getElementById('password').value;
  const response = await fetch('http://localhost:3000/employee/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: pass })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
  console.log(response);

  if (response.type == 'invalid') {
    loginResponse();
  } else if (response.type == 'Team Lead') {
    localStorage.setItem('id', response.id);
    document.location = 'Team-Lead.html';
  } else if (response.type == 'Management') {
    localStorage.setItem('id', response.id);
    document.location = 'Management.html';
  } else if (response.type == 'HR') {
    localStorage.setItem('id', response.id);
    document.location = 'HR.html';
  } else if (response.type == 'Interviewer') {
    localStorage.setItem('id', response.id);
    document.location = 'Interviewer.html';
  }
}

// Anas Usman
// displays unapproved requests
async function GetRequests() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');
  document.getElementById('alert2').classList.remove('show');
  document.getElementById('alert2').classList.add('hide');
  document.getElementById('alert3').classList.remove('show');
  document.getElementById('alert3').classList.add('hide');

  var emp_id = localStorage.getItem('id');
  const response = await fetch('http://localhost:3000/teamLead/getRequests', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: emp_id })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
  console.log(response);

  req = response.requests;
  var table = document.getElementById('req_table');
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
      col4.appendChild(createButton('Modify'));
      var col5 = document.createElement('td');
      col5.appendChild(createButton('Remove'));
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      row.appendChild(col5);
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
  button.style = 'width: 120px;';
  button.type = 'button';
  if (text == 'Remove') {
    button.onclick = removeRequestbtn;
    button.className = 'btn btn-primary mr-4 pull-right';
  } else if (text == 'View') {
    button.onclick = viewRequest;
    button.className = 'view_request_popup btn btn-primary mr-4 pull-right';
  } else if (text == 'Modify') {
    button.onclick = btnModifyRequest;
    button.className = 'modify_request_popup btn btn-primary mr-4 pull-right';
  }
  return button;
}

// Anas Usman
// removes request
async function removeRequest() {
  document.getElementById('clarification').style.display = 'none';

  post_id = localStorage.getItem('req_id');
  console.log(req_id);
  const response = await fetch('http://localhost:3000/teamLead/removeRequest', {
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
  await GetRequests();
  document.getElementById('message').innerHTML = 'Request has been removed';
  document.getElementById('message').classList.remove('hide');
  document.getElementById('message').classList.add('show');
  setTimeout(fade_out, 5000);
  console.log(response);
}

// Anas Usman
// displays contents of request
async function viewRequest() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('req_table');
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
// adds a new request
async function addRequest() {
  var emp_id = localStorage.getItem('id');
  var dep = document.getElementById('depTL').value;
  var dom = document.getElementById('domTL').value;
  var sub = document.getElementById('subTL').value;
  var exp = document.getElementById('expTL').value;
  var vac = document.getElementById('vacTL').value;
  var pos = document.getElementById('posTL').value;
  var ejd = document.getElementById('ejdTL').value;
  var des = document.getElementById('desTL').value;
  if (dom == '' || sub == '' || pos == '' || ejd == '' || des == '') {
    document.getElementById('error1').classList.remove('hide');
    document.getElementById('error1').classList.add('show');
  } else {
    console.log(ejd);
    const response = await fetch('http://localhost:3000/teamLead/addRequest', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Dept_no: dep,
        Domain: dom,
        Sub_Domain: sub,
        Experience: exp,
        Vacancies: vac,
        Job_Position: pos,
        Expected_Joining_Date: ejd,
        Description: des,
        emp_ID: emp_id
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data;
      });
    console.log(response);
    var modal = document.getElementById('generate_request_Modal');
    document.getElementById('error1').classList.remove('show');
    document.getElementById('error1').classList.add('hide');
    modal.style.display = 'none';
    document.getElementById('message').innerHTML = 'Request has been generated';
    document.getElementById('message').classList.remove('hide');
    document.getElementById('message').classList.add('show');
    setTimeout(fade_out, 5000);
  }
}

// Anas Usman
// modifies a request
async function modifyRequest() {
  req_id = localStorage.getItem('req_id');
  var emp_id = localStorage.getItem('id');
  var dep = document.getElementById('depTLM').value;
  var dom = document.getElementById('domTLM').value;
  var sub = document.getElementById('subTLM').value;
  var exp = document.getElementById('expTLM').value;
  var vac = document.getElementById('vacTLM').value;
  var pos = document.getElementById('posTLM').value;
  var ejd = document.getElementById('ejdTLM').value;
  var des = document.getElementById('desTLM').value;
  if (dom == '' || sub == '' || pos == '' || ejd == '' || des == '') {
    document.getElementById('error2').classList.remove('hide');
    document.getElementById('error2').classList.add('show');
  } else {
    console.log(req_id);
    const response = await fetch(
      'http://localhost:3000/teamLead/modifyRequest',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Req_ID: req_id,
          Dept_no: dep,
          Domain: dom,
          Sub_Domain: sub,
          Experience: exp,
          Vacancies: vac,
          Job_Position: pos,
          Expected_Joining_Date: ejd,
          Description: des
        })
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data;
      });
    console.log(response);
    document.getElementById('error2').classList.remove('show');
    document.getElementById('error2').classList.add('hide');
    var modal = document.getElementById('modify_request_Modal');
    modal.style.display = 'none';
    document.getElementById('message').innerHTML = 'Request has been modified';
    document.getElementById('message').classList.remove('hide');
    document.getElementById('message').classList.add('show');
    setTimeout(fade_out, 5000);
  }
}

// Anas Usman
// displays notifications
async function getModificationRequests() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');
  document.getElementById('alert2').classList.remove('show');
  document.getElementById('alert2').classList.add('hide');
  document.getElementById('alert3').classList.remove('show');
  document.getElementById('alert3').classList.add('hide');

  var emp_id = localStorage.getItem('id');
  const response = await fetch(
    'http://localhost:3000/teamLead/getModificationRequests',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: emp_id })
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
      button.onclick = removeNotification;
      col3.appendChild(button);
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      table.appendChild(row);
    }
  } else {
    document.getElementById('alert3').classList.remove('hide');
    document.getElementById('alert3').classList.add('show');
  }
}

// Anas Usman
// removes notifications
async function removeNotification() {
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
  await getModificationRequests();
  console.log(response);
}

// Anas Usman
// displays shortlisted candidates
async function getShortlistedCandidates() {
  document.getElementById('alert1').classList.remove('show');
  document.getElementById('alert1').classList.add('hide');
  document.getElementById('alert2').classList.remove('show');
  document.getElementById('alert2').classList.add('hide');
  document.getElementById('alert3').classList.remove('show');
  document.getElementById('alert3').classList.add('hide');

  const response = await fetch(
    'http://localhost:3000/teamLead/getShortlistedCandidates',
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
  var table = document.getElementById('shortlist_table_TL');
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
      col4.appendChild(createButtonTL('View'));
      var col5 = document.createElement('td');
      col5.appendChild(createButtonTL('Approve'));
      var col6 = document.createElement('td');
      col6.appendChild(createButtonTL('Reject'));
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

// Anas Usman
// creates buttons
function createButtonTL(text) {
  var button = document.createElement('button');
  button.innerHTML = text;
  button.style = 'width: 120px;';
  button.className = 'btn btn-primary mr-4 pull-right';
  button.type = 'button';
  if (text == 'View') {
    button.onclick = viewCV;
  } else if (text == 'Approve') {
    button.onclick = approveCandidate;
  } else if (text == 'Reject') {
    button.onclick = rejectCandidatebtn;
  }
  return button;
}

// Anas Usman
// approves a candidate
async function approveCandidate() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('shortlist_table_TL');
  post_id = table.rows[row].id;
  console.log(post_id);
  const response = await fetch(
    'http://localhost:3000/teamLead/approveCandidate',
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
  await getShortlistedCandidates();
  document.getElementById('message').innerHTML = 'Candidate has been approved';
  document.getElementById('message').classList.remove('hide');
  document.getElementById('message').classList.add('show');
  setTimeout(fade_out, 5000);
  console.log(response);
}

// Anas Usman
// rejects a candidate
async function rejectCandidate() {
  document.getElementById('clarification').style.display = 'none';

  post_id = localStorage.getItem('post_id');
  console.log(post_id);
  const response = await fetch(
    'http://localhost:3000/teamLead/rejectCandidate',
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
  getShortlistedCandidates();
  document.getElementById('message').innerHTML = 'Candidate has been rejected';
  document.getElementById('message').classList.remove('hide');
  document.getElementById('message').classList.add('show');
  setTimeout(fade_out, 5000);
  console.log(response);
}

// Anas Usman
// displays CV
async function viewCV() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('shortlist_table_TL');
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
  console.log(response.CV.data);
  var arrayBufferView = new Uint8Array(response.CV.data);
  var blob = new Blob([arrayBufferView], { type: 'application/pdf' });
  var url = URL.createObjectURL(blob);
  window.open(url, '', 'width=800,height=500');
}
