const BASE = "http://localhost:5000";

async function addLead() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const company = document.getElementById("company").value;

  if (!name || !email) {
    alert("Name & Email required");
    return;
  }

  await fetch(BASE + "/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, company })
  });

  load();
}

async function load() {
  const res = await fetch(BASE + "/leads");
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(l => {
    const li = document.createElement("li");

    let statusClass = l.status.toLowerCase();

    li.innerHTML = `
      <b>${l.name}</b> - ${l.email}<br>
      📞 ${l.phone || "-"} | 🏢 ${l.company || "-"}<br>

      Status: <span class="${statusClass}">${l.status}</span><br>

      <select onchange="update(${l.id}, this.value)">
        <option ${l.status==="New"?"selected":""}>New</option>
        <option ${l.status==="Contacted"?"selected":""}>Contacted</option>
        <option ${l.status==="Closed"?"selected":""}>Closed</option>
      </select>

      <br><br>
      <button onclick="del(${l.id})">Delete</button>
    `;

    list.appendChild(li);
  });
}

async function del(id) {
  await fetch(BASE + "/delete/" + id, { method: "DELETE" });
  load();
}

async function update(id, status) {
  await fetch(BASE + "/update/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  load();
}

load();