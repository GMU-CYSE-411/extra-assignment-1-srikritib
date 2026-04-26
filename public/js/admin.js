(async function bootstrapAdmin() {
  try {
    const user = await loadCurrentUser();

    if (!user) {
      document.getElementById("admin-warning").textContent = "Please log in first.";
      return;
    }

    if (user.role !== "admin") {
      document.getElementById("admin-warning").textContent =
        "The client says this is not your area, but the page still tries to load admin data.";
    } else {
      document.getElementById("admin-warning").textContent = "Authenticated as admin.";
      const result = await api("/api/admin/users"); 
      //using textcontent to eliminate innerHTML vulns, for XSS or attack input being read as code issue
      const tar = document.getElementById("admin-users");
      tar.textContent = "";
      result.users.forEach((entry) => { //replace previous tr and td tags for document.createElement, textContent, and appendChild as td, tr show up as literal text with document function and html tags
        const row = document.createElement("tr");
        const idOpt = document.createElement("td");
        idOpt.textContent = entry.id;
        const username = document.createElement("td");
        username.textContent = entry.username;
        const role = document.createElement("td");
        role.textContent = entry.role;
        const displayname = document.createElement("td");
        displayname.textContent = entry.displayName;
        const notecount = document.createElement("td");
        notecount.textContent = entry.noteCount;

        row.appendChild(idOpt);
        row.appendChild(username);
        row.appendChild(role);
        row.appendChild(displayname);
        row.appendChild(notecount);

        tar.appendChild(row);
      });
    }
  } catch (error) {
    document.getElementById("admin-warning").textContent = error.message;
  }
})();
