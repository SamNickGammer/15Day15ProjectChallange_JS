const textArea = document.getElementById('textArea');
const word_count = document.querySelector('.word_count');
const char_count = document.querySelector('.char_count');
const fileInput = document.getElementById('fileInput');

textArea.addEventListener('input', (event) => {
  displaData(event.target.value);
});

fileInput.addEventListener('input', () => {
  let files = fileInput.files;

  if (files.length == 0) return;

  const file = files[0];
  let reader = new FileReader();
  reader.onload = (e) => {
    const file = e.target.result;
    const lines = file.split(/\r\n|\n/);
    textArea.value = lines.join('\n');
    displaData(lines.join('\n'));
  };
  reader.onerror = (e) => {
    alert(e.target.error.name);
  };
  reader.readAsText(file);
});

function displaData(text) {
  char_count.textContent = text.replace(/\s/g, '').length;
  word_count.textContent = text.split(' ').filter((item) => {
    return item != '';
  }).length;
}
