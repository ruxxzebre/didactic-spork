const input = document.getElementById('input');
const output = document.getElementById('output');
const rotate = document.getElementById('arrowBtn');
const withLabelCheckbox = document.getElementById('parseWithLabels');
const editModeCheckbox = document.getElementById('editMode');

let parseWithLabels = false;
let editMode = false;

rotate.addEventListener('click', () => {
  const wrapper = document.getElementsByClassName('wrapper')[0];
  if (wrapper.className === 'wrapper vertical') {
    wrapper.className = 'wrapper horizontal';
  } else {
    wrapper.className = 'wrapper vertical';
  }
});

input.focus();
input.addEventListener('input', inputListener);
withLabelCheckbox.addEventListener('change', (e) => {
  parseWithLabels = e.path[0].checked;
  const forceEvent = new Event('input');
  input.dispatchEvent(forceEvent);
});
editModeCheckbox.addEventListener('change', (e) => {
  editMode = e.path[0].checked;
  if (!editMode) {
    const forceEvent = new Event('input');
    input.dispatchEvent(forceEvent);
  }
})

function inputListener(e)  {
  if (editMode || !e.target.value) return;
  import('./index').then((fns) => {
    let obj;
    try {
      obj = JSON.parse(e.target.value);
      obj = fns.processJSON(obj, parseWithLabels);
      output.value = JSON.stringify(obj, null, 4);
      output.select();
    } catch (e) {
      console.log(e);
      output.value = 'It is not valid JSON.';
    }
  });
}
