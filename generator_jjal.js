











function isImage(url) {//https://roufid.com/javascript-check-file-image/
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

// function readImage(input) {//https://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas
//     // 인풋 태그에 파일이 있는 경우
//     if(input.files && input.files[0]) {
//         // 이미지 파일인지 검사
//         if (isImage(input.files[0]["name"])){

//             // FileReader 인스턴스 생성
//             const reader = new FileReader()
//             // 이미지가 로드가 된 경우
            
//             reader.onload = function(event){
                
//                 jjal_origin.onload = function(){
//                     jjal_origin.width = this.width;
//                     jjal_origin.height = this.height;
//                     jjal_origin.getContext('2d').drawImage(this, 0, 0);
//                 }
//                 jjal_origin.src = event.target.result
//             }
//             // reader가 이미지 읽도록 하기
//             reader.readAsDataURL(input.files[0])
//         }
//         else{//이미지 파일이 아닌 경우
//             jjal_origin.removeAttribute("src");//src 정보 삭제
//         }
//     }
// }
// input file에 change 이벤트 부여

// const image_input = document.getElementById("btn_upload")
// image_input.addEventListener("change", e => {//http://yoonbumtae.com/?p=3304
//     readImage(e.target)
// })





const jjal_origin = document.getElementById("jjal_origin")
var text_title_out_up = "짤 밖 위 텍스트"
var text_title_in_up = "짤 안 위 텍스트";
var text_title_in_down = "짤 안 아래 텍스트"
var text_title_out_down = "짤 밖 아래 텍스트"
var imageLoader = document.getElementById('btn_upload');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('jjal_origin');//https://codepen.io/ahebler/pen/KzyQBZ
var ctx = canvas.getContext('2d');
var img = new Image();

img.crossOrigin="anonymous";

window.addEventListener('load', DrawPlaceholder(img))

function DrawPlaceholder(img_onload) {
    img_onload.onload = function() {
        DrawOverlay(img_onload);
        DrawText();
        DynamicText(img_onload)

        
    };
    img_onload.src = 'https://unsplash.it/400/400/?random';
  
}
function DrawOverlay(img) {
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function DrawText() {
    var font_size = document.getElementById("font_size").value.toString(10)
    ctx.fillStyle = document.getElementById("color_picker").value;
    ctx.textBaseline = 'top';
    ctx.font = font_size + "pt NotoSans CJK KR Regular";

    
    // ctx.fillText(text_title_in_up, 0, 0);
    var lineheight = font_size;//글자 위아래 간격
    var font_blank = font_size/10 + 5;//여백
    lines_in_up = text_title_in_up.split('\n')//https://stackoverflow.com/questions/5026961/html5-canvas-ctx-filltext-wont-do-line-breaks
    for (var i = 0; i<lines_in_up.length; i++)
      ctx.fillText(lines_in_up[i], font_blank, font_blank + (i * lineheight) );
    // ctx.fillText(text_title_in_down, 0, canvas.height-50);
    lines_in_down = text_title_in_down.split('\n')
    for (var i = 0; i<lines_in_down.length; i++)
      ctx.fillText(lines_in_down[lines_in_down.length-i-1], font_blank, canvas.height - ((i+1) * lineheight) - font_blank);
}

function DynamicText(img) {
  
  document.getElementById('text_in_up').addEventListener('keyup', function() {//짤 안 위 텍스트
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DrawOverlay(img);
    DrawText(); 
    text_title_in_up = this.value;
  });
  document.getElementById('text_in_down').addEventListener('keyup', function() {//짤 안 아래 텍스트
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DrawOverlay(img);
    DrawText(); 
    text_title_in_down = this.value;
  });

  document.getElementById('text_out_up').addEventListener('keyup', function() {//짤 밖 위 텍스트
    document.getElementById("preview_out_up").innerText = document.getElementById("text_out_up").value

    if (document.getElementById("text_out_up").value.length < 1){//document.defaultView.getComputedStyle(document.getElementById("preview_out_up")).getPropertyValue("font-size");
      document.getElementById("preview_out_up").style.fontSize = "0px";
      document.getElementById("preview_out_up").style.display ='none';
    }else{
      var font_size = document.getElementById("font_size").value.toString(10)
      document.getElementById("preview_out_up").style.fontSize = font_size + "px";
      document.getElementById("preview_out_up").style.display ='';


      // document.getElementById("preview_out_up").style.maxWidth = canvas.width.toString(10) + "px"//텍스트 가로 제한

    }
  });
  
  document.getElementById('text_out_down').addEventListener('keyup', function() {//짤 밖 아래 텍스트
    document.getElementById("preview_out_down").innerText = document.getElementById("text_out_down").value

    if (document.getElementById("text_out_down").value.length < 1){
      document.getElementById("preview_out_down").style.fontSize = "0px";
      document.getElementById("preview_out_down").style.display ='none';
    }else{
      var font_size = document.getElementById("font_size").value.toString(10)
      document.getElementById("preview_out_down").style.fontSize = font_size + "px";
      document.getElementById("preview_out_down").style.display ='';

      // document.getElementById("preview_out_down").style.maxWidth = canvas.width.toString(10) + "px"//텍스트 가로 제한
    }
  });




}



function handleImage(e) {
    if (isImage(e.target.files[0]["name"])){//이미지 여부 판별
        var reader = new FileReader();
        reader.onload = function(event) {
            var img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            }
            img.src = event.target.result;
            
            canvas.classList.add("show");
            // DrawOverlay(img);
            // DrawText(); 
            DynamicText(img);   
        }
        reader.readAsDataURL(e.target.files[0]); 
    }else{//이미지 아니면
        ctx.clearRect(0, 0, canvas.width, canvas.height);//캔버스 초기화
        canvas.width = 400;canvas.height= 400;//캔버스 크기 조정
        img = new Image();//새로운 이미지
        DrawPlaceholder(img)//캔버스 갱신
    }

    
 
}

// document.getElementById("download").addEventListener('click', event =>//https://zinee-world.tistory.com/551
//   // event.target.href = canvas.toDataURL()
//   window.open('', document.getElementById('jjal_final').toDataURL())
// );

function downloadimage() {//https://www.studentstutorial.com/javascript/convert-html-div-element
  /*var container = document.getElementById("image-wrap");*/ /*specific element on page*/
  var container = document.getElementById("jjal_final"); /* full page */
  container.style.width = Math.max(document.getElementById("preview_out_down").offsetWidth, document.getElementById("preview_out_up").offsetWidth, canvas.width).toString(10) + "px"
  html2canvas(container, { allowTaint: true }).then(function (canvas) {

      var link = document.createElement("a");
      document.body.appendChild(link);
      link.download = "html_image.jpg";
      link.href = canvas.toDataURL();
      link.target = '_blank';
      link.click();


  });
}








