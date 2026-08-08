// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Design implementation internals
// See Vsecond_largest_tb.h for the primary calling header

#include "Vsecond_largest_tb__pch.h"
#include "Vsecond_largest_tb___024root.h"

VlCoroutine Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__0(Vsecond_largest_tb___024root* vlSelf);
VlCoroutine Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1(Vsecond_largest_tb___024root* vlSelf);
VlCoroutine Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__2(Vsecond_largest_tb___024root* vlSelf);

void Vsecond_largest_tb___024root___eval_initial(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_initial\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__0(vlSelf);
    Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1(vlSelf);
    Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__2(vlSelf);
    vlSelfRef.__Vtrigprevexpr___TOP__second_largest_tb__DOT__CLK__0 
        = vlSelfRef.second_largest_tb__DOT__CLK;
    vlSelfRef.__Vtrigprevexpr___TOP__second_largest_tb__DOT__RESETN__0 
        = vlSelfRef.second_largest_tb__DOT__RESETN;
}

VL_INLINE_OPT VlCoroutine Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__0(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__0\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    while (1U) {
        co_await vlSelfRef.__VdlySched.delay(5ULL, 
                                             nullptr, 
                                             "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                             17);
        vlSelfRef.second_largest_tb__DOT__CLK = (1U 
                                                 & (~ (IData)(vlSelfRef.second_largest_tb__DOT__CLK)));
    }
}

VlCoroutine Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_1__0(Vsecond_largest_tb___024root* vlSelf);
VlCoroutine Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_1__1(Vsecond_largest_tb___024root* vlSelf);
VlCoroutine Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_2__0(Vsecond_largest_tb___024root* vlSelf);
VlCoroutine Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_2__1(Vsecond_largest_tb___024root* vlSelf);

VL_INLINE_OPT VlCoroutine Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    vlSelfRef.__Vfork_1__sync.init(2U, nullptr);
    Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_1__0(vlSelf);
    Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_1__1(vlSelf);
    co_await vlSelfRef.__Vfork_1__sync.join(nullptr, 
                                            "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                            93);
    vlSelfRef.__Vfork_2__sync.init(2U, nullptr);
    Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_2__0(vlSelf);
    Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_2__1(vlSelf);
    co_await vlSelfRef.__Vfork_2__sync.join(nullptr, 
                                            "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                            97);
    co_return;
}

VL_INLINE_OPT VlCoroutine Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_2__1(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_2__1\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         76);
    vlSelfRef.second_largest_tb__DOT__DIN = 0U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         79);
    vlSelfRef.second_largest_tb__DOT__DIN = 1U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         81);
    vlSelfRef.second_largest_tb__DOT__DIN = 2U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         83);
    vlSelfRef.second_largest_tb__DOT__DIN = 3U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         85);
    vlSelfRef.second_largest_tb__DOT__DIN = 3U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         87);
    vlSelfRef.second_largest_tb__DOT__DIN = 3U;
    vlSelfRef.__Vfork_2__sync.done("/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                   99);
}

VL_INLINE_OPT VlCoroutine Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_2__0(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_2__0\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         43);
    vlSelfRef.second_largest_tb__DOT__RESETN = 0U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         47);
    vlSelfRef.second_largest_tb__DOT__RESETN = 1U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         47);
    vlSelfRef.second_largest_tb__DOT__RESETN = 1U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         47);
    vlSelfRef.second_largest_tb__DOT__RESETN = 1U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         47);
    vlSelfRef.second_largest_tb__DOT__RESETN = 1U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         47);
    vlSelfRef.second_largest_tb__DOT__RESETN = 1U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         51);
    vlSelfRef.second_largest_tb__DOT__RESETN = 0U;
    vlSelfRef.__Vfork_2__sync.done("/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                   98);
}

VL_INLINE_OPT VlCoroutine Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_1__1(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_1__1\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    vlSelfRef.second_largest_tb__DOT__DIN = 2U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         57);
    vlSelfRef.second_largest_tb__DOT__DIN = 2U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         59);
    vlSelfRef.second_largest_tb__DOT__DIN = 6U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         61);
    vlSelfRef.second_largest_tb__DOT__DIN = 0U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         63);
    vlSelfRef.second_largest_tb__DOT__DIN = 0xeU;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         65);
    vlSelfRef.second_largest_tb__DOT__DIN = 0xcU;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         67);
    vlSelfRef.second_largest_tb__DOT__DIN = 0U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         69);
    vlSelfRef.second_largest_tb__DOT__DIN = 1U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         71);
    vlSelfRef.second_largest_tb__DOT__DIN = 2U;
    vlSelfRef.__Vfork_1__sync.done("/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                   95);
}

VL_INLINE_OPT VlCoroutine Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_1__0(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__1____Vfork_1__0\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    vlSelfRef.second_largest_tb__DOT__RESETN = 0U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         24);
    vlSelfRef.second_largest_tb__DOT__RESETN = 1U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         24);
    vlSelfRef.second_largest_tb__DOT__RESETN = 1U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         24);
    vlSelfRef.second_largest_tb__DOT__RESETN = 1U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         24);
    vlSelfRef.second_largest_tb__DOT__RESETN = 1U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         24);
    vlSelfRef.second_largest_tb__DOT__RESETN = 1U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         28);
    vlSelfRef.second_largest_tb__DOT__RESETN = 0U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         32);
    vlSelfRef.second_largest_tb__DOT__RESETN = 1U;
    co_await vlSelfRef.__VtrigSched_he04e1de7__0.trigger(0U, 
                                                         nullptr, 
                                                         "@(posedge second_largest_tb.CLK)", 
                                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                                         32);
    vlSelfRef.second_largest_tb__DOT__RESETN = 1U;
    vlSelfRef.__Vfork_1__sync.done("/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                   94);
}

void Vsecond_largest_tb___024root___eval_act(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_act\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
}

void Vsecond_largest_tb___024root___nba_sequent__TOP__0(Vsecond_largest_tb___024root* vlSelf);

void Vsecond_largest_tb___024root___eval_nba(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_nba\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    if ((3ULL & vlSelfRef.__VnbaTriggered.word(0U))) {
        Vsecond_largest_tb___024root___nba_sequent__TOP__0(vlSelf);
    }
}

VL_INLINE_OPT void Vsecond_largest_tb___024root___nba_sequent__TOP__0(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___nba_sequent__TOP__0\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Init
    IData/*31:0*/ __Vdly__second_largest_tb__DOT__DUT__DOT__second_largest;
    __Vdly__second_largest_tb__DOT__DUT__DOT__second_largest = 0;
    IData/*31:0*/ __Vdly__second_largest_tb__DOT__DUT__DOT__largest;
    __Vdly__second_largest_tb__DOT__DUT__DOT__largest = 0;
    // Body
    __Vdly__second_largest_tb__DOT__DUT__DOT__second_largest 
        = vlSelfRef.second_largest_tb__DOT__DUT__DOT__second_largest;
    __Vdly__second_largest_tb__DOT__DUT__DOT__largest 
        = vlSelfRef.second_largest_tb__DOT__DUT__DOT__largest;
    if (((vlSelfRef.second_largest_tb__DOT__DIN > vlSelfRef.second_largest_tb__DOT__DUT__DOT__largest) 
         & (0U != vlSelfRef.second_largest_tb__DOT__DIN))) {
        __Vdly__second_largest_tb__DOT__DUT__DOT__second_largest 
            = vlSelfRef.second_largest_tb__DOT__DUT__DOT__largest;
        __Vdly__second_largest_tb__DOT__DUT__DOT__largest 
            = vlSelfRef.second_largest_tb__DOT__DIN;
    } else if (((vlSelfRef.second_largest_tb__DOT__DIN 
                 != vlSelfRef.second_largest_tb__DOT__DUT__DOT__largest) 
                & (vlSelfRef.second_largest_tb__DOT__DIN 
                   > vlSelfRef.second_largest_tb__DOT__DUT__DOT__second_largest))) {
        __Vdly__second_largest_tb__DOT__DUT__DOT__second_largest 
            = vlSelfRef.second_largest_tb__DOT__DIN;
    }
    vlSelfRef.second_largest_tb__DOT__DUT__DOT__second_largest 
        = __Vdly__second_largest_tb__DOT__DUT__DOT__second_largest;
    vlSelfRef.second_largest_tb__DOT__DUT__DOT__largest 
        = __Vdly__second_largest_tb__DOT__DUT__DOT__largest;
}

void Vsecond_largest_tb___024root___timing_resume(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___timing_resume\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    if ((1ULL & vlSelfRef.__VactTriggered.word(0U))) {
        vlSelfRef.__VtrigSched_he04e1de7__0.resume(
                                                   "@(posedge second_largest_tb.CLK)");
    }
    if ((4ULL & vlSelfRef.__VactTriggered.word(0U))) {
        vlSelfRef.__VdlySched.resume();
    }
}

void Vsecond_largest_tb___024root___timing_commit(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___timing_commit\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    if ((! (1ULL & vlSelfRef.__VactTriggered.word(0U)))) {
        vlSelfRef.__VtrigSched_he04e1de7__0.commit(
                                                   "@(posedge second_largest_tb.CLK)");
    }
}

void Vsecond_largest_tb___024root___eval_triggers__act(Vsecond_largest_tb___024root* vlSelf);

bool Vsecond_largest_tb___024root___eval_phase__act(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_phase__act\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Init
    VlTriggerVec<3> __VpreTriggered;
    CData/*0:0*/ __VactExecute;
    // Body
    Vsecond_largest_tb___024root___eval_triggers__act(vlSelf);
    Vsecond_largest_tb___024root___timing_commit(vlSelf);
    __VactExecute = vlSelfRef.__VactTriggered.any();
    if (__VactExecute) {
        __VpreTriggered.andNot(vlSelfRef.__VactTriggered, vlSelfRef.__VnbaTriggered);
        vlSelfRef.__VnbaTriggered.thisOr(vlSelfRef.__VactTriggered);
        Vsecond_largest_tb___024root___timing_resume(vlSelf);
        Vsecond_largest_tb___024root___eval_act(vlSelf);
    }
    return (__VactExecute);
}

bool Vsecond_largest_tb___024root___eval_phase__nba(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_phase__nba\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Init
    CData/*0:0*/ __VnbaExecute;
    // Body
    __VnbaExecute = vlSelfRef.__VnbaTriggered.any();
    if (__VnbaExecute) {
        Vsecond_largest_tb___024root___eval_nba(vlSelf);
        vlSelfRef.__VnbaTriggered.clear();
    }
    return (__VnbaExecute);
}

#ifdef VL_DEBUG
VL_ATTR_COLD void Vsecond_largest_tb___024root___dump_triggers__nba(Vsecond_largest_tb___024root* vlSelf);
#endif  // VL_DEBUG
#ifdef VL_DEBUG
VL_ATTR_COLD void Vsecond_largest_tb___024root___dump_triggers__act(Vsecond_largest_tb___024root* vlSelf);
#endif  // VL_DEBUG

void Vsecond_largest_tb___024root___eval(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Init
    IData/*31:0*/ __VnbaIterCount;
    CData/*0:0*/ __VnbaContinue;
    // Body
    __VnbaIterCount = 0U;
    __VnbaContinue = 1U;
    while (__VnbaContinue) {
        if (VL_UNLIKELY((0x64U < __VnbaIterCount))) {
#ifdef VL_DEBUG
            Vsecond_largest_tb___024root___dump_triggers__nba(vlSelf);
#endif
            VL_FATAL_MT("/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 1, "", "NBA region did not converge.");
        }
        __VnbaIterCount = ((IData)(1U) + __VnbaIterCount);
        __VnbaContinue = 0U;
        vlSelfRef.__VactIterCount = 0U;
        vlSelfRef.__VactContinue = 1U;
        while (vlSelfRef.__VactContinue) {
            if (VL_UNLIKELY((0x64U < vlSelfRef.__VactIterCount))) {
#ifdef VL_DEBUG
                Vsecond_largest_tb___024root___dump_triggers__act(vlSelf);
#endif
                VL_FATAL_MT("/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 1, "", "Active region did not converge.");
            }
            vlSelfRef.__VactIterCount = ((IData)(1U) 
                                         + vlSelfRef.__VactIterCount);
            vlSelfRef.__VactContinue = 0U;
            if (Vsecond_largest_tb___024root___eval_phase__act(vlSelf)) {
                vlSelfRef.__VactContinue = 1U;
            }
        }
        if (Vsecond_largest_tb___024root___eval_phase__nba(vlSelf)) {
            __VnbaContinue = 1U;
        }
    }
}

#ifdef VL_DEBUG
void Vsecond_largest_tb___024root___eval_debug_assertions(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_debug_assertions\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
}
#endif  // VL_DEBUG
