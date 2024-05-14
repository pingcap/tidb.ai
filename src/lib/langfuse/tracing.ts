import {LangfuseTraceClient} from "langfuse";
import {CallbackManager} from "llamaindex";

export function getLangfuseCallbackManager(trace: LangfuseTraceClient) {
  const cm = new CallbackManager();
  cm.on("retrieve", (data) => {
    trace.event({
      name: 'retrieve',
    });
    console.log("retrieve:", data);
  });

  cm.on("llm-start", (data) => {
    trace.event({
      name: 'llm-start',
    });
    console.log("llm-start:", data);
  });

  cm.on("llm-end", (data) => {
    trace.event({
      name: 'llm-end',
    });
    console.log("llm-end:", data);
  });

  cm.on("agent-start", (data) => {
    console.log("agent-start:", data);
  });

  cm.on("agent-end", (data) => {
    console.log("agent-end:", data);
  });

  return cm;
}