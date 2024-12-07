let taskList = [];

const handleOnSubmit = (e) => {
  const newForm = new FormData(e);

  const task = newForm.get("task");
  const hour = newForm.get("hour");

  const obj = {
    task,
    hour,
  };

  taskList.push(obj);
  displayEntryList();
};

const displayEntryList = () => {
  let str = "";

  const entryElm = document.getElementById("entryList");

  taskList.map((item, i) => {
    str += `<tr>
                <td>${i + 1}</td>
                <td>${item.task}</td>
                <td>${item.hour}hr</td>
                <td class="text-end">
                  <button class="btn btn-danger">
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
