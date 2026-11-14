import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type CustomTopicNode } from './types';

export default function TopicNode({ data }: NodeProps<CustomTopicNode>) {
  const bgBorderColor = data.color || '#10b981'; // По умолчанию зеленый
  const textColor = data.textColor || '#fb923c';
  const bgColor = data.bgColor || '#431407';

  return (
    <div
      style={{
        padding: '10px 18px',
        borderRadius: '20px',
        background: bgColor,
        border: `2px solid ${bgBorderColor}`,
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: textColor,
        fontSize: '14px',
        textAlign: 'center',
        minWidth: '120px'
      }}
    >
      {data.label}
      {/* Точка выхода справа для соединения с карточками анализа */}
      <Handle type="source" id="s-0" position={Position.Top} style={{ background: '#78350f', width: '8px', height: '8px' }} />
      <Handle type="source" id="s-1" position={Position.Left} style={{ background: '#a0cf02', width: '8px', height: '8px' }} />
      <Handle type="source" id="s-2" position={Position.Right} style={{ background: bgBorderColor, width: '8px', height: '8px' }} />
      <Handle type="source" id="s-3" position={Position.Bottom} style={{ background: '#dec1c2', width: '8px', height: '8px' }} />
    </div>
  );
}
