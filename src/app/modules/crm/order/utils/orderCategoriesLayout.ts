import { LayoutResolutionBreakpoints, ResolutionBreakpoints } from '../interfaces/orderCategoriesLayout';

export const calculateLayoutResolutionBreakpoints = (breakpoints: {
  [p: string]: boolean;
}): LayoutResolutionBreakpoints => {
  let breakpoint = 0;
  let rowHeight = 0;

  for (const [key, isBreakpoint] of Object.entries(breakpoints)) {
    if (isBreakpoint) {
      switch (key as ResolutionBreakpoints) {
        case ResolutionBreakpoints.XLL_SCREEN:
          breakpoint = 4;
          rowHeight = 625.5;
          break;
        case ResolutionBreakpoints.XLL_SCREEN_1:
          breakpoint = 4;
          rowHeight = 497.5;
          break;
        case ResolutionBreakpoints.XL_SCREEN:
          breakpoint = 4;
          rowHeight = 461.26;
          break;
        case ResolutionBreakpoints.XL_SCREEN_1:
          breakpoint = 4;
          rowHeight = 385.5;
          break;
        case ResolutionBreakpoints.XL_SCREEN_2:
          breakpoint = 4;
          rowHeight = 369.5;
          break;
        case ResolutionBreakpoints.LG_SCREEN:
          breakpoint = 3;
          rowHeight = 444.49;
          break;
        case ResolutionBreakpoints.LG_SCREEN_1:
          breakpoint = 3;
          rowHeight = 418.84;
          break;
        case ResolutionBreakpoints.LG_SCREEN_2:
          breakpoint = 3;
          rowHeight = 390.16;
          break;
        case ResolutionBreakpoints.MD_SCREEN:
          breakpoint = 2;
          rowHeight = 431.5;
          break;
        case ResolutionBreakpoints.MD_SCREEN_1:
          breakpoint = 2;
          rowHeight = 419.5;
          break;
        case ResolutionBreakpoints.SM_SCREEN:
          breakpoint = 2;
          rowHeight = 309.5;
          break;
        case ResolutionBreakpoints.SM_SCREEN_1:
          breakpoint = 2;
          rowHeight = 303.5;
          break;
        case ResolutionBreakpoints.MS_SCREEN:
          breakpoint = 1;
          rowHeight = 497.5;
          break;
      }
    }
  }

  return { breakpoint, rowHeight };
};
