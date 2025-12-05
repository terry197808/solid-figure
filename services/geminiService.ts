import { QuizQuestion, ShapeType } from "../types";

// Static Riddle Database
const RIDDLES: Record<ShapeType, string[]> = {
  [ShapeType.CUBE]: [
    "我是方方正正的，有6个大小一样的脸，怎么滚都滚不远。",
    "魔方就是我的样子，我有8个角，6个正方形的面。",
    "堆积木时我最听话，一个个叠起来，稳稳当当不倒塌。"
  ],
  [ShapeType.CUBOID]: [
    "我长得像个牙膏盒，虽然有6个面，但它们不都一样大。",
    "冰箱、砖头都是我，相对的脸儿一样大，长长方方好堆叠。",
    "我有8个尖尖的角，身体长长的，躺下容易站起难。"
  ],
  [ShapeType.CYLINDER]: [
    "我像一根胖胖的柱子，上下两个圆脸蛋，躺下就能滚得远。",
    "可乐罐、水杯都是我，站着稳稳当当，躺下溜之大吉。",
    "我不像球那样到处乱跑，我只能前后滚，因为我有一件弯弯的衣服。"
  ],
  [ShapeType.SPHERE]: [
    "圆圆滚滚就是我，没有角也没有平平的面，踢我一脚跑得快。",
    "我是足球也是篮球，不管怎么放，样子都一样。",
    "我想堆高高最困难，因为我实在太爱动了，一碰就滚走。"
  ],
  [ShapeType.CONE]: [
    "我戴着尖尖的帽子，脚下踩着圆圆的轮子，像个美味的冰淇淋。",
    "雪糕筒是我的兄弟，底面圆圆的，头顶尖尖的。",
    "我能转圈圈，也能立正站好，但没法像积木那样堆得很高。"
  ]
};

export const generateShapeRiddle = async (shape: ShapeType): Promise<string> => {
  // Simulate a tiny delay for effect
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const riddles = RIDDLES[shape];
  return riddles[Math.floor(Math.random() * riddles.length)];
};

// Static Quiz Database
const QUIZ_POOL: QuizQuestion[] = [
  {
    question: "下面哪个物体是圆柱体？",
    options: ["篮球", "魔方", "可乐罐", "雪糕筒"],
    correctAnswer: "可乐罐",
    explanation: "可乐罐上下一样粗，上下都是圆圆的平面，侧面是曲面。"
  },
  {
    question: "魔方是什么形状的？",
    options: ["长方体", "正方体", "球体", "圆锥体"],
    correctAnswer: "正方体",
    explanation: "魔方的六个面都是一样大的正方形，所以它是正方体。"
  },
  {
    question: "下面哪个形状最容易滚动？",
    options: ["正方体", "长方体", "球体", "圆锥体"],
    correctAnswer: "球体",
    explanation: "球体圆圆滚滚的，没有平平的面，所以最容易滚动。"
  },
  {
    question: "生日帽通常是什么形状？",
    options: ["圆柱体", "圆锥体", "正方体", "球体"],
    correctAnswer: "圆锥体",
    explanation: "生日帽底面是圆的，上面是尖尖的，这是圆锥体的特点。"
  },
  {
    question: "牙膏盒通常是什么形状？",
    options: ["正方体", "长方体", "圆柱体", "球体"],
    correctAnswer: "长方体",
    explanation: "牙膏盒长长方方的，相对的面一样大，是长方体。"
  },
  {
    question: "数学书的封面是什么形状？",
    options: ["长方形", "正方形", "圆形", "三角形"],
    correctAnswer: "长方形",
    explanation: "数学书的封面是平平的长方形哦（注意是平面图形）。"
  },
  {
    question: "哪个图形有6个平平的面，而且每个面都一样大？",
    options: ["长方体", "正方体", "圆柱体", "球体"],
    correctAnswer: "正方体",
    explanation: "只有正方体的6个面都是完全一样的正方形。"
  },
  {
    question: "圆柱体有几个平平的面？",
    options: ["1个", "2个", "3个", "没有"],
    correctAnswer: "2个",
    explanation: "圆柱体的上面和下面是两个圆圆的平面。"
  }
];

export const generateQuizQuestion = async (): Promise<QuizQuestion> => {
  // Simulate a tiny delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return QUIZ_POOL[Math.floor(Math.random() * QUIZ_POOL.length)];
};