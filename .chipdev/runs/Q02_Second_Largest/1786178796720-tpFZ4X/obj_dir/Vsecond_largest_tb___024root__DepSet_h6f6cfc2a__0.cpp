// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Design implementation internals
// See Vsecond_largest_tb.h for the primary calling header

#include "Vsecond_largest_tb__pch.h"
#include "Vsecond_largest_tb__Syms.h"
#include "Vsecond_largest_tb___024root.h"

VL_INLINE_OPT VlCoroutine Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__2(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_initial__TOP__Vtiming__2\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    vlSymsp->_vm_contextp__->dumpfile(std::string{"dump.vcd"});
    vlSymsp->_traceDumpOpen();
    co_await vlSelfRef.__VdlySched.delay(0xaaULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 
                                         110);
    VL_FINISH_MT("/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q02_Second_Largest/1786178796720-tpFZ4X/Q02_Second_Largest_tb.sv", 112, "");
}

#ifdef VL_DEBUG
VL_ATTR_COLD void Vsecond_largest_tb___024root___dump_triggers__act(Vsecond_largest_tb___024root* vlSelf);
#endif  // VL_DEBUG

void Vsecond_largest_tb___024root___eval_triggers__act(Vsecond_largest_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root___eval_triggers__act\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    vlSelfRef.__VactTriggered.set(0U, ((IData)(vlSelfRef.second_largest_tb__DOT__CLK) 
                                       & (~ (IData)(vlSelfRef.__Vtrigprevexpr___TOP__second_largest_tb__DOT__CLK__0))));
    vlSelfRef.__VactTriggered.set(1U, ((~ (IData)(vlSelfRef.second_largest_tb__DOT__RESETN)) 
                                       & (IData)(vlSelfRef.__Vtrigprevexpr___TOP__second_largest_tb__DOT__RESETN__0)));
    vlSelfRef.__VactTriggered.set(2U, vlSelfRef.__VdlySched.awaitingCurrentTime());
    vlSelfRef.__Vtrigprevexpr___TOP__second_largest_tb__DOT__CLK__0 
        = vlSelfRef.second_largest_tb__DOT__CLK;
    vlSelfRef.__Vtrigprevexpr___TOP__second_largest_tb__DOT__RESETN__0 
        = vlSelfRef.second_largest_tb__DOT__RESETN;
#ifdef VL_DEBUG
    if (VL_UNLIKELY(vlSymsp->_vm_contextp__->debug())) {
        Vsecond_largest_tb___024root___dump_triggers__act(vlSelf);
    }
#endif
}
