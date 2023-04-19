export interface LayoutResolutionBreakpoints {
  breakpoint: number;
  rowHeight: number;
}

export enum ResolutionBreakpoints {
  XLL_SCREEN = '(max-width: 2560px)',
  XLL_SCREEN_1 = '(max-width: 2048px)',
  XL_SCREEN = '(max-width: 1900px)',
  XL_SCREEN_1 = '(max-width: 1600px)',
  XL_SCREEN_2 = '(max-width: 1536px)',
  LG_SCREEN = '(max-width: 1440px)',
  LG_SCREEN_1 = '(max-width: 1366px)',
  LG_SCREEN_2 = '(max-width: 1280px)',
  MD_SCREEN = '(max-width: 1024px)',
  MD_SCREEN_1 = '(max-width: 1000px)',
  SM_SCREEN = '(max-width: 780px)',
  SM_SCREEN_1 = '(max-width: 768px)',
  MS_SCREEN = '(max-width: 460px)',
}
