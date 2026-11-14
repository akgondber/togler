import React, { useState, useCallback } from 'react';
import { 
  useNodesState, 
  useEdgesState, 
  addEdge, 
  ReactFlowProvider, 
  type Connection, 
  type Edge
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import env from './env';
// Импортируем наш оберточный компонент канваса
import LiteratureFlow from './LiteratureFlow';

// Импортируем наши кастомные HTML-компоненты узлов

// Импортируем общие типы (из созданного ранее файла types.ts)
import { type AppNode, type AnalyticalType } from './types';


const initialNodes: AppNode[] = env.mode !== 'development' ? [] : [
  {
    id: 'destruction-topic',
    type: 'topicNode',
    data: { label: 'Destruction', color: '#10b981', bgColor: '#0284c7', textColor: '#ffffff' },
    position: { x: 1780, y: 620 },
  },
  {
    id: 'decay-topic',
    type: 'topicNode',
    data: { label: 'Decay', color: '#e0b981', bgColor: '#064e3b', textColor: '#34d399' },
    position: { x: 690, y: 620 },
  },
  {
    id: 'wealth-topic',
    type: 'topicNode',
    data: { label: 'Wealth', color: '#34d399', bgColor: '#7e22ce', textColor: '#ffffff' },
    position: { x: 1360, y: 610 },
  },
  {
    id: 'talent-topic',
    type: 'topicNode',
    data: { label: 'Loss of talent', color: '#001981', bgColor: '#4c0519', textColor: '#f472b6' },
    position: { x: 1070, y: 1200 },
  },
  {
    id: 'purpose-topic',
    type: 'topicNode',
    data: { label: 'purpose', color: '#001981', bgColor: '#fff1f2', textColor: '#9f1239' },
    position: { x: 1470, y: 1200 },
  },
  {
    id: 'buying-person-topic',
    type: 'topicNode',
    data: { label: 'purpose', color: '#001981', bgColor: '#fff1f2', textColor: '#9f1239' },
    position: { x: 1470, y: 1200 },
  },
  {
    id: 'relationships-topic',
    type: 'topicNode',
    data: { label: 'Relationships', color: '#001981', bgColor: '#f1f5f9', textColor: '#334155' },
    position: { x: 2250, y: 50 },
  },
  {
    id: 'capitalism-topic',
    type: 'topicNode',
    data: { label: 'capitalism', textColor: '#ffffff', bgColor: '#4c1d95' },
    position: { x: 1800, y: 1200 },
  },
  {
    id: 'bourgeoisie-topic',
    type: 'topicNode',
    data: { label: 'bourgeoisie', color: '#001981', bgColor: '#6b21a8', textColor: '#f3e8ff' },
    position: { x: 870, y: 1200 },
  },
  {
    id: 'proletariat-topic',
    type: 'topicNode',
    data: { label: 'proletariat', color: '#001981', bgColor: '#b91c1c', textColor: '#ffffff' },
    position: { x: 650, y: 1200 },
  },
  {
    id: 'brokenness-topic',
    type: 'topicNode',
    data: { label: 'brokenness', color: '#001981', bgColor: '#1a2e05', textColor: '#a3e635' },
    position: { x: 2090, y: 1200 },
  },
  {
    id: 'custom-group-1',
    type: 'chapterGroup',
    data: {
        tag: 'lifelesson',
        label: 'The Savior Complex Can Destroy the Savior',
        description: 'This is a story about',
        descriptions: [
            'Being needed can intoxicate a person more deeply than being loved. Dick builds his entire identity around "saving" Nicole, performing emotional labor to sustain her.',
            'In the process of fixing her, Dick completely depletes his own vital energy, illustrating that sacrificing yourself entirely to heal another person ultimately leads to your own erasure.'
        ],
        tagColor: '#e0f2fe',
        tagBgColor: '#1e3a8a'
    },
    selected: false,
    position: { x: 260, y: 150 }
  },
  {
    id: 'custom-group-2',
    type: 'chapterGroup',
    data: {
        tag: 'lifelesson',
        label: 'True Human Decay Happens Gradually, Not Suddenly',
        description: '',
        descriptions: [
            'Destruction rarely arrives via a single catastrophic event; it happens through accumulation. Dick’s alcoholism, loss of professional focus, and social alienation compound quietly.',
            'He does not die a legendary, heroic death. He simply fades into obscurity, moving from town to town in upstate New York. It is a stark reminder that we must monitor our subtle boundary slips before they become irreversible slides.',
        ],
        tagColor: '#e0f2fe',
        tagBgColor: '#1e3a8a'
    },
    selected: false,
    position: { x: 900, y: 150 }
  },
  {
    id: 'custom-group-3',
    type: 'chapterGroup',
    data: {
        tag: 'lifelesson',
        label: 'Wealth Insulates, But It Does Not Cure',
        description: '',
        descriptions: [
            'Money buys insulation from accountability, but it cannot buy freedom from internal trauma. Nicole’s family uses their vast wealth to "buy" Dick as a live-in doctor and husband.',
        ],
        tagColor: '#e0f2fe',
        tagBgColor: '#1e3a8a'
    },
    selected: false,
    position: { x: 1620, y: 140 }
  },
  {
    id: 'custom-group-4',
    type: 'chapterGroup',
    data: {
        tag: 'lifelesson',
        label: 'Transferred Vitality and Changing Power Dynamics',
        description: '',
        descriptions: [
            'Relationships are rarely static; the balance of power and emotional dependency can completely invert. As the marriage progresses, a parasitic transference occurs. Nicole gradually absorbs Dick’s strength, confidence, and sanity to heal herself.',
            'By the end of the novel, Nicole is cured and robust, blooming into independence, while Dick is left an empty shell. Fitzgerald warns us to ensure our relationships are mutually reinforcing rather than predatory.'
        ],
        tagColor: '#e0f2fe',
        tagBgColor: '#1e3a8a'
    },
    selected: false,
    position: { x: 2220, y: 210 }
  },
  {
    id: 'custom-group-5',
    type: 'chapterGroup',
    data: {
        tag: 'Moral violation',
        label: 'The Immorality of Using Wealth to "Buy" a Savior',
        description: '',
        descriptions: [
            'The Warren family uses their immense wealth to ethically compromise Dick Diver. They do not just seek medical help for Nicole; they effectively buy a brilliant young psychiatrist to absorb her trauma and anchor her reality.',
        ],
        tagColor: '#92400e',
        tagBgColor: '#fef3c7'
    },
    selected: false,
    position: { x: 530, y: 850 }
  },
  {
    id: 'custom-group-6',
    type: 'chapterGroup',
    data: {
        tag: 'Moral violation',
        label: 'The Hubris of the "Savior Complex"',
        description: '',
        descriptions: [
            'Dick confuses a desire to control and be worshiped with genuine, healthy love. He allows his "arsenal" of intellect and purpose to be locked away in the service of hedonism and codependency.',
            'It is a moral hazard to base your entire identity on the vulnerability of another person. When you tie your self-worth to keeping someone else fragile enough to need you, you eventually bankrupt your own soul.'
        ],
        tagColor: '#92400e',
        tagBgColor: '#fef3c7'
    },
    selected: false,
    position: { x: 1320, y: 750 }
  },
  {
    id: 'custom-group-7',
    type: 'chapterGroup',
    data: {
        tag: 'Marxist\'s theory',
        label: 'In a capitalist framework, everything - including intellect, empathy, and psychological expertise is commodified.',
        description: '',
        descriptions: [
            'Dick Diver represents the apex of the intellectual proletariat. He has no generational wealth; his only capital is his brilliant mind, his rigorous training, and his emotional labor. The ultra-wealthy Warren family (Baby and Nicole) recognizes that Nicole needs a permanent psychological anchor.',
            'Instead of hiring a doctor, the bourgeoisie uses its immense capital to buy the means of production. Baby Warren explicitly views Dick as a purchased asset meant to service their family\'s private crisis.'
        ],
        tagColor: '#fef3c7',
        tagBgColor: '#92400e'
    },
    selected: false,
    position: { x: 500, y: 1350 }
  },
  {
    id: 'custom-group-8',
    type: 'chapterGroup',
    data: {
        tag: 'Marxist\'s theory',
        label: 'The Trap of Bourgeois Hedonism (Alienation from Purpose)',
        description: '',
        descriptions: [
            "Once Dick is absorbed into the Warrens' billionaire lifestyle on the French Riviera, his relationship to his actual work changes drastically. Marx argued that capitalism alienates workers from their labor. " +
                "By funding Dick's lifestyle, the elite alienate the intellectual from his true societal purpose (advancing psychiatry and healing the public).",
            'The endless parties, expensive dinners, and yachts act as a gilded cage. Dick stops writing his breakthrough medical books and instead uses his immense genius to curate perfect dinner parties and manage the moods ' +
                'of wealthy socialites. His talent is stripped of its societal value and reduced to luxury entertainment for the rich.'
        ],
        tagColor: '#ffffff',
        tagBgColor: '#16a34a'
    },
    selected: false,
    position: { x: 1100, y: 1350 }
  },
  
//   {
//     id: 'custom-group-3',
//     type: 'chapterGroup',
//     data: {
//         label: 'Manipulation',
//         description: 'My desc'
//     },
//     selected: false,
//     position: { x: 480, y: 520 }
//   },
  {
    id: 'custom-node-1',
    type: 'customNode',
    data: {
        label: 'Prinz',
    },
    selected: false,
    position: { x: 900, y: 2990 }
  },

  // 2. Первый узел внутри группы ("Психология")
//   {
//     id: 'analysis-psychology-1',
//     type: 'interactiveLiterature',
//     parentId: undefined, // Привязываем к группе!
//     extent: 'parent',            // Не дает перетащить узел за границы группы
//     data: { 
//       type: 'psychology', 
//       comment: 'Описание психологии 1',
//       titlePlaceholder: 'Психологический анализ'
//     },
//     position: { x: 120, y: 460 }, // Координаты относительно группы
//   },

  // 3. Второй узел внутри группы ("Искусство планирования")
//   {
//     id: 'analysis-planning-1',
//     type: 'interactiveLiterature',
//     parentId: undefined, // Привязываем к той же группе!
//     extent: 'parent',
//     data: { 
//       type: 'planning', 
//       comment: 'Описание искусства планирования 1',
//       titlePlaceholder: 'Анализ планирования'
//     },
//     position: { x: 1660, y: 60 }, // Смещаем вправо внутри группы
//   },
//   {
//     id: 'analysis-planning-2',
//     type: 'interactiveLiterature',
//     parentId: undefined, // Привязываем к той же группе!
//     extent: 'parent',
//     data: { 
//       type: 'planning', 
//       comment: 'Описание искусства планирования 2',
//       titlePlaceholder: 'Анализ планирования 2'
//     },
//     position: { x: 1820, y: 460 }, // Смещаем вправо внутри группы
//   },
  {
    id: 'custom-group-9',
    type: 'chapterGroup',
    data: {
        tag: 'Marxist\'s theory',
        label: 'Emotional Parasitism as Class Exploitation',
        description: '',
        descriptions: [
            "The core dynamic of Dick and Nicole's marriage can be viewed as the ultimate form of surplus value extraction.",
            "Just as a factory owner extracts physical labor from a worker until the worker's body is broken, the leisure class extracts emotional and psychological labor from the intellectual. " +
                + "Nicole literally feeds off Dick's mental stability, vitality, and strength to cure her own systemic trauma.",
            'The psychological recovery of the capitalist class is paid for by the total psychological bankruptcy of the intellectual. ' +
                'Once Nicole is fully healed, robust, and self-sufficient, Dick is completely depleted-his "surplus value" has been entirely drained.',
        ],
        tagColor: '#166534',
        tagBgColor: '#f0fdf4'
    },
    selected: false,
    position: { x: 1900, y: 1350 }
  },
  {
    id: 'custom-group-10',
    type: 'chapterGroup',
    data: {
        tag: 'Marxist\'s theory',
        label: 'The Disposable Proletariat',
        description: '',
        descriptions: [
            "Once a worker is no longer productive or useful to the capitalist system, they are discarded without a safety net.",
            'As soon as Nicole is cured and finds a new, wealthy, aristocratic lover, Dick becomes obsolete. ' +
                "The Warrens do not care about Dick's survival; he was merely a tool. He is cast out of the elite circle and exiled back to obscurity in small-town upstate New York, " +
                'professionally ruined and physically broken. The bourgeoisie moves on, untouched and unbothered, while the intellectual worker is left as historical wreckage.',
        ],
        tagColor: '#166534',
        tagBgColor: '#f0fdf4'
    },
    selected: false,
    position: { x: 2500, y: 1350 }
  },
  
];

// 3. Задаем начальные связи между ними
const initialEdges: Edge[] = [
  { 
    id: 'edge-nature-to-thunder', 
    source: 'topic-nature', 
    target: 'analysis-thunderstorm',
    style: { stroke: '#10b981', strokeWidth: 2 } 
  },
  { 
    id: 'edge-destruction-to-group-2', 
    source: 'destruction-topic', 
    target: 'custom-group-2',
    sourceHandle: 's-1',
    targetHandle: 'target-right',
    style: { stroke: '#0284c7', strokeWidth: 1.5 } 
  },
  { 
    id: 'edge-destruction-to-group-10', 
    source: 'destruction-topic', 
    target: 'custom-group-10',
    sourceHandle: 's-3',
    targetHandle: 'target-top',
    style: { stroke: '#0284c7', strokeWidth: 2 } 
  },
  { 
    id: 'edge-talent-to-group-8', 
    source: 'talent-topic', 
    target: 'custom-group-8',
    sourceHandle: 's-3',
    targetHandle: 'target-top',
    style: { stroke: '#4c0519', strokeWidth: 2 } 
  },
  { 
    id: 'edge-capitalism-to-group-7', 
    source: 'capitalism-topic', 
    target: 'custom-group-7',
    sourceHandle: 's-3',
    targetHandle: 'target-top',
    style: { stroke: '#166534', strokeWidth: 2 } 
  },
  { 
    id: 'edge-relationships-to-group-7', 
    source: 'relationships-topic', 
    target: 'custom-group-4',
    sourceHandle: 's-3',
    targetHandle: 'target-top',
    style: { stroke: '#6b21a8', strokeWidth: 2 } 
  },
  { 
    id: 'edge-decay-to-group-1', 
    source: 'decay-topic', 
    target: 'custom-group-1',
    sourceHandle: 's-0',
    targetHandle: 'target-bottom',
    style: { stroke: '#e0b981', strokeWidth: 2 } 
  },
  { 
    id: 'edge-decay-to-group-4', 
    source: 'decay-topic', 
    target: 'custom-group-4',
    sourceHandle: 's-3',
    targetHandle: 'target-bottom',
    style: { stroke: '#e0b981', strokeWidth: 2 } 
  },
  { 
    id: 'edge-decay-to-group-6', 
    source: 'decay-topic', 
    target: 'custom-group-6',
    sourceHandle: 's-3',
    targetHandle: 'target-top',
    style: { stroke: '#e0b981', strokeWidth: 2 } 
  },
  { 
    id: 'edge-decay-to-group-8', 
    source: 'decay-topic', 
    target: 'custom-group-8',
    sourceHandle: 's-3',
    targetHandle: 'target-top',
    style: { stroke: '#e0b981', strokeWidth: 2 } 
  },
  { 
    id: 'edge-wealth-to-group-3', 
    source: 'wealth-topic', 
    target: 'custom-group-3',
    sourceHandle: 's-0',
    targetHandle: 'target-bottom',
    style: { stroke: '#34d399', strokeWidth: 1.5 } 
  },
  { 
    id: 'edge-wealth-to-group-5', 
    source: 'wealth-topic', 
    target: 'custom-group-5',
    sourceHandle: 's-3',
    targetHandle: 'target-top',
    style: { stroke: '#34d399', strokeWidth: 2 } 
  },
  { 
    id: 'edge-capitalism-to-group-10', 
    source: 'capitalism-topic', 
    target: 'custom-group-10',
    sourceHandle: 's-3',
    targetHandle: 'target-top',
    style: { stroke: '#166534', strokeWidth: 2 } 
  },
  { 
    id: 'edge-talent-to-group-8', 
    source: 'talent-topic', 
    target: 'custom-group-8',
    sourceHandle: 's-3',
    targetHandle: 'target-top',
    style: { stroke: '#e0b981', strokeWidth: 2 } 
  },
  { 
    id: 'edge-purpose-to-group-8', 
    source: 'purpose-topic', 
    target: 'custom-group-8',
    sourceHandle: 's-3',
    targetHandle: 'target-top',
    style: { stroke: '#e0b981', strokeWidth: 1.5 } 
  },
  { 
    id: 'edge-proletariat-to-group-7', 
    source: 'proletariat-topic', 
    target: 'custom-group-7',
    sourceHandle: 's-3',
    targetHandle: 'target-top',
    style: { stroke: '#e0b981', strokeWidth: 1.6 } 
  },
  { 
    id: 'edge-bourgeoisie-to-group-7', 
    source: 'bourgeoisie-topic', 
    target: 'custom-group-7',
    sourceHandle: 's-3',
    targetHandle: 'target-top',
    style: { stroke: '#6b21a8', strokeWidth: 2 } 
  },
  { 
    id: 'edge-bourgeoisie-to-group-8', 
    source: 'bourgeoisie-topic', 
    target: 'custom-group-8',
    sourceHandle: 's-3',
    targetHandle: 'target-top',
    style: { stroke: '#6b21a8', strokeWidth: 2 } 
  },
  { 
    id: 'edge-brokenness-to-group-9', 
    source: 'brokenness-topic', 
    target: 'custom-group-9',
    sourceHandle: 's-3',
    targetHandle: 'target-top',
    style: { stroke: '#e0b981', strokeWidth: 2 } 
  },
  { 
    id: 'edge-brokenness-to-group-10', 
    source: 'brokenness-topic', 
    target: 'custom-group-10',
    sourceHandle: 's-3',
    targetHandle: 'target-top',
    style: { stroke: '#e0b981', strokeWidth: 2 } 
  },
//   custom-group-8
];

function AppContent() {
    const addNewChapterGroup = () => {
    const groupId = `group-chapter-${new Date()}`;
    console.log(`__________GRPID ${groupId}`);
    const newGroup: AppNode = {
        id: groupId,
        type: 'chapterGroup',
        data: { label: `Глава ${nodes.filter(n => n.type === 'chapterGroup').length + 1}` },
        position: { x: 30, y: 120 },

        style: {
            // width: 850,
            // height: 800,
            // backgroundColor: 'rgba(241, 245, 249, 0.6)',
            // border: '2px dashed #94a3b8',
            // borderRadius: '12px',
        },
    };
    // const edi: AppNode = {
    //     id: groupId,
    //     type: 'editableTopic',
    //     data: { label: `Глава ${nodes.filter(n => n.type === 'editableTopic').length + 1}` },
    //     position: { x: 950, y: 180 },

    //     style: {
    //         width: 450,
    //         height: 300,
    //         // backgroundColor: 'rgba(241, 245, 249, 0.6)',
    //         // border: '2px dashed #94a3b8',
    //         // borderRadius: '12px',
    //     },
    // };
    

    setNodes((nds) => [...nds.map((el) => (el.id === 'topic-nature' || el.id === 'topic-nature-2') ? {...el, parentId: groupId} : el), newGroup]);
  };
  // Важно: строго указываем типы генериков <AppNode> и <Edge> для хуков состояния
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);

  // Стейты для полей ввода формы создания нового узла
  const [newType, setNewType] = useState<AnalyticalType>('psychology');
  const [newTitle, setNewTitle] = useState('');

  // Обработчик создания связи вручную пользователем на канвасе
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Функция для динамического добавления нового интерактивного узла
  const handleCreateNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const nodeId = `analysis-${Date.now()}`;
    
    const newNode: AppNode = {
      id: nodeId,
      type: 'interactiveLiterature',
    //   parentId: 'group-chapter-1',
      data: { 
        type: newType, 
        comment: '', // Пользователь заполнит текст самостоятельно внутри узла
        titlePlaceholder: newTitle 
      },
      // Позиционируем новую карточку в центре со случайным небольшим смещением
      position: { 
        x: 250 + Math.random() * 100, 
        y: 150 + Math.random() * 100 
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setNewTitle(''); // Очищаем поле ввода названия после добавления
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Верхняя панель управления и манипуляций */}
      <header style={{ 
        padding: '15px 20px', 
        background: '#0f172a', 
        color: 'white', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '16px' }}>LitFlow</div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {/* Форма создания нового узла */}
            <form onSubmit={handleCreateNode} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input 
                type="text" 
                placeholder="Title" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{ 
                padding: '8px 12px', 
                borderRadius: '6px', 
                border: '1px solid #475569', 
                background: '#1e293b', 
                color: 'white',
                outline: 'none',
                fontSize: '14px'
                }}
            />
            
            <select 
                value={newType} 
                onChange={(e) => setNewType(e.target.value as AnalyticalType)}
                style={{ 
                padding: '8px 12px', 
                borderRadius: '6px', 
                border: '1px solid #475569', 
                background: '#1e293b', 
                color: 'white',
                outline: 'none',
                cursor: 'pointer',
                fontSize: '14px'
                }}
            >
                <option value="psychology">Psychology</option>
                <option value="nature">Natural Phenomena</option>
                <option value="manipulation">Dissecting Manipulation</option>
                <option value="planning">The Art of Planning</option>
            </select>

            <button 
                type="submit"
                style={{ 
                padding: '8px 16px', 
                background: '#10b981', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                fontSize: '14px',
                transition: 'background 0.2s'
                }}
            >
                ➕ Add Node
            </button>
            </form>

            <button 
                type="button"
                onClick={addNewChapterGroup}
                style={{ 
                    padding: '8px 16px', 
                    background: '#8b5cf6', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '6px', 
                    cursor: 'pointer', 
                    fontWeight: 'bold'
                }}
                >
                📦 Create Chapter (Group)
                </button>

        </div>

        {/* Кнопка выгрузки текущего состояния графа */}
        <button 
          onClick={() => console.log('Текущая структура для сохранения:', { nodes, edges })}
          style={{ 
            padding: '8px 14px', 
            background: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer', 
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          💾 Log to Console
        </button>
      </header>

      {/* Контейнер холста, занимающий все оставшееся пространство экрана */}
      <div style={{ flexGrow: 1 }}>
        <LiteratureFlow 
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />
      </div>
    </div>
  );
}

// Корневой экспорт приложения оборачивается в ReactFlowProvider,
// чтобы дочерние кастомные узлы могли использовать хук useReactFlow()
export default function App() {
  return (
    <ReactFlowProvider>
      <AppContent />
    </ReactFlowProvider>
  );
}
