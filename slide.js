var curdown=false;
var mouseY,height;
var dragging=false;
function handlemove(e)
{
	if(curdown)
	{	
		if(e.clientY-mouseY>0)
		{
			var thisel=document.getElementsByClassName('current')[0];
			var nextel=document.getElementsByClassName('current')[0].previousElementSibling;
			if(nextel&&nextel.classList.contains('page'))
			{
  			if(nextel.classList.contains('pageTransition'))
				{
					nextel.classList.remove('pageTransition');
				}
				if((e.clientY-mouseY)>(0.2*window.innerHeight))
	  		{
					dragging=false;
					//animate
	  		}
				else
				{
					if(!dragging)
					{
						nextel.style.transform='translate(0,-'+(window.innerHeight)+'px)';
						nextel.classList.add('moving');
					}
					dragging=true;
					//console.log('translate');	
					//translate
				}
				height=window.innerHeight-(e.clientY-mouseY);
				nextel.style.transform='translate(0,-'+height+'px)';
			
			}
			//console.log('down');
		}
		else if(e.clientY-mouseY<0)
		{
			var thisel=document.getElementsByClassName('current')[0];
			var nextel=thisel.nextElementSibling;
				if(nextel&&nextel.classList.contains('page'))
  			{
					if(nextel.classList.contains('pageTransition'))
					{
						nextel.classList.remove('pageTransition');
					}
					if((mouseY-e.clientY)>(0.2*window.innerHeight))
					{
						dragging=false;
						
						//animate
					}
					else
					{
						if(!dragging)
						{
							nextel.style.transform='translate(0,'+window.innerHeight+'px)';
							nextel.classList.add('moving');
						}
						dragging=true;
						//translate
					}
					height=window.innerHeight-(mouseY-e.clientY);
					nextel.style.transform='translate(0,'+height+'px)';
				}
			//console.log('up');
		}
	}
}

function handlemousedown(e){
			curdown=true;
			mouseY=e.clientY;
			};
function handlemouseup(e){
				curdown=false;
				var el=document.getElementsByClassName('moving')[0];
				var prevel=document.getElementsByClassName('current')[0];
				if(!el || !prevel)
					return;
				if(dragging){
					el.classList.remove('moving');
					dragging=false;
				}
				else
				{
					el.classList.add('pageTransition');
					el.style.transform='translate(0,0px)';
					setTimeout(function(){
						el.classList.remove('moving');
						prevel.classList.remove('current');
						el.classList.remove('pageTransition');
						el.classList.add('current');
						},400);
				}
		};
window.addEventListener('mousedown',handlemousedown);
window.addEventListener('mouseup',handlemouseup);
window.addEventListener('mousemove',handlemove);
