let taskList = [];

const totalHrsPerWeek = 24 * 7;

const handleOnSubmit = (e) => {
  const newForm = new FormData(e);

  const task = newForm.get("task");
  const hour = +newForm.get("hour");

  const obj = {
    task,
    hour,
    id: randomIdGenerator(),
    type: "entry",
  };

  // check if there is enough hours left
  const existingTotalHours = totalAllocatedHours();
  if (existingTotalHours + hour > totalHrsPerWeek) {
    return alert("Sorry no hour left");
  }

  taskList.push(obj);
  displayEntryList();
};

// display task
const displayEntryList = () => {
  console.log(taskList);
  let str = "";

  const entryElm = document.getElementById("entryList");

  // filtering entryList keeping task in the list which type is entry.
  const entryList = taskList.filter((item) => item.type === "entry");
  entryList.map((item, i) => {
    str += `<tr>
                <td>${i + 1}</td>
                <td>${item.task}</td>
                <td>${item.hour}hr</td>
                <td class="text-end">
                  <button onclick="handleDelete('${
                    item.id
                  }')" class="btn btn-danger">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  <button onclick="switchTask('${
                    item.id
                  }', 'bad')" class="btn btn-success">
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </td>
              </tr>`;
  });

  entryElm.innerHTML = str;
  totalAllocatedHours();
};

const displayBadList = () => {
  console.log(taskList);
  let str = "";

  const badElm = document.getElementById("badList");

  // filtering entryList keeping task in the list which type is entry.
  const badList = taskList.filter((item) => item.type === "bad");
  badList.map((item, i) => {
    str += `<tr>
                <td>${i + 1}</td>
                <td>${item.task}</td>
                <td>${item.hour}hr</td>
                <td class="text-end">
                  
                  <button onclick="switchTask('${
                    item.id
                  }', 'entry')" class="btn btn-warning">
                    <i class="fa-solid fa-arrow-left"></i>
                  </button>
                  <button onclick="handleDelete('${
                    item.id
                  }')" class="btn btn-danger">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>`;
  });

  badElm.innerHTML = str;
  document.getElementById("totalSavedHoursElm").innerText = badList.reduce(
    (acc, item) => acc + item.hour,
    0
  );
};

const randomIdGenerator = (length = 6) => {
  const str = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890";

  let id = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);
    id += str[randomIndex];
  }
  return id;
};

// Delete task
const handleDelete = (id) => {
  console.log(id);
  taskList = taskList.filter((item) => item.id != id);
  displayEntryList();
  displayBadList();
};

// switching task left to right and viceversa
const switchTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = type;
    }
    return item;
  });
  displayEntryList();
  displayBadList();
};

// calculatig total hours
const totalAllocatedHours = () => {
  const totalHrs = taskList.reduce((acc, item) => {
    return acc + item.hour;
  }, 0);

  document.getElementById("ttlHrs").innerText = totalHrs;
  return totalHrs;
};

// calculating
