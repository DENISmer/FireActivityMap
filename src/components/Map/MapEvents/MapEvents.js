export function disableMapDragging(map) {
    if (map){
         map.dragging.disable();
         console.log(map,'disabled')
    }
    else{
        if (map) map.dragging.enable();
    }
}

export function enableMapDragging(map){
    if(map) map.dragging.enable();
}