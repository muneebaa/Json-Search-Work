let ulEl = document.getElementById("ul-el");
let searchInput = document.getElementById("searchInput");
let selectedCheck = document.getElementById("selected-check");

fetch('json-data.json')
    .then(response => response.json())
    .then(data => render(data))
    .catch(err => console.log('error: ' + err))

function render(things) {
    let listItems = "";
    for (let i = 0; i < things.length; i++) {
        listItems += `<li class="names"><label class="label" for="c-${things[i].id}"><input class="check" type="checkbox" value="${things[i].name}" name="checkbox" id="c-${things[i].id}"><span>${things[i].name}</span></label></li>`;
    }
    ulEl.innerHTML = listItems;
}


renderUpdatedList = (list) => {
    const parent = document.getElementById('ul-el')

    Array.from(parent.children).forEach(item => {
        item.classList.add("active");
    })
    list.forEach(item => {
        item.classList.remove("active");
    })
}


searchInput.addEventListener("input", (event) => {
    let searchQuery = event.target.value.toLowerCase();
    searchQuery = searchQuery.replaceAll('-', ' ').split(' ').filter(s => s);

    let allNamesDOMCollection = $("#mysearch #ul-el .names")
    let result = [];
    let includes;

    for (listRecord of allNamesDOMCollection) {
        let selector = listRecord.querySelector('span')
        let currentName = selector.textContent.toLowerCase().replaceAll("-", " ").split(' ').filter(s => s).join(" ");;
        includes = true;
        listRecord.classList.remove("active");
        for (words of searchQuery) {
            if (currentName.indexOf(words) === -1 || currentName.lastIndexOf(words) === -1) {
                includes = false;
                listRecord.classList.add("active");
                break;
            }

            listRecord.classList.remove("active");
        }

        if (includes) {
            result.push(listRecord);
            renderUpdatedList(result)
        }
    }
});

function seeCheckedNum() {
    let checked = document.querySelectorAll('input[type="checkbox"]:checked').length;
    selectedCheck.textContent = `Selected Items : ${checked}`
}

let list = $("#ul-el"),
    origOrderList = list.children();

list.on("change", ":checkbox", function () {
    let checked = document.querySelectorAll('input[type="checkbox"]:checked').length;
    if ($(this).is(':checked')) {
        selectedCheck.textContent = `Selected Items : ${checked}`
    }else{
        selectedCheck.textContent = "Selected Items : " + checked--
    }
})

var clicked = false;
$(".checkall").on("click", function () {
    $("#mysearch #ul-el .names .check:visible").prop("checked", !clicked);
    clicked = !clicked;
    this.innerHTML = clicked ? 'Deselect All' : 'Select All';
    seeCheckedNum()
});