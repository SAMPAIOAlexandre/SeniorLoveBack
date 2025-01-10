async function deleteUser(userId) {
  if (confirm("Are you sure you want to delete this user?")) {
    const response = await fetch(`http://localhost:3000/admin/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.ok) {
      alert("User deleted successfully");
      window.location.reload();
    } else {
      alert("Failed to delete user");
    }
  }
}

async function deleteEvent(eventId) {
  if (confirm("Are you sure you want to delete this event?")) {
    const response = await fetch(`http://localhost:3000/admin/events/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.ok) {
      alert("Event deleted successfully");
      window.location.reload();
    } else {
      alert("Failed to delete event");
    }
  }
}

async function deleteAdmin(adminId) {
  if (confirm("Are you sure you want to delete this admin?")) {
    const response = await fetch(`http://localhost:3000/admin/admins/${adminId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.ok) {
      alert("Admin deleted successfully");
      window.location.reload();
    } else {
      alert("Failed to delete admin");
    }
  }
}

function filterUsers() {
  const input = document.getElementById("searchInput"); // Get the input field
  const filter = input.value.toLowerCase(); // Convert input to lowercase
  const table = document.getElementById("usersTable"); // Get the table
  const tr = table.getElementsByTagName("tr"); // Get the table rows

  for (let i = 1; i < tr.length; i++) { // Loop through all table rows
    const td = tr[i].getElementsByTagName("td"); // Get the table data
    let match = false; // Assume no match
    for (let j = 0; j < td.length; j++) { // Loop through all table data
      if (td[j]) { // If table data exists
        if (td[j].innerText.toLowerCase().indexOf(filter) > -1) { // If the input matches the table data
          match = true; // Set match to true
          break; // Break the loop
        }
      }
    }
    if (match) { // If there is a match
      tr[i].style.display = ""; // Show the table row
    } else { // If there is no match
      tr[i].style.display = "none"; // Hide the table row
    }
  }
}

function filterEvents() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase();
  const table = document.getElementById('eventsTable');
  const tr = table.getElementsByTagName('tr');

  for (let i = 1; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName('td');
    let match = false;
    for (let j = 0; j < td.length; j++) {
      if (td[j]) {
        if (td[j].innerText.toLowerCase().indexOf(filter) > -1) {
          match = true;
          break;
        }
      }
    }
    if (match) {
      tr[i].style.display = '';
    } else {
      tr[i].style.display = 'none';
    }
  }
}
