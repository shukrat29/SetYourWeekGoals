let taskList = [];

const handleOnSubmit = (e) => {
  const newForm = new FormData(e);

  const task = newForm.get("task");
  const hour = newForm.get("hour");

  const obj = {
    task,
    hour,
    id: randomIdGenerator(),
  };

  taskList.push(obj);
  displayEntryList();
};

const displayEntryList = () => {
  console.log(taskList);
  let str = "";

  const entryElm = document.getElementById("entryList");

  taskList.map((item, i) => {
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
                  <button class="btn btn-success">
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </td>
              </tr>`;
  });

  entryElm.innerHTML = str;
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
};
