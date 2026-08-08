// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Design implementation internals
// See Vsecond_largest_tb.h for the primary calling header

#include "Vsecond_largest_tb__pch.h"
#include "Vsecond_largest_tb___024root.h"

VL_ATTR_COLD void Vsecond_largest_tb___024root___eval_static(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_static\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
}

VL_ATTR_COLD void Vsecond_largest_tb___024root___eval_final(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_final\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
}

VL_ATTR_COLD void Vsecond_largest_tb___024root___eval_settle(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_settle\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
}

#ifdef VL_DEBUG
VL_ATTR_COLD void Vsecond_largest_tb___024root___dump_triggers__act(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___dump_triggers__act\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    if ((1U & (~ vlSelfRef.__VactTriggered.any()))) {
        VL_DBG_MSGF("         No triggers active\n");
    }
    if ((1ULL & vlSelfRef.__VactTriggered.word(0U))) {
        VL_DBG_MSGF("         'act' region trigger index 0 is active: @(posedge second_largest_tb.CLK)\n");
    }
    if ((2ULL & vlSelfRef.__VactTriggered.word(0U))) {
        VL_DBG_MSGF("         'act' region trigger index 1 is active: @(negedge second_largest_tb.RESETN)\n");
    }
    if ((4ULL & vlSelfRef.__VactTriggered.word(0U))) {
        VL_DBG_MSGF("         'act' region trigger index 2 is active: @([true] __VdlySched.awaitingCurrentTime())\n");
    }
}
#endif  // VL_DEBUG

#ifdef VL_DEBUG
VL_ATTR_COLD void Vsecond_largest_tb___024root___dump_triggers__nba(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___dump_triggers__nba\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    if ((1U & (~ vlSelfRef.__VnbaTriggered.any()))) {
        VL_DBG_MSGF("         No triggers active\n");
    }
    if ((1ULL & vlSelfRef.__VnbaTriggered.word(0U))) {
        VL_DBG_MSGF("         'nba' region trigger index 0 is active: @(posedge second_largest_tb.CLK)\n");
    }
    if ((2ULL & vlSelfRef.__VnbaTriggered.word(0U))) {
        VL_DBG_MSGF("         'nba' region trigger index 1 is active: @(negedge second_largest_tb.RESETN)\n");
    }
    if ((4ULL & vlSelfRef.__VnbaTriggered.word(0U))) {
        VL_DBG_MSGF("         'nba' region trigger index 2 is active: @([true] __VdlySched.awaitingCurrentTime())\n");
    }
}
#endif  // VL_DEBUG

VL_ATTR_COLD void Vsecond_largest_tb___024root___ctor_var_reset(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___ctor_var_reset\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    vlSelf->second_largest_tb__DOT__DIN = VL_RAND_RESET_I(32);
    vlSelf->second_largest_tb__DOT__CLK = 0;
    vlSelf->second_largest_tb__DOT__RESETN = 0;
    vlSelf->second_largest_tb__DOT__DUT__DOT__largest = VL_RAND_RESET_I(32);
    vlSelf->second_largest_tb__DOT__DUT__DOT__second_largest = VL_RAND_RESET_I(32);
    vlSelf->__Vtrigprevexpr___TOP__second_largest_tb__DOT__CLK__0 = 0;
    vlSelf->__Vtrigprevexpr___TOP__second_largest_tb__DOT__RESETN__0 = 0;
}
