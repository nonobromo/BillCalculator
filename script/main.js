import {PersonManger} from "./person.js";

const personManger = new PersonManger();


const inputName = document.getElementById("name-input");
const inputNumber = document.getElementById("input-number");
const inputContainer = document.querySelector(".inputs-container");
const errorText = document.querySelector(".error-msg");
const tableBody = document.querySelector("tbody");
const showTotalCost = document.querySelector(".total-cost");
const btnSumbit = document.getElementById("btn-submit");

btnSumbit.addEventListener("click", newPayer)

inputContainer.addEventListener("keydown", (e) =>{
    if (e.key === "Enter"){
        newPayer();
    }
})

tableBody.addEventListener("click", function (e){
    const personId = Number(e.target.closest("tr[data-person-id]").dataset.personId);
    const shouldRemove = e.target.classList.contains("bi-trash");

    const row = e.target.closest('tr');

    if (shouldRemove){
        personManger.removePerson(personId);
        calculateTotalCost();
        row.remove()
    }

})

function newPayer(){
    try{
        addPerson();
        clearInputs();
        removeError();
        calculateTotalCost();
    }
    catch(error){
        showError(error)
    }
}

function addPerson(){
    const personAdded = personManger.addPerson(inputName.value, Number(inputNumber.value))
    addToTable(personAdded)
}

function addToTable(person){
  return  tableBody.innerHTML += `
    <tr data-person-id="${person.id}">
    <td>${person.fName}</td>
    <td>${person.ammount}</td>
    <td>${person.tip}</td>
    <td><i class="bi bi-trash cursor-pointer"></i></td>
    </tr>
    `
}

function calculateTotalCost(){
    let totalCost = personManger.calculateTotal();
    showTotalCost.innerHTML = `Total : ${totalCost}`;
}

function showError(error){
    errorText.innerHTML = error
}

function removeError(){
    errorText.innerHTML = ""
}

function clearInputs(){
    inputName.value = "";
    inputNumber.value = "";
}
