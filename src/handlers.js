const input = document.getElementById('input');
const output = document.getElementById('output');
const labelToggler = document.getElementById('parseWithLabels');
const editModeToggler = document.getElementById('editMode');

let parseWithLabels = false;
let editMode = false;

input.focus();

input.addEventListener('input', inputListener);
labelToggler.addEventListener('change', labelTogglerListener);
editModeToggler.addEventListener('change', editModeTogglerListener);

function inputListener(e)  {
  if (editMode || !e.target.value) return;
  import('./index').then((fns) => {
    let obj;
    try {
      obj = JSON.parse(e.target.value);
    } catch (e) {
      console.log(e);
      output.value = 'It is not valid JSON.';
    }
    try {
      obj = fns.processJSON(obj, parseWithLabels);
      output.value = JSON.stringify(obj, null, 4);
      output.select();
    } catch (e) {
      console.log(e);
      output.value = 'Internal error. Contact me on GitHub, or create an issue! Would be greatful.';
    }
  });
}

function labelTogglerListener(e) {
  parseWithLabels = e.path[0].checked;
  dispatchInput();
}

function editModeTogglerListener(e) {
  editMode = e.path[0].checked;
  if (!editMode) dispatchInput();
}

function dispatchInput() {
  const forceEvent = new Event('input');
  input.dispatchEvent(forceEvent);
}
