import React from 'react';
import { 
  ReactFlow, 
  Controls, 
  Background, 
  BackgroundVariant,
  type Connection,
  type Edge,
  type NodeTypes,
  type OnNodesChange,
  type OnEdgesChange
} from '@xyflow/react';
import '@xyflow/react/dist/style.css'; // Импортируем базовые стили отображения канваса

// Импортируем кастомные HTML-компоненты узлов
import InteractiveLiteratureNode from './InteractiveLiteratureNode';
import TopicNode from './TopicNode';

// Импортируем единый тип AppNode из файла types.ts
import { type AppNode } from './types';
import CustomGroupNode from './CustomGroupNode';
import CustomNode from './CustomNode';

// КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Ключи словаря должны СТРОГО совпадать с полем `type` в объектах нод из App.tsx
const nodeTypes: NodeTypes = {
  interactiveLiterature: InteractiveLiteratureNode, // для карточек аналитики
  topicNode: TopicNode,
  chapterGroup: CustomGroupNode,
  customNode: CustomNode,        
};

// Описываем строгий интерфейс пропсов, приходящих из App.tsx
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
        nodeTypes={nodeTypes} // Передаем сопоставленные HTML-компоненты в холст
        fitView
      >
        <Controls />
        {/* Используем BackgroundVariant.Dots для аккуратной сетки в точку */}
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
