// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Tracing implementation internals
#include "verilated_vcd_c.h"
#include "Vsimple_router_tb__Syms.h"


void Vsimple_router_tb___024root__trace_chg_0_sub_0(Vsimple_router_tb___024root* vlSelf, VerilatedVcd::Buffer* bufp);

void Vsimple_router_tb___024root__trace_chg_0(void* voidSelf, VerilatedVcd::Buffer* bufp) {
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root__trace_chg_0\n"); );
    // Init
    Vsimple_router_tb___024root* const __restrict vlSelf VL_ATTR_UNUSED = static_cast<Vsimple_router_tb___024root*>(voidSelf);
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    if (VL_UNLIKELY(!vlSymsp->__Vm_activity)) return;
    // Body
    Vsimple_router_tb___024root__trace_chg_0_sub_0((&vlSymsp->TOP), bufp);
}

void Vsimple_router_tb___024root__trace_chg_0_sub_0(Vsimple_router_tb___024root* vlSelf, VerilatedVcd::Buffer* bufp) {
    (void)vlSelf;  // Prevent unused variable warning
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root__trace_chg_0_sub_0\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Init
    uint32_t* const oldp VL_ATTR_UNUSED = bufp->oldp(vlSymsp->__Vm_baseCode + 1);
    // Body
    if (VL_UNLIKELY((vlSelfRef.__Vm_traceActivity[1U] 
                     | vlSelfRef.__Vm_traceActivity
                     [2U]))) {
        bufp->chgIData(oldp+0,(vlSelfRef.simple_router_tb__DOT__DIN),32);
        bufp->chgBit(oldp+1,(vlSelfRef.simple_router_tb__DOT__D_EN));
        bufp->chgCData(oldp+2,(vlSelfRef.simple_router_tb__DOT__ADDR),2);
        bufp->chgIData(oldp+3,((((IData)(vlSelfRef.simple_router_tb__DOT__D_EN) 
                                 & (0U == (IData)(vlSelfRef.simple_router_tb__DOT__ADDR)))
                                 ? vlSelfRef.simple_router_tb__DOT__DIN
                                 : 0U)),32);
        bufp->chgIData(oldp+4,((((IData)(vlSelfRef.simple_router_tb__DOT__D_EN) 
                                 & (1U == (IData)(vlSelfRef.simple_router_tb__DOT__ADDR)))
                                 ? vlSelfRef.simple_router_tb__DOT__DIN
                                 : 0U)),32);
        bufp->chgIData(oldp+5,((((IData)(vlSelfRef.simple_router_tb__DOT__D_EN) 
                                 & (2U == (IData)(vlSelfRef.simple_router_tb__DOT__ADDR)))
                                 ? vlSelfRef.simple_router_tb__DOT__DIN
                                 : 0U)),32);
        bufp->chgIData(oldp+6,((((IData)(vlSelfRef.simple_router_tb__DOT__D_EN) 
                                 & (3U == (IData)(vlSelfRef.simple_router_tb__DOT__ADDR)))
                                 ? vlSelfRef.simple_router_tb__DOT__DIN
                                 : 0U)),32);
    }
    bufp->chgBit(oldp+7,(vlSelfRef.simple_router_tb__DOT__clk));
}

void Vsimple_router_tb___024root__trace_cleanup(void* voidSelf, VerilatedVcd* /*unused*/) {
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vsimple_router_tb___024root__trace_cleanup\n"); );
    // Init
    Vsimple_router_tb___024root* const __restrict vlSelf VL_ATTR_UNUSED = static_cast<Vsimple_router_tb___024root*>(voidSelf);
    Vsimple_router_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    // Body
    vlSymsp->__Vm_activity = false;
    vlSymsp->TOP.__Vm_traceActivity[0U] = 0U;
    vlSymsp->TOP.__Vm_traceActivity[1U] = 0U;
    vlSymsp->TOP.__Vm_traceActivity[2U] = 0U;
}
