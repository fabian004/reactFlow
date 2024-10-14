import React, { useCallback, useState } from 'react';
import './App.css';
import { addEdge, MarkerType, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { initialEdges, initialNodes } from './InitialStates';

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeCount, setNodeCount] = useState(initialNodes.length);
 
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge({ 
      ...params, 
      animated: true, 
      markerEnd: {
        type: MarkerType.ArrowClosed, 
        width: 10, 
        height: 10,
        color: 'black',
    },
    style: { stroke: 'black', strokeWidth: 2 }  }, eds)),
  [setEdges]);

  const addNode = () => {
    const newNode = {
      id: (nodeCount + 1).toString(),
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${nodeCount + 1}` },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeCount((count) => count + 1);
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div style={{ width: '50%', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h1>Administrator Dashboard</h1>
        <button onClick={addNode}>new Node</button>
        <p>Click para agregar nuevo nodo.</p>
      </div>
      <div style={{ width: '50%', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />
      </div>
    </div>
  );
}

export default App;
