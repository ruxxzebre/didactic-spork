import 'regenerator-runtime/runtime';

const main_mod = import('./index');
const JSON5_mod = import('json5');

const input = document.getElementById('input');
const output = document.getElementById('output');
const labelToggler = document.getElementById('parseWithLabels');
const editModeToggler = document.getElementById('editMode');

let parseWithLabels = false;
let editMode = false;

let prevPressedKey = '';

input.focus();

input.addEventListener('input', inputListener);
labelToggler.addEventListener('change', labelTogglerListener);
editModeToggler.addEventListener('change', editModeTogglerListener);
document.addEventListener('keydown', keyPressTogglerListener);

async function inputListener(e) {
  const main = await main_mod;
  const JSON5 = await JSON5_mod;
  if (editMode || !e.target.value) return;
  let obj;
  try {
    obj = JSON5.parse(e.target.value);
  } catch (e) {
    console.log(e);
    output.value = 'It is not valid JSON.';
    return;
  }
  try {
    obj = main.processJSON(obj, parseWithLabels);
    output.value = JSON.stringify(obj, null, 4);
    output.select();
  } catch (e) {
    console.log(e);
    output.value = 'Internal error. Contact me on GitHub, or create an issue! Would be greatful.';
  }
}

function labelTogglerListener(e) {
  const path = e.path || (e.composedPath && e.composedPath());
  parseWithLabels = path[0].checked;
  dispatchInput();
}

function editModeTogglerListener(e) {
  const path = e.path || (e.composedPath && e.composedPath());
  editMode = path[0].checked;
  if (!editMode) dispatchInput();
}

function keyPressTogglerListener(e) {
  const mainKey = 'Control';
  const wrapper = (elem, additional) => {
    e.preventDefault();
    if (prevPressedKey === mainKey) {
     elem.checked = !elem.checked;
    }
    additional()
    dispatchChange(elem);
  }
  switch(e.key) {
    case mainKey: return (() => {
      e.preventDefault();
      prevPressedKey = 'Control';
    })();
    case '1': return wrapper(labelToggler);
    case '2': return wrapper(editModeToggler, () => input.select());
    default: return prevPressedKey = '';
  }
}

function dispatchInput() {
  const forceEvent = new Event('input');
  input.dispatchEvent(forceEvent);
}

function dispatchChange(elem) {
  const forceEvent = new Event('change');
  elem.dispatchEvent(forceEvent);
}
