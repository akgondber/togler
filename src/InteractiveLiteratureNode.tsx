import React from 'react';
import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react';
import { type CustomInteractiveNode, type AnalyticalType } from './types';

const TYPE_OPTIONS: { value: AnalyticalType; label: string; color: string }[] = [
  { value: 'psychology', label: 'Психология', color: '#3b82f6' },
  { value: 'nature', label: 'Природные явления', color: '#10b981' },
  { value: 'manipulation', label: 'Препарирование манипуляции', color: '#ef4444' },
  { value: 'planning', label: 'Искусство планирования', color: '#8b5cf6' },
];

export default function InteractiveLiteratureNode({ id, data }: NodeProps<CustomInteractiveNode>) {
  const { setNodes, deleteElements } = useReactFlow();

  const updateNodeData = (field: 'type' | 'comment', value: string) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, [field]: value } };
        }
        return node;
      })
    );
  };

  const selectedTypeConfig = TYPE_OPTIONS.find((opt) => opt.value === data.type);
  const headerColor = selectedTypeConfig ? selectedTypeConfig.color : '#64748b';

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] }); // XYFlow сам удалит и ноду, и все стрелки к ней!
  };

  return (
    <div
      style={{
        padding: '14px',
        borderRadius: '10px',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        fontFamily: 'sans-serif',
        background: '#ffffff',
        border: `1px solid ${headerColor}`,
        borderTop: `6px solid ${headerColor}`,
        width: '280px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    //   className="nodrag"
    >
      <Handle type="target" position={Position.Left} style={{ background: '#cbd5e1' }} />

      <button 
        onClick={handleDelete}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'none',
          border: 'none',
          color: '#ef4444',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
        title="Удалить узел"
      >
        ✕
      </button>
      <div style={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '32px'}}>
        <div title={data.type || ''} style={{
          position: 'absolute',
          left: 0,
          fontSize: '12px',
          color: '#475569',
          backgroundColor: '#f1f5f9',
          padding: '4px 10px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          maxWidth: '30%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {data.type || ''}
        </div>

        <div style={{
          fontSize: '12px', fontWeight: 'bold', color: '#475569',
          // paddingLeft: '92px',
          // paddingRight: '92px',
          textAlign: 'center'
        }}>
          {data.titlePlaceholder || 'Анализ подтемы'}
        </div>
      </div>

      {/* Селект типа анализа */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <select
          value={data.type || ''}
          onChange={(e) => updateNodeData('type', e.target.value)}
          style={{
            padding: '6px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '13px',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="" disabled>-- Выберите тип --</option>
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Текстовое описание / комментарий */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <textarea
          rows={4}
          value={data.comment || ''}
          onChange={(e) => updateNodeData('comment', e.target.value)}
          placeholder="Описание (напр. Гроза, предвестник столкновения двух сил...)"
          style={{
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '13px',
            resize: 'vertical',
            outline: 'none',
            fontFamily: 'inherit'
          }}
        />
      </div>

      <Handle type="source" position={Position.Right} style={{ background: '#cbd5e1' }} />
    </div>
  );
}
