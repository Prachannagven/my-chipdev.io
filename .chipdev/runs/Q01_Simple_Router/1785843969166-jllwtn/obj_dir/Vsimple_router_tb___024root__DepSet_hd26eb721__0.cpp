// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Design implementation internals
// See Vsimple_router_tb.h for the primary calling header

#include "Vsimple_router_tb__pch.h"
#include "Vsimple_router_tb___024root.h"

VlCoroutine Vsimple_router_tb___024root___eval_initial__TOP__Vtiming__0(Vsimple_router_tb___024root* vlSelf);
VlCoroutine Vsimple_router_tb___024root___eval_initial__TOP__Vtiming__1(Vsimple_router_tb___024root* vlSelf);
VlCoroutine Vsimple_router_tb___024root___eval_initial__TOP__Vtiming__2(Vsimple_router_tb___024root* vlSelf);

void Vsimple_router_tb___024root___eval_initial(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___eval_initial\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    Vsimple_router_tb___024root___eval_initial__TOP__Vtiming__0(vlSelf);
    Vsimple_router_tb___024root___eval_initial__TOP__Vtiming__1(vlSelf);
    Vsimple_router_tb___024root___eval_initial__TOP__Vtiming__2(vlSelf);
}

VL_INLINE_OPT VlCoroutine Vsimple_router_tb___024root___eval_initial__TOP__Vtiming__0(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___eval_initial__TOP__Vtiming__0\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    vlSelfRef.simple_router_tb__DOT__D_EN = 0U;
    vlSelfRef.simple_router_tb__DOT__ADDR = 0U;
    vlSelfRef.simple_router_tb__DOT__DIN = 0xbeadU;
    co_await vlSelfRef.__VdlySched.delay(0xaULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q01_Simple_Router/1785843969166-jllwtn/Q01_Simple_Router_tb.sv", 
                                         31);
    vlSelfRef.simple_router_tb__DOT__D_EN = 1U;
    vlSelfRef.simple_router_tb__DOT__ADDR = 0U;
    vlSelfRef.simple_router_tb__DOT__DIN = 0xbeadU;
    vlSelfRef.simple_router_tb__DOT__D_EN = 0U;
    vlSelfRef.simple_router_tb__DOT__ADDR = 0U;
    vlSelfRef.simple_router_tb__DOT__DIN = 0xbeadU;
    co_await vlSelfRef.__VdlySched.delay(0xaULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q01_Simple_Router/1785843969166-jllwtn/Q01_Simple_Router_tb.sv", 
                                         45);
    vlSelfRef.simple_router_tb__DOT__D_EN = 1U;
    vlSelfRef.simple_router_tb__DOT__ADDR = 0U;
    vlSelfRef.simple_router_tb__DOT__DIN = 0xbeadU;
    co_await vlSelfRef.__VdlySched.delay(0xaULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q01_Simple_Router/1785843969166-jllwtn/Q01_Simple_Router_tb.sv", 
                                         50);
    vlSelfRef.simple_router_tb__DOT__D_EN = 1U;
    vlSelfRef.simple_router_tb__DOT__ADDR = 1U;
    vlSelfRef.simple_router_tb__DOT__DIN = 0xbeadU;
    co_await vlSelfRef.__VdlySched.delay(0xaULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q01_Simple_Router/1785843969166-jllwtn/Q01_Simple_Router_tb.sv", 
                                         57);
    vlSelfRef.simple_router_tb__DOT__D_EN = 1U;
    vlSelfRef.simple_router_tb__DOT__ADDR = 2U;
    vlSelfRef.simple_router_tb__DOT__DIN = 0xbeadU;
    co_await vlSelfRef.__VdlySched.delay(0xaULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q01_Simple_Router/1785843969166-jllwtn/Q01_Simple_Router_tb.sv", 
                                         64);
    vlSelfRef.simple_router_tb__DOT__D_EN = 1U;
    vlSelfRef.simple_router_tb__DOT__ADDR = 3U;
    vlSelfRef.simple_router_tb__DOT__DIN = 0xbeadU;
    co_await vlSelfRef.__VdlySched.delay(0xaULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q01_Simple_Router/1785843969166-jllwtn/Q01_Simple_Router_tb.sv", 
                                         71);
}

VL_INLINE_OPT VlCoroutine Vsimple_router_tb___024root___eval_initial__TOP__Vtiming__2(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___eval_initial__TOP__Vtiming__2\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    while (1U) {
        co_await vlSelfRef.__VdlySched.delay(5ULL, 
                                             nullptr, 
                                             "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q01_Simple_Router/1785843969166-jllwtn/Q01_Simple_Router_tb.sv", 
                                             19);
        vlSelfRef.simple_router_tb__DOT__clk = (1U 
                                                & (~ (IData)(vlSelfRef.simple_router_tb__DOT__clk)));
    }
}

void Vsimple_router_tb___024root___eval_act(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___eval_act\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
}

void Vsimple_router_tb___024root___eval_nba(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___eval_nba\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
}

void Vsimple_router_tb___024root___timing_resume(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___timing_resume\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    if ((1ULL & vlSelfRef.__VactTriggered.word(0U))) {
        vlSelfRef.__VdlySched.resume();
    }
}

void Vsimple_router_tb___024root___eval_triggers__act(Vsimple_router_tb___024root* vlSelf);

bool Vsimple_router_tb___024root___eval_phase__act(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___eval_phase__act\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Init
    VlTriggerVec<1> __VpreTriggered;
    CData/*0:0*/ __VactExecute;
    // Body
    Vsimple_router_tb___024root___eval_triggers__act(vlSelf);
    __VactExecute = vlSelfRef.__VactTriggered.any();
    if (__VactExecute) {
        __VpreTriggered.andNot(vlSelfRef.__VactTriggered, vlSelfRef.__VnbaTriggered);
        vlSelfRef.__VnbaTriggered.thisOr(vlSelfRef.__VactTriggered);
        Vsimple_router_tb___024root___timing_resume(vlSelf);
        Vsimple_router_tb___024root___eval_act(vlSelf);
    }
    return (__VactExecute);
}

bool Vsimple_router_tb___024root___eval_phase__nba(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___eval_phase__nba\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Init
    CData/*0:0*/ __VnbaExecute;
    // Body
    __VnbaExecute = vlSelfRef.__VnbaTriggered.any();
    if (__VnbaExecute) {
        Vsimple_router_tb___024root___eval_nba(vlSelf);
        vlSelfRef.__VnbaTriggered.clear();
    }
    return (__VnbaExecute);
}

#ifdef VL_DEBUG
VL_ATTR_COLD void Vsimple_router_tb___024root___dump_triggers__nba(Vsimple_router_tb___024root* vlSelf);
#endif  // VL_DEBUG
#ifdef VL_DEBUG
VL_ATTR_COLD void Vsimple_router_tb___024root___dump_triggers__act(Vsimple_router_tb___024root* vlSelf);
#endif  // VL_DEBUG

void Vsimple_router_tb___024root___eval(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___eval\n"); );
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
            Vsimple_router_tb___024root___dump_triggers__nba(vlSelf);
#endif
            VL_FATAL_MT("/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q01_Simple_Router/1785843969166-jllwtn/Q01_Simple_Router_tb.sv", 1, "", "NBA region did not converge.");
        }
        __VnbaIterCount = ((IData)(1U) + __VnbaIterCount);
        __VnbaContinue = 0U;
        vlSelfRef.__VactIterCount = 0U;
        vlSelfRef.__VactContinue = 1U;
        while (vlSelfRef.__VactContinue) {
            if (VL_UNLIKELY((0x64U < vlSelfRef.__VactIterCount))) {
#ifdef VL_DEBUG
                Vsimple_router_tb___024root___dump_triggers__act(vlSelf);
#endif
                VL_FATAL_MT("/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q01_Simple_Router/1785843969166-jllwtn/Q01_Simple_Router_tb.sv", 1, "", "Active region did not converge.");
            }
            vlSelfRef.__VactIterCount = ((IData)(1U) 
                                         + vlSelfRef.__VactIterCount);
            vlSelfRef.__VactContinue = 0U;
            if (Vsimple_router_tb___024root___eval_phase__act(vlSelf)) {
                vlSelfRef.__VactContinue = 1U;
            }
        }
        if (Vsimple_router_tb___024root___eval_phase__nba(vlSelf)) {
            __VnbaContinue = 1U;
        }
    }
}

#ifdef VL_DEBUG
void Vsimple_router_tb___024root___eval_debug_assertions(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___eval_debug_assertions\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
}
#endif  // VL_DEBUG
