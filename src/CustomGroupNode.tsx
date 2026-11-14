import React from 'react';
import { Handle, NodeResizeControl, NodeResizer, Position, useReactFlow, type NodeProps } from '@xyflow/react';
import { type CustomGroupNode as CustomGroupNodeType } from './types';
import { SunIcon } from '@radix-ui/react-icons';

// export default function CustomGroupNode({ id, data, selected }: NodeProps<CustomGroupNodeType>) {
//   return (
//     <>
//       {/* 
//         Помещаем ресайзер на верхний уровень фрагмента.
//         Поскольку у родительского контейнера XYFlow нет отступов, 
//         линии и маркеры встанут идеально на границы dashed-рамки.
//       */}
//       <NodeResizer 
//         nodeId={id} 
//         minWidth={300} 
//         minHeight={200} 
//         color="#8b5cf6" 
//         isVisible={selected} 
//       />
      
//       {/* 
//         Внутренний контент узла группы.
//         Убираем отсюда рамки и фоны — они уже рендерятся через style из App.tsx
//       */}
//       <div style={{ padding: '12px', fontFamily: 'sans-serif' }}>
//         <div style={{ 
//           fontSize: '14px', 
//           fontWeight: 'bold', 
//           color: '#6d28d9', 
//           textTransform: 'uppercase',
//           pointerEvents: 'none' // Отключаем перехват событий мыши текстом
//         }}>
//           {data.label}
//         </div>
//       </div>
//     </>
//   );
// }

function ResizeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#ff0071"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: 'absolute', right: 5, bottom: 5 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="16 20 20 20 20 16" />
      <line x1="14" y1="14" x2="20" y2="20" />
      <polyline points="8 4 4 4 4 8" />
      <line x1="4" y1="4" x2="10" y2="10" />
    </svg>
  );
}

// export default function CustomGroupNode({ id, data, selected }: NodeProps<CustomGroupNodeType>) {
//   return (
//     <div
//       // style={{
//       //   width: '100%',
//       //   height: '100%',
//       //   backgroundColor: 'rgba(241, 245, 249, 0.5)', // Полупрозрачный фон
//       //   border: '2px dashed #8b5cf6',
//       //   borderRadius: '12px',
//       //   boxSizing: 'border-box',
//       //   padding: '12px',
//       //   fontFamily: 'sans-serif',
//       //   // КРИТИЧЕСКИ ВАЖНО: Делаем контейнер относительным, 
//       //   // чтобы ресайзер позиционировался точно по его краям
//       //   position: 'relative', 
//       // }}
//        style={{
//         position: 'relative',
//         padding: '14px',
//         borderRadius: '10px',
//         boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
//         fontFamily: 'sans-serif',
//         background: '#ffffff',
//         border: `1px solid #90cf90`,
//         borderTop: `6px solid #19e2a0`,
//         width: '200px',
//         // height: '200px',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '10px',
//       }}
//     >
//       {/* Заголовок группы */}
//       {/* <div style={{ 
//         fontSize: '14px', 
//         fontWeight: 'bold', 
//         color: '#6d28d9', 
//         textTransform: 'uppercase',
//         // pointerEvents: 'none' // Мышь не будет "спотыкаться" о текст при перетаскивании
//       }}>
//         {data.label}
//       </div> */}

//       {/* 
//         Помещаем NodeResizer в самый конец разметки внутри контейнера.
//         Благодаря position relative контейнера, он идеально встанет на внешние границы.
//       */}
//       <Handle type="target" id="t-1" position={Position.Left} style={{ background: '#cbd5e1' }} />
//       <Handle type="target" id="t-2" position={Position.Top} style={{ background: '#3bd321' }} />
//       <Handle type="target" id="t-3" position={Position.Right} style={{ background: '#3bd321' }} />
//       <NodeResizeControl minWidth={100} minHeight={80}>
//         <SunIcon />
//       </NodeResizeControl>
      
//       <NodeResizer 
//         nodeId={id}
//         minWidth={300} 
//         minHeight={200} 
//         color="#8b5cf6" 
//         isVisible={selected} 
//         lineStyle={{ borderTop: 'solid', strokeWidth: 1.2 }} // делает линии ресайза более явными
//         handleStyle={{ width: 10, height: 10, borderRadius: '3px',  background: '#8b5cf6' }} // увеличиваем угловые маркеры для удобства захвата
//       />
//       <div style={{position: 'relative', backgroundColor: data.tagBgColor === null ? '#01d509' : data.tagBgColor, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '32px'}}>
//         <div title={`My tag`} style={{
//           position: 'absolute',
//           left: 0,
//           fontSize: '12px',
//           color: data.tagColor || '#137333',
//           backgroundColor: data.tagBgColor || '#E6F4EA',
//           padding: '4px 10px',
//           borderRadius: '12px',
//           border: '1px solid #e2e8f0',
//           maxWidth: '30%',
//           whiteSpace: 'nowrap',
//           overflow: 'hidden',
//           textOverflow: 'ellipsis'
//         }}>
//           {data.tag || 'Note'}
//         </div>

//         <div style={{
//           fontSize: '12px', fontWeight: 'bold',
//           // color: '#475569',
//           // paddingLeft: '92px',
//           // paddingRight: '92px',
//           textAlign: 'center'
//         }}>
//           {data.label || 'Анализ подтемы'}
//         </div>
//       </div>
//       <div style={{ 
//         fontSize: '14px', 
//         fontWeight: 'bold', 
//         color: '#6d28d9', 
//         textTransform: 'uppercase',
//         pointerEvents: 'none' 
//       }}>
//         {data.description}
//       </div>
      
//     </div>
//   );
// }

// export default function CustomGroupNode({ id, data, selected }: NodeProps<CustomGroupNodeType>) {
//   return (
//     <>
//       {/* Компонент, который делает узел растягиваемым */}
//       <NodeResizer
//         nodeId={id}
//         minWidth={300} 
//         minHeight={200} 
//         color="#8b5cf6" // Цвет рамки ресайза (фиолетовый)
//         isVisible={selected} // Показывать маркеры только когда группа кликнута/выбрана
//       />
      
//       {/* Стилизованный HTML-контейнер нашей Главы */}
//       <div
//         style={{
//           width: '100%',
//           height: '100%',
//         //   backgroundColor: 'rgba(241, 245, 249, 0.5)', // Полупрозрачный Slate-100
//         //   border: '2px dashed #8b5cf6',
//         //   borderRadius: '12px',
//           boxSizing: 'border-box',
//           padding: '12px',
//         //   fontFamily: 'sans-serif',
//         }}
//       >
//         {/* Заголовок группы */}
//         <div style={{ 
//           fontSize: '14px', 
//           fontWeight: 'bold', 
//           color: '#6d28d9',
//           textTransform: 'uppercase',
//           letterSpacing: '0.5px'
//         }}>
//           {data.label}
//         </div>
//       </div>
//     </>
//   );
// }

// export default function CustomGroupNode( { id, data, selected }: NodeProps<CustomGroupNodeType>) {
//   return (
//     <>
//       <NodeResizer 
//         nodeId={id} 
//         minWidth={300} 
//         minHeight={200} 
//         color="#8b5cf6" 
//         isVisible={selected} 
//       />
    
//       <div
//         style={{
//           position: 'relative', // ОБЯЗАТЕЛЬНО: чтобы тег позиционировался относительно ноды
//           width: '300px',       // Или ваши размеры
//           height: '180px',
//           border: '1px solid #000000',
//           backgroundColor: '#ffffff',
//           boxSizing: 'border-box',
//           padding: '15px',      // Внутренний отступ для основного контента
//         }}
//       >
//         {/* --- НАЧАЛО ТЕГА --- */}
//         <div
//           title={data.tag || 'My tag'}
//           style={{
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             fontSize: '12px',
//             color: data.tagColor || '#000000',
//             backgroundColor: data.tagBgColor || '#ffffff',
//             padding: '4px 20px', // Вертикальные и горизонтальные отступы внутри тега
//             borderLeft: '1px solid #000000',   // Левая граница тега
//             borderBottom: '1px solid #000000', // Нижняя граница тега
//             whiteSpace: 'nowrap',
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//             maxWidth: '50%', // Чтобы тег не перекрывал весь верх ноды при длинном тексте
//           }}
//         >
//           {data.tag || 'My tag'}
//         </div>
//         {/* --- КОНЕЦ ТЕГА --- */}
//         <NodeResizer 
//           nodeId={id}
//           minWidth={300} 
//           minHeight={200} 
//           color="#8b5cf6" 
//           isVisible={selected} 
//           lineStyle={{ borderTop: 'solid', strokeWidth: 1.2 }} // делает линии ресайза более явными
//           handleStyle={{ width: 10, height: 10, borderRadius: '3px',  background: '#8b5cf6' }} // увеличиваем угловые маркеры для удобства захвата
//         />

//         {/* Контент ноды (Заголовок, описание и т.д.) */}
//         <div style={{ marginTop: '20px' }}>
//           <div style={{ backgroundColor: '#0f172a', color: '#fff', padding: '2px 6px', display: 'inline-block' }}>
//             The Savior Complex Can Destroy the Savior
//           </div>
          
//           <div style={{ marginTop: '30px', textAlign: 'center' }}>
//             <span style={{ border: '1px dashed #38bdf8', padding: '6px 12px' }}>
//               Some description
//             </span>
//           </div>
//         </div>

//         {/* Точки подключения (Handles) при необходимости */}
//         <Handle type="target" position={Position.Top} />
//         <Handle type="source" position={Position.Bottom} />
//       </div>
//     </>
//   );
// }

// export default function CustomNode({ id, data, selected }: NodeProps<CustomGroupNodeType>) {
//   return (
//     <div
//       style={{
//         position: 'relative',
//         // Задаем 100% ширины и высоты, чтобы нода заполняла 
//         // размеры, которые ей диктует NodeResizer
//         width: '100%',
//         height: '100%',
//         // Минимальные размеры, чтобы пользователь не свернул ноду в ноль
//         minWidth: '260px',
//         minHeight: '180px',
//         border: '1px solid #000000',
//         backgroundColor: '#ffffff',
//         boxSizing: 'border-box',
//         padding: '15px',
//         display: 'flex',
//         flexDirection: 'column'
//       }}
//     >
//       {/* 1. Компонент ресайзера.isVisible включается только когда нода выбрана */}
//       <NodeResizer 
//         color="#38bdf8" 
//         minWidth={260} 
//         minHeight={180} 
//         isVisible={selected} 
//       />

//       {/* 2. Тэг в правом верхнем углу (остается на месте при растягивании) */}
//       <div
//         title={data.tag || 'My tag'}
//         style={{
//           position: 'absolute',
//           top: 0,
//           right: 0,
//           fontSize: '12px',
//           color: data.tagColor || '#000000',
//           backgroundColor: data.tagBgColor || '#ffffff',
//           padding: '4px 20px',
//           borderLeft: '1px solid #000000',
//           borderBottom: '1px solid #000000',
//           whiteSpace: 'nowrap',
//           overflow: 'hidden',
//           textOverflow: 'ellipsis',
//           maxWidth: '50%',
//           zIndex: 1, // Чтобы тег был поверх маркеров ресайза, если они пересекутся
//         }}
//       >
//         {data.tag || 'My tag'}
//       </div>

//       {/* 3. Контент ноды */}
//       <div style={{
//         marginTop: '40px',
//       }}>
//         <span style={{ backgroundColor: '#0f172a', color: '#fff', padding: '2px 6px', display: 'inline-block' }}>
//           The Savior Complex Can Destroy the Savior
//         </span>
        
//         {/* Центрируем описание внутри оставшегося пространства */}
//         <div style={{
//           marginTop: '18px',
//           marginBottom: '15px',
//           textAlign: 'center'
//         }}>
//           <span style={{ border: '1px dashed #38bdf8', padding: '6px 12px' }}>
//             Some description
//           </span>
//         </div>
//       </div>

//       <Handle type="target" position={Position.Top} />
//       <Handle type="source" position={Position.Bottom} />
//     </div>
//   );
// }

export default function CustomNode({ id, data, selected }: NodeProps<CustomGroupNodeType>) {
  const { setNodes, deleteElements } = useReactFlow();
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] }); // XYFlow сам удалит и ноду, и все стрелки к ней!
  };
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

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minWidth: '260px',
        minHeight: '180px',
        maxWidth: '520px',
        border: '1px solid #000000',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <NodeResizer 
        color="#38bdf8" 
        minWidth={260} 
        minHeight={180} 
        isVisible={selected} 
      />

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

      {/* Тэг в правом верхнем углу */}
      <div
        title={data.tag || 'My tag'}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          fontSize: '12px',
          color: data.tagColor || '#01f5f9',
          backgroundColor: data.tagBgColor || '#334155',
          padding: '0px 20px',
          // borderLeft: '1px solid #000000',
          // borderBottom: '1px solid #4a2626',
          borderStyle: 'solid',
          borderWidth: '0 1px 1px 0', 
          borderColor: '#000000',
          borderBottomRightRadius: '12px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '50%',
          zIndex: 1, 
        }}
      >
        {data.tag || 'My tag'}
      </div>

      {/* 1. ЗАГОЛОВОК: Опускаем его на 40px ниже верхнего края, чтобы освободить место под тег */}
      {
        true ?
          <div style={{ marginTop: '40px' }}>
            <span style={{ backgroundColor: '#0f172a', color: '#fff', padding: '4px 8px', display: 'inline-block' }}>
              
              {data.label || 'The Savior Complex Can Destroy the Savior'}
            </span>
          </div> :
          <input type="text" value={data.label} />
      }
        
      {/* 2. ОПИСАНИЕ: Четкий фиксированный margin от заголовка */}
      {
        typeof data.descriptions !== 'undefined' ?
          data.descriptions.map((cr) => {
            return <div style={{
              marginTop: '20px', // Увеличили отступ, чтобы описание гарантированно ушло ниже
              marginBottom: '12px',
              textAlign: 'justify'
            }}>
              <span style={{ border: '1px dashed #38bdf8', padding: '6px 12px', display: 'inline-block' }}>
                {cr || 'Some description'}
              </span>
            </div>
          }
        ) :
        <div style={{
          marginTop: '20px', // Увеличили отступ, чтобы описание гарантированно ушло ниже
          marginBottom: '12px',
          textAlign: 'justify'
        }}>
          <span style={{ border: '1px dashed #38bdf8', padding: '6px 12px', display: 'inline-block' }}>
            {data.description || 'Some description'}
          </span>
        </div>
      }
      

      <Handle type="target" id="target-top" position={Position.Top} />
      <Handle type="target" id="target-left" position={Position.Left} />
      <Handle type="target" id="target-right" position={Position.Right} />
      <Handle type="target" id="target-bottom" position={Position.Bottom} />
    </div>
  );
}
