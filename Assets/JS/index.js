class Operation {
  constructor() {
    this.table = document.querySelector(".content");
    this.modal = document.querySelector(".modal");
    this.tasks = [];
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
  draw(type) {
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
  create() {
    this.add_operations = document.querySelectorAll(".add");
    this.modal.classList.toggle("_active");
    this.add_operations[3].addEventListener("click", () => {
      this.tasks.push({
        title: this.add_operations[0].value,
        body: this.add_operations[1].value,
        priority: this.add_operations[2].value,
        type: "current"
      });
      this.draw("current");
    });
  }
  delete(id) {
    this.tasks[id].type = "deleted";
    this.draw(this.tasks[id].type);
  }
  complete(id) {
    this.tasks[id].type = "completed";
    this.draw(this.tasks[id].type);
  }
  restore(id) {
    this.tasks[id].type = "current";
    this.draw(this.tasks[id].type);
  }
}

(() => {
  let init = new Operation();

  window.addEventListener("click", e => {
    e.preventDefault();
    let n = e.target.getAttribute("class"),
      t_class = n.split(" ");
    if (t_class.length == 2) {
      switch (t_class[1]) {
        case "_current":
          init.draw("current");
          break;
        case "_completed":
          init.draw("completed");
          break;
        case "_deleted":
          init.draw("deleted");
          break;
        case "_create":
          init.create();
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
      }
    }
  });
})();
