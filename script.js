const sections = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
let HTML = ``;
function drawTheBoard(counter) {
  if (counter === 20) return;
    HTML += `
      <text style="fill:grey;font-size:25px;">
        <textPath href="#d-r-${sections[counter]*2}" startOffset="30">${sections[counter]}</textPath>  
      </text>
      <path title=${sections[counter]} class="path" id="d-r-${sections[counter]*2}" d="M250 40 l0 -10 q40 0 69 11 l-4 10 Z"
        transform="rotate(${counter * 18}, 250, 250)"
        stroke="grey" stroke-width="2"
        fill=${counter % 2 ? "red" : "green"} />
      <path class="path" id="s-f-${sections[counter]}" d="M250 150 l0 -110 q25 0 65 12 l-37 110 Z"
        transform="rotate(${counter * 18}, 250, 250)"
        stroke="grey" stroke-width="2"
        fill="beige" />
      <path class="path" id="t-r-${sections[counter]*3}" d="M250 140 l0 -10 q20 0 38 7 l-4 10 Z"
        transform="rotate(${counter * 18}, 250, 250)"
        stroke="grey" stroke-width="2"
        fill=${counter % 2 ? "red" : "green"} />
      <path class="path" id="s-f-${sections[counter]}" d="M250 250 l0 -110 q25 0 33 5 Z"
        transform="rotate(${counter * 18}, 250, 250)"
        stroke="grey" stroke-width="2"
        fill="beige" />
        `;
    drawTheBoard(counter + 1);
  }

drawTheBoard(0);

document.querySelector('.board').innerHTML = `
  <svg class="board-svg" width="500" height="500">
    <circle class="path" id="a-c-0" cx="250" cy="250" r="245" stroke="black" stroke-width="3" fill="black"/>
    ${HTML}
    <circle class="path" id="o-b-25" cx="250" cy="250" r="20" stroke="grey" stroke-width="2" fill="green"/>
    <circle class="path" id="1-b-50" cx="250" cy="250" r="10" fill="red" stroke="grey" stroke-width="2"/>
`;
let currentPlayerScore = NaN;
let count = 0;
document.querySelector('.start-game').addEventListener('click', () => {
  document.querySelectorAll('input').forEach(input => input.readOnly = true);
  const scoreInput1 = document.querySelector('.score-1');
  const scoreInput2 = document.querySelector('.score-2');
  document.querySelectorAll('.path').forEach(element => {
    element.addEventListener('click', () => {
      let point = Number(element.id.toString().slice(4));
      console.log(point);
      if (count % 3 === 0) {
        if (currentPlayerScore === scoreInput1) {
          currentPlayerScore = scoreInput2;
        }
        else {
          currentPlayerScore = scoreInput1;
        }
      }
      count ++;
      currentPlayerScore.value -= point;
    });

  });
  document.querySelector('.refresh').classList.remove('unvisible');
  document.querySelector('.start-game').classList.add('unvisible');
});

document.querySelector('.refresh').addEventListener('click', () => {
  location.reload();
});


// Info-Modal-Logik
document.querySelector('.info-icon').addEventListener('click', () => {
  document.querySelector('.info-modal').classList.remove('hidden');
});

document.querySelector('.info-modal .close').addEventListener('click', () => {
  document.querySelector('.info-modal').classList.add('hidden');
});

// Modal schließen beim Klick außerhalb
document.querySelector('.info-modal').addEventListener('click', (e) => {
  if (e.target.classList.contains('info-modal')) {
    document.querySelector('.info-modal').classList.add('hidden');
  }
});