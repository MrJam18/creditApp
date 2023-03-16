import {SelectorCreator} from "../base/selectorCreator";

export const cessionsSelector = new SelectorCreator('cessions');
cessionsSelector.easyCreator('searchList');
cessionsSelector.easyCreator('loading');
cessionsSelector.easyCreator('list');
cessionsSelector.easyCreator('info');
cessionsSelector.selectInfoError = cessionsSelector.chunkCreator('info.error');
cessionsSelector.selectInfoLoading = cessionsSelector.chunkCreator('info.loading');
cessionsSelector.selectInfoCount = cessionsSelector.chunkCreator('info.count');
cessionsSelector.selectInfoRows = cessionsSelector.chunkCreator('info.rows');
cessionsSelector.selectShowConfirm = cessionsSelector.chunkCreator('info.showConfirm');
cessionsSelector.selectLastInfo = cessionsSelector.chunkCreator('info.lastInfo')
cessionsSelector.selectInfoCessionId = cessionsSelector.chunkCreator('info.cessionId');
cessionsSelector.selectInfoShow = cessionsSelector.chunkCreator('info.show');
cessionsSelector.selectActiveCession = cessionsSelector.chunkCreator('info.activeCession');
cessionsSelector.forceUpdate = cessionsSelector.chunkCreator('info.forceUpdateCounter');

 // export const getCessionsSearchList = base('searchList');
// export const getCessionsLoading = base('loading');
// export const getCessionsList = base('list');