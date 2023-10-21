// Ajax Asyco
function loadTable() {
  const xhttp = new XMLHttpRequest();
  // xhttp.open("GET", "http://localhost/qr_asset_2/php/read.php");
  xhttp.open("GET", "https://www.melivecode.com/api/users");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = ""; //is String
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += `<tr>`;
        trHTML += `<td>` + object["id"] + `</td>`;
        trHTML +=
          `<td><img width="50px" src="` +
          object["avatar"] +
          `" class = "avatar"></td>`;
        trHTML += `<td>` + object["fname"] + `</td>`;
        trHTML += `<td>` + object["lname"] + `</td>`;
        trHTML += `<td>` + object["username"] + `</td>`;
        trHTML +=
          `<td><button type="button" onclick="showUserEditBox(` +
          object["id"] +
          `)" class="btn btn-secondary">Edit</button>`;
        trHTML += `<button type="button" class="btn btn-danger" onclick ="userDelete(` +
        object["id"] +
        `)">Del</button>`;
        trHTML += `</td>`;
        trHTML += `</tr>`;
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable();

function showUserCreatedBox() {
  // const { value: formValues } = await
  Swal.fire({
    title: "Multiple inputs",
    html:
      '<input id="fname" class="swal2-input" placeholder="First">' +
      '<input id="lname" class="swal2-input" placeholder="Last">' +
      '<input id="username" class="swal2-input" placeholder="Username">' +
      '<input id="email" class="swal2-input" placeholder="Email">',
    focusConfirm: false,
    preConfirm: () => {
      userCreate();
      //   return [
      //     document.getElementById("swal-input1").value,
      //     document.getElementById("swal-input2").value,
      //   ];
    },
  });
  //   if (formValues) {
  //     Swal.fire(JSON.stringify(formValues))
  //   }
}

function userCreate() {
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://www.melivecode.com/api/users/create");
  xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      "fname": fname,
      "lname": lname,
      "username": username,
      "email": email,
      "avatar": "https://www.melivecode.com/users/cat.png",
    })
  );
  
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      loadTable();
    }
  };
}

function showUserEditBox(id) {
  // read data API
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://www.melivecode.com/api/users/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      const user = objects["user"];
      Swal.fire({
        title: "Multiple inputs",
        html:
          '<input id="id" type="hidden" value="' +
          user["id"] +
          '">' +
          '<input id="fname" class="swal2-input" placeholder="First" value="' +
          user["fname"] +
          '">' +
          '<input id="lname" class="swal2-input" placeholder="Last" value="' +
          user["lname"] +
          '">' +
          '<input id="username" class="swal2-input" placeholder="Username" value="' +
          user["username"] +
          '">' +
          '<input id="email" class="swal2-input" placeholder="Email" value="' +
          user["email"] +
          '">',
        focusConfirm: false,
        preConfirm: () => {
          userEdit();
        },
      });
    }
  };
}

function userEdit() {
  const id = document.getElementById("id").value;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "https://www.melivecode.com/api/users/update");
  xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      "id": id,
      "fname": fname,
      "lname": lname,
      "username": username,
      "email": email,
      "avatar": "https://www.melivecode.com/users/cat.png",
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      loadTable();
    }
  };
}

function userDelete(id){
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "https://www.melivecode.com/api/users/delete");
  xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      "id": id
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      loadTable();
    }
  };
}
