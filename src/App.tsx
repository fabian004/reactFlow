import React, { useCallback, useState } from 'react';
import './App.css';
import { addEdge, MarkerType, ReactFlow, useEdgesState, useNodesState, Node  } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { initialEdges, initialNodes } from './InitialStates';
import { MessageNode, TextAreaNode, MultiSelectNode } from './customNodes';

const nodeTypes = {
  messageNode: MessageNode,
  textAreaNode: TextAreaNode,
  multiSelectNode: MultiSelectNode
};


function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeCount, setNodeCount] = useState(initialNodes.length);
  const [selectedNode, setSelectedNode] = useState<Node<any> | null>(null);
 
  const onConnect = useCallback(
    (params: any) => {
      setEdges((eds) => {
        const newEdge = {
          ...params,
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 10,
            height: 10,
            color: 'black',
          },
          style: { stroke: 'black', strokeWidth: 2 },
        };
        const updatedEdges = addEdge(newEdge, eds);
        console.log('Updated edges:', updatedEdges);
        return updatedEdges;
      });
    },
    [setEdges]
  );

  const addNode = (type: string) => {
    const newNode = {
      id: (nodeCount + 1).toString(),
      type: type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${nodeCount + 1}` },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeCount((count) => count + 1);
  };

  const onNodeClick = (event:any, node:any) => {
    setSelectedNode(node);
  };
  

  const updateNodeLabel = (newLabel: string) => {
    setNodes((nds) => 
      nds.map((node) => 
        node.id === selectedNode?.id ? { ...node, data: { ...node.data, label: newLabel } } : node
      )
    );
    if (selectedNode) {
      setSelectedNode({
        ...selectedNode,
        data: { ...selectedNode.data, label: newLabel }
      });
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div style={{ width: '50%', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h1>Administrator Dashboard</h1>
        <button onClick={() => addNode('messageNode')}>Add Message Node</button>
        <button onClick={() => addNode('textAreaNode')}>Add Text Area Node</button>
        <button onClick={() => addNode('multiSelectNode')}>Add MultiSelect Node</button>

      </div>
      <div style={{ width: '50%', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
        />
      </div>
      {selectedNode && (
        <div style={{ position: 'absolute', right: 0, top: 0, padding: '20px', backgroundColor: '#d3d3d3', width: '20%' }}>
          <h3>Edit Node</h3>
          <input 
            type="text" 
            value={selectedNode.data.label} 
            onChange={(e) => updateNodeLabel(e.target.value)} 
          />
        </div>
      )}
    </div>
  );
}

export default App;
