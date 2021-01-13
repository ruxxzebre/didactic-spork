const input = document.getElementById('input');
const output = document.getElementById('output');
const rotate = document.getElementById('arrowBtn');

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

function inputListener(e)  {
  import('./index').then((fns) => {
    let obj;
    try {
      obj = JSON.parse(e.target.value);
      obj = fns.processJSON(obj);
      output.value = JSON.stringify(obj, null, 4);
      output.select();
    } catch (e) {
      console.log(e.message);
      output.value = 'It is not valid JSON.';
    }
  });
}
