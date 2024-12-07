const handleOnSubmit = (e) => {
  const newForm = new FormData(e);

  const goal = newForm.get("goal");
  const hour = newForm.get("hour");
  console.log(goal, hour);
};
