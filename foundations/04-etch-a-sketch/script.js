let container = document.getElementById("container");

for (let i = 1; i <= 256; i++) {
   let div = document.createElement("div");
   div.classList.add("square");
   container.appendChild(div);
}

function addHoverEffect() {
   let squares = document.querySelectorAll(".square");
   squares.forEach(square => {
      square.addEventListener("mouseover", function() {
         square.style.backgroundColor = "red";
      });
   });
}
addHoverEffect();

const button = document.querySelector(".userChoose");

button.addEventListener("click", function() {
   let number = prompt("Choose a number between 1 and 100");
   number = parseInt(number);
   
   if (number > 0 && number <= 100) {
      createGrid(number);
   } else {
      alert("Please enter a number between 1 and 100.");
   }
   
   function createGrid(num) {
      container.innerHTML = "";
      const totalSquares = num * num;
      
      for (let i = 1; i <= totalSquares; i++) {
         const squareDiv = document.createElement("div");
         squareDiv.classList.add("square");
         container.appendChild(squareDiv);
      }
      
      addHoverEffect();
   }
});
