import api from "../helpers/api";
import appStore from "../stores/appStore";

class UserService {
  public getState() {
    return appStore.getState().userState;
  }

  public async doSignIn() {
    const { data: user } = await api.getUserInfo();
    if (user) {
      appStore.dispatch({
        type: "SIGN_IN",
        payload: { user },
      });
    } else {
      userService.doSignOut();
    }
    return user;
  }

  public async doSignOut() {
    appStore.dispatch({
      type: "SIGN_OUT",
      payload: null,
    });
    api.signout().catch(() => {
      // do nth
    });
  }

  public async checkUsernameUsable(username: string): Promise<boolean> {
    const { data: isUsable } = await api.checkUsernameUsable(username);
    return isUsable;
  }

  public async updateUsername(username: string): Promise<void> {
    await api.updateUserinfo({
      username,
    });
  }

  public async checkPasswordValid(password: string): Promise<boolean> {
    const { data: isValid } = await api.checkPasswordValid(password);
    return isValid;
  }

  public async updatePassword(password: string): Promise<void> {
    await api.updateUserinfo({
      password,
    });
  }

  public async resetOpenId(): Promise<string> {
    const { data: openId } = await api.resetOpenId();
    appStore.dispatch({
      type: "RESET_OPENID",
      payload: openId,
    });
    return openId;
  }
}

const userService = new UserService();

export default userService;
