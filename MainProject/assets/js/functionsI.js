var span = document.getElementsByClassName('close')[0];
var modal1 = document.getElementById('provide_evaluation_modal');

// Anas Usman
// hides popup
span.onclick = function() {
  document.getElementById('error').classList.remove('show');
  document.getElementById('error').classList.add('hide');
  modal1.style.display = 'none';
};

// Anas Usman
// hides popup
window.onclick = function(event) {
  if (event.target == modal1) {
    document.getElementById('error').classList.remove('show');
    document.getElementById('error').classList.add('hide');
    modal1.style.display = 'none';
  }
};

// Anas Usman
// hides message
var fade_out = function() {
  document.getElementById('message').classList.remove('show');
  document.getElementById('message').classList.add('hide');
};

// Anas Usman
// displays interviews
async function getInterviewTiming() {
  var emp_id = localStorage.getItem('id');
  const response = await fetch(
    'http://localhost:3000/interviewer/getInterviewTiming',
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

  interviews = response.interviews;
  var table = document.getElementById('interview_table');
  table.innerHTML = null;
  var header = document.createElement('tr');
  var head1 = document.createElement('th');
  head1.innerText = '#';
  var head2 = document.createElement('th');
  head2.innerText = 'Date';
  var head3 = document.createElement('th');
  head3.innerText = 'Time';
  var head4 = document.createElement('th');
  head4.innerText = 'Candidate';
  header.appendChild(head1);
  header.appendChild(head2);
  header.appendChild(head3);
  header.appendChild(head4);
  table.appendChild(header);

  if (response.msg == 'successful') {
    for (var i = 0; i < interviews.length; i++) {
      var row = document.createElement('tr');
      row.id = interviews[i].id;
      var col1 = document.createElement('td');
      col1.innerText = i + 1;
      var col2 = document.createElement('td');
      col2.innerText = interviews[i].date.substring(0, 10);
      var col3 = document.createElement('td');
      col3.innerText = interviews[i].time;
      var col4 = document.createElement('td');
      col4.innerText = interviews[i].candidate;
      var col5 = document.createElement('td');
      var button = document.createElement('button');
      button.innerHTML = 'Provide Evaluation';
      button.className = 'btn btn-primary mr-4 pull-right';
      button.type = 'button';
      button.onclick = provideEvaluation;
      col5.appendChild(button);
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      row.appendChild(col5);
      table.appendChild(row);
    }
  } else {
    document.getElementById('alert').classList.remove('hide');
    document.getElementById('alert').classList.add('show');
  }
}

// Anas Usman
// selects a candidate and provides evaluation
async function selectCandidate() {
  var int_id = localStorage.getItem('int_id');
  eval1 = document.getElementById('eval1').value;
  eval2 = document.getElementById('eval2').value;
  eval3 = document.getElementById('eval3').value;
  eval4 = document.getElementById('eval4').value;
  eval5 = document.getElementById('eval5').value;
  eval6 = document.getElementById('eval6').value;
  eval7 = document.getElementById('eval7').value;
  eval8 = document.getElementById('eval8').value;

  if (
    eval1 == '' ||
    eval2 == '' ||
    eval3 == '' ||
    eval4 == '' ||
    eval5 == '' ||
    eval6 == '' ||
    eval7 == '' ||
    eval8 == ''
  ) {
    document.getElementById('error').classList.remove('hide');
    document.getElementById('error').classList.add('show');
  } else {
    const response = await fetch(
      'http://localhost:3000/interviewer/provideEvaluation',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: int_id,
          status: 'selected',
          eval1: document.getElementById('eval1').value,
          eval2: document.getElementById('eval2').value,
          eval3: document.getElementById('eval3').value,
          eval4: document.getElementById('eval4').value,
          eval5: document.getElementById('eval5').value,
          eval6: document.getElementById('eval6').value,
          eval7: document.getElementById('eval7').value,
          eval8: document.getElementById('eval8').value
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
    document.getElementById('error').classList.remove('show');
    document.getElementById('error').classList.add('hide');
    modal1.style.display = 'none';
    getInterviewTiming();
    document.getElementById('message').innerHTML = 'Candiate has been selected';
    document.getElementById('message').classList.remove('hide');
    document.getElementById('message').classList.add('show');
    setTimeout(fade_out, 5000);
  }
}

// Anas Usman
// rejects a candidate and provides evaluation
async function rejectCandidate() {
  var int_id = localStorage.getItem('int_id');
  eval1 = document.getElementById('eval1').value;
  eval2 = document.getElementById('eval2').value;
  eval3 = document.getElementById('eval3').value;
  eval4 = document.getElementById('eval4').value;
  eval5 = document.getElementById('eval5').value;
  eval6 = document.getElementById('eval6').value;
  eval7 = document.getElementById('eval7').value;
  eval8 = document.getElementById('eval8').value;

  if (
    eval1 == '' ||
    eval2 == '' ||
    eval3 == '' ||
    eval4 == '' ||
    eval5 == '' ||
    eval6 == '' ||
    eval7 == '' ||
    eval8 == ''
  ) {
    document.getElementById('error').classList.remove('hide');
    document.getElementById('error').classList.add('show');
  } else {
    const response = await fetch(
      'http://localhost:3000/interviewer/provideEvaluation',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: int_id,
          status: 'rejected',
          eval1: document.getElementById('eval1').value,
          eval2: document.getElementById('eval2').value,
          eval3: document.getElementById('eval3').value,
          eval4: document.getElementById('eval4').value,
          eval5: document.getElementById('eval5').value,
          eval6: document.getElementById('eval6').value,
          eval7: document.getElementById('eval7').value,
          eval8: document.getElementById('eval8').value
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
    document.getElementById('error').classList.remove('show');
    document.getElementById('error').classList.add('hide');
    modal1.style.display = 'none';
    getInterviewTiming();
    document.getElementById('message').innerHTML =
      'Candidate has been rejected';
    document.getElementById('message').classList.remove('hide');
    document.getElementById('message').classList.add('show');
    setTimeout(fade_out, 5000);
  }
}

// Anas Usman
// shows popup to provide evaluation
async function provideEvaluation() {
  row = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById('interview_table');
  int_id = table.rows[row].id;
  localStorage.setItem('int_id', int_id);
  modal1.style.display = 'block';
}
