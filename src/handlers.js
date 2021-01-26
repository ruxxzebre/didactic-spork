const input = document.getElementById('input');
const output = document.getElementById('output');
const labelToggler = document.getElementById('parseWithLabels');
const editModeToggler = document.getElementById('editMode');

let parseWithLabels = false;
let editMode = false;

input.focus();

input.addEventListener('input', inputListener);
labelToggler.addEventListener('change', (e) => {
  parseWithLabels = e.path[0].checked;
  dispatchInput();
});
editModeToggler.addEventListener('change', (e) => {
  editMode = e.path[0].checked;
  if (!editMode) dispatchInput();
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

function dispatchInput() {
  const forceEvent = new Event('input');
  input.dispatchEvent(forceEvent);
}
