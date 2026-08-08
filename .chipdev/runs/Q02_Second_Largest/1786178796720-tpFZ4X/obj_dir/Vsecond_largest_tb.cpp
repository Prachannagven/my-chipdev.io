// Verilated -*- C++ -*-
// DESCRIPTION: Verilator output: Model implementation (design independent parts)

#include "Vsecond_largest_tb__pch.h"
#include "verilated_vcd_c.h"

//============================================================
// Constructors

Vsecond_largest_tb::Vsecond_largest_tb(VerilatedContext* _vcontextp__, const char* _vcname__)
    : VerilatedModel{*_vcontextp__}
    , vlSymsp{new Vsecond_largest_tb__Syms(contextp(), _vcname__, this)}
    , rootp{&(vlSymsp->TOP)}
{
    // Register model with the context
    contextp()->addModel(this);
    contextp()->traceBaseModelCbAdd(
        [this](VerilatedTraceBaseC* tfp, int levels, int options) { traceBaseModel(tfp, levels, options); });
}

Vsecond_largest_tb::Vsecond_largest_tb(const char* _vcname__)
    : Vsecond_largest_tb(Verilated::threadContextp(), _vcname__)
{
}

//============================================================
// Destructor

Vsecond_largest_tb::~Vsecond_largest_tb() {
    delete vlSymsp;
}

//============================================================
// Evaluation function

#ifdef VL_DEBUG
void Vsecond_largest_tb___024root___eval_debug_assertions(Vsecond_largest_tb___024root* vlSelf);
#endif  // VL_DEBUG
void Vsecond_largest_tb___024root___eval_static(Vsecond_largest_tb___024root* vlSelf);
void Vsecond_largest_tb___024root___eval_initial(Vsecond_largest_tb___024root* vlSelf);
void Vsecond_largest_tb___024root___eval_settle(Vsecond_largest_tb___024root* vlSelf);
void Vsecond_largest_tb___024root___eval(Vsecond_largest_tb___024root* vlSelf);

void Vsecond_largest_tb::eval_step() {
    VL_DEBUG_IF(VL_DBG_MSGF("+++++TOP Evaluate Vsecond_largest_tb::eval_step\n"); );
#ifdef VL_DEBUG
    // Debug assertions
    Vsecond_largest_tb___024root___eval_debug_assertions(&(vlSymsp->TOP));
#endif  // VL_DEBUG
    vlSymsp->__Vm_activity = true;
    vlSymsp->__Vm_deleter.deleteAll();
    if (VL_UNLIKELY(!vlSymsp->__Vm_didInit)) {
        vlSymsp->__Vm_didInit = true;
        VL_DEBUG_IF(VL_DBG_MSGF("+ Initial\n"););
        Vsecond_largest_tb___024root___eval_static(&(vlSymsp->TOP));
        Vsecond_largest_tb___024root___eval_initial(&(vlSymsp->TOP));
        Vsecond_largest_tb___024root___eval_settle(&(vlSymsp->TOP));
    }
    VL_DEBUG_IF(VL_DBG_MSGF("+ Eval\n"););
    Vsecond_largest_tb___024root___eval(&(vlSymsp->TOP));
    // Evaluate cleanup
    Verilated::endOfEval(vlSymsp->__Vm_evalMsgQp);
}

void Vsecond_largest_tb::eval_end_step() {
    VL_DEBUG_IF(VL_DBG_MSGF("+eval_end_step Vsecond_largest_tb::eval_end_step\n"); );
#ifdef VM_TRACE
    // Tracing
    if (VL_UNLIKELY(vlSymsp->__Vm_dumping)) vlSymsp->_traceDump();
#endif  // VM_TRACE
}

//============================================================
// Events and timing
bool Vsecond_largest_tb::eventsPending() { return !vlSymsp->TOP.__VdlySched.empty(); }

uint64_t Vsecond_largest_tb::nextTimeSlot() { return vlSymsp->TOP.__VdlySched.nextTimeSlot(); }

//============================================================
// Utilities

const char* Vsecond_largest_tb::name() const {
    return vlSymsp->name();
}

//============================================================
// Invoke final blocks

void Vsecond_largest_tb___024root___eval_final(Vsecond_largest_tb___024root* vlSelf);

VL_ATTR_COLD void Vsecond_largest_tb::final() {
    Vsecond_largest_tb___024root___eval_final(&(vlSymsp->TOP));
}

//============================================================
// Implementations of abstract methods from VerilatedModel

const char* Vsecond_largest_tb::hierName() const { return vlSymsp->name(); }
const char* Vsecond_largest_tb::modelName() const { return "Vsecond_largest_tb"; }
unsigned Vsecond_largest_tb::threads() const { return 1; }
void Vsecond_largest_tb::prepareClone() const { contextp()->prepareClone(); }
void Vsecond_largest_tb::atClone() const {
    contextp()->threadPoolpOnClone();
}
std::unique_ptr<VerilatedTraceConfig> Vsecond_largest_tb::traceConfig() const {
    return std::unique_ptr<VerilatedTraceConfig>{new VerilatedTraceConfig{false, false, false}};
};

//============================================================
// Trace configuration

void Vsecond_largest_tb___024root__trace_decl_types(VerilatedVcd* tracep);

void Vsecond_largest_tb___024root__trace_init_top(Vsecond_largest_tb___024root* vlSelf, VerilatedVcd* tracep);

VL_ATTR_COLD static void trace_init(void* voidSelf, VerilatedVcd* tracep, uint32_t code) {
    // Callback from tracep->open()
    Vsecond_largest_tb___024root* const __restrict vlSelf VL_ATTR_UNUSED = static_cast<Vsecond_largest_tb___024root*>(voidSelf);
    Vsecond_largest_tb__Syms* const __restrict vlSymsp VL_ATTR_UNUSED = vlSelf->vlSymsp;
    if (!vlSymsp->_vm_contextp__->calcUnusedSigs()) {
        VL_FATAL_MT(__FILE__, __LINE__, __FILE__,
            "Turning on wave traces requires Verilated::traceEverOn(true) call before time 0.");
    }
    vlSymsp->__Vm_baseCode = code;
    tracep->pushPrefix(std::string{vlSymsp->name()}, VerilatedTracePrefixType::SCOPE_MODULE);
    Vsecond_largest_tb___024root__trace_decl_types(tracep);
    Vsecond_largest_tb___024root__trace_init_top(vlSelf, tracep);
    tracep->popPrefix();
}

VL_ATTR_COLD void Vsecond_largest_tb___024root__trace_register(Vsecond_largest_tb___024root* vlSelf, VerilatedVcd* tracep);

VL_ATTR_COLD void Vsecond_largest_tb::traceBaseModel(VerilatedTraceBaseC* tfp, int levels, int options) {
    (void)levels; (void)options;
    VerilatedVcdC* const stfp = dynamic_cast<VerilatedVcdC*>(tfp);
    if (VL_UNLIKELY(!stfp)) {
        vl_fatal(__FILE__, __LINE__, __FILE__,"'Vsecond_largest_tb::trace()' called on non-VerilatedVcdC object;"
            " use --trace-fst with VerilatedFst object, and --trace with VerilatedVcd object");
    }
    stfp->spTrace()->addModel(this);
    stfp->spTrace()->addInitCb(&trace_init, &(vlSymsp->TOP));
    Vsecond_largest_tb___024root__trace_register(&(vlSymsp->TOP), stfp->spTrace());
}
