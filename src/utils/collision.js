const boxesIntersect = (box1, box2) => {
    const box1Bounds = box1.getBounds();
    const box2Bounds = box2.getBounds();
    
    return box1Bounds.x + box1Bounds.width > box2Bounds.x && box1Bounds.x < box2Bounds.x + box2Bounds.width && box1Bounds.y + box1Bounds.height > box2Bounds.y && box1Bounds.y < box2Bounds.y + box2Bounds.height;
}

export { boxesIntersect };