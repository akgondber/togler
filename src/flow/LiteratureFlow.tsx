import React from 'react';
import { 
  ReactFlow, 
  Controls, 
  Background, 
  type Connection,
  type Edge,
  type NodeTypes,
  type OnNodesChange,
  type OnEdgesChange,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import InteractiveNodeData from './InteractiveNodeData';

const nodeTypes: NodeTypes = {
  interactiveLiterature: InteractiveNodeData,
};

import { type AppNode } from '../types';

// Описываем пропсы, которые придут из App.tsx
interface LiteratureFlowProps {
  nodes: AppNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: (params: Connection) => void;
}

export default function LiteratureFlow({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect
}: LiteratureFlowProps) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
