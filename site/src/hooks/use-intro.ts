import { create } from "zustand";

export interface UseIntro {
  /**
   * False until the opening animation has finished. The hero waits on this so
   * its entrance sequence plays for the visitor instead of running to
   * completion behind the overlay.
   */
  ready: boolean;
  setReady: () => void;
}

export const useIntro = create<UseIntro>((set) => ({
  ready: false,
  setReady: () => set({ ready: true }),
}));
