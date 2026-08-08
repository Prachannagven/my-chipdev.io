export type QuestionConfig = {
  id: string;
  fileName: string;
  assetBase: string;
  visibleCount: number;
  hiddenCount: number;
};

const entries: Array<[string, string, number, number, string?]> = [
  ['Q01', 'Q01_Simple_Router.md', 2, 3],
  ['Q02', 'Q02_Second_Largest.md', 2, 3],
  ['Q03', 'Q03_Rounding_Division.md', 2, 4],
  ['Q04', 'Q04_Gray_Code_Counter.md', 3, 6],
  ['Q05', 'Q05_Reversing_Bits.md', 2, 3],
  ['Q06', 'Q06_Edge_Detector.md', 1, 3],
  ['Q07', 'Q07_PISO_Shift_Register.md', 2, 3],
  ['Q08', 'Q08_SIPO_Shift_Register.md', 2, 3],
  ['Q09', 'Q09_Fibonacci_Generator.md', 1, 3],
  ['Q10', 'Q10_Counting_Ones.md', 2, 3],
  ['Q11', 'Q11_GrayCode_To_Binary.md', 2, 4],
  ['Q12', 'Q12_Trailing_Zeroes.md', 2, 3],
  ['Q13', 'Q13_OneHot_Detector.md', 2, 3],
  ['Q14', 'Q14_Stopwatch_Timer.md', 2, 4],
  ['Q15', 'Q15_Sequence_Detector.md', 2, 4],
  ['Q16', 'Q16_Divisible_By_3.md', 2, 5],
  ['Q17', 'Q17_Divisible_By_5.md', 2, 5],
  ['Q18', 'Q18_Palindrome_Detector.md', 2, 3],
  ['Q19', 'Q19_Programmable_Sequence_Detector.md', 3, 5],
  ['Q20', 'Q20_Divide_By_Evens_Clock_Divider.md', 2, 3],
  ['Q21', 'Q21_FizzBuzz.md', 2, 3],
  ['Q22', 'Q22_Full_Adder.md', 2, 3],
  ['Q23', 'Q23_Basic_ALU.md', 2, 3],
  ['Q24', 'Q24_Ripple_Carry_Adder.md', 2, 5],
  ['Q25', 'Q25_Flip_Flop_Array.md', 2, 4],
  ['Q26', 'Q26_Multi_Bit_FIFO.md', 3, 7],
  ['Q27', 'Q27_Dot_Product.md', 3, 5, 'Q28_Dot_Product'],
  ['Q28', 'Q28_Binary_To_Thermometer_Decoder.md', 2, 3, 'Q29_Binary_To_Thermometer_Decoder'],
  ['Q29', 'Q29_Thermometer_Code_Detector.md', 2, 3, 'Q30_Thermometer_Code_Detector'],
  ['Q30', 'Q30_2_Read_1_Write_Register_File.md', 3, 6, 'Q31_2Read1Write_Register_File'],
  ['Q31', 'Q31_Configurable_8_Bit_LFSR.md', 2, 5],
  ['Q32', 'Q32_Carry_Select_Adder.md', 3, 5],
  ['Q33', 'Q33_Bubble_Sort.md', 2, 5],
  ['Q34', 'Q34_Mealy_FSM.md', 2, 3],
];

export const questionManifest: QuestionConfig[] = entries.map(
  ([id, fileName, visibleCount, hiddenCount, assetBase]) => ({
    id,
    fileName,
    assetBase: assetBase ?? fileName.replace(/\.md$/i, ''),
    visibleCount,
    hiddenCount,
  }),
);

export function getQuestionConfig(id: string): QuestionConfig | undefined {
  return questionManifest.find((question) => question.id === id);
}

export function getQuestionConfigByFileName(fileName: string): QuestionConfig | undefined {
  return questionManifest.find((question) => question.fileName === fileName);
}
