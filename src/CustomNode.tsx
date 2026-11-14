import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
 
const CustomNode = ({ data }: any) => {
  return (
    <>
 
      <Handle type="target" position={Position.Left} />
      <div style={{width: '300px'}}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};
 
export default memo(CustomNode);
