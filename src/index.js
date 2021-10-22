console.log('this is parent worker');

const input = document.getElementById('input');
const preview = document.getElementById('preview');
const previewCtx = preview.getContext('2d');
const worker = new Worker('myWorker.js');

worker.addEventListener('message', (d) => {
  const imageData = d.data;
  previewCtx.putImageData(imageData,0,0)
})

function applyFilter(image) {
  const imageData = previewCtx.getImageData(0,0,image.width, image.height);
  worker.postMessage(imageData, [imageData.data.buffer])  
}

input.addEventListener('change', (e) => {
  const file = e.target.files[0];
  createImageBitmap(file).then((bitmap) => {
    preview.width=bitmap.width;
    preview.height = bitmap.height;
    previewCtx.drawImage(bitmap,0,0);
    applyFilter(bitmap);
  })
})
