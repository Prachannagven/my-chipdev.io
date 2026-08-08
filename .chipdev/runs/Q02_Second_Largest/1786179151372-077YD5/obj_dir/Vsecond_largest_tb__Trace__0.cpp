// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Tracing implementation internals
#include "verilated_vcd_c.h"
#include "Vsecond_largest_tb__Syms.h"


void Vsecond_largest_tb___024root__trace_chg_0_sub_0(Vsecond_largest_tb___024root* vlSelf, VerilatedVcd::Buffer* bufp);

void Vsecond_largest_tb___024root__trace_chg_0(void* voidSelf, VerilatedVcd::Buffer* bufp) {
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root__trace_chg_0\n"); );
    // Init
    Vsecond_largest_tb___024root* const __restrict vlSelf VL_ATTR_UNUSED = static_cast<Vsecond_largest_tb___024root*>(voidSelf);
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    if (VL_UNLIKELY(!vlSymsp->__Vm_activity)) return;
    // Body
    Vsecond_largest_tb___024root__trace_chg_0_sub_0((&vlSymsp->TOP), bufp);
}

void Vsecond_largest_tb___024root__trace_chg_0_sub_0(Vsecond_largest_tb___024root* vlSelf, VerilatedVcd::Buffer* bufp) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root__trace_chg_0_sub_0\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Init
    uint32_t* const oldp VL_ATTR_UNUSED = bufp->oldp(vlSymsp->__Vm_baseCode + 1);
    // Body
    bufp->chgIData(oldp+0,(vlSelfRef.second_largest_tb__DOT__DIN),32);
    bufp->chgIData(oldp+1,(vlSelfRef.second_largest_tb__DOT__DUT__DOT__second_largest),32);
    bufp->chgBit(oldp+2,(vlSelfRef.second_largest_tb__DOT__CLK));
    bufp->chgBit(oldp+3,(vlSelfRef.second_largest_tb__DOT__RESETN));
    bufp->chgIData(oldp+4,(vlSelfRef.second_largest_tb__DOT__DUT__DOT__largest),32);
}

void Vsecond_largest_tb___024root__trace_cleanup(void* voidSelf, VerilatedVcd* /*unused*/) {
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsecond_largest_tb___024root__trace_cleanup\n"); );
    // Init
    Vsecond_largest_tb___024root* const __restrict vlSelf VL_ATTR_UNUSED = static_cast<Vsecond_largest_tb___024root*>(voidSelf);
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VlUnpacked<CData/*0:0*/, 1> __Vm_traceActivity;
    for (int __Vi0 = 0; __Vi0 < 1; ++__Vi0) {
        __Vm_traceActivity[__Vi0] = 0;
    }
    // Body
    vlSymsp->__Vm_activity = false;
    __Vm_traceActivity[0U] = 0U;
}
