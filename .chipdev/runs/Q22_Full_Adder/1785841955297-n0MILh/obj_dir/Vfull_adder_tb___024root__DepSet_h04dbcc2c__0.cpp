// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Design implementation internals
// See Vfull_adder_tb.h for the primary calling header

#include "Vfull_adder_tb__pch.h"
#include "Vfull_adder_tb__Syms.h"
#include "Vfull_adder_tb___024root.h"

VL_INLINE_OPT VlCoroutine Vfull_adder_tb___024root___eval_initial__TOP__Vtiming__0(Vfull_adder_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vfull_adder_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vfull_adder_tb___024root___eval_initial__TOP__Vtiming__0\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Init
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__1__val_a;
    __Vtask_full_adder_tb__DOT__stimulus__1__val_a = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__1__val_b;
    __Vtask_full_adder_tb__DOT__stimulus__1__val_b = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__1__val_c;
    __Vtask_full_adder_tb__DOT__stimulus__1__val_c = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__2__val_a;
    __Vtask_full_adder_tb__DOT__stimulus__2__val_a = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__2__val_b;
    __Vtask_full_adder_tb__DOT__stimulus__2__val_b = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__2__val_c;
    __Vtask_full_adder_tb__DOT__stimulus__2__val_c = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__3__val_a;
    __Vtask_full_adder_tb__DOT__stimulus__3__val_a = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__3__val_b;
    __Vtask_full_adder_tb__DOT__stimulus__3__val_b = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__3__val_c;
    __Vtask_full_adder_tb__DOT__stimulus__3__val_c = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__4__val_a;
    __Vtask_full_adder_tb__DOT__stimulus__4__val_a = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__4__val_b;
    __Vtask_full_adder_tb__DOT__stimulus__4__val_b = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__4__val_c;
    __Vtask_full_adder_tb__DOT__stimulus__4__val_c = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__5__val_a;
    __Vtask_full_adder_tb__DOT__stimulus__5__val_a = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__5__val_b;
    __Vtask_full_adder_tb__DOT__stimulus__5__val_b = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__5__val_c;
    __Vtask_full_adder_tb__DOT__stimulus__5__val_c = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__6__val_a;
    __Vtask_full_adder_tb__DOT__stimulus__6__val_a = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__6__val_b;
    __Vtask_full_adder_tb__DOT__stimulus__6__val_b = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__6__val_c;
    __Vtask_full_adder_tb__DOT__stimulus__6__val_c = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__7__val_a;
    __Vtask_full_adder_tb__DOT__stimulus__7__val_a = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__7__val_b;
    __Vtask_full_adder_tb__DOT__stimulus__7__val_b = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__7__val_c;
    __Vtask_full_adder_tb__DOT__stimulus__7__val_c = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__8__val_a;
    __Vtask_full_adder_tb__DOT__stimulus__8__val_a = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__8__val_b;
    __Vtask_full_adder_tb__DOT__stimulus__8__val_b = 0;
    CData/*0:0*/ __Vtask_full_adder_tb__DOT__stimulus__8__val_c;
    __Vtask_full_adder_tb__DOT__stimulus__8__val_c = 0;
    // Body
    vlSymsp->TOP____024unit.__VmonitorNum = 1U;
    vlSelfRef.full_adder_tb__DOT__A = 0U;
    vlSelfRef.full_adder_tb__DOT__B = 0U;
    vlSelfRef.full_adder_tb__DOT__CIN = 0U;
    co_await vlSelfRef.__VdlySched.delay(5ULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q22_Full_Adder/1785841955297-n0MILh/Q22_Full_Adder_tb.sv", 
                                         15);
    __Vtask_full_adder_tb__DOT__stimulus__1__val_c = 1U;
    __Vtask_full_adder_tb__DOT__stimulus__1__val_b = 0U;
    __Vtask_full_adder_tb__DOT__stimulus__1__val_a = 0U;
    vlSelfRef.full_adder_tb__DOT__A = __Vtask_full_adder_tb__DOT__stimulus__1__val_a;
    vlSelfRef.full_adder_tb__DOT__B = __Vtask_full_adder_tb__DOT__stimulus__1__val_b;
    vlSelfRef.full_adder_tb__DOT__CIN = __Vtask_full_adder_tb__DOT__stimulus__1__val_c;
    co_await vlSelfRef.__VdlySched.delay(5ULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q22_Full_Adder/1785841955297-n0MILh/Q22_Full_Adder_tb.sv", 
                                         15);
    __Vtask_full_adder_tb__DOT__stimulus__2__val_c = 0U;
    __Vtask_full_adder_tb__DOT__stimulus__2__val_b = 1U;
    __Vtask_full_adder_tb__DOT__stimulus__2__val_a = 0U;
    vlSelfRef.full_adder_tb__DOT__A = __Vtask_full_adder_tb__DOT__stimulus__2__val_a;
    vlSelfRef.full_adder_tb__DOT__B = __Vtask_full_adder_tb__DOT__stimulus__2__val_b;
    vlSelfRef.full_adder_tb__DOT__CIN = __Vtask_full_adder_tb__DOT__stimulus__2__val_c;
    co_await vlSelfRef.__VdlySched.delay(5ULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q22_Full_Adder/1785841955297-n0MILh/Q22_Full_Adder_tb.sv", 
                                         15);
    __Vtask_full_adder_tb__DOT__stimulus__3__val_c = 1U;
    __Vtask_full_adder_tb__DOT__stimulus__3__val_b = 1U;
    __Vtask_full_adder_tb__DOT__stimulus__3__val_a = 0U;
    vlSelfRef.full_adder_tb__DOT__A = __Vtask_full_adder_tb__DOT__stimulus__3__val_a;
    vlSelfRef.full_adder_tb__DOT__B = __Vtask_full_adder_tb__DOT__stimulus__3__val_b;
    vlSelfRef.full_adder_tb__DOT__CIN = __Vtask_full_adder_tb__DOT__stimulus__3__val_c;
    co_await vlSelfRef.__VdlySched.delay(5ULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q22_Full_Adder/1785841955297-n0MILh/Q22_Full_Adder_tb.sv", 
                                         15);
    __Vtask_full_adder_tb__DOT__stimulus__4__val_c = 0U;
    __Vtask_full_adder_tb__DOT__stimulus__4__val_b = 0U;
    __Vtask_full_adder_tb__DOT__stimulus__4__val_a = 1U;
    vlSelfRef.full_adder_tb__DOT__A = __Vtask_full_adder_tb__DOT__stimulus__4__val_a;
    vlSelfRef.full_adder_tb__DOT__B = __Vtask_full_adder_tb__DOT__stimulus__4__val_b;
    vlSelfRef.full_adder_tb__DOT__CIN = __Vtask_full_adder_tb__DOT__stimulus__4__val_c;
    co_await vlSelfRef.__VdlySched.delay(5ULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q22_Full_Adder/1785841955297-n0MILh/Q22_Full_Adder_tb.sv", 
                                         15);
    __Vtask_full_adder_tb__DOT__stimulus__5__val_c = 1U;
    __Vtask_full_adder_tb__DOT__stimulus__5__val_b = 0U;
    __Vtask_full_adder_tb__DOT__stimulus__5__val_a = 1U;
    vlSelfRef.full_adder_tb__DOT__A = __Vtask_full_adder_tb__DOT__stimulus__5__val_a;
    vlSelfRef.full_adder_tb__DOT__B = __Vtask_full_adder_tb__DOT__stimulus__5__val_b;
    vlSelfRef.full_adder_tb__DOT__CIN = __Vtask_full_adder_tb__DOT__stimulus__5__val_c;
    co_await vlSelfRef.__VdlySched.delay(5ULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q22_Full_Adder/1785841955297-n0MILh/Q22_Full_Adder_tb.sv", 
                                         15);
    __Vtask_full_adder_tb__DOT__stimulus__6__val_c = 0U;
    __Vtask_full_adder_tb__DOT__stimulus__6__val_b = 1U;
    __Vtask_full_adder_tb__DOT__stimulus__6__val_a = 1U;
    vlSelfRef.full_adder_tb__DOT__A = __Vtask_full_adder_tb__DOT__stimulus__6__val_a;
    vlSelfRef.full_adder_tb__DOT__B = __Vtask_full_adder_tb__DOT__stimulus__6__val_b;
    vlSelfRef.full_adder_tb__DOT__CIN = __Vtask_full_adder_tb__DOT__stimulus__6__val_c;
    co_await vlSelfRef.__VdlySched.delay(5ULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q22_Full_Adder/1785841955297-n0MILh/Q22_Full_Adder_tb.sv", 
                                         15);
    __Vtask_full_adder_tb__DOT__stimulus__7__val_c = 1U;
    __Vtask_full_adder_tb__DOT__stimulus__7__val_b = 1U;
    __Vtask_full_adder_tb__DOT__stimulus__7__val_a = 1U;
    vlSelfRef.full_adder_tb__DOT__A = __Vtask_full_adder_tb__DOT__stimulus__7__val_a;
    vlSelfRef.full_adder_tb__DOT__B = __Vtask_full_adder_tb__DOT__stimulus__7__val_b;
    vlSelfRef.full_adder_tb__DOT__CIN = __Vtask_full_adder_tb__DOT__stimulus__7__val_c;
    co_await vlSelfRef.__VdlySched.delay(5ULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q22_Full_Adder/1785841955297-n0MILh/Q22_Full_Adder_tb.sv", 
                                         15);
    __Vtask_full_adder_tb__DOT__stimulus__8__val_c = 1U;
    __Vtask_full_adder_tb__DOT__stimulus__8__val_b = 0U;
    __Vtask_full_adder_tb__DOT__stimulus__8__val_a = 1U;
    vlSelfRef.full_adder_tb__DOT__A = __Vtask_full_adder_tb__DOT__stimulus__8__val_a;
    vlSelfRef.full_adder_tb__DOT__B = __Vtask_full_adder_tb__DOT__stimulus__8__val_b;
    vlSelfRef.full_adder_tb__DOT__CIN = __Vtask_full_adder_tb__DOT__stimulus__8__val_c;
    co_await vlSelfRef.__VdlySched.delay(5ULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q22_Full_Adder/1785841955297-n0MILh/Q22_Full_Adder_tb.sv", 
                                         15);
}

VL_INLINE_OPT VlCoroutine Vfull_adder_tb___024root___eval_initial__TOP__Vtiming__1(Vfull_adder_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vfull_adder_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vfull_adder_tb___024root___eval_initial__TOP__Vtiming__1\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    vlSymsp->_vm_contextp__->dumpfile(std::string{"dump.vcd"});
    vlSymsp->_traceDumpOpen();
    co_await vlSelfRef.__VdlySched.delay(0x32ULL, nullptr, 
                                         "/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q22_Full_Adder/1785841955297-n0MILh/Q22_Full_Adder_tb.sv", 
                                         39);
    VL_FINISH_MT("/home/pranav/PersonalProjects/chipdev.io/.chipdev/runs/Q22_Full_Adder/1785841955297-n0MILh/Q22_Full_Adder_tb.sv", 40, "");
}

#ifdef VL_DEBUG
VL_ATTR_COLD void Vfull_adder_tb___024root___dump_triggers__act(Vfull_adder_tb___024root* vlSelf);
#endif  // VL_DEBUG

void Vfull_adder_tb___024root___eval_triggers__act(Vfull_adder_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vfull_adder_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vfull_adder_tb___024root___eval_triggers__act\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    vlSelfRef.__VactTriggered.set(0U, ((IData)(vlSelfRef.full_adder_tb__DOT__A) 
                                       != (IData)(vlSelfRef.__Vtrigprevexpr___TOP__full_adder_tb__DOT__A__0)));
    vlSelfRef.__VactTriggered.set(1U, ((IData)(vlSelfRef.full_adder_tb__DOT__B) 
                                       != (IData)(vlSelfRef.__Vtrigprevexpr___TOP__full_adder_tb__DOT__B__0)));
    vlSelfRef.__VactTriggered.set(2U, ((IData)(vlSelfRef.full_adder_tb__DOT__CIN) 
                                       != (IData)(vlSelfRef.__Vtrigprevexpr___TOP__full_adder_tb__DOT__CIN__0)));
    vlSelfRef.__VactTriggered.set(3U, ((IData)(vlSelfRef.full_adder_tb__DOT__COUT) 
                                       != (IData)(vlSelfRef.__Vtrigprevexpr___TOP__full_adder_tb__DOT__COUT__0)));
    vlSelfRef.__VactTriggered.set(4U, ((IData)(vlSelfRef.full_adder_tb__DOT__SUM) 
                                       != (IData)(vlSelfRef.__Vtrigprevexpr___TOP__full_adder_tb__DOT__SUM__0)));
    vlSelfRef.__VactTriggered.set(5U, vlSelfRef.__VdlySched.awaitingCurrentTime());
    vlSelfRef.__Vtrigprevexpr___TOP__full_adder_tb__DOT__A__0 
        = vlSelfRef.full_adder_tb__DOT__A;
    vlSelfRef.__Vtrigprevexpr___TOP__full_adder_tb__DOT__B__0 
        = vlSelfRef.full_adder_tb__DOT__B;
    vlSelfRef.__Vtrigprevexpr___TOP__full_adder_tb__DOT__CIN__0 
        = vlSelfRef.full_adder_tb__DOT__CIN;
    vlSelfRef.__Vtrigprevexpr___TOP__full_adder_tb__DOT__COUT__0 
        = vlSelfRef.full_adder_tb__DOT__COUT;
    vlSelfRef.__Vtrigprevexpr___TOP__full_adder_tb__DOT__SUM__0 
        = vlSelfRef.full_adder_tb__DOT__SUM;
    if (VL_UNLIKELY((1U & (~ (IData)(vlSelfRef.__VactDidInit))))) {
        vlSelfRef.__VactDidInit = 1U;
        vlSelfRef.__VactTriggered.set(0U, 1U);
        vlSelfRef.__VactTriggered.set(1U, 1U);
        vlSelfRef.__VactTriggered.set(2U, 1U);
        vlSelfRef.__VactTriggered.set(3U, 1U);
        vlSelfRef.__VactTriggered.set(4U, 1U);
    }
#ifdef VL_DEBUG
    if (VL_UNLIKELY(vlSymsp->_vm_contextp__->debug())) {
        Vfull_adder_tb___024root___dump_triggers__act(vlSelf);
    }
#endif
}

VL_INLINE_OPT void Vfull_adder_tb___024root___nba_sequent__TOP__0(Vfull_adder_tb___024root* vlSelf) {
    (void)vlSelf;  // Prevent unused variable warning
    Vfull_adder_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    VL_DEBUG_IF(VL_DBG_MSGF("+    Vfull_adder_tb___024root___nba_sequent__TOP__0\n"); );
    auto& vlSelfRef = std::ref(*vlSelf).get();
    // Body
    if (VL_UNLIKELY(((~ (IData)(vlSymsp->TOP____024unit.__VmonitorOff)) 
                     & (1U == vlSymsp->TOP____024unit.__VmonitorNum)))) {
        VL_WRITEF_NX("at time t=%t A=%0b B=%0b CIN=%0b SUM=%0b COUT=%0b\n",0,
                     64,VL_TIME_UNITED_Q(1),-12,1,(IData)(vlSelfRef.full_adder_tb__DOT__A),
                     1,vlSelfRef.full_adder_tb__DOT__B,
                     1,(IData)(vlSelfRef.full_adder_tb__DOT__CIN),
                     1,vlSelfRef.full_adder_tb__DOT__SUM,
                     1,(IData)(vlSelfRef.full_adder_tb__DOT__COUT));
    }
}
