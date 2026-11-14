import { type Node, type BuiltInNode } from '@xyflow/react';

// Доступные типы аналитики
export type AnalyticalType = 'psychology' | 'nature' | 'manipulation' | 'planning';

// Данные для интерактивного аналитического узла
export type InteractiveNodeData = {
  type?: AnalyticalType;
  comment?: string;
  titlePlaceholder?: string;
};

// Данные для узла-категории (топика)
export type TopicNodeData = {
  label: string;
  color?: string;
  textColor?: string;
  bgColor?: string;
};

export type GroupNodeData = {
  label: string;
  description: string;
  descriptions?: string[];
  tag: string;
  tagBgColor: string;
  tagColor: string;
};

export type EditableTopicNodeData = {
  label: string;
  text: string;
  onChangeText?: (id: string, newText: string) => void;
}

// Регистрируем наши кастомные узлы в TypeScript
export type CustomInteractiveNode = Node<InteractiveNodeData, 'interactiveLiterature'>;
export type CustomTopicNode = Node<TopicNodeData, 'topicNode'>;
export type CustomGroupNode = Node<GroupNodeData, 'chapterGroup'>; // Узел-группа

// Единый тип для всех нод на канвасе
export type AppNode = BuiltInNode | CustomInteractiveNode | CustomTopicNode | CustomGroupNode;


// import {
//     type BuiltInNode
// } from '@xyflow/react';
// import { type CustomInteractiveNode } from './flow/InteractiveNodeData';
// import { type CustomLiteratureNode } from './flow/LiteratureNode';

// type AppNode = BuiltInNode | CustomInteractiveNode | CustomLiteratureNode;

// export type {
//     AppNode
// };
