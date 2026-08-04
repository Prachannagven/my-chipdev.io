export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type TestCase = {
  label: string;
  input: string;
  expectedOutput: string;
  notes?: string;
};

export type QuestionMeta = {
  id: string;
  title: string;
  difficulty: Difficulty;
  visibleCount: number;
  hiddenCount: number;
  fileName: string;
  summary: string;
  publicCases: TestCase[];
};
