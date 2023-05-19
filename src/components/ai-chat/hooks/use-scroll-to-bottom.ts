import { type RefObject } from "react";
import { wait } from "@/lib/utils";

const useScrollToBottom = (ref: RefObject<HTMLElement>) => {
  const scrollToBottom = async (waitMilliseconds?: number) => {
    if (waitMilliseconds) await wait(waitMilliseconds);

    const container = ref.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  return { scrollToBottom };
};

export default useScrollToBottom;
