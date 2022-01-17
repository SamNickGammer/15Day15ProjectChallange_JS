const canvas = document.getElementById('canvas');
const color_field = document.querySelectorAll('.color-field');
const eraserElement = document.querySelector('.eraser');
const colorPick = document.querySelector('.color-picker');
const penRange = document.querySelector('.pen-range');

canvas.width = window.innerWidth - 60;
canvas.height = 650;
let context = canvas.getContext('2d');
let start_background_color = 'white';
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = 'black';
let draw_width = '2';
let is_drawing = false;
let eraser_selected = false;
let eraser_size = '10';

let restore_array = [];
let index = -1;

function change_color(element) {
  draw_color = element.style.background;
  eraser_selected = false;
  color_field.forEach((select) => {
    select.classList = 'color-field';
  });
  eraserElement.classList = 'eraser';
  colorPick.classList = 'color-picker';

  element.classList = 'color-field selectedField';
}
function eraser(element) {
  draw_color = start_background_color;
  eraser_selected = true;
  if (eraser_selected) {
    element.classList = 'eraser selectedField';
    color_field.forEach((select) => {
      select.classList = 'color-field';
    });
    colorPick.classList = 'color-picker';
  }
}
function colorPicker(element) {
  draw_color = element.value;
  color_field.forEach((select) => {
    select.classList = 'color-field';
  });
  eraserElement.classList = 'eraser';

  colorPick.classList = 'color-picker selectedField';
}
function rangeSlider(element) {
  draw_width = element.value;
  if (eraser_selected) {
    eraser_size = element.value;
  }
}

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);

canvas.addEventListener('touchend', stop, false);
canvas.addEventListener('mouseup', stop, false);
canvas.addEventListener('mouseout', stop, false);

function start(event) {
  is_drawing = true;
  context.beginPath();
  context.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
  event.preventDefault();
}
function draw(event) {
  if (is_drawing) {
    context.lineTo(
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop
    );
    context.strokeStyle = draw_color;
    if (eraser_selected) {
      context.lineWidth = eraser_size;
    } else {
      context.lineWidth = draw_width;
    }
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.stroke();
  }
}

function stop(event) {
  if (is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  }
  event.preventDefault();
  if (event.type != 'mouseout') {
    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
  }
}
function clear_canvas() {
  context.fillStyle = start_background_color;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);

  restore_array = [];
  index = -1;
}

function undo_last() {
  if (index <= 0) {
    clear_canvas();
  } else {
    index -= 1;
    restore_array.pop();
    context.putImageData(restore_array[index], 0, 0);
  }
}
