// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Design internal header
// See Vsecond_largest_tb.h for the primary calling header

#ifndef VERILATED_VSECOND_LARGEST_TB___024ROOT_H_
#define VERILATED_VSECOND_LARGEST_TB___024ROOT_H_  // guard

#include "verilated.h"
#include "verilated_timing.h"


class Vsecond_largest_tb__Syms;

class alignas(VL_CACHE_LINE_BYTES) Vsecond_largest_tb___024root final : public VerilatedModule {
  public:

    // DESIGN SPECIFIC STATE
    CData/*0:0*/ second_largest_tb__DOT__CLK;
    CData/*0:0*/ second_largest_tb__DOT__RESETN;
    CData/*0:0*/ __Vtrigprevexpr___TOP__second_largest_tb__DOT__CLK__0;
    CData/*0:0*/ __Vtrigprevexpr___TOP__second_largest_tb__DOT__RESETN__0;
    CData/*0:0*/ __VactContinue;
    IData/*31:0*/ second_largest_tb__DOT__DIN;
    IData/*31:0*/ second_largest_tb__DOT__DUT__DOT__largest;
    IData/*31:0*/ second_largest_tb__DOT__DUT__DOT__second_largest;
    IData/*31:0*/ __VactIterCount;
    VlDelayScheduler __VdlySched;
    VlTriggerScheduler __VtrigSched_he04e1de7__0;
    VlForkSync __Vfork_1__sync;
    VlForkSync __Vfork_2__sync;
    VlTriggerVec<3> __VactTriggered;
    VlTriggerVec<3> __VnbaTriggered;

    // INTERNAL VARIABLES
    Vsecond_largest_tb__Syms* const vlSymsp;

    // CONSTRUCTORS
    Vsecond_largest_tb___024root(Vsecond_largest_tb__Syms* symsp, const char* v__name);
    ~Vsecond_largest_tb___024root();
    VL_UNCOPYABLE(Vsecond_largest_tb___024root);

    // INTERNAL METHODS
    void __Vconfigure(bool first);
};


#endif  // guard
