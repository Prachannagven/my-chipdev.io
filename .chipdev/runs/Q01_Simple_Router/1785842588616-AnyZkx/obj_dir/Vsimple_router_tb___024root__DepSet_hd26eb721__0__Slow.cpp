// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Design implementation internals
// See Vsimple_router_tb.h for the primary calling header

#include "Vsimple_router_tb__pch.h"
#include "Vsimple_router_tb___024root.h"

VL_ATTR_COLD void Vsimple_router_tb___024root___eval_static(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___eval_static\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
}

VL_ATTR_COLD void Vsimple_router_tb___024root___eval_final(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___eval_final\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
}

VL_ATTR_COLD void Vsimple_router_tb___024root___eval_settle(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___eval_settle\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
}

#ifdef VL_DEBUG
VL_ATTR_COLD void Vsimple_router_tb___024root___dump_triggers__act(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___dump_triggers__act\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    if ((1U & (~ vlSelfRef.__VactTriggered.any()))) {
        VL_DBG_MSGF("         No triggers active\n");
    }
    if ((1ULL & vlSelfRef.__VactTriggered.word(0U))) {
        VL_DBG_MSGF("         'act' region trigger index 0 is active: @([true] __VdlySched.awaitingCurrentTime())\n");
    }
}
#endif  // VL_DEBUG

#ifdef VL_DEBUG
VL_ATTR_COLD void Vsimple_router_tb___024root___dump_triggers__nba(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___dump_triggers__nba\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    if ((1U & (~ vlSelfRef.__VnbaTriggered.any()))) {
        VL_DBG_MSGF("         No triggers active\n");
    }
    if ((1ULL & vlSelfRef.__VnbaTriggered.word(0U))) {
        VL_DBG_MSGF("         'nba' region trigger index 0 is active: @([true] __VdlySched.awaitingCurrentTime())\n");
    }
}
#endif  // VL_DEBUG

VL_ATTR_COLD void Vsimple_router_tb___024root___ctor_var_reset(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___ctor_var_reset\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    vlSelf->simple_router_tb__DOT__DIN = VL_RAND_RESET_I(32);
    vlSelf->simple_router_tb__DOT__D_EN = VL_RAND_RESET_I(1);
    vlSelf->simple_router_tb__DOT__ADDR = VL_RAND_RESET_I(2);
    vlSelf->simple_router_tb__DOT__clk = 0;
    }
