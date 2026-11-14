import React from 'react';
import { Handle, Position, useReactFlow, type NodeProps, type Node } from '@xyflow/react';

// Доступные топики
const TOPIC_OPTIONS = [
  { value: 'psychology', label: 'Психология' },
  { value: 'management', label: 'Управление' },
  { value: 'manipulation', label: 'Препарирование манипуляции' },
  { value: 'planning', label: 'Искусство планирования' },
];

export type InteractiveNodeData = {
  topic?: string;
  comment?: string;
};

export type CustomInteractiveNode = Node<InteractiveNodeData, 'interactiveLiterature'>;

export default function InteractiveLiteratureNode({ id, data }: NodeProps<CustomInteractiveNode>) {
  const { setNodes } = useReactFlow();

  // Функция для обновления конкретного поля в data этого узла
  const updateNodeData = (field: keyof InteractiveNodeData, value: string) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              [field]: value,
            },
          };
        }
        return node;
      })
    );
  };

  return (
    <div
      style={{
        padding: '14px',
        borderRadius: '10px',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        fontFamily: 'sans-serif',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        width: '280px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
      // Важно: отключаем drag-эффект при взаимодействии с элементами ввода,
      // чтобы при выделении текста или клике на селект узел не улетал
      className="nodrag" 
    >
      {/* Точки подключения стрелок */}
      <Handle type="target" position={Position.Left} style={{ background: '#64748b', width: '8px', height: '8px' }} />

      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>
        Анализ элемента
      </div>

      {/* Выбор топика */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Выберите топик</label>
        <select
          value={data.topic || ''}
          onChange={(e) => updateNodeData('topic', e.target.value)}
          style={{
            padding: '6px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            background: '#f8fafc',
            fontSize: '13px',
            color: '#1e293b',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="" disabled>-- Выберите из списка --</option>
          {TOPIC_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Ввод собственного комментария */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Ваш комментарий</label>
        <textarea
          rows={3}
          value={data.comment || ''}
          onChange={(e) => updateNodeData('comment', e.target.value)}
          placeholder="Например: Бобров не смог ничего сделать с системой..."
          style={{
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '13px',
            color: '#334155',
            resize: 'vertical',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
      </div>

      <Handle type="source" position={Position.Right} style={{ background: '#64748b', width: '8px', height: '8px' }} />
    </div>
  );
}
