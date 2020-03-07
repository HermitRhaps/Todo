class Operation {
  constructor() {
    this.table = document.querySelector(".content");
    this.add_operations = document.querySelectorAll(".add");
    this.modal = document.querySelector(".modal");
    this.tasks = [
      {
        title: "Buy some milk",
        body: "mother say me buy milk in shop",
        priority: "trialny",
        type: "current"
      }
    ];
  }
  type(type, i) {
    switch (type) {
      case "current":
        this.type_op =
          "<td><button data-id=" +
          i +
          " class='button _complete'>Complete</button><button data-id=" +
          i +
          " class='button _delete'>Delete</button></td>";
        break;
      case "completed":
        this.type_op =
          "<td><button data-id=" +
          i +
          " class='button _delete'>Delete</button></td>";
        break;
      case "deleted":
        this.type_op =
          "<td><button data-id=" +
          i +
          " class='button _restore'=>Restore</button></td>";
        break;
    }

    return this.type_op;
  }
  draw(type = "current") {
    console.log("draw");
    this.table.innerHTML = "";
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].type == type) {
        this.table.innerHTML +=
          "<tr>" +
          "<td>" +
          this.tasks[i].title +
          "</td>" +
          "<td>" +
          this.tasks[i].body +
          "</td>" +
          "<td>" +
          this.tasks[i].priority +
          "</td>" +
          this.type(type, i) +
          "</tr>";
      }
    }
  }
  create_modal() {
    console.log("create modal");
    this.modal.classList.add("_active");
  }
  finishing_create() {
    this.tasks.push({
      title: this.add_operations[0].value,
      body: this.add_operations[1].value,
      priority: this.add_operations[2].value,
      type: "current"
    });
    this.draw("current");
  }
  close_modal() {
    this.modal.classList.remove("_active");
    for (let i = 0; i < this.add_operations.length; i++) {
      this.add_operations[i].value = "";
    }
  }
  delete(id) {
    this.current_type = this.tasks[id].type;
    this.tasks[id].type = "deleted";
    this.draw(this.current_type);
  }
  complete(id) {
    this.current_type = this.tasks[id].type;
    this.tasks[id].type = "completed";
    this.draw(this.current_type);
  }
  restore(id) {
    this.current_type = this.tasks[id].type;
    this.tasks[id].type = "current";
    this.draw(this.current_type);
  }
}

(() => {
  let tab_type = document.querySelector(".tab_type");
  let init = new Operation();
  tab_type.innerHTML = "Current";
  init.draw("current");
  window.addEventListener("click", e => {
    let n = e.target.getAttribute("class"),
      t_class = n.split(" ");
    if (t_class.length == 2) {
      switch (t_class[1]) {
        case "_current":
          tab_type.innerHTML = "Current";
          init.draw("current");
          break;
        case "_completed":
          tab_type.innerHTML = "Completed";
          init.draw("completed");
          break;
        case "_deleted":
          tab_type.innerHTML = "Deleted";
          init.draw("deleted");
          break;
        case "_create":
          init.create_modal();
          break;
        case "_add":
          init.finishing_create();
          break;
        case "_complete":
          init.complete(e.target.getAttribute("data-id"));
          break;
        case "_delete":
          init.delete(e.target.getAttribute("data-id"));
          break;
        case "_restore":
          init.restore(e.target.getAttribute("data-id"));
          break;
        case "_exit":
          init.close_modal();
          break;
      }
    }
  });
})();
