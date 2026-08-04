// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Design implementation internals
// See Vsimple_router_tb.h for the primary calling header

#include "Vsimple_router_tb__pch.h"
#include "Vsimple_router_tb__Syms.h"
#include "Vsimple_router_tb___024root.h"

VL_INLINE_OPT VlCoroutine Vsimple_router_tb___024root___eval_initial__TOP__Vtiming__1(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___eval_initial__TOP__Vtiming__1\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    vlSymsp->_vm_contextp__->dumpfile(std::string{"dump.vcd"});
    vlSymsp->_traceDumpOpen();
    co_await vlSelfRef.__VdlySched.delay(0x64ULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q01_Simple_Router/1785844164446-LKQRkf/Q01_Simple_Router_tb.sv", 
                                         87);
    VL_FINISH_MT("/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q01_Simple_Router/1785844164446-LKQRkf/Q01_Simple_Router_tb.sv", 88, "");
}

#ifdef VL_DEBUG
VL_ATTR_COLD void Vsimple_router_tb___024root___dump_triggers__act(Vsimple_router_tb___024root* vlSelf);
#endif  // VL_DEBUG

void Vsimple_router_tb___024root___eval_triggers__act(Vsimple_router_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root___eval_triggers__act\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    vlSelfRef.__VactTriggered.set(0U, vlSelfRef.__VdlySched.awaitingCurrentTime());
#ifdef VL_DEBUG
    if (VL_UNLIKELY(vlSymsp->_vm_contextp__->debug())) {
        Vsimple_router_tb___024root___dump_triggers__act(vlSelf);
    }
#endif
}
