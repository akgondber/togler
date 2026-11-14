import React from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';

// 1. Определяем типы литературных сущностей
export type LiteratureNodeType = 'theme' | 'problem' | 'plot' | 'moral';

// 2. Описываем, какие данные (data) будут храниться внутри узла
export type LiteratureNodeData = {
  type: LiteratureNodeType;
  label: string;
  description?: string;
};

// 3. Создаем тип для самого узла, который пригодится в основном канвасе
export type CustomLiteratureNode = Node<LiteratureNodeData, 'literature'>;

// Настройки стилей для каждого типа
const TYPE_STYLES: Record<LiteratureNodeType, { border: string; background: string; title: string }> = {
  theme: { border: '2px solid #3b82f6', background: '#eff6ff', title: 'Главная тема' },
  problem: { border: '2px solid #ef4444', background: '#fef2f2', title: 'Проблема' },
  plot: { border: '2px solid #10b981', background: '#ecfdf5', title: 'Сюжетная суть' },
  moral: { border: '2px solid #8b5cf6', background: '#f5f3ff', title: 'Мораль / Вывод' },
};

// 4. Компонент узла. NodeProps автоматически типизирует входящий `data`
export default function LiteratureNode({ data }: NodeProps<CustomLiteratureNode>) {
  const currentStyle = TYPE_STYLES[data.type] || { 
    border: '2px solid #94a3b8', 
    background: '#f8fafc', 
    title: 'Элемент' 
  };

  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        fontFamily: 'sans-serif',
        maxWidth: '250px',
        ...currentStyle
      }}
    >
      {/* Точка входа для стрелок слева */}
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
      
      {/* HTML-содержимое узла */}
      <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', marginBottom: '4px', fontWeight: 'bold' }}>
        {currentStyle.title}
      </div>
      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', lineHeight: '1.4' }}>
        {data.label}
      </div>
      {data.description && (
        <p style={{ fontSize: '12px', color: '#475569', margin: '6px 0 0 0', borderTop: '1px dashed #cbd5e1', paddingTop: '6px' }}>
          {data.description}
        </p>
      )}

      {/* Точка выхода для стрелок справа */}
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
    </div>
  );
}
