import { Page, Router } from '@happysanta/router';
// region PAGES
export const PAGE_MAIN: string = '/';
export const PAGE_USERS: string = '/users';
export const PAGE_AUTH: string = '/auth';
export const PAGE_DOCUMENTS: string = '/documents'
// endregion

// region PANELS
export const PANEL_MAIN: string = 'panel_main';
export const PANEL_USERS: string = 'panel_users';
export const PANEL_AUTH: string = 'panel_auth';
export const PANEL_DOCUMENTS: string = 'panel_documents';
// endregion

// region MODALS
export const MODAL_TEST_GRADE: string = 'modal_test_grade';
export const MODAL_AUTH_DECLINE: string = 'modal_auth_decline';
export const MODAL_AUTH_SUCCESS: string = 'modal_auth_success';
export const MODAL_CREATE_DECLINE: string = 'modal_create_decline';
export const MODAL_DELETE_DECLINE: string = 'modal_delete_decline';
export const MODAL_UPDATE_DECLINE: string = 'modal_update_decline';
export const MODAL_CREATE_SUCCESS: string = 'modal_create_success';
export const MODAL_UPDATE_SUCCESS: string = 'modal_update_success';
export const MODAL_CREATE_USER: string = 'modal_create_user';
export const MODAL_UPDATE_USER: string = 'modal_update_user';
export const MODAL_INFO: string = 'modal_info';
// endregion

// region POPOUTS
export const POPOUT_TEMPLATE: string = 'popout_template';
// endregion

// region VIEWS
export const VIEW_MAIN: string = 'view_main'
export const VIEW_ONBOARDING: string = 'view_onboarding'
// endregion

const routes = {
  [PAGE_MAIN]: new Page(PANEL_MAIN, VIEW_MAIN),
  [PAGE_USERS]: new Page(PANEL_USERS, VIEW_MAIN),
  [PAGE_AUTH]: new Page(PANEL_AUTH, VIEW_MAIN),
  [PAGE_DOCUMENTS]: new Page(PANEL_DOCUMENTS, VIEW_MAIN)


}

export const router = new Router(routes);
router.start();
