export function disableMapDragging(map) {
    if (map){
         map.dragging.disable();
    }
    else{
        if (map) map.dragging.enable();
    }
}

export function enableMapDragging(map){
    if(map) map.dragging.enable();
}