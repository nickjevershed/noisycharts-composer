export function dragger(el, parent) {
    // console.log(el, parent[0])
    
    function drag_start(event) {
        var style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData("text/plain",
        (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
    } 
    
    function drag_over(event) { 
        event.preventDefault(); 
        return false; 
    }

    function drop(event) { 
        var offset = event.dataTransfer.getData("text/plain").split(',');

        el.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
        el.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
        event.preventDefault();
        return false;
    }

   
    el.addEventListener('dragstart',drag_start,false);
    parent[0].addEventListener('dragover',drag_over,false); 
    parent[0].addEventListener('drop',drop,false); 

}