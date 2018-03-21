var body = document.getElementsByTagName('body')[0];

var degree = new Array(36);
var s = new Array(36);
for (var i = 0; i < 36; i++) {
  degree[i] = document.createElement("input");
  s[i] = document.createElement('input');
  degree[i].value = 10 * (i + 1);

  degree[i].type = s[i].type = 'text';
  degree[i].style.display = s[i].style.display = 'inline-block';
  degree[i].style.width = s[i].style.width = (window.innerWidth / 25).toString() + 'px';
  s[i].style['margin-right'] = (window.innerWidth / 100).toString() + 'px';
  degree[i].style['margin-bottom'] = s[i].style['margin-bottom'] = '4px';
  degree[i].disabled = 'true';

  body.appendChild(degree[i]);
  body.appendChild(s[i]);

  if((i+1) % 9 == 0) {
    var br = document.createElement('br');
    body.appendChild(br);
  }
}

var minR = document.createElement('input');
body.appendChild(minR);
minR.style.background = '#ace';
minR.placeholder = '轮廓最小半径';
minR.style.margin = '5px 20px 0 0';

var button = document.createElement('button');
body.appendChild(button);
button.appendChild(document.createTextNode('绘制'));
body.appendChild(document.createElement('br'));

var canvas = document.createElement('canvas');
body.appendChild(canvas);

var sizeRecord = {}, ctt, x, y;
window.setInterval(function() {
  if(sizeRecord.w != window.innerWidth || sizeRecord.h != window.innerHeight) {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;
    ctt = canvas.getContext('2d');
    x = canvas.width / 2;
    y = canvas.height / 2;
    sizeRecord.w = window.innerWidth;
    sizeRecord.h = window.innerHeight;
    button.onclick();
  }
}, 1000);

function getRatio() {
  var largest = 0.1;
  s.forEach(function(se) {
    if(!isNaN(parseFloat(se.value))) {
      largest = largest > parseFloat(se.value) ? largest : parseFloat(se.value);
    }
  });
  var minRValue = isNaN(parseFloat(minR.value)) ? 0 : parseFloat(minR.value);
  return (canvas.height * 0.8) / ((largest + minRValue) * 2);
}

button.onclick = function() {
  var r = parseFloat(minR.value);
  var ratio = getRatio();console.log(ratio);

  ctt.clearRect(0, 0, canvas.width, canvas.height);
  ctt.save();
  ctt.lineWidth = 2;
  ctt.beginPath();

  for (var j = 0; j < degree.length; j++) {
    if(s[j].value != '') {
      var vd = parseFloat(degree[j].value),
        vs = parseFloat(s[j].value),
        vx = x + (vs + r) * Math.cos(Math.PI * 2 * vd / 360) * ratio,
        vy = y + (vs + r) * Math.sin(Math.PI * 2 * vd / 360) * ratio;
      if(j == 0)ctt.moveTo(vx, vy);
      else ctt.lineTo(vx, vy);
      ctt.font = 18 + 'px Arial';
      ctt.fillText(vs.toString(),
        vx + 5 * ratio * Math.cos(Math.PI * 2 * vd / 360), vy + 5 * ratio * Math.sin(Math.PI * 2 * vd / 360));
    }
  }

  ctt.closePath();
  ctt.stroke();
  ctt.restore();

  var r = parseFloat(minR.value);
  ctt.beginPath();
  ctt.arc(x, y, r * ratio, 0, 2 * Math.PI);
  ctt.stroke();

}
