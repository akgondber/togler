import React, { useCallback } from "react";
import { Handle, Position, useReactFlow } from '@xyflow/react';

export function TextInputNode({ id, data }: any) {
    const { updateNodeData } = useReactFlow();

    const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData(id, { label: evt.target.value });
    }, [id, updateNodeData]);

    return (
        <div style={{
            padding: '10px',
            borderRadius: '5px',
            background: '#fff',
            border: '1px solid #ddd',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
            <Handle type="target" position={Position.Top} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '12px', color: '#777' }}>Имя узла</label>
                <input
                    type="text"
                    value={data.label || ''}
                    onChange={onChange}
                    className="nodrag"
                    style={{
                        padding: '4px 8px',
                        border: '1px solid #ccc',
                        borderRadius: '3px',
                        outline: 'none'
                    }}
                />
            </div>
        </div>
    )
} 
