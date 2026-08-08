import type { QuestionMeta } from './types';

const questionBriefs = import.meta.glob('../../questions/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const questionFiles = Object.fromEntries(
  Object.entries(questionBriefs).map(([path, content]) => [path.split('/').pop() ?? path, content]),
);

const questions: QuestionMeta[] = [
  {
    id: 'Q01',
    title: 'Simple Router',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q01_Simple_Router.md',
    summary: 'Route one input word to one of four outputs based on the address and enable.',
    publicCases: [
      { label: 'Route to dout0', input: 'din=8\'hA5, d_en=1, addr=0', expectedOutput: 'dout0=8\'hA5, others=0' },
      { label: 'Disable output', input: 'din=8\'h5A, d_en=0, addr=3', expectedOutput: 'all outputs = 0' },
    ],
  },
  {
    id: 'Q02',
    title: 'Second Largest',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q02_Second_Largest.md',
    summary: 'Track the two largest values seen so far and expose the runner-up.',
    publicCases: [
      { label: 'Ascending sample', input: '8, 3, 14, 9', expectedOutput: '9' },
      { label: 'All equal', input: '7, 7, 7, 7', expectedOutput: '0' },
    ],
  },
  {
    id: 'Q03',
    title: 'Rounding Division',
    difficulty: 'Medium',
    visibleCount: 2,
    hiddenCount: 4,
    fileName: 'Q03_Rounding_Division.md',
    summary: 'Divide by a power of two and round to the nearest integer.',
    publicCases: [
      { label: 'Round up at half', input: 'din=10, DIV_LOG2=1', expectedOutput: '5' },
      { label: 'Exact divide', input: 'din=12, DIV_LOG2=2', expectedOutput: '3' },
    ],
  },
  {
    id: 'Q04',
    title: 'Gray Code Counter',
    difficulty: 'Hard',
    visibleCount: 3,
    hiddenCount: 6,
    fileName: 'Q04_Gray_Code_Counter.md',
    summary: 'Advance through a Gray-coded counting sequence after reset.',
    publicCases: [
      { label: 'Reset value', input: 'resetn=0', expectedOutput: 'out=4\'b0000' },
      { label: 'First active step', input: 'resetn=1, 1st clock', expectedOutput: 'out=4\'b0001' },
      { label: 'Next Gray step', input: 'next clock', expectedOutput: 'out changes to next Gray code' },
    ],
  },
  {
    id: 'Q05',
    title: 'Reversing Bits',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q05_Reversing_Bits.md',
    summary: 'Mirror the input bit order across the word boundary.',
    publicCases: [
      { label: 'Eight-bit mirror', input: 'din=8\'b11010010', expectedOutput: '8\'b01001011' },
      { label: 'Palindromic word', input: 'din=8\'b10011001', expectedOutput: 'same value' },
    ],
  },
  {
    id: 'Q06',
    title: 'Edge Detector',
    difficulty: 'Easy',
    visibleCount: 1,
    hiddenCount: 3,
    fileName: 'Q06_Edge_Detector.md',
    summary: 'Pulse high only when the input rises from 0 to 1.',
    publicCases: [
      { label: 'Rising pulse', input: '0, 1, 1, 0', expectedOutput: '0, 1, 0, 0' },
    ],
  },
  {
    id: 'Q07',
    title: 'Parallel-in, Serial-out Shift Register',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q07_PISO_Shift_Register.md',
    summary: 'Load a word in parallel, then shift it out serially LSB-first.',
    publicCases: [
      { label: 'Load and shift', input: 'din=4\'b1011, din_en toggles', expectedOutput: '1, 1, 0, 1' },
      { label: 'Reset clears output', input: 'resetn=0', expectedOutput: 'dout=0' },
    ],
  },
  {
    id: 'Q08',
    title: 'Serial-in, Parallel-out Shift Register',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q08_SIPO_Shift_Register.md',
    summary: 'Accumulate serial bits into a parallel word.',
    publicCases: [
      { label: 'Build a nibble', input: '1, 0, 1, 1', expectedOutput: '4\'b1101' },
      { label: 'Reset to zero', input: 'resetn=0', expectedOutput: 'all zeroes' },
    ],
  },
  {
    id: 'Q09',
    title: 'Fibonacci Generator',
    difficulty: 'Easy',
    visibleCount: 1,
    hiddenCount: 3,
    fileName: 'Q09_Fibonacci_Generator.md',
    summary: 'Emit the Fibonacci sequence one value per clock.',
    publicCases: [
      { label: 'First values', input: 'reset then clocks', expectedOutput: '1, 1, 2, 3, 5, 8' },
    ],
  },
  {
    id: 'Q10',
    title: 'Counting Ones',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q10_Counting_Ones.md',
    summary: 'Count the population of set bits in a vector.',
    publicCases: [
      { label: 'Mixed bits', input: 'din=8\'b10110100', expectedOutput: '4' },
      { label: 'All ones', input: 'din=8\'hFF', expectedOutput: '8' },
    ],
  },
  {
    id: 'Q11',
    title: 'Gray Code to Binary',
    difficulty: 'Medium',
    visibleCount: 2,
    hiddenCount: 4,
    fileName: 'Q11_GrayCode_To_Binary.md',
    summary: 'Convert Gray encoding back to binary.',
    publicCases: [
      { label: 'Basic conversion', input: 'gray=4\'b0110', expectedOutput: 'bin=4\'b0100' },
      { label: 'Identity edge', input: 'gray=4\'b0000', expectedOutput: 'bin=4\'b0000' },
    ],
  },
  {
    id: 'Q12',
    title: 'Trailing Zeroes',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q12_Trailing_Zeroes.md',
    summary: 'Count zero bits from the least-significant end until the first one.',
    publicCases: [
      { label: 'Three trailing zeros', input: 'din=8\'b00101000', expectedOutput: '3' },
      { label: 'No trailing zeros', input: 'din=8\'b00000001', expectedOutput: '0' },
    ],
  },
  {
    id: 'Q13',
    title: 'One-Hot Detector',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q13_OneHot_Detector.md',
    summary: 'Assert when exactly one bit of the input is set.',
    publicCases: [
      { label: 'One-hot value', input: 'din=8\'b00010000', expectedOutput: '1' },
      { label: 'Not one-hot', input: 'din=8\'b00011000', expectedOutput: '0' },
    ],
  },
  {
    id: 'Q14',
    title: 'Stopwatch Timer',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 4,
    fileName: 'Q14_Stopwatch_Timer.md',
    summary: 'Count up with start/stop/reset control.',
    publicCases: [
      { label: 'Start increments', input: 'reset, then start for 3 clocks', expectedOutput: '0 -> 1 -> 2 -> 3' },
      { label: 'Stop holds value', input: 'stop asserted', expectedOutput: 'count holds steady' },
    ],
  },
  {
    id: 'Q15',
    title: 'Sequence Detector',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 4,
    fileName: 'Q15_Sequence_Detector.md',
    summary: 'Detect the serial pattern 1010.',
    publicCases: [
      { label: 'Match sequence', input: '1, 0, 1, 0', expectedOutput: 'pulse on final bit' },
      { label: 'Non-match', input: '1, 1, 0, 0', expectedOutput: 'never asserts' },
    ],
  },
  {
    id: 'Q16',
    title: 'Divisible by 3',
    difficulty: 'Medium',
    visibleCount: 2,
    hiddenCount: 5,
    fileName: 'Q16_Divisible_By_3.md',
    summary: 'Track a serial binary stream and assert when it is divisible by 3.',
    publicCases: [
      { label: 'Nine is divisible by 3', input: '1, 0, 0, 1', expectedOutput: 'asserts on 9' },
      { label: 'Five is not divisible by 3', input: '1, 0, 1', expectedOutput: 'remains low' },
    ],
  },
  {
    id: 'Q17',
    title: 'Divisible by 5',
    difficulty: 'Medium',
    visibleCount: 2,
    hiddenCount: 5,
    fileName: 'Q17_Divisible_By_5.md',
    summary: 'Track a serial binary stream and assert when it is divisible by 5.',
    publicCases: [
      { label: 'Five is divisible by 5', input: '1, 0, 1', expectedOutput: 'asserts on 5' },
      { label: 'Six is not divisible by 5', input: '1, 1, 0', expectedOutput: 'remains low' },
    ],
  },
  {
    id: 'Q18',
    title: 'Palindrome Detector',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q18_Palindrome_Detector.md',
    summary: 'Check whether a binary word reads the same in both directions.',
    publicCases: [
      { label: 'Palindrome', input: 'din=8\'b10011001', expectedOutput: '1' },
      { label: 'Not palindrome', input: 'din=8\'b10010101', expectedOutput: '0' },
    ],
  },
  {
    id: 'Q19',
    title: 'Programmable Sequence Detector',
    difficulty: 'Medium',
    visibleCount: 3,
    hiddenCount: 5,
    fileName: 'Q19_Programmable_Sequence_Detector.md',
    summary: 'Detect a runtime-programmed bit pattern.',
    publicCases: [
      { label: 'Match programmed pattern', input: 'init=10110, stream=10110', expectedOutput: 'seen=1' },
      { label: 'No match yet', input: 'init=10110, stream=10100', expectedOutput: 'seen=0' },
      { label: 'Longer stream', input: 'init=00111, stream contains 00111', expectedOutput: 'seen pulses when matched' },
    ],
  },
  {
    id: 'Q20',
    title: 'Divide-by-Evens Clock Divider',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q20_Divide_By_Evens_Clock_Divider.md',
    summary: 'Produce periodic div2/div4/div6 indicator outputs.',
    publicCases: [
      { label: 'Periodic outputs', input: 'clock ticks', expectedOutput: 'div2, div4, div6 toggle periodically' },
      { label: 'Reset clears count', input: 'resetn=0', expectedOutput: 'all outputs reset' },
    ],
  },
  {
    id: 'Q21',
    title: 'FizzBuzz',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q21_FizzBuzz.md',
    summary: 'Emit fizz, buzz, and fizzbuzz indicators from a cycle counter.',
    publicCases: [
      { label: 'Fizz cycle', input: 'count=2', expectedOutput: 'fizz=1, buzz=0, fizzbuzz=0' },
      { label: 'FizzBuzz cycle', input: 'count=6', expectedOutput: 'fizz=1, buzz=1, fizzbuzz=1' },
    ],
  },
  {
    id: 'Q22',
    title: 'Full Adder',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q22_Full_Adder.md',
    summary: 'Compute 1-bit sum and carry-out.',
    publicCases: [
      { label: 'Add one and one', input: 'a=1, b=1, cin=0', expectedOutput: 'sum=0, cout=1' },
      { label: 'Add with carry-in', input: 'a=1, b=0, cin=1', expectedOutput: 'sum=0, cout=1' },
    ],
  },
  {
    id: 'Q23',
    title: 'Basic ALU',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q23_Basic_ALU.md',
    summary: 'Compute several arithmetic and bitwise operations in parallel.',
    publicCases: [
      { label: 'Small operands', input: 'a=0101, b=0011', expectedOutput: 'plus, minus, not, and, or, xor' },
      { label: 'All zero', input: 'a=0000, b=0000', expectedOutput: 'stable zero-ish results' },
    ],
  },
  {
    id: 'Q24',
    title: 'Ripple Carry Adder',
    difficulty: 'Medium',
    visibleCount: 2,
    hiddenCount: 5,
    fileName: 'Q24_Ripple_Carry_Adder.md',
    summary: 'Chain full adders to compute a multi-bit sum.',
    publicCases: [
      { label: 'Simple sum', input: '5 + 7', expectedOutput: '12' },
      { label: 'Overflow case', input: '255 + 1', expectedOutput: 'carry propagates' },
    ],
  },
  {
    id: 'Q25',
    title: 'Flip-Flop Array',
    difficulty: 'Medium',
    visibleCount: 2,
    hiddenCount: 4,
    fileName: 'Q25_Flip_Flop_Array.md',
    summary: 'Store bytes by address and read them back safely.',
    publicCases: [
      { label: 'Write then read', input: 'addr=3, wr=1, rd=0 then rd=1', expectedOutput: 'dout=written value' },
      { label: 'Read unwritten address', input: 'addr=7, rd=1', expectedOutput: '0' },
    ],
  },
  {
    id: 'Q26',
    title: 'Multi-Bit FIFO',
    difficulty: 'Hard',
    visibleCount: 3,
    hiddenCount: 7,
    fileName: 'Q26_Multi_Bit_FIFO.md',
    summary: 'Maintain a tiny FIFO and shift entries when full.',
    publicCases: [
      { label: 'First write appears at output', input: 'write A', expectedOutput: 'dout=A' },
      { label: 'Fill to depth', input: 'three writes', expectedOutput: 'full=1' },
      { label: 'Reset clears FIFO', input: 'resetn=0', expectedOutput: 'empty=1' },
    ],
  },
  {
    id: 'Q27',
    title: 'Dot Product',
    difficulty: 'Medium',
    visibleCount: 3,
    hiddenCount: 5,
    fileName: 'Q27_Dot_Product.md',
    summary: 'Collect two vectors and output their dot product.',
    publicCases: [
      { label: 'Small vectors', input: 'A=1,2,3 and B=4,5,6', expectedOutput: '32' },
      { label: 'Zeros', input: 'A=0,0,0 and B=7,8,9', expectedOutput: '0' },
      { label: 'Single-bit values', input: 'A=1,1,1 and B=1,1,1', expectedOutput: '3' },
    ],
  },
  {
    id: 'Q28',
    title: 'Binary to Thermometer Decoder',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q28_Binary_To_Thermometer_Decoder.md',
    summary: 'Expand an 8-bit binary count into a thermometer code.',
    publicCases: [
      { label: 'Count of 3', input: 'din=3', expectedOutput: 'bits 0..3 set' },
      { label: 'Count of 0', input: 'din=0', expectedOutput: 'only bit 0 set' },
    ],
  },
  {
    id: 'Q29',
    title: 'Thermometer Code Detector',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q29_Thermometer_Code_Detector.md',
    summary: 'Recognize valid thermometer-encoded bit patterns.',
    publicCases: [
      { label: 'Valid code', input: '00011111', expectedOutput: '1' },
      { label: 'Invalid code', input: '00101111', expectedOutput: '0' },
    ],
  },
  {
    id: 'Q30',
    title: '2-Read 1-Write Register File',
    difficulty: 'Hard',
    visibleCount: 3,
    hiddenCount: 6,
    fileName: 'Q30_2_Read_1_Write_Register_File.md',
    summary: 'Serve two independent reads and one write with collision tracking.',
    publicCases: [
      { label: 'Write and read back', input: 'write addr 5, then read addr 5', expectedOutput: 'stored value appears on read' },
      { label: 'Read collision', input: 'read same address on both ports', expectedOutput: 'collision=1' },
      { label: 'Reset clears state', input: 'resetn=0', expectedOutput: 'all registers cleared' },
    ],
  },
  {
    id: 'Q31',
    title: 'Configurable 8-Bit LFSR',
    difficulty: 'Medium',
    visibleCount: 2,
    hiddenCount: 5,
    fileName: 'Q31_Configurable_8_Bit_LFSR.md',
    summary: 'Generate a seeded pseudo-random sequence with selectable taps.',
    publicCases: [
      { label: 'Seeded sequence', input: 'seed=10110011', expectedOutput: 'advances deterministically' },
      { label: 'Repeat after reset', input: 'reset and reseed same value', expectedOutput: 'same sequence repeats' },
    ],
  },
  {
    id: 'Q32',
    title: 'Carry-Select Adder',
    difficulty: 'Medium',
    visibleCount: 3,
    hiddenCount: 5,
    fileName: 'Q32_Carry_Select_Adder.md',
    summary: 'Use carry-select blocks to add two multi-bit numbers.',
    publicCases: [
      { label: '19 plus 23', input: '19 + 23', expectedOutput: '42' },
      { label: 'Carry across blocks', input: '255 + 1', expectedOutput: 'wraps with carry' },
      { label: 'Zero case', input: '0 + 0', expectedOutput: '0' },
    ],
  },
  {
    id: 'Q33',
    title: 'Bubble Sort',
    difficulty: 'Medium',
    visibleCount: 2,
    hiddenCount: 5,
    fileName: 'Q33_Bubble_Sort.md',
    summary: 'Sort a short vector by repeated adjacent swaps.',
    publicCases: [
      { label: 'Mixed order', input: '5, 1, 4, 2', expectedOutput: '1, 2, 4, 5' },
      { label: 'Already sorted', input: '1, 2, 3, 4', expectedOutput: '1, 2, 3, 4' },
    ],
  },
  {
    id: 'Q34',
    title: 'Mealy FSM',
    difficulty: 'Easy',
    visibleCount: 2,
    hiddenCount: 3,
    fileName: 'Q34_Mealy_FSM.md',
    summary: 'Detect a sequence using a Mealy-style output that reacts immediately.',
    publicCases: [
      { label: 'Immediate trigger', input: 'target pattern arrives', expectedOutput: 'assert same cycle' },
      { label: 'No trigger', input: 'noise sequence', expectedOutput: 'stays low' },
    ],
  },
];

export function getQuestionBrief(fileName: string): string {
  const path = `../../questions/${fileName}`;
  return questionFiles[fileName] ?? questionFiles[path] ?? '';
}

const moduleInterfaces: Record<string, string> = {
  Q01: `module simple_router #(parameter DATA_WIDTH=32) (
  input logic [DATA_WIDTH-1:0] din,
  input logic d_en,
  input logic [1:0] addr,
  output logic [DATA_WIDTH-1:0] dout0,
  output logic [DATA_WIDTH-1:0] dout1,
  output logic [DATA_WIDTH-1:0] dout2,
  output logic [DATA_WIDTH-1:0] dout3
);`,
  Q02: `module second_largest #(parameter DATA_WIDTH = 32) (
  input logic [DATA_WIDTH-1:0] din,
  input logic clk,
  input logic resetn,
  output logic [DATA_WIDTH-1:0] dout
);`,
  Q03: `module rounding_division #(
  parameter DIV_LOG2 = 2,
  parameter OUT_WIDTH = 32,
  parameter IN_WIDTH = OUT_WIDTH + DIV_LOG2
) (
  input logic [IN_WIDTH-1:0] din,
  output logic [OUT_WIDTH-1:0] dout
);`,
  Q04: `module gray_code_generator #(parameter DATA_WIDTH = 4) (
  input clk,
  input resetn,
  output logic [DATA_WIDTH-1:0] out
);`,
  Q05: `module reversing_bits #(parameter DATA_WIDTH=32) (
  input logic [DATA_WIDTH-1:0] din,
  output logic [DATA_WIDTH-1:0] dout
);`,
  Q06: `module edge_detector (
  input clk,
  input resetn,
  input din,
  output dout
);`,
  Q07: `module PISO_shift_register #(parameter DATA_WIDTH=16) (
  input clk,
  input resetn,
  input [DATA_WIDTH-1:0] din,
  input din_en,
  output logic dout
);`,
  Q08: `module SIPO_shift_register #(parameter DATA_WIDTH=16) (
  input clk,
  input resetn,
  input din,
  output [DATA_WIDTH-1:0] dout
);`,
  Q09: `module fibonacci_generator #(parameter DATA_WIDTH=32) (
  input clk,
  input resetn,
  output logic [DATA_WIDTH-1:0] dout
);`,
  Q10: `module counting_ones #(parameter DATA_WIDTH=16) (
  input logic [DATA_WIDTH-1:0] din,
  output logic [$clog2(DATA_WIDTH):0] dout
);`,
  Q11: `module graycode_to_binary #(parameter DATA_WIDTH=16) (
  input logic [DATA_WIDTH-1:0] gray,
  output logic [DATA_WIDTH-1:0] bin
);`,
  Q12: `module trailing_zeroes #(parameter DATA_WIDTH=32) (
  input logic [DATA_WIDTH-1:0] din,
  output logic [$clog2(DATA_WIDTH):0] dout
);`,
  Q13: `module onehot_detector #(parameter DATA_WIDTH=32) (
  input logic [DATA_WIDTH-1:0] din,
  output logic onehot
);`,
  Q14: `module stopwatch_timer #(parameter DATA_WIDTH=16, MAX=99) (
  input clk,
  input reset,
  input start,
  input stop,
  output logic [DATA_WIDTH-1:0] count
);`,
  Q15: `module sequence_detector (
  input clk,
  input resetn,
  input din,
  output logic dout
);`,
  Q16: `module divisible_by_3 (
  input clk,
  input resetn,
  input din,
  output logic dout
);`,
  Q17: `module divisible_by_5 (
  input clk,
  input resetn,
  input din,
  output logic dout
);`,
  Q18: `module palindrome_detector #(parameter DATA_WIDTH=32) (
  input logic [DATA_WIDTH-1:0] din,
  output logic dout
);`,
  Q19: `module programmable_sequence_detector (
  input clk,
  input resetn,
  input [4:0] init,
  input din,
  output logic seen
);`,
  Q20: `module divide_by_evens_clock_divider (
  input clk,
  input resetn,
  output logic div2,
  output logic div4,
  output logic div6
);`,
  Q21: `module fizzbuzz #(parameter FIZZ=2, BUZZ=3, MAX_CYCLES=20) (
  input clk,
  input resetn,
  output logic fizz,
  output logic buzz,
  output logic fizzbuzz
);`,
  Q22: `module full_adder (
  input a,
  input b,
  input cin,
  output logic sum,
  output logic cout
);`,
  Q23: `module basic_alu #(parameter DATA_WIDTH=4) (
  input logic [DATA_WIDTH-1:0] a,
  input logic [DATA_WIDTH-1:0] b,
  output logic [DATA_WIDTH-1:0] a_plus_b,
  output logic [DATA_WIDTH-1:0] a_minus_b,
  output logic [DATA_WIDTH-1:0] not_a,
  output logic [DATA_WIDTH-1:0] a_and_b,
  output logic [DATA_WIDTH-1:0] a_or_b,
  output logic [DATA_WIDTH-1:0] a_xor_b
);`,
  Q24: `module ripple_carry_adder #(parameter DATA_WIDTH=8) (
  input logic [DATA_WIDTH-1:0] a,
  input logic [DATA_WIDTH-1:0] b,
  output logic [DATA_WIDTH:0] sum,
  output logic [DATA_WIDTH-1:0] cout_int
);`,
  Q25: `module flip_flop_array (
  input logic [7:0] din,
  input logic [2:0] addr,
  input logic wr,
  input logic rd,
  input logic clk,
  input logic resetn,
  output logic [7:0] dout,
  output logic error
);`,
  Q26: `module multi_bit_fifo #(parameter DATA_WIDTH=8) (
  input clk,
  input resetn,
  input [DATA_WIDTH-1:0] din,
  input wr,
  output logic [DATA_WIDTH-1:0] dout,
  output logic empty,
  output logic full
);`,
  Q27: `module dot_product (
  input [7:0] din,
  input clk,
  input resetn,
  output reg [17:0] dout,
  output reg run
);`,
  Q28: `module binary_to_thermometer_decoder (
  input [7:0] din,
  output reg [255:0] dout
);`,
  Q29: `module thermometer_code_detector #(parameter DATA_WIDTH=8) (
  input [DATA_WIDTH-1:0] codeIn,
  output reg isThermometer
);`,
  Q30: `module tworead1write_register_file #(parameter DATA_WIDTH=16) (
  input clk,
  input resetn,
  input [DATA_WIDTH-1:0] din,
  input [$clog2(DATA_WIDTH):0] wad1,
  input [$clog2(DATA_WIDTH):0] rad1,
  input [$clog2(DATA_WIDTH):0] rad2,
  input wen1,
  input ren1,
  input ren2,
  output logic [DATA_WIDTH-1:0] dout1,
  output logic [DATA_WIDTH-1:0] dout2,
  output logic collision
);`,
  Q31: `module configurable_8_bit_lfsr (
  input logic clk,
  input logic resetn,
  input logic load,
  input logic [7:0] seed,
  input logic [7:0] taps,
  output logic [7:0] dout
);`,
  Q32: `module carry_select_adder #(
  parameter DATA_WIDTH = 8,
  parameter BLOCK_WIDTH = 4
) (
  input logic [DATA_WIDTH-1:0] a,
  input logic [DATA_WIDTH-1:0] b,
  input logic cin,
  output logic [DATA_WIDTH-1:0] sum,
  output logic cout
);`,
  Q33: `module bubble_sort #(
  parameter NUM_VALUES = 4,
  parameter DATA_WIDTH = 8
) (
  input logic [NUM_VALUES-1:0][DATA_WIDTH-1:0] values_in,
  output logic [NUM_VALUES-1:0][DATA_WIDTH-1:0] values_out
);`,
  Q34: `module mealy_fsm (
  input logic clk,
  input logic resetn,
  input logic din,
  output logic dout
);`,
};

export function getQuestionModuleInterface(id: string): string {
  return moduleInterfaces[id] ?? 'module model;\n  // Write your SystemVerilog here.\nendmodule';
}

export function getQuestionTemplate(id: string): string {
  const interfaceText = getQuestionModuleInterface(id);
  const interfaceWithBody = interfaceText.endsWith('endmodule')
    ? interfaceText
    : `${interfaceText}\n\n  // Implementation goes here.\nendmodule`;

  return interfaceWithBody;
}

export function getQuestions(): QuestionMeta[] {
  return questions;
}
