export enum ShapeType {
  CUBE = '正方体',
  CUBOID = '长方体',
  CYLINDER = '圆柱体',
  SPHERE = '球体',
  CONE = '圆锥体'
}

export interface ShapeDef {
  id: ShapeType;
  name: string;
  description: string;
  color: string;
  emoji: string;
  characteristics: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const SHAPE_DATA: ShapeDef[] = [
  {
    id: ShapeType.CUBE,
    name: '正方体 (Cube)',
    description: '方方正正，六个面都一样大。',
    color: 'bg-red-400',
    emoji: '🧊',
    characteristics: ['6个平平的面', '每个面都是正方形', '有8个角']
  },
  {
    id: ShapeType.CUBOID,
    name: '长方体 (Cuboid)',
    description: '长长方方，相对的面一样大。',
    color: 'bg-blue-400',
    emoji: '📦',
    characteristics: ['6个平平的面', '相对的面大小一样', '有8个角']
  },
  {
    id: ShapeType.CYLINDER,
    name: '圆柱体 (Cylinder)',
    description: '上下一样粗，横放能滚动。',
    color: 'bg-green-400',
    emoji: '🔋',
    characteristics: ['上下两个圆面', '身体是曲面', '容易滚动']
  },
  {
    id: ShapeType.SPHERE,
    name: '球体 (Sphere)',
    description: '圆圆滚滚，哪里都能滚。',
    color: 'bg-yellow-400',
    emoji: '⚽',
    characteristics: ['没有平平的面', '到处都能滚动', '没有角']
  },
  {
    id: ShapeType.CONE,
    name: '圆锥体 (Cone)',
    description: '头尖尖，底圆圆。',
    color: 'bg-purple-400',
    emoji: '🎉',
    characteristics: ['底面是圆形', '有一个尖尖的头', '侧面是曲面']
  }
];