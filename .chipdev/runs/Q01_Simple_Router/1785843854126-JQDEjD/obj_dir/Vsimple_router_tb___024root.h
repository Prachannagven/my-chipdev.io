// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Design internal header
// See Vsimple_router_tb.h for the primary calling header

#ifndef VERILATED_VSIMPLE_ROUTER_TB___024ROOT_H_
#define VERILATED_VSIMPLE_ROUTER_TB___024ROOT_H_  // guard

#include "verilated.h"
#include "verilated_timing.h"


class Vsimple_router_tb__Syms;

class alignas(VL_CACHE_LINE_BYTES) Vsimple_router_tb___024root final : public VerilatedModule {
  public:

    // DESIGN SPECIFIC STATE
    CData/*0:0*/ simple_router_tb__DOT__D_EN;
    CData/*1:0*/ simple_router_tb__DOT__ADDR;
    CData/*0:0*/ simple_router_tb__DOT__clk;
    CData/*0:0*/ __VactContinue;
    IData/*31:0*/ simple_router_tb__DOT__DIN;
    IData/*31:0*/ __VactIterCount;
    VlUnpacked<CData/*0:0*/, 3> __Vm_traceActivity;
    VlDelayScheduler __VdlySched;
    VlTriggerVec<1> __VactTriggered;
    VlTriggerVec<1> __VnbaTriggered;

    // INTERNAL VARIABLES
    Vsimple_router_tb__Syms* const vlSymsp;

    // CONSTRUCTORS
    Vsimple_router_tb___024root(Vsimple_router_tb__Syms* symsp, const char* v__name);
    ~Vsimple_router_tb___024root();
    VL_UNCOPYABLE(Vsimple_router_tb___024root);

    // INTERNAL METHODS
    void __Vconfigure(bool first);
};


#endif  // guard
