import { MarkerType } from "@xyflow/react";

export const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
export const initialEdges = [{ 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    animated: true, 
    markerEnd: {
        type: MarkerType.ArrowClosed, 
        width: 10, 
        height: 10,
        color: 'blue',
    },
    style: { stroke: 'blue', strokeWidth: 2 }
}];
   