var vid = document.getElementById("instruction");
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
  vid.pause()
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    vid.pause()
  }
}


var start=0;
const keyBoard = document.querySelector('body')
console.log(keyBoard.innerHTML)
keyBoard.addEventListener('keypress', e =>{

    if(e.key === 13 && start === 0){
        start++;
        play()
        e.preventDefault()
    }
})

function play()
{
  document.getElementById('start').style.display="none"
  document.getElementById('game-over').style.display="none"
  
  var arr = 'abcdefghijklmnopqrstuvwxyz'.split('');
  var p=0;
  var speed=2000;
  var classes = ['float-1','float-2','float-3','float-4']
  var colors=[
    "#00e76b",
    "#00008f",
    "#7bb736",
    "#6153c7",
    "#007900",
    "#df0059",
    "#00d5ff",
    "#ff4750",
    "#ff649e",
    "#8f0002"
  ]
  var ids=[]
  var touch=3;
  var score=0;
  document.querySelector("body").addEventListener('keyup', (e) => {
    var flag=0;
    if(e.key!="Enter")
    {
      for(let li=0;li<p;li++)
      {
          if(ids[li]!=-1)
          {
            if(e.key==document.getElementById(ids[li]).innerHTML)
            {
              document.getElementById(ids[li]).style.display="none"
              ids[li]=-1;
              flag=1;
              break;
            }
          }
      }
      if((flag==1))
      {
        score++
        var audio = new Audio('./audios/pop.mp3');
        audio.play();
      }
      else{
        score--
      }
    }
    document.getElementById('score').innerHTML=score
  });  
    function getPositionAtCenter(element) {
      const {top, left, width, height} = element.getBoundingClientRect();
      return {
        x: left + width / 2,
        y: top + height / 2
      };
    }
  
  function getDistanceBetweenElements(a, b) {
    const aPosition = getPositionAtCenter(a);
    const bPosition = getPositionAtCenter(b);
    return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);  
  }

  function calDistance()
  {
    for(let q=0;q<p;q++)
    {
      if(ids[q]!=-1)
      {
          const distance = getDistanceBetweenElements(
          document.getElementById(q),
          document.getElementById("middle")
        );
        if(distance<=75)
        {
          ids[q]=-1
          console.log("Touched")
          document.getElementById("life"+touch.toString()).style.display="none"
          console.log(touch.toString())
          touch--;

          if(touch==0)
          {
            document.getElementById('game').style.display="none";
            document.getElementById('game-over').style.display="block"
            document.getElementsByClassName('live-info').innerHTML=""
            document.getElementById('live').style.display="none"
            document.getElementById('score-point').innerText=score;

          }
          return 0;
        }
      }    
    }
  }

  setInterval(function() {
    if(calDistance() == 0)
    {
      return 0;
    }
  },0)
  
  function addElements() {         
    setTimeout(function() {   
      var x=arr[Math.floor(Math.random()*arr.length)]
      var tag = document.createElement("p");
      var text = document.createTextNode(x); 
      tag.appendChild(text);
      var y=Math.floor(Math.random()*classes.length)
      tag.classList.add(classes[y]);
      tag.classList.add(x);
      tag.setAttribute("id", p);
      ids.push(p)
      var element = document.getElementById("game");
      element.appendChild(tag);

      var m=document.getElementById(p)
      m.style.backgroundColor=colors[Math.floor(Math.random()*colors.length)]
      p++;
      if(p>=10 && p<=50)
      {
        speed=1000
      }
      else if(p>50)
      {
        speed=800
      }
      if (touch>0) {           
          addElements();              
      }                     
    }, speed)
  }

  addElements();
}
