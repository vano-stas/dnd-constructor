let doc = document.getElementById("dropzone");
let workZone = document.getElementById('work-zone');
let headButton = document.getElementById('head-button');
let hideTools = document.getElementById('hide-tools');
let showTools = true;

var image = null;

showTools ? doc.style.display = '' : doc.style.display = 'none';
showTools ? hideTools.innerHTML = '<' : hideTools.innerHTML = '>';


headButton.onmousedown = function (e) {
    if (e.currentTarget.className == 'base-dragged') {

        image = e.currentTarget.cloneNode(true);
        image.id = "";
        image.style.color = 'red';
        image.style.top = e.currentTarget.offsetTop;
        image.style.left = e.currentTarget.offsetLeft;
        // image.style.position.style = 'absolute';
        // image.className = 'dragged';
        // image.style.width = headButton.style.width;
        doc.appendChild(image);
        image.style.zIndex = 1000;
        image.style.position = "absolute";
        let coords = getCoords(image);
        let shiftX = e.pageX - e.currentTarget.offsetLeft;
        let shiftY = e.pageY - coords.top;
         
        moveAt(e);

        function moveAt (e) {
            return (
            image.style.left = e.pageX - shiftX + "px",
            image.style.top = e.pageY - shiftY + "px"
            )
        }
        document.onmousemove = function (e) {
            moveAt(e);
        };
    }     
}

const createButtonHead = (e) => {
    let button = document.createElement('button');
    button.className = 'btn btn-danger btn-head';
    button.innerHTML = 'Заголовок';
    workZone.appendChild(button);
    button.style.position = 'absolute';
    button.style.zIndex = '150';
    button.style.left  = `${e.clientX}px`;
    button.style.top = `${e.clientY}px`;
    button.addEventListener('click', (e) => {

        e.stopPropagation();
        let input = document.createElement('input');
        input.className = 'input-edit';
        input.value = e.target.innerText;
        button.innerHTML = '';
        button.appendChild(input);
        input.focus();
        input.addEventListener('keypress', (ev) => {
            if (ev.keyCode == 13) {
                button.innerHTML = input.value;
                button.removeChild(input);
            }
        })
        // if (!(e.target.classList.contains('btn-head') && ) ) {
        //     button.innerHTML = input.value;
        //     button.removeChild(input);
        //     console.log(e);
        // }
    });
    
    return button;

}

document.onmouseup = function (ev) {
    if ((ev.clientX > doc.clientWidth && ev.which == 1 && document.onmousemove)) {
        createButtonHead(ev);
    }
    doc.removeChild(image);
    image = null;
    document.onmousemove = null; 
};

doc.ondragstart = function () {
	return false;
};

function getCoords (elem) {
    var box = elem.getBoundingClientRect();
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
}

hideTools.addEventListener( 'mouseup', (e) => {
    e.stopPropagation();
    showTools = !showTools;
    showTools ? doc.style.display = '' : doc.style.display = 'none';
    showTools ? hideTools.innerHTML = '<' : hideTools.innerHTML = '>';
});  